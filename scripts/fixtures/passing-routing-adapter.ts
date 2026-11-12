#!/usr/bin/env node

let source = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) source += chunk;

const request = JSON.parse(source) as {
  case: {
    expectation: {
      mode: "include" | "exclude" | "include_or_clarify" | "exact";
      skills: string[];
    };
  };
};

const selectedSkills = request.case.expectation.mode === "exclude"
  ? []
  : request.case.expectation.skills;

process.stdout.write(JSON.stringify({
  protocol_version: 1,
  outcome: "selected",
  selected_skills: selectedSkills,
  usage: {
    source: "unavailable",
    input_tokens: null,
    output_tokens: null,
    total_tokens: null,
  },
  model_latency_ms: null,
  semantic_outcome: "not_applicable",
  tool_calls: [],
}));
