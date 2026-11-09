# Production investigations

## Define the symptom

Record the affected environment, account or resource scope, observed behavior, expected behavior, first and last known timestamps, and the evidence source. Avoid turning a UI symptom into a backend diagnosis before tracing the request.

## Trace a concrete path

Follow the actual path through the relevant layers:

1. user action or external event;
2. route or API request;
3. authentication and authorization;
4. service handler and domain operation;
5. persistence or queue write;
6. worker or external call;
7. webhook, reconciliation, or read model;
8. rendered user-visible result.

At each layer, identify the expected identifier and state transition. Preserve typed runtime identifiers and raw persistence identifiers according to the service contract; do not normalize identifiers globally merely to make one lookup work.

## Rank evidence

Prefer, in order:

- affected records and immutable event history;
- request, activity, audit, and worker logs correlated by stable identifiers;
- deployed revision and runtime configuration;
- external event or dashboard evidence;
- current source code;
- plausible inference.

Current source explains what may happen now, not necessarily what happened at the incident time.

## State conclusions precisely

Separate:

- confirmed facts;
- the leading causal hypothesis;
- alternative explanations;
- missing evidence;
- the smallest read-only query that would resolve uncertainty;
- any separately authorized remediation.

Do not use absence from one log stream as proof that an event never occurred. Check retention, sampling, region, service, and correlation-key boundaries first.

## Mutations and remediation

Present cleanup, replay, backfill, or corrective scripts as a separate operation. Require a dry run, explicit scope, idempotency or rollback strategy, and user authorization before execution. Reconcile resulting records after the mutation instead of relying only on command success.
