---
title: Adapter protocol
sidebarTitle: Adapter protocol
description: Implement the versioned standard-input and standard-output contract used by the Labor routing runner.
---

An adapter connects Labor's provider-neutral runner to a particular agent host or model classifier.

## Request

The adapter receives one JSON object on standard input:

```json
{
  "protocol_version": 1,
  "run_id": "3d83f98c-90b7-44ca-92ab-a5537a2d2cd5",
  "case": {
    "id": "skill:animation-vocabulary:positive:1",
    "case_type": "positive",
    "target": "animation-vocabulary",
    "prompt": "What is the animation called when a menu briefly scales past its final size and settles back?",
    "expectation": {
      "mode": "include",
      "skills": ["animation-vocabulary"]
    }
  },
  "repetition": 1,
  "candidate_catalog": [
    {
      "name": "animation-vocabulary",
      "description": "Reverse-lookup glossary for interface motion terminology.",
      "source": "skills/animation-vocabulary/SKILL.md"
    }
  ]
}
```

An adapter may exercise the host's native router or make an isolated classification call using the supplied catalog. It must not return hidden reasoning.

## Result

Write exactly one result object to standard output:

```json
{
  "protocol_version": 1,
  "outcome": "selected",
  "selected_skills": ["animation-vocabulary"],
  "usage": {
    "source": "provider",
    "input_tokens": 1220,
    "output_tokens": 48,
    "total_tokens": 1268
  },
  "model_latency_ms": 842.4,
  "semantic_outcome": "not_applicable",
  "tool_calls": [],
  "trace_id": "optional-provider-or-host-trace-id"
}
```

Use `selected`, `clarified`, `refused`, or `error` for `outcome`. If usage or latency is unavailable, record that state explicitly and use `null`; do not invent measurements.

## Keep result artifacts safe

- Keep provider keys in the adapter environment, never in arguments or results.
- Do not store hidden reasoning, customer data, private source, credentials, or production payloads.
- Use public or synthetic prompts.
- Review host-executed result artifacts before committing or publishing them.

The normative protocol and all supported fields remain in [`evals/README.md`](https://github.com/inttegro/labor/blob/master/evals/README.md).
