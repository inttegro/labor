---
title: Run the routing suite
sidebarTitle: Run the suite
description: Connect your agent host, run focused or complete routing tests, and save reviewable JSONL results.
---

Connect Labor to your agent host through a small adapter process. The runner sends one versioned JSON request per case, and the adapter returns the skills selected by your host or classifier.

## Prepare an adapter

For each request, the adapter has four responsibilities:

1. Read one JSON request from standard input.
2. Evaluate the supplied prompt and candidate catalog.
3. Write exactly one JSON result to standard output.
4. Keep diagnostics on standard error.

See the [adapter protocol](/labor/evaluations/adapter-protocol) for the request and result shapes.

## Execute the suite

```bash
npm run eval:routing -- \
  --adapter node \
  --adapter-arg /absolute/path/to/your-host-adapter.mjs \
  --provider your-provider \
  --model your-model \
  --host your-host \
  --host-version your-host-version \
  --catalog-revision "$(git rev-parse HEAD)" \
  --execution-region not_recorded \
  --output /tmp/labor-routing-eval.jsonl
```

## Shape the run

- Use `--case-type`, `--skill`, or `--limit` to focus the suite.
- Use `--repetitions` to observe variance across repeated requests.
- Keep the default minimum score of `1` for a release gate.
- Set a lower minimum explicitly when you are collecting a baseline.

## Review the results

The JSONL file begins with the run configuration, includes one result for every case and repetition, and closes with a summary. Each run records model, provider, host and catalog revisions, locale, region, timing, usage provenance, selected skills, and outcome.

Keep provider credentials inside the adapter environment. Committed result artifacts should contain public or synthetic prompts and the recorded evaluation fields only.
