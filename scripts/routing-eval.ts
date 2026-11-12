import { randomUUID } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const adapterOutcomes = new Set(["selected", "clarified", "refused", "error"] as const);
const usageSources = new Set(["provider", "host", "unavailable"] as const);
const semanticOutcomes = new Set(["success", "partial", "failure", "not_applicable"] as const);
const toolOutcomes = new Set(["success", "error", "cancelled", "unknown"] as const);

type AdapterOutcome = "selected" | "clarified" | "refused" | "error";
type UsageSource = "provider" | "host" | "unavailable";
type SemanticOutcome = "success" | "partial" | "failure" | "not_applicable";
type ToolOutcome = "success" | "error" | "cancelled" | "unknown";
type ExpectationMode = "include" | "exclude" | "include_or_clarify" | "exact";
type CaseType = "positive" | "negative" | "ambiguous" | "overlap";

interface CorpusSkill {
  name: string;
  should_trigger: string[];
  should_not_trigger: string[];
  ambiguous: string[];
}

interface CorpusOverlap {
  prompt: string;
  expected: string[];
  reason: string;
}

interface RoutingCorpus {
  schema_version: 1;
  skills: CorpusSkill[];
  overlap_cases: CorpusOverlap[];
}

export interface CandidateSkill {
  name: string;
  description: string;
  source: string;
}

export interface RoutingCase {
  id: string;
  case_type: CaseType;
  target: string | null;
  prompt: string;
  expectation: {
    mode: ExpectationMode;
    skills: string[];
  };
  reason?: string;
}

export interface RoutingSuite {
  schema_version: 1;
  corpus: string;
  skills: CandidateSkill[];
  cases: RoutingCase[];
  counts: {
    skills: number;
    positive: number;
    negative: number;
    ambiguous: number;
    overlap: number;
  };
}

export interface AdapterUsage {
  source: UsageSource;
  input_tokens: number | null;
  output_tokens: number | null;
  total_tokens: number | null;
}

export interface AdapterToolCall {
  name: string;
  latency_ms: number | null;
  outcome: ToolOutcome;
}

export interface AdapterResult {
  protocol_version: 1;
  outcome: AdapterOutcome;
  selected_skills: string[];
  usage: AdapterUsage;
  model_latency_ms: number | null;
  semantic_outcome: SemanticOutcome;
  tool_calls: AdapterToolCall[];
  trace_id?: string;
  error_kind?: string;
}

export interface EvaluationMetadata {
  provider: string;
  model: string;
  host: string;
  host_version: string;
  catalog_revision: string;
  locale: string;
  execution_region: string;
}

export interface AdapterRequest {
  protocol_version: 1;
  run_id: string;
  case: RoutingCase;
  repetition: number;
  candidate_catalog: CandidateSkill[];
  metadata: EvaluationMetadata;
}

