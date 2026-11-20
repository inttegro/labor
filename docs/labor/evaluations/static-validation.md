---
title: Validate the corpus
sidebarTitle: Static validation
description: Check all 22 skills and 78 routing cases locally before running a host evaluation.
---

Start with static validation whenever you change a skill description, routing case, or catalog entry. The check uses the files in the repository and makes no provider call.

## Clone and install

```bash
git clone https://github.com/inttegro/labor.git
cd labor
npm ci
```

## Run the validator

```bash
npm run validate:routing
```

The current release should report:

```text
Validated 22 skills with 78 routing cases.
positive=22 negative=22 ambiguous=22 overlap=12
```

## What gets checked

The validator reads names and descriptions from the current `SKILL.md` files, then checks:

- coverage for every published skill;
- references to known catalog names;
- unique prompts; and
- valid expectations for each case type.

## Run the full repository check

```bash
npm run check
```

This command adds TypeScript checks, skill and documentation validation, and deterministic tests for the published utilities.

## Test a host next

A passing result confirms that the versioned corpus is complete and internally consistent. Continue to [Run the routing suite](/labor/evaluations/run-routing) to measure an agent host.
