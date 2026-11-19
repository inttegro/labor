---
title: Install Labor
sidebarTitle: Install
description: Add the Labor collection to a skill-aware agent host, or install only the workflow you need.
---

Labor publishes standard `SKILL.md` packages through [skills.sh](https://skills.sh/inttegro/labor). You can install the full collection or one skill.

## Prerequisites

- Node.js with `npx`
- An agent host that supports installable skills

## Install all skills

Run:

```bash
npx skills add inttegro/labor
```

The installer lets you choose the agent hosts that should receive the collection.

## Install one skill

Use the skill's lowercase catalog name:

```bash
npx skills add inttegro/labor --skill systems-builder-writing
```

Replace `systems-builder-writing` with any name from the [skill catalog](/labor/skills).

## Use the installed skill

Name the skill when you want deterministic routing:

```text
Use systems-builder-writing to revise this technical announcement.
```

Or describe the task normally. A compatible host can use the skill's description to decide whether it applies.

<Note>
  Installation makes the instructions available to your host. It does not grant Labor access to your code, accounts, credentials, or agent conversations.
</Note>

## Update the collection

Run the same install command again to fetch the current published files. Review changes before updating any environment where skill instructions affect consequential work.