export interface EvaluationRecord {
  record_type: "case";
  schema_version: 1;
  run_id: string;
  case_id: string;
  case_type: CaseType;
  target: string | null;
  repetition: number;
  prompt: string;
  expectation: RoutingCase["expectation"];
  observed: AdapterResult;
  passed: boolean;
  failure_reason?: string;
  metadata: EvaluationMetadata;
  started_at: string;
  completed_at: string;
  wall_time_ms: number;
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function exactKeys(value: Record<string, unknown>, expected: string[], path: string): void {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  assert(
    actual.length === wanted.length && actual.every((key, index) => key === wanted[index]),
    `${path} must contain exactly: ${wanted.join(", ")}`,
  );
}

function allowedKeys(value: Record<string, unknown>, required: string[], optional: string[], path: string): void {
  const keys = Object.keys(value);
  const allowed = new Set([...required, ...optional]);
  const missing = required.filter((key) => !keys.includes(key));
  const unknown = keys.filter((key) => !allowed.has(key));
  assert(missing.length === 0, `${path} is missing required fields: ${missing.join(", ")}`);
  assert(unknown.length === 0, `${path} contains unsupported fields: ${unknown.join(", ")}`);
}

function nonemptyString(value: unknown, path: string): string {
  assert(typeof value === "string" && value.trim() === value && value.length > 0, `${path} must be a non-empty trimmed string`);
  return value;
}

function stringList(value: unknown, path: string, minimum = 1): string[] {
  assert(Array.isArray(value) && value.length >= minimum, `${path} must contain at least ${minimum} string${minimum === 1 ? "" : "s"}`);
  const result = value.map((entry, index) => nonemptyString(entry, `${path}[${index}]`));
  assert(new Set(result).size === result.length, `${path} must not contain duplicates`);
  return result;
}

function repositoryPath(root: string, path: string): string {
  return relative(root, path).split(sep).join("/");
}

async function isFile(path: string): Promise<boolean> {
  return (await stat(path).catch(() => null))?.isFile() === true;
}

function frontmatter(source: string, path: string): { name: string; description: string } {
  assert(source.startsWith("---\n"), `${path} must start with YAML frontmatter`);
  const end = source.indexOf("\n---\n", 4);
  assert(end >= 0, `${path} has no closing YAML frontmatter delimiter`);
  const header = source.slice(4, end);
  const name = header.match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const rawDescription = header.match(/^description:\s*(.+)$/m)?.[1]?.trim();
  assert(name, `${path} has no frontmatter name`);
  assert(rawDescription, `${path} has no frontmatter description`);
  const description = rawDescription.replace(/^(["'])(.*)\1$/, "$2");
  return { name, description };
}

function parseCorpus(value: unknown): RoutingCorpus {
  assert(isRecord(value), "routing corpus must be a JSON object");
  exactKeys(value, ["schema_version", "skills", "overlap_cases"], "routing corpus");
  assert(value.schema_version === 1, "routing corpus must use schema_version 1");
  assert(Array.isArray(value.skills) && value.skills.length > 0, "routing corpus must contain skills");
  assert(Array.isArray(value.overlap_cases) && value.overlap_cases.length > 0, "routing corpus must contain overlap_cases");

  const skills = value.skills.map((entry, index): CorpusSkill => {
    assert(isRecord(entry), `skills[${index}] must be an object`);
    exactKeys(entry, ["name", "should_trigger", "should_not_trigger", "ambiguous"], `skills[${index}]`);
    return {
      name: nonemptyString(entry.name, `skills[${index}].name`),
      should_trigger: stringList(entry.should_trigger, `skills[${index}].should_trigger`),
      should_not_trigger: stringList(entry.should_not_trigger, `skills[${index}].should_not_trigger`),
      ambiguous: stringList(entry.ambiguous, `skills[${index}].ambiguous`),
    };
  });

  const overlapCases = value.overlap_cases.map((entry, index): CorpusOverlap => {
    assert(isRecord(entry), `overlap_cases[${index}] must be an object`);
    exactKeys(entry, ["prompt", "expected", "reason"], `overlap_cases[${index}]`);
    return {
      prompt: nonemptyString(entry.prompt, `overlap_cases[${index}].prompt`),
      expected: stringList(entry.expected, `overlap_cases[${index}].expected`, 2),
      reason: nonemptyString(entry.reason, `overlap_cases[${index}].reason`),
    };
  });

  return { schema_version: 1, skills, overlap_cases: overlapCases };
}

function unitCases(entry: CorpusSkill): RoutingCase[] {
  const definitions: Array<[CaseType, ExpectationMode, string[]]> = [
    ["positive", "include", entry.should_trigger],
    ["negative", "exclude", entry.should_not_trigger],
    ["ambiguous", "include_or_clarify", entry.ambiguous],
  ];
  return definitions.flatMap(([caseType, mode, prompts]) => prompts.map((prompt, index) => ({
    id: `skill:${entry.name}:${caseType}:${index + 1}`,
    case_type: caseType,
    target: entry.name,
    prompt,
    expectation: { mode, skills: [entry.name] },
  })));
}

export async function loadRoutingSuite({
  root = defaultRoot,
  corpusPath = join(root, "evals", "routing.json"),
}: {
  root?: string;
  corpusPath?: string;
} = {}): Promise<RoutingSuite> {
  const repositoryRoot = resolve(root);
  const resolvedCorpus = resolve(corpusPath);
  const corpus = parseCorpus(JSON.parse(await readFile(resolvedCorpus, "utf8")) as unknown);
  const skillsRoot = join(repositoryRoot, "skills");
  const directories = (await readdir(skillsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const recorded = corpus.skills.map((entry) => entry.name);
  assert(new Set(recorded).size === recorded.length, "routing corpus contains duplicate skill names");
  assert(recorded.every((name, index) => index === 0 || recorded[index - 1]! < name), "routing corpus skills must be sorted by name");
  const missing = directories.filter((name) => !recorded.includes(name));
  const unknown = recorded.filter((name) => !directories.includes(name));
  assert(missing.length === 0, `routing corpus is missing skills: ${missing.join(", ")}`);
  assert(unknown.length === 0, `routing corpus references unknown skills: ${unknown.join(", ")}`);

  const skills: CandidateSkill[] = [];
  for (const name of recorded) {
    const path = join(skillsRoot, name, "SKILL.md");
    assert(await isFile(path), `No skill source exists for routing unit ${name}`);
    const metadata = frontmatter(await readFile(path, "utf8"), repositoryPath(repositoryRoot, path));
    assert(metadata.name === name, `${repositoryPath(repositoryRoot, path)} names ${metadata.name}, expected ${name}`);
    skills.push({ name, description: metadata.description, source: repositoryPath(repositoryRoot, path) });
  }

  const known = new Set(recorded);
  for (const [index, entry] of corpus.overlap_cases.entries()) {
    const sorted = [...entry.expected].sort();
    assert(entry.expected.every((name, item) => name === sorted[item]), `overlap_cases[${index}].expected must be sorted`);
    const unresolved = entry.expected.filter((name) => !known.has(name));
    assert(unresolved.length === 0, `overlap_cases[${index}] references unknown skills: ${unresolved.join(", ")}`);
  }

  const prompts = corpus.skills.flatMap((entry) => [
    ...entry.should_trigger,
    ...entry.should_not_trigger,
    ...entry.ambiguous,
  ]).concat(corpus.overlap_cases.map((entry) => entry.prompt));
  assert(new Set(prompts).size === prompts.length, "routing corpus prompts must be unique");

  const cases = [
    ...corpus.skills.flatMap(unitCases),
    ...corpus.overlap_cases.map((entry, index): RoutingCase => ({
      id: `overlap:${index + 1}`,
      case_type: "overlap",
      target: null,
      prompt: entry.prompt,
      expectation: { mode: "exact", skills: [...entry.expected] },
      reason: entry.reason,
    })),
  ];

  const count = (caseType: CaseType): number => cases.filter((entry) => entry.case_type === caseType).length;
  return {
    schema_version: 1,
    corpus: repositoryPath(repositoryRoot, resolvedCorpus),
    skills,
    cases,
    counts: {
      skills: skills.length,
      positive: count("positive"),
      negative: count("negative"),
      ambiguous: count("ambiguous"),
      overlap: count("overlap"),
    },
  };
}

function nullableCount(value: unknown, field: string): asserts value is number | null {
  assert(value === null || (Number.isInteger(value) && (value as number) >= 0), `${field} must be a non-negative integer or null`);
}

function nullableDuration(value: unknown, field: string): asserts value is number | null {
  assert(value === null || (typeof value === "number" && Number.isFinite(value) && value >= 0), `${field} must be a non-negative number or null`);
}

export function validateAdapterResult(value: unknown, candidateNames: Set<string>): AdapterResult {
  assert(isRecord(value), "adapter must return a JSON object");
  allowedKeys(
    value,
    ["protocol_version", "outcome", "selected_skills", "usage", "model_latency_ms", "semantic_outcome", "tool_calls"],
    ["trace_id"],
    "adapter result",
  );
  assert(value.protocol_version === 1, "adapter result must use protocol_version 1");
  assert(typeof value.outcome === "string" && adapterOutcomes.has(value.outcome as AdapterOutcome), `adapter returned unknown outcome ${String(value.outcome)}`);
  const selectedSkills = stringList(value.selected_skills, "selected_skills", 0);
  const unknown = selectedSkills.filter((name) => !candidateNames.has(name));
  assert(unknown.length === 0, `adapter selected unknown skills: ${unknown.join(", ")}`);

  assert(isRecord(value.usage), "adapter must report usage provenance");
  exactKeys(value.usage, ["source", "input_tokens", "output_tokens", "total_tokens"], "usage");
  assert(typeof value.usage.source === "string" && usageSources.has(value.usage.source as UsageSource), `adapter returned unknown usage source ${String(value.usage.source)}`);
  nullableCount(value.usage.input_tokens, "usage.input_tokens");
  nullableCount(value.usage.output_tokens, "usage.output_tokens");
  nullableCount(value.usage.total_tokens, "usage.total_tokens");
  if (value.usage.source === "unavailable") {
    assert(
      value.usage.input_tokens === null && value.usage.output_tokens === null && value.usage.total_tokens === null,
      "unavailable usage must use null token counts",
    );
  }
  if (value.usage.input_tokens !== null && value.usage.output_tokens !== null && value.usage.total_tokens !== null) {
    assert(
      value.usage.input_tokens + value.usage.output_tokens === value.usage.total_tokens,
      "usage.total_tokens must equal input_tokens plus output_tokens",
    );
  }

  nullableDuration(value.model_latency_ms, "model_latency_ms");
  assert(
    typeof value.semantic_outcome === "string" && semanticOutcomes.has(value.semantic_outcome as SemanticOutcome),
    `adapter returned unknown semantic_outcome ${String(value.semantic_outcome)}`,
  );
  assert(Array.isArray(value.tool_calls), "adapter tool_calls must be an array");
  const toolCalls = value.tool_calls.map((call, index): AdapterToolCall => {
    assert(isRecord(call), `tool_calls[${index}] must be an object`);
    exactKeys(call, ["name", "latency_ms", "outcome"], `tool_calls[${index}]`);
    const name = nonemptyString(call.name, `tool_calls[${index}].name`);
    nullableDuration(call.latency_ms, `tool_calls[${index}].latency_ms`);
    assert(typeof call.outcome === "string" && toolOutcomes.has(call.outcome as ToolOutcome), `tool_calls[${index}] has unknown outcome ${String(call.outcome)}`);
    return { name, latency_ms: call.latency_ms, outcome: call.outcome as ToolOutcome };
  });
  if (value.trace_id !== undefined) nonemptyString(value.trace_id, "trace_id");

  return {
    protocol_version: 1,
    outcome: value.outcome as AdapterOutcome,
    selected_skills: selectedSkills,
    usage: {
      source: value.usage.source as UsageSource,
      input_tokens: value.usage.input_tokens,
      output_tokens: value.usage.output_tokens,
      total_tokens: value.usage.total_tokens,
    },
    model_latency_ms: value.model_latency_ms,
    semantic_outcome: value.semantic_outcome as SemanticOutcome,
    tool_calls: toolCalls,
    ...(value.trace_id === undefined ? {} : { trace_id: value.trace_id as string }),
  };
}

export function scoreRoutingResult(testCase: RoutingCase, result: AdapterResult): { passed: boolean; reason?: string } {
  const expected = new Set(testCase.expectation.skills);
  const selected = new Set(result.selected_skills);
  let passed = false;
  let reason: string | undefined;

  switch (testCase.expectation.mode) {
    case "include":
      passed = result.outcome === "selected" && [...expected].every((name) => selected.has(name));
      reason = passed ? undefined : `expected selection to include ${[...expected].join(", ")}`;
      break;
    case "exclude":
      passed = result.outcome !== "error" && [...expected].every((name) => !selected.has(name));
      reason = passed ? undefined : `expected selection to exclude ${[...expected].join(", ")}`;
      break;
    case "include_or_clarify":
      passed = result.outcome === "clarified" || [...expected].every((name) => selected.has(name));
      reason = passed ? undefined : `expected clarification or selection of ${[...expected].join(", ")}`;
      break;
    case "exact":
      passed = result.outcome === "selected" && selected.size === expected.size && [...expected].every((name) => selected.has(name));
      reason = passed ? undefined : `expected exact selection ${[...expected].join(", ")}`;
      break;
  }
  return { passed, ...(reason ? { reason } : {}) };
}

function adapterFailure(error: unknown): AdapterResult {
  return {
    protocol_version: 1,
    outcome: "error",
    selected_skills: [],
    usage: { source: "unavailable", input_tokens: null, output_tokens: null, total_tokens: null },
    model_latency_ms: null,
    semantic_outcome: "failure",
    tool_calls: [],
    error_kind: error instanceof Error && error.name ? error.name : "AdapterError",
  };
}

export async function runEvaluation({
  suite,
  cases = suite.cases,
  invoke,
  metadata,
  repetitions = 1,
  runId = randomUUID(),
}: {
  suite: RoutingSuite;
  cases?: RoutingCase[];
  invoke: (request: AdapterRequest) => Promise<unknown>;
  metadata: EvaluationMetadata;
  repetitions?: number;
  runId?: string;
}): Promise<{ runId: string; records: EvaluationRecord[] }> {
  assert(Number.isInteger(repetitions) && repetitions >= 1, "repetitions must be a positive integer");
  const candidateNames = new Set(suite.skills.map((skill) => skill.name));
  const records: EvaluationRecord[] = [];

  for (const testCase of cases) {
    for (let repetition = 1; repetition <= repetitions; repetition += 1) {
      const startedAt = new Date();
      const started = performance.now();
      let observed: AdapterResult;
      let adapterError = false;
      try {
        observed = validateAdapterResult(await invoke({
          protocol_version: 1,
          run_id: runId,
          case: testCase,
          repetition,
          candidate_catalog: suite.skills,
          metadata,
        }), candidateNames);
      } catch (error) {
        adapterError = true;
        observed = adapterFailure(error);
      }
      const score = adapterError
        ? { passed: false, reason: "adapter execution failed" }
        : scoreRoutingResult(testCase, observed);
      records.push({
        record_type: "case",
        schema_version: 1,
        run_id: runId,
        case_id: testCase.id,
        case_type: testCase.case_type,
        target: testCase.target,
        repetition,
        prompt: testCase.prompt,
        expectation: testCase.expectation,
        observed,
        passed: score.passed,
        ...(score.reason ? { failure_reason: score.reason } : {}),
        metadata,
        started_at: startedAt.toISOString(),
        completed_at: new Date().toISOString(),
        wall_time_ms: Math.round((performance.now() - started) * 1000) / 1000,
      });
    }
  }
  return { runId, records };
}

export function summarizeResults(records: EvaluationRecord[], runId: string): Record<string, unknown> {
  const passed = records.filter((record) => record.passed).length;
  const adapterErrors = records.filter((record) => record.observed.outcome === "error").length;
  const knownUsage = records.filter((record) => record.observed.usage.total_tokens !== null);
  const knownLatency = records.filter((record) => record.observed.model_latency_ms !== null);
  const toolCalls = records.flatMap((record) => record.observed.tool_calls);
  const knownToolLatency = toolCalls.filter((call) => call.latency_ms !== null);
  const sum = (values: number[]): number => Math.round(values.reduce((total, value) => total + value, 0) * 1000) / 1000;

  return {
    record_type: "summary",
    schema_version: 1,
    run_id: runId,
    cases: records.length,
    passed,
    failed: records.length - passed,
    pass_rate: records.length === 0 ? 0 : passed / records.length,
    adapter_errors: adapterErrors,
    tokens: {
      total: knownUsage.reduce((total, record) => total + (record.observed.usage.total_tokens ?? 0), 0),
      recorded_runs: knownUsage.length,
      unavailable_runs: records.length - knownUsage.length,
    },
    latency_ms: {
      wall_total: sum(records.map((record) => record.wall_time_ms)),
      model_total: sum(knownLatency.map((record) => record.observed.model_latency_ms ?? 0)),
      model_recorded_runs: knownLatency.length,
      model_unavailable_runs: records.length - knownLatency.length,
    },
    tool_calls: {
      total: toolCalls.length,
      latency_total: sum(knownToolLatency.map((call) => call.latency_ms ?? 0)),
      latency_recorded_calls: knownToolLatency.length,
      latency_unavailable_calls: toolCalls.length - knownToolLatency.length,
    },
  };
}
