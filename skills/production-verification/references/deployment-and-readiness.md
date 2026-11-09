# Deployment and readiness

## Deployment verification

For each affected service, establish:

- intended commit SHA and branch;
- remote ref containing that SHA;
- CI or build result tied to the SHA;
- platform deployment or revision identifier;
- runtime environment and configuration source;
- migration or schema state;
- health and focused live smoke behavior.

Do not infer the deployed SHA from local `HEAD`. Do not infer runtime configuration from repository files when the platform can override them.

## Readiness and certification

Evaluate separately:

- functional scope implemented;
- focused validation passed;
- wider regression-suite status;
- infrastructure and secrets provisioned;
- external account approvals and capabilities;
- migrations and compatibility complete;
- monitoring, retries, reconciliation, rollback, and recovery available;
- deployed smoke tests and live evidence complete.

A feature may be complete enough to freeze while production certification remains pending. Say so directly.

## Environmental limits

Toolchain absence, network restrictions, missing account access, or disk exhaustion are verification limits. They are not product failures and not passing evidence. Record the exact blocked check and the narrower checks that did pass.

## Report shape

- **Confirmed:** facts directly supported by current evidence.
- **Not confirmed:** deployment, provider, migration, or behavior claims still open.
- **Validation:** exact tests, builds, and live checks completed.
- **Next proof:** the smallest check needed to reach the next evidence level.
- **Mutation boundary:** any action that still requires authorization.
