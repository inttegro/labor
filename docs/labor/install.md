---
title: Install Labor
sidebarTitle: Install
description: Add all 22 Labor skills to a compatible agent, or start with one focused workflow.
---

Labor publishes standard `SKILL.md` packages through [skills.sh](https://skills.sh/inttegro/labor). Choose the full collection when you want broad coverage, or add one skill for a specific job.

## Prerequisites

- Node.js with `npx`
- An agent host that supports installable skills

## Install the collection

```bash
npx skills add inttegro/labor
```

Choose the agent hosts you want to update when the installer prompts you. Each selected host receives the full collection.

## Install one skill

Copy the lowercase name from the [skill catalog](/labor/skills):

```bash
npx skills add inttegro/labor --skill systems-builder-writing
```

This example installs `systems-builder-writing`. Replace it with the skill you want.

## Try the installed skill

Name the skill when you already know which workflow fits:

```text
Use systems-builder-writing to revise this technical announcement.
```

You can also describe the outcome in plain language. A compatible host can match the request to the skill description.

<Note>
  Installation copies instructions into your chosen host. Access to code, accounts, credentials, and conversations continues to follow that host's permissions.
</Note>

## Update the collection

Run the same install command again to fetch the latest published files. Review the changes before updating an agent that performs consequential work.
