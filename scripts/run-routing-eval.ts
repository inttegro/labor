#!/usr/bin/env node

import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { chmod, lstat, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  loadRoutingSuite,
  runEvaluation,
  summarizeResults,
  type AdapterRequest,
  type EvaluationMetadata,
  type RoutingCase,
} from "./routing-eval.ts";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const maximumAdapterOutputBytes = 1024 * 1024;

const help = `Labor routing evaluations

Usage:
  npm run eval:routing -- --adapter COMMAND --provider NAME --model NAME \\
    --host NAME --host-version VERSION --catalog-revision SHA \\
    --execution-region REGION [options]

Required options:
  --adapter COMMAND           Executable adapter that reads one JSON request on stdin
  --provider NAME             Model provider recorded in every result
  --model NAME                Model identifier recorded in every result
  --host NAME                 Agent host or harness name
  --host-version VERSION      Agent host or harness version
  --catalog-revision SHA      Evaluated Labor revision
  --execution-region REGION   Provider or runner region, or "not_recorded"

Options:
  --adapter-arg VALUE         Pass one argument to the adapter; repeat as needed
  --root PATH                 Alternate Labor source root (default: repository root)
  --corpus PATH               Routing corpus (default: <root>/evals/routing.json)
  --output PATH               Write JSONL to a file instead of stdout
  --locale LOCALE             Evaluation locale (default: runtime locale)
  --repetitions N             Runs per case, 1-20 (default: 1)
  --timeout MS                Per-case adapter timeout, 100-300000 (default: 120000)
  --case-type TYPE            positive, negative, ambiguous, or overlap; repeat as needed
  --skill NAME                Include cases targeting or expecting this skill; repeat as needed
  --limit N                   Run only the first N filtered cases
  --minimum-score RATE        Exit nonzero below this 0-1 pass rate (default: 1)
  --run-id ID                 Supply a run identifier (default: generated UUID)
  --help                      Show this help

The adapter protocol and result-safety requirements are documented in
evals/README.md. Adapter stderr is not copied into result artifacts.`;

interface CliOptions {
  help?: boolean;
  adapter?: string;
  adapterArgs: string[];
  provider?: string;
  model?: string;
  host?: string;
  hostVersion?: string;
  catalogRevision?: string;
  executionRegion?: string;
  root: string;
  corpusPath?: string;
  output?: string;
  locale: string;
  runId?: string;
  repetitions: number;
  timeoutMs: number;
  caseTypes: string[];
  skills: string[];
  limit?: number;
  minimumScore: number;
}

function requiredValue(args: string[], index: number, option: string, allowOption = false): string {
  const value = args[index + 1];
  if (!value || (!allowOption && value.startsWith("--"))) throw new Error(`${option} requires a value`);
  return value;
}

function integer(value: string, option: string, minimum: number, maximum: number): number {
  const result = Number(value);
  if (!Number.isInteger(result) || result < minimum || result > maximum) {
    throw new Error(`${option} must be an integer between ${minimum} and ${maximum}`);
  }
  return result;
}

export function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    adapterArgs: [],
    root: packageRoot,
    locale: Intl.DateTimeFormat().resolvedOptions().locale || "und",
    repetitions: 1,
    timeoutMs: 120_000,
    caseTypes: [],
    skills: [],
    minimumScore: 1,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]!;
    if (argument === "--help") {
      options.help = true;
      continue;
    }
    const stringOptions = new Map<keyof CliOptions, string>([
      ["adapter", "--adapter"],
      ["provider", "--provider"],
      ["model", "--model"],
      ["host", "--host"],
      ["hostVersion", "--host-version"],
      ["catalogRevision", "--catalog-revision"],
      ["executionRegion", "--execution-region"],
      ["root", "--root"],
      ["corpusPath", "--corpus"],
      ["output", "--output"],
      ["locale", "--locale"],
      ["runId", "--run-id"],
    ]);
    const matched = [...stringOptions.entries()].find(([, flag]) => flag === argument);
    if (matched) {
      const [field] = matched;
      (options as unknown as Record<string, unknown>)[field] = requiredValue(args, index, argument);
      index += 1;
      continue;
    }
    if (argument === "--adapter-arg") {
      options.adapterArgs.push(requiredValue(args, index, argument, true));
      index += 1;
      continue;
    }
    if (argument === "--case-type") {
      const value = requiredValue(args, index, argument);
      if (!new Set(["positive", "negative", "ambiguous", "overlap"]).has(value)) throw new Error(`unknown case type ${value}`);
      options.caseTypes.push(value);
      index += 1;
      continue;
    }
    if (argument === "--skill") {
      options.skills.push(requiredValue(args, index, argument));
      index += 1;
      continue;
    }
    if (argument === "--repetitions") {
      options.repetitions = integer(requiredValue(args, index, argument), argument, 1, 20);
      index += 1;
      continue;
    }
    if (argument === "--timeout") {
      options.timeoutMs = integer(requiredValue(args, index, argument), argument, 100, 300_000);
      index += 1;
      continue;
    }
    if (argument === "--limit") {
      options.limit = integer(requiredValue(args, index, argument), argument, 1, 100_000);
      index += 1;
      continue;
    }
    if (argument === "--minimum-score") {
      options.minimumScore = Number(requiredValue(args, index, argument));
      if (!Number.isFinite(options.minimumScore) || options.minimumScore < 0 || options.minimumScore > 1) {
        throw new Error("--minimum-score must be between 0 and 1");
      }
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }
  return options;
}

