---
title: Use Labor skills
sidebarTitle: Using skills
description: Invoke a skill explicitly, let your host route from the description, or combine skills when the work crosses boundaries.
---

Each Labor skill has a focused trigger and a bounded workflow. The skill supplies method and constraints; your agent host supplies tools, context, and execution.

## Name a skill for predictable routing

Explicit invocation is useful when you already know the workflow you want:

```text
Use git-change-control to split these changes into logical signed commits.
```

```text
Use marketing-reference-forensics to study this public landing page.
```

## Describe the outcome normally

If your host supports automatic skill routing, you can ask for the work directly:

```text
Audit the motion across this web app and give me a prioritized implementation plan.
```

The `improve-animations` description is written to match that request while excluding narrow single-diff reviews.

## Combine skills deliberately

Some tasks cross a real boundary. For example:

```text
Use marketing-art-direction to define the page direction, then marketing-visual-qa to assess the implementation against it.
```

Do not add skills merely because they sound related. Each selected skill should change the work or its validation.

## Keep authority outside the skill

A skill does not create credentials, permissions, or consent. Your host and user still decide what files, accounts, production systems, and external actions are in scope.
