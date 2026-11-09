# Skill provenance

Labor records where every published skill came from. “Adapted” includes copied or derived material even when Labor changed names, structure, wording, metadata, or platform terminology. Those changes do not convert third-party work into original Inttegro authorship.

The machine-readable source of truth is [`skill-provenance.json`](skill-provenance.json). Repository validation requires one record for every skill.

## Third-party-derived skills

| Labor skill | Upstream origin | Relationship | License preserved |
| --- | --- | --- | --- |
| [`animation-vocabulary`](skills/animation-vocabulary) | Emil Kowalski, [`emilkowalski/skills/skills/animation-vocabulary`](https://github.com/emilkowalski/skills/tree/main/skills/animation-vocabulary) | Adapted copy. Labor changed packaging and invocation guidance while retaining substantial upstream glossary material. | [MIT notice](skills/animation-vocabulary/LICENSE) |
| [`fluid-interface-design`](skills/fluid-interface-design) | Emil Kowalski, [`emilkowalski/skills/skills/apple-design`](https://github.com/emilkowalski/skills/tree/main/skills/apple-design) | Derived rewrite. Labor generalized and substantially rewrote the upstream `apple-design` skill, but the upstream skill remains part of its origin. | [MIT notice](skills/fluid-interface-design/LICENSE) |
| [`improve-animations`](skills/improve-animations) | Emil Kowalski, [`emilkowalski/skills/skills/improve-animations`](https://github.com/emilkowalski/skills/tree/main/skills/improve-animations) | Adapted copy. Labor reorganized companion files and modified the workflow while retaining the upstream audit-then-plan design and substantial guidance. | [MIT notice](skills/improve-animations/LICENSE) |
| [`security-audit`](skills/security-audit) | Cloudflare, [`cloudflare/security-audit-skill`](https://github.com/cloudflare/security-audit-skill/tree/main/skills/security-audit) | Adapted copy. Labor reorganized the upstream files and added packaging metadata while retaining the core workflow and substantial guidance. | [MIT notice](skills/security-audit/LICENSE) |

The original import ledger records the three Emil Kowalski skills above with `sourceType: github` and source `emilkowalski/skills`; it does not record whether the installer was launched through skills.sh or directly. The precise imported upstream revision was not recorded, so Labor does not substitute a later commit hash. The Cloudflare skill was traced by direct source comparison; its precise imported revision was likewise not recorded.

## Inttegro-authored skills

These skills were not imported from skills.sh or another GitHub skill package. “Original synthesis” means Inttegro authored the skill from cited public documentation; it does not claim ownership of the underlying platform documentation, trademarks, or ideas.

| Skill | Origin |
| --- | --- |
| [`apple-charts`](skills/apple-charts) | Inttegro-authored synthesis of cited Apple Developer chart guidance and Swift Charts material. |
| [`apple-hig-components`](skills/apple-hig-components) | Inttegro-authored synthesis of the official Apple HIG Components documentation. |
| [`apple-hig-foundations`](skills/apple-hig-foundations) | Inttegro-authored synthesis of the official Apple HIG Foundations documentation. |
| [`apple-hig-getting-started`](skills/apple-hig-getting-started) | Inttegro-authored synthesis of the official Apple HIG Getting Started documentation. |
| [`apple-hig-inputs`](skills/apple-hig-inputs) | Inttegro-authored synthesis of the official Apple HIG Inputs documentation. |
| [`apple-hig-patterns`](skills/apple-hig-patterns) | Inttegro-authored synthesis of the official Apple HIG Patterns documentation. |
| [`apple-hig-technologies`](skills/apple-hig-technologies) | Inttegro-authored synthesis of the official Apple HIG Technologies documentation. |
| [`apple-sheets`](skills/apple-sheets) | Inttegro-authored synthesis of cited Apple sheet, action-sheet, and presentation guidance. |
| [`batch-commit`](skills/batch-commit) | Inttegro-authored workflow originating in the Commerce codebase. |
| [`git-change-control`](skills/git-change-control) | Inttegro-authored generalization of Inttegro's shared-checkout and change-control practice. |
| [`marketing-art-direction`](skills/marketing-art-direction) | Inttegro-authored marketing direction workflow; public influences are cited inside its references. |
| [`marketing-product-media`](skills/marketing-product-media) | Inttegro-authored product-media direction workflow. |
| [`marketing-reference-forensics`](skills/marketing-reference-forensics) | Inttegro-authored public-reference research workflow. |
| [`marketing-visual-qa`](skills/marketing-visual-qa) | Inttegro-authored visual acceptance workflow. |
| [`message-delivery-integrity`](skills/message-delivery-integrity) | Inttegro-authored generalization of messaging and delivery-evidence practice. |
| [`product-marketing-personas`](skills/product-marketing-personas) | Inttegro-authored generalization of internally maintained marketing-copy workflows, calibrated against public marketing material. |
| [`production-verification`](skills/production-verification) | Inttegro-authored generalization of production-evidence and incident-verification practice. |
| [`systems-builder-writing`](skills/systems-builder-writing) | Inttegro-authored generalization of internal systems-writing guidance. |

## License boundary

The root [MIT License](LICENSE) covers Inttegro-authored material and Inttegro's modifications. A third-party-derived skill also carries its upstream notice inside its own directory so that independently installing that skill preserves the required attribution.

If new evidence changes an origin classification, correct both this ledger and `skill-provenance.json` before publishing another release.
