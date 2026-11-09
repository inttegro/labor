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

Add the skill to the appropriate group in `skills.sh.json` and the catalog in `README.md`.

## Development workflow

1. Fork or clone the repository.
2. Create a focused branch.
3. Make the smallest coherent change.
4. Run:

   ```bash
   node scripts/validate-skills.mjs
   ```

5. Open a pull request explaining the behavior, public-boundary decision, security impact, and verification performed.

Never commit credentials, access tokens, production exports, customer information, or private source copied from another repository.

By contributing, you agree that your contribution is licensed under this repository's MIT License unless the affected subdirectory states otherwise.
