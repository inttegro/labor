---
title: Adapter protocol
sidebarTitle: Adapter protocol
description: Connect an agent host to the Labor runner through a versioned JSON contract.
---

An adapter translates Labor's provider-neutral requests into calls your agent host or classifier can execute.

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

Use the host's native router or make an isolated classification call with the supplied catalog. Return the routing outcome and selected skills while keeping hidden reasoning inside the provider or host.

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

Use `selected`, `clarified`, `refused`, or `error` for `outcome`. Set unavailable usage or latency values to `null` and record their source state explicitly.

## Protect the result artifact

- Keep provider keys inside the adapter environment and out of arguments and results.
- Limit stored data to public or synthetic prompts and the protocol fields required for review.
- Exclude hidden reasoning, customer data, private source, credentials, and production payloads.
- Review every host-executed artifact before committing or publishing it.

See [`evals/README.md`](https://github.com/inttegro/labor/blob/master/evals/README.md) for the normative protocol and complete field reference.
