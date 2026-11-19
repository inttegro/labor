---
title: Run the routing suite
sidebarTitle: Run the suite
description: Connect a host adapter, execute focused or complete routing evaluations, and record reviewable JSONL results.
---

The runner sends one protocol-versioned JSON request per case to an adapter process. The adapter exercises your host or classifier and returns the selected skills.

## Prepare an adapter

Your adapter must:

1. read one JSON request from standard input;
2. evaluate the supplied prompt and candidate catalog;
3. write exactly one JSON result to standard output; and
4. keep diagnostics on standard error.

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

Use `--case-type`, `--skill`, or `--limit` for a focused run. Use `--repetitions` to observe variance.

The default minimum score is `1`. Lower it explicitly only when collecting a baseline rather than enforcing a release gate.

## Review the artifact

The JSONL output starts with a run record, includes one result per case and repetition, and ends with a summary. It records the model, provider, host and catalog revisions, locale, region, timing, usage provenance, selected skills, and outcome.

Provider credentials stay inside the adapter process. Labor does not require live provider access in public CI.
