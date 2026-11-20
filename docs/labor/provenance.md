---
title: Provenance and licenses
sidebarTitle: Provenance
description: Trace each Labor skill to its source and see which license travels with the package.
---

Every published skill has an origin record in `skill-provenance.json`. Repository checks keep the catalog and manifest in sync.

## Adapted skills

| Labor skill | Upstream | Relationship |
| --- | --- | --- |
| `animation-vocabulary` | Emil Kowalski's `animation-vocabulary` | Adapted copy with Labor packaging and invocation guidance. |
| `fluid-interface-design` | Emil Kowalski's `apple-design` | Substantial rewrite that preserves the upstream origin. |
| `improve-animations` | Emil Kowalski's `improve-animations` | Adapted workflow with reorganized companion files. |
| `security-audit` | Cloudflare's `security-audit-skill` | Adapted workflow with TypeScript validators and Labor packaging. |

Each adapted package carries its upstream notice inside the skill directory. Attribution therefore remains present when that skill is installed on its own.

## Original Labor skills

The other 18 skills are original workflows or original syntheses of cited public documentation. The synthesis label applies to the Labor package; source documentation, trademarks, and underlying ideas remain with their respective owners.

## How the licenses apply

The repository's MIT License covers original Labor material and changes made to adapted packages. Upstream notices continue to govern third-party material where applicable.

Open the [provenance ledger](https://github.com/inttegro/labor/blob/master/PROVENANCE.md) for the full history, or inspect the [machine-readable manifest](https://github.com/inttegro/labor/blob/master/skill-provenance.json).
