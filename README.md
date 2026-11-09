# Labor

Open-source tools, skills, evals, and workflows for teams building reliable AI systems.

Labor is where Inttegro publishes work that remains useful without Inttegro products or infrastructure. Product-specific integrations belong in [`inttegro/ai`](https://github.com/inttegro/ai); internal operations, customer data, credentials, and private company policy belong in neither repository.

## Skills

### Writing and communication

| Skill | Purpose |
| --- | --- |
| [`product-marketing-personas`](skills/product-marketing-personas) | Select among growth-guide, infrastructure-strategist, and working-operator personas to build evidence-led product marketing. |
| [`systems-builder-writing`](skills/systems-builder-writing) | Write and revise clear arguments using first-principles reasoning, concrete mechanisms, and explicit uncertainty. |

### Design and interaction

| Skill | Purpose |
| --- | --- |
| [`fluid-interface-design`](skills/fluid-interface-design) | Build responsive, interruptible, physical-feeling interactions without imitating a named product's visual identity. |
| [`apple-hig-getting-started`](skills/apple-hig-getting-started) | Choose an Apple-platform strategy before selecting lower-level patterns and components. |
| [`apple-hig-foundations`](skills/apple-hig-foundations) | Apply Apple HIG guidance for accessibility, layout, type, color, materials, privacy, and motion. |
| [`apple-hig-components`](skills/apple-hig-components) | Select Apple-platform controls, navigation, presentation, status, and system components. |
| [`apple-hig-patterns`](skills/apple-hig-patterns) | Shape familiar Apple-platform workflows such as onboarding, search, loading, settings, and account management. |
| [`apple-hig-inputs`](skills/apple-hig-inputs) | Design for touch, keyboard, pointer, focus, gaze, Pencil, remotes, controllers, and device-specific input. |
| [`apple-hig-technologies`](skills/apple-hig-technologies) | Integrate Apple technologies with appropriate system UI, permissions, privacy, and lifecycle states. |
| [`apple-charts`](skills/apple-charts) | Design accessible Apple-native data visualizations and implement them with Swift Charts. |
| [`apple-sheets`](skills/apple-sheets) | Design native sheets, action sheets, popovers, detents, and modal presentation on Apple platforms. |

### Engineering workflows

| Skill | Purpose |
| --- | --- |
| [`git-change-control`](skills/git-change-control) | Isolate task-owned changes and perform auditable Git history operations without disturbing a shared dirty checkout. |

### Reliability and evaluation

| Skill | Purpose |
| --- | --- |
| [`production-verification`](skills/production-verification) | Separate source, tests, commits, deployments, configuration, and live behavior into explicit evidence levels. |
| [`message-delivery-integrity`](skills/message-delivery-integrity) | Preserve the boundary between message authoring, rendering, sending, provider acceptance, and confirmed delivery. |

Install the collection:

```bash
npx skills add inttegro/labor
```

Install one skill:

```bash
npx skills add inttegro/labor --skill systems-builder-writing
```

## Curation principles

- **Transfer the method, not the identity.** Named company or personal styles become neutral reasoning personas. Labor does not publish impersonation prompts or phrase banks.
- **Name platforms when precision requires it.** A platform, API, or framework reference may retain its proper name when that technology is the subject, with official sources and a clear independence boundary.
- **Make the artifact independently useful.** A public skill must work without Inttegro services, private context, or undocumented conventions.
- **Preserve factual boundaries.** Skills must distinguish supplied facts, observations, inferences, and time-sensitive claims.
- **Publish maintained work, not scraps.** Every artifact needs a clear trigger, useful constraints, validation, and an accountable maintenance path.
- **Keep public and private boundaries explicit.** Never publish credentials, customer information, production exports, internal endpoints, or private operating policy.

Read [the curation policy](docs/curation.md) before proposing a new skill or adapting internal work.

## Repository structure

- `skills/` — independently installable agent skills.
- `evals/` — reproducible evaluations and fixtures as they are published.
- `tools/` — standalone utilities with their own documentation and tests.
- `examples/` — small, runnable examples using public interfaces.
- `docs/` — curation, contribution, and design notes.
- `scripts/` — repository validation and maintenance utilities.

Directories appear when they contain a maintained artifact; Labor does not keep empty category placeholders.

## Development

Validate the catalog and every skill:

```bash
node scripts/validate-skills.mjs
```

See [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a change. Security issues should be reported privately as described in [SECURITY.md](SECURITY.md).

## License

Unless a subdirectory says otherwise, this repository is available under the [MIT License](LICENSE).

Apple, its platforms, and related product names are trademarks of Apple Inc. Labor is an independent project and is not affiliated with or endorsed by Apple.
