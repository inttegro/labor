---
title: Contribute to Labor
sidebarTitle: Contributing
description: Improve a skill, add a public evaluation, or contribute a reusable workflow to Labor.
---

Start with a problem that another team can recognize and a change they can verify. Strong contributions sharpen an existing skill, add useful validation, expose an evaluation gap, or package a reusable workflow.

For a large package or architectural change, open an issue first. This gives contributors and maintainers space to agree on scope, public value, and long-term maintenance.

## Prepare the change

1. Fork or clone [`inttegro/labor`](https://github.com/inttegro/labor).
2. Create a focused branch.
3. Build the smallest complete change.
4. Update the catalog, routing cases, provenance, and license files that describe it.
5. Run the repository checks:

```bash
npm ci
npm run check
```

## Explain the change

Explain:

- the behavior you added or changed;
- who can use it and for which job;
- any security, privacy, or redistribution considerations; and
- the checks you ran.

Use public or synthetic examples. Keep credentials, personal information, production exports, private source, and restricted operating material out of the repository.

Read [`CONTRIBUTING.md`](https://github.com/inttegro/labor/blob/master/CONTRIBUTING.md) for the complete skill and evaluation requirements.
