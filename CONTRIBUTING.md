# Contributing

Thanks for helping make Labor useful to teams building AI systems.

## Good contributions

- Improve an existing skill, eval, tool, or example.
- Generalize a proven workflow without carrying over private dependencies.
- Add an evaluation that exposes a meaningful behavioral failure.
- Fix unsafe, ambiguous, overly broad, or unreliable instructions.
- Add deterministic validation for a repeated operation.

Open an issue before starting a large package or architectural change so the public boundary and maintenance plan are clear.

## Skill contributions

Each skill lives at `skills/<skill-name>/SKILL.md` and must:

- use a lowercase, hyphenated name matching its directory;
- have a discriminating description that says when it applies;
- include only guidance that materially changes agent behavior;
- keep substantial conditional detail in linked references;
- avoid named-company or named-person imitation;
- avoid private services, data, paths, credentials, and operating policy;
- include `agents/openai.yaml` with consistent interface metadata.
- declare its origin in `skill-provenance.json`;
- name and link every third-party skill package from which it copies or adapts material;
- preserve the upstream copyright and license notice inside its own directory when it contains a substantial third-party copy or adaptation.

Add the skill to the appropriate group in `skills.sh.json`, the catalog in `README.md`, and the human-readable ledger in `PROVENANCE.md`.

## Evaluation contributions

Routing evaluations live in `evals/routing.json`. Every published skill must
have at least one positive, negative, and ambiguous prompt. Add an exact overlap
case when a realistic request should use multiple skills together.

Evaluation prompts must be public or synthetic, exercise a meaningful behavior
or boundary, and avoid credentials, customer information, production exports,
private source, and hidden reasoning. Keep provider-specific adapters and
host-executed result artifacts out of the repository unless their publication
purpose and contents have been explicitly reviewed.

Run `npm run validate:routing` after editing the corpus. Static validation
establishes that the contract is complete and internally consistent; it is not
evidence that a model or host passed the suite. See [the evaluation
protocol](evals/README.md) for execution and scoring.

## Development workflow

1. Fork or clone the repository.
2. Create a focused branch.
3. Make the smallest coherent change.
4. Run:

   ```bash
   npm ci
   npm run check
   ```

5. Open a pull request explaining the behavior, public-boundary decision, security impact, and verification performed.

Never commit credentials, access tokens, production exports, customer information, or private source copied from another repository.

By contributing, you agree that your contribution is licensed under this repository's MIT License unless the affected subdirectory states otherwise.
