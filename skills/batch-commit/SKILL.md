---
name: batch-commit
description: Groups uncommitted changes into logical batches, stages each batch with git add, and provides a one-liner commit message for each. Use when there are many changed files that should be committed as separate logical units.
---

# Batch Commit

Groups uncommitted changes into logical batches and stages them one at a time, providing a commit message for each.

## Process

1. Run `git status --short` and `git diff --stat HEAD` to understand all pending changes.
2. Read the changed files and relevant repository instructions to understand what each change does.
3. Group related changes into logical batches (typically 3-7 batches). Group by:
   - **Feature/purpose**: files that work together for the same feature
   - **Layer**: infrastructure, services, UI, config, tests
   - **Type of change**: new files, bug fixes, refactors
4. Present ALL batches as a numbered summary with:
   - The files in each batch
   - A one-liner commit message
5. Stage the first batch with explicit paths or hunks.
6. Show the staged diff and wait for the user to commit, then stage the next batch when asked.

## Rules

- NEVER run `git commit` yourself — only `git add`
- NEVER stage files outside the agreed batch (no `git add .` or `git add -A`).
- Prefer path-specific or patch-mode staging when a file contains unrelated changes.
- Inspect `git diff --cached --check` and `git diff --cached` before handing off a batch.
- Keep commit messages concise: `<scope>: <what changed>` format
- Order batches so foundational changes come first (infra before features, libraries before consumers)
- If a file has changes that belong to multiple batches, put it in the batch where its primary change belongs
- Exclude files that look like they shouldn't be committed (`.env`, secrets, temp files) and flag them to the user
- If there are only 1-3 related files, just stage them all as one batch — don't over-split

## Commit Message Style

Follow the project's existing commit style. If no clear style exists, use:
```
<scope>: <short imperative description>
```

Examples:
- `api: add authenticated client token bridge`
- `billing: fix invoice pagination response shape`
- `docs: update deployment guide for new environment variables`
