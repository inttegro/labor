---
title: Ask for a Labor skill
sidebarTitle: Using skills
description: Call a skill by name, describe the outcome in plain language, or combine distinct workflows.
---

Each Labor skill pairs a focused trigger with a practical workflow. Your agent host brings the tools and context needed to carry it out.

## Call it by name

Use the catalog name when you already know which workflow fits:

```text
Use git-change-control to split these changes into logical signed commits.
```

```text
Use marketing-reference-forensics to study this public landing page.
```

## Ask in plain language

With automatic skill routing, describe the result you want:

```text
Audit the motion across this web app and give me a prioritized implementation plan.
```

The `improve-animations` trigger matches a codebase-wide motion audit and keeps a single-diff review outside its scope.

## Combine distinct workflows

Some requests contain two separate jobs. Name both workflows and give each one a clear role:

```text
Use marketing-art-direction to define the page direction, then marketing-visual-qa to assess the implementation against it.
```

Use the smallest set that covers the work. Every selected skill should change either the method or the validation.

## Your host stays in control

Skills operate through the permissions and tools provided by your host. You remain in control of the files, accounts, production systems, and external actions available to the agent.