function requiredMetadata(options: CliOptions): EvaluationMetadata {
  const fields: Array<[keyof CliOptions, string]> = [
    ["adapter", "--adapter"],
    ["provider", "--provider"],
    ["model", "--model"],
    ["host", "--host"],
    ["hostVersion", "--host-version"],
    ["catalogRevision", "--catalog-revision"],
    ["executionRegion", "--execution-region"],
  ];
  for (const [field, flag] of fields) {
    if (!options[field]) throw new Error(`${flag} is required`);
  }
  return {
    provider: options.provider!,
    model: options.model!,
    host: options.host!,
    host_version: options.hostVersion!,
    catalog_revision: options.catalogRevision!,
    locale: options.locale,
    execution_region: options.executionRegion!,
  };
}

function selectCases(cases: RoutingCase[], options: CliOptions): RoutingCase[] {
  const caseTypes = new Set(options.caseTypes);
  const skills = new Set(options.skills);
  const selected = cases.filter((testCase) => {
    if (caseTypes.size && !caseTypes.has(testCase.case_type)) return false;
    if (skills.size) {
      const names = new Set([testCase.target, ...testCase.expectation.skills].filter((name): name is string => Boolean(name)));
      if (![...skills].some((name) => names.has(name))) return false;
    }
    return true;
  });
  return options.limit ? selected.slice(0, options.limit) : selected;
}

export function createProcessAdapter({
  command,
  args,
  timeoutMs,
}: {
  command: string;
  args: string[];
  timeoutMs: number;
}): (request: AdapterRequest) => Promise<unknown> {
  return async (request: AdapterRequest): Promise<unknown> => await new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, { stdio: ["pipe", "pipe", "pipe"] });
    const stdout: Buffer[] = [];
    let stdoutBytes = 0;
    let settled = false;
    const finish = (callback: () => void): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      callback();
    };
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      finish(() => rejectPromise(new Error(`adapter exceeded ${timeoutMs}ms timeout`)));
    }, timeoutMs);

    child.on("error", (error) => finish(() => rejectPromise(error)));
    child.stdout.on("data", (chunk: Buffer) => {
      stdoutBytes += chunk.length;
      if (stdoutBytes > maximumAdapterOutputBytes) {
        child.kill("SIGKILL");
        finish(() => rejectPromise(new Error("adapter output exceeded 1 MiB")));
        return;
      }
      stdout.push(chunk);
    });
    child.stderr.pipe(process.stderr, { end: false });
    child.on("close", (code, signal) => finish(() => {
      if (code !== 0) {
        rejectPromise(new Error(`adapter exited with ${signal ? `signal ${signal}` : `code ${String(code)}`}`));
        return;
      }
      const source = Buffer.concat(stdout).toString("utf8").trim();
      if (!source) {
        rejectPromise(new Error("adapter returned no JSON result"));
        return;
      }
      try {
        resolvePromise(JSON.parse(source) as unknown);
      } catch {
        rejectPromise(new Error("adapter returned invalid JSON"));
      }
    }));
    child.stdin.on("error", (error) => finish(() => rejectPromise(error)));
    child.stdin.end(`${JSON.stringify(request)}\n`);
  });
}

export async function main(args: string[]): Promise<void> {
  const options = parseArgs(args);
  if (options.help) {
    console.log(help);
    return;
  }
  const metadata = requiredMetadata(options);
  const root = resolve(options.root);
  const suite = await loadRoutingSuite({
    root,
    corpusPath: options.corpusPath ? resolve(options.corpusPath) : resolve(root, "evals", "routing.json"),
  });
  const cases = selectCases(suite.cases, options);
  if (cases.length === 0) throw new Error("No routing cases matched the selected filters");

  const runId = options.runId ?? randomUUID();
  const { records } = await runEvaluation({
    suite,
    cases,
    invoke: createProcessAdapter({ command: options.adapter!, args: options.adapterArgs, timeoutMs: options.timeoutMs }),
    metadata,
    repetitions: options.repetitions,
    runId,
  });
  const summary = summarizeResults(records, runId);
  const preamble = {
    record_type: "run",
    schema_version: 1,
    run_id: runId,
    corpus: suite.corpus,
    skill_count: suite.skills.length,
    case_count: cases.length,
    repetitions: options.repetitions,
    metadata,
  };
  const jsonl = [preamble, ...records, summary].map((record) => JSON.stringify(record)).join("\n") + "\n";

  if (options.output) {
    const output = resolve(options.output);
    await mkdir(dirname(output), { recursive: true });
    const existing = await lstat(output).catch(() => null);
    if (existing?.isSymbolicLink()) throw new Error("refusing to write an evaluation artifact through a symbolic link");
    await writeFile(output, jsonl, { encoding: "utf8", mode: 0o600 });
    await chmod(output, 0o600);
    console.error(`Wrote ${records.length} routing results to ${output}`);
  } else {
    process.stdout.write(jsonl);
  }

  const caseCount = summary.cases as number;
  const passed = summary.passed as number;
  const passRate = summary.pass_rate as number;
  const adapterErrors = summary.adapter_errors as number;
  console.error(`${passed}/${caseCount} passed (${(passRate * 100).toFixed(1)}%)`);
  if (passRate < options.minimumScore || adapterErrors > 0) process.exitCode = 1;
}

const direct = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  await main(process.argv.slice(2)).catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
