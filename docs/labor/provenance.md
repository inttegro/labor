---
title: Provenance and licenses
sidebarTitle: Provenance
description: See where each Labor skill originated and which license applies to independently installed material.
---

Every Labor skill has a machine-readable origin record in `skill-provenance.json`. Repository validation requires one record for every published skill.

## Third-party-derived skills

| Labor skill | Upstream | Relationship |
| --- | --- | --- |
| `animation-vocabulary` | Emil Kowalski's `animation-vocabulary` | Adapted copy with Labor packaging and invocation guidance. |
| `fluid-interface-design` | Emil Kowalski's `apple-design` | Substantial rewrite that preserves the upstream origin. |
| `improve-animations` | Emil Kowalski's `improve-animations` | Adapted workflow with reorganized companion files. |
| `security-audit` | Cloudflare's `security-audit-skill` | Adapted workflow with TypeScript validators and Labor packaging. |

Each derived skill keeps the upstream notice inside its own directory so independently installing it preserves the required attribution.

## Inttegro-authored skills

The remaining 18 skills are Inttegro-authored workflows or original syntheses of cited public documentation. “Original synthesis” describes the skill package, not ownership of the underlying platform documentation, trademarks, or ideas.

## License boundary

The root MIT License covers Inttegro-authored material and Inttegro's modifications. Third-party-derived material retains its upstream notice.

Read the complete [provenance ledger](https://github.com/inttegro/labor/blob/master/PROVENANCE.md) or inspect the [machine-readable manifest](https://github.com/inttegro/labor/blob/master/skill-provenance.json).
