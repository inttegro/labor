---
name: production-verification
description: Use for production incidents, deployment verification, readiness questions, provider or account-state checks, live-data investigations, migrations, backfills, and claims that a change is deployed, fixed, live, or production-ready. Build evidence across source, tests, revisions, runtime configuration, external state, and observed behavior without turning hypotheses into facts.
---

# Production Verification

Verify the exact claim the user cares about. Source code, local tests, a commit, a successful push, a deployment record, and confirmed live behavior are different evidence levels.

## Choose the relevant procedure

- For incidents, incorrect production data, or causal diagnosis, read [references/investigations.md](references/investigations.md).
- For deployment, rollout, readiness, or certification questions, read [references/deployment-and-readiness.md](references/deployment-and-readiness.md).
- For provider correspondence, capability disputes, or follow-up monitoring, read [references/provider-operations.md](references/provider-operations.md).

## Evidence ladder

Track the highest level actually proven:

1. proposed or designed;
2. implemented in the working tree;
3. focused local validation passed;
4. committed and history verified;
5. pushed to the intended remote ref;
6. built and deployed as an identified revision;
7. runtime configuration and migrations verified;
8. live behavior and resulting data reconciled.

Do not skip levels in the report. A lower level can still be useful, but label it accurately.

## Safety boundary

- Start production investigations read-only. Do not mutate records, retry transactions, backfill data, rotate credentials, alter provider settings, or deploy fixes without explicit authorization.
- Form a concrete causal path, then call it a hypothesis until records, logs, revisions, and external state confirm it.
- Treat documentation, dashboard labels, support statements, and accepted submissions as evidence about those artifacts, not automatic proof of runtime behavior.
- Keep credentials, tokens, private keys, request bodies, authorization headers, signed URLs, and unnecessary customer data out of commands, diagnostics, and reports.
- Use exact timestamps and time zones when correlating distributed systems.

## Completion standard

Report confirmed facts, remaining hypotheses, checks that could not run, required authorization, and the highest evidence level reached. Never use `done`, `fixed`, `live`, or `production-ready` when the evidence supports only implementation or local validation.
