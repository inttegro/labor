---
title: Contribute to Labor
sidebarTitle: Contributing
description: Propose a portable skill, evaluation, tool, or example and prove that it meets Labor's public boundary.
---

Good contributions improve a maintained artifact, generalize a proven workflow, expose a meaningful evaluation failure, or add deterministic validation.

Open an issue before starting a large package or architectural change so maintainers can agree on the public boundary and maintenance plan.

## Prepare the change

1. Fork or clone [`inttegro/labor`](https://github.com/inttegro/labor).
2. Create a focused branch.
3. Make the smallest coherent change.
4. Update catalog, routing, provenance, and license files when the artifact requires them.
5. Run:

```bash
npm ci
npm run check
```

## Open the pull request

Explain:

- the behavior being added or changed;
- why the artifact belongs in a public, product-independent repository;
- any security or redistribution implications; and
- the validation you performed.

Never include credentials, customer information, production exports, private source, or internal operating policy.

Read [`CONTRIBUTING.md`](https://github.com/inttegro/labor/blob/master/CONTRIBUTING.md) for the full skill and evaluation requirements.
