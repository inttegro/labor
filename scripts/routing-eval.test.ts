import assert from "node:assert/strict";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { createProcessAdapter, parseArgs } from "./run-routing-eval.ts";
import {
  loadRoutingSuite,
  runEvaluation,
  scoreRoutingResult,
  summarizeResults,
  validateAdapterResult,
  type AdapterResult,
  type EvaluationMetadata,
  type RoutingCase,
} from "./routing-eval.ts";

const scriptsRoot = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptsRoot, "..");
const fixtureAdapter = resolve(scriptsRoot, "fixtures", "passing-routing-adapter.ts");

const metadata: EvaluationMetadata = {
  provider: "test-provider",
  model: "test-model",
  host: "test-host",
  host_version: "1",
  catalog_revision: "test-revision",
  locale: "en-US",
  execution_region: "not_recorded",
};

function result(selectedSkills: string[], outcome: AdapterResult["outcome"] = "selected"): AdapterResult {
  return {
    protocol_version: 1,
    outcome,
    selected_skills: selectedSkills,
    usage: { source: "unavailable", input_tokens: null, output_tokens: null, total_tokens: null },
    model_latency_ms: null,
    semantic_outcome: "not_applicable",
    tool_calls: [],
  };
}

test("loads every published skill and routing case", async () => {
  const suite = await loadRoutingSuite({ root: repositoryRoot });
  assert.equal(suite.counts.skills, 22);
  assert.equal(suite.counts.positive, 22);
  assert.equal(suite.counts.negative, 22);
  assert.equal(suite.counts.ambiguous, 22);
  assert.equal(suite.counts.overlap, 12);
  assert.equal(suite.cases.length, 78);
  assert.equal(suite.skills.length, 22);
  assert(suite.skills.every((skill) => skill.source === `skills/${skill.name}/SKILL.md`));
  assert(suite.skills.every((skill) => skill.description.length >= 40));
});

test("scores positive, negative, ambiguous, and overlap expectations", () => {
  const cases: RoutingCase[] = [
    {
      id: "positive",
      case_type: "positive",
      target: "one",
      prompt: "positive",
      expectation: { mode: "include", skills: ["one"] },
    },
    {
      id: "negative",
      case_type: "negative",
      target: "one",
      prompt: "negative",
      expectation: { mode: "exclude", skills: ["one"] },
    },
    {
      id: "ambiguous",
      case_type: "ambiguous",
      target: "one",
      prompt: "ambiguous",
      expectation: { mode: "include_or_clarify", skills: ["one"] },
    },
    {
      id: "overlap",
      case_type: "overlap",
      target: null,
      prompt: "overlap",
      expectation: { mode: "exact", skills: ["one", "two"] },
    },
  ];

  assert.equal(scoreRoutingResult(cases[0]!, result(["one", "two"])).passed, true);
  assert.equal(scoreRoutingResult(cases[0]!, result([])).passed, false);
  assert.equal(scoreRoutingResult(cases[1]!, result(["two"])).passed, true);
  assert.equal(scoreRoutingResult(cases[1]!, result(["one"])).passed, false);
  assert.equal(scoreRoutingResult(cases[1]!, result([], "error")).passed, false);
  assert.equal(scoreRoutingResult(cases[2]!, result([], "clarified")).passed, true);
  assert.equal(scoreRoutingResult(cases[2]!, result(["one"])).passed, true);
  assert.equal(scoreRoutingResult(cases[3]!, result(["one", "two"])).passed, true);
  assert.equal(scoreRoutingResult(cases[3]!, result(["one", "two", "three"])).passed, false);
});

test("rejects unknown skills and fabricated unavailable usage", () => {
  assert.throws(
    () => validateAdapterResult(result(["unknown"]), new Set(["known"])),
    /unknown skills/,
  );
  assert.throws(
    () => validateAdapterResult({
      ...result(["known"]),
      usage: { source: "unavailable", input_tokens: 0, output_tokens: 0, total_tokens: 0 },
    }, new Set(["known"])),
    /unavailable usage must use null token counts/,
  );
  assert.throws(
    () => validateAdapterResult({
      ...result(["known"]),
      hidden_reasoning: "must not enter an evaluation artifact",
    }, new Set(["known"])),
    /unsupported fields: hidden_reasoning/,
  );
});

test("executes a deterministic process adapter and summarizes provenance", async () => {
  const suite = await loadRoutingSuite({ root: repositoryRoot });
  const cases = [
    suite.cases.find((entry) => entry.case_type === "positive")!,
    suite.cases.find((entry) => entry.case_type === "negative")!,
    suite.cases.find((entry) => entry.case_type === "ambiguous")!,
    suite.cases.find((entry) => entry.case_type === "overlap")!,
  ];
  const { records } = await runEvaluation({
    suite,
    cases,
    invoke: createProcessAdapter({ command: process.execPath, args: [fixtureAdapter], timeoutMs: 5_000 }),
    metadata,
    repetitions: 2,
    runId: "00000000-0000-4000-8000-000000000001",
  });
  const summary = summarizeResults(records, "00000000-0000-4000-8000-000000000001");

  assert.equal(records.length, 8);
  assert(records.every((record) => record.passed));
  assert(records.every((record) => record.metadata.catalog_revision === "test-revision"));
  assert.equal(summary.cases, 8);
  assert.equal(summary.passed, 8);
  assert.equal(summary.pass_rate, 1);
  assert.equal(summary.adapter_errors, 0);
});

test("parses focused CLI options and rejects invalid scores", () => {
  const options = parseArgs([
    "--adapter", "node",
    "--adapter-arg", fixtureAdapter,
    "--provider", "test-provider",
    "--model", "test-model",
    "--host", "test-host",
    "--host-version", "1",
    "--catalog-revision", "abc123",
    "--execution-region", "not_recorded",
    "--case-type", "positive",
    "--skill", "animation-vocabulary",
    "--limit", "1",
  ]);
  assert.equal(options.adapter, "node");
  assert.deepEqual(options.caseTypes, ["positive"]);
  assert.deepEqual(options.skills, ["animation-vocabulary"]);
  assert.equal(options.limit, 1);
  assert.throws(() => parseArgs(["--minimum-score", "1.1"]), /between 0 and 1/);
});
