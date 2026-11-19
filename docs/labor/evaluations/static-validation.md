---
title: Validate the routing corpus
sidebarTitle: Static validation
description: Check every published skill and routing case without provider credentials or model calls.
---

## Clone and install

```bash
git clone https://github.com/inttegro/labor.git
cd labor
npm ci
```

## Validate routing

```bash
npm run validate:routing
```

The current release reports:

```text
Validated 22 skills with 78 routing cases.
positive=22 negative=22 ambiguous=22 overlap=12
```

The validator loads names and descriptions from the current `SKILL.md` files and rejects missing cases, unknown skills, duplicate prompts, and malformed expectations.

## Run the full repository check

```bash
npm run check
```

This adds TypeScript checks, skill and documentation validation, and deterministic tests for the published utilities.

## Interpret the result correctly

Passing static validation means the versioned corpus is complete and internally consistent. To measure a model or host, continue to [Run the routing suite](/labor/evaluations/run-routing).
