# Curation policy

Labor publishes reusable agent workflows that other teams can understand, install, and validate from public materials.

## What Labor accepts

An artifact belongs in Labor when all of the following are true:

1. It solves a concrete problem beyond the project where it originated.
2. Its behavior and limits can be explained from public information.
3. It has a focused use case, a discoverable trigger, and a maintained validation path.
4. Its examples and fixtures use public or synthetic data.
5. Its source, attribution, and redistribution terms are recorded.
6. Its value justifies its maintenance and misuse surface.

## Package the reusable method

A portable package should carry everything a new user needs to apply the method:

- a focused trigger and decision model;
- practical constraints and safety boundaries;
- useful workflows, rubrics, and deterministic helpers;
- validation that a contributor can run locally; and
- failure modes that generalize beyond the source project.

Published packages stay free of credentials, personal information, private source, restricted endpoints, production exports, and temporary fixes presented as universal rules.

## Write original, attributable guidance

A writing or design skill can describe a transferable way of reasoning through observable behavior:

- the audience and situation where the method helps;
- the reasoning sequence;
- observable writing or decision behavior;
- factual limits and failure modes; and
- citations to useful public sources.

Use original language throughout the package. Slogans, verbal tics, personal biography, and imitation prompts weaken portability and create unnecessary attribution risk.

### Use platform names precisely

A company or product name belongs in a skill when its technology is the subject, such as guidance for a named operating system, API, framework, or protocol.

For platform-reference skills:

- use primary, official sources;
- explain guidance in original language;
- identify platform requirements and transferable design principles;
- state the project's independence from the platform owner;
- record the source-review date when behavior or policy can change; and
- package broadly useful methods separately when they have value beyond that platform.

## Categories

- **Writing and communication** — argument, voice, product narrative, documentation, and messaging.
- **Design and interaction** — visual direction, motion, interface behavior, and quality review.
- **Engineering workflows** — codebase analysis, change control, testing, and developer productivity.
- **Reliability and evaluation** — production evidence, security, evals, incident reasoning, and delivery integrity.
- **Agent infrastructure** — tool protocols, orchestration, packaging, and reusable agent utilities.

Categories help people browse the catalog. Skill directories remain flat under `skills/` so every package has a straightforward install path.

## Release checklist

Before publication, confirm that:

- the name and description route relevant requests;
- the entrypoint is concise and supporting detail is progressively disclosed;
- every linked reference or script exists;
- examples use public or synthetic data;
- evaluation prompts and fixtures are versioned and tied to an observable behavior or boundary;
- deterministic evaluation validation passes without provider credentials;
- deterministic scripts have been executed successfully;
- the catalog passes `npm run check`, including TypeScript, skill validation, and validator tests; and
- a reviewer can explain the artifact's purpose, scope, limits, and public value.

## Provenance and third-party material

Trace each skill through Git history, lockfiles, skills.sh, and upstream repositories as applicable.

- Record every skill in `skill-provenance.json`.
- Name and link upstream packages and repositories in both `PROVENANCE.md` and the affected `SKILL.md`.
- Describe the relationship accurately: unchanged copy, adapted copy, derived rewrite, or original synthesis.
- Preserve upstream copyright and license notices inside independently installable skill directories whenever required.
- Label copied and adapted material according to its actual relationship with the source.
- Use `not recorded` when the exact imported revision is unavailable.

Every release needs established provenance and redistribution rights.
