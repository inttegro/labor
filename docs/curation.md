# Curation policy

Labor publishes reusable AI engineering work, not a mirror of Inttegro's internal configuration.

## Admission test

An artifact belongs in Labor when all of the following are true:

1. A team can use it without access to Inttegro products, private repositories, credentials, or customer data.
2. Its behavior and limits can be explained from public information.
3. It has a concrete use case, a discoverable trigger, and a maintained validation path.
4. Publishing it does not expose private operations, security controls, production topology, or personal information.
5. Its expected benefit is larger than its maintenance and misuse surface.

Product-specific integrations belong in [`inttegro/ai`](https://github.com/inttegro/ai). Internal-only workflows remain in their owning private repository.

## Generalizing an internal skill

### Preserve

- the decision model;
- non-obvious constraints and safety boundaries;
- evidence discipline;
- useful workflows, rubrics, and deterministic helpers;
- failure modes that generalize beyond the source project.

### Remove or replace

- company, repository, service, and employee names that are not necessary to the subject;
- private paths, endpoints, schemas, and operating policy;
- customer examples and production data;
- instructions that assume an Inttegro-only tool or permission;
- temporary fixes presented as universal rules.

### Convert style sources into personas

A skill may encode a transferable way of reasoning, but it must not ask an agent to impersonate a real person or company.

Replace a named style with:

- a neutral persona name;
- the audience and situation where the persona helps;
- the persona's reasoning sequence;
- observable writing or decision behavior;
- explicit failure modes and factual limits.

Do not copy recognisable language, slogans, verbal tics, or personal biography. A persona should remain useful when the reader has never heard of its source material.

### Keep necessary platform names

A company or product name may remain when the technology itself is the subject, such as guidance for a named operating system, API, framework, or protocol. This is technical precision, not a style persona.

For platform-reference skills:

- use primary, official sources;
- paraphrase guidance instead of reproducing source prose;
- distinguish platform requirements from transferable design principles;
- include a clear independence and non-endorsement boundary;
- record the source-review date when behavior or policy can change;
- generalize portable methods into a separate neutral skill when they do not require that platform.

## Categories

- **Writing and communication** — argument, voice, product narrative, documentation, and messaging.
- **Design and interaction** — visual direction, motion, interface behavior, and quality review.
- **Engineering workflows** — codebase analysis, change control, testing, and developer productivity.
- **Reliability and evaluation** — production evidence, security, evals, incident reasoning, and delivery integrity.
- **Agent infrastructure** — tool protocols, orchestration, packaging, and reusable agent utilities.

Categories organize discovery; skill directories remain flat under `skills/` for straightforward installation.

## Publication bar

Before publication, confirm that:

- the name and description route only relevant requests;
- the entrypoint is concise and supporting detail is progressively disclosed;
- every linked reference or script exists;
- examples contain no private or identifying data;
- deterministic scripts have been executed successfully;
- the catalog passes `npm run check`, including TypeScript, skill validation, and validator tests;
- a reviewer can explain what the artifact does, does not do, and why it is public.

## Provenance and third-party material

Generalization does not erase authorship. Before publishing a skill, trace its history through local lockfiles, Git history, skills.sh, and the upstream repository as applicable.

- Record every skill in `skill-provenance.json`, including Inttegro-authored skills.
- If any material came from a skills.sh package or GitHub repository, name and link the upstream skill and repository in both `PROVENANCE.md` and the affected `SKILL.md`.
- Describe the relationship honestly: unchanged copy, adapted copy, derived rewrite, or original synthesis.
- Preserve the upstream copyright and license notice inside the independently installable skill directory whenever the license requires it.
- Do not describe copied or adapted material as independently authored merely because filenames, structure, wording, or platform metadata changed.
- If the exact imported revision was not recorded, say `not recorded`; do not substitute the current upstream revision.

Publication is blocked when provenance or redistribution rights cannot be established.
