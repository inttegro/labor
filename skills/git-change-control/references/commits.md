# Commit workflow

Scale validation to the change, but do not omit scope verification.

## Establish ownership

1. Read `git status --short` and the relevant diffs.
2. Identify files and hunks created or changed for the current task.
3. Separate unrelated modifications, staged entries, untracked files, generated artifacts, and nested repository changes.
4. Run focused tests before staging when practical. Record exactly which checks ran.

Do not infer ownership from recency alone. A file touched during the task can still contain someone else's changes.

## Choose the isolation method

- Entire files owned by the task: `git add -- <explicit paths>`.
- Mixed files with clearly separable changes: stage only owned hunks and inspect the cached patch.
- Unrelated entries already staged: leave them staged. Use `git commit --only -- <owned paths>` only when the entire named path belongs to the task.
- Mixed ownership plus unrelated staged entries: do not use `--only`, because it records the full named worktree file. Use a reviewed task-specific index strategy or stop and report the conflict.
- Nested repositories: follow the nested-repository procedure before changing the parent gitlink.

Never solve an isolation problem by resetting or unstaging someone else's work.

## Audit the candidate commit

Before committing, inspect:

```bash
git diff --cached --name-status
git diff --cached --stat
git diff --cached --check
```

Review the cached diff when the change is nontrivial. Compare the path list with the explicit allowlist. If `git commit --only` will be used because unrelated entries are staged, inspect the full worktree diff of each named path as the actual commit candidate.

## Commit

Use the repository's established convention. Prefer a concise imperative subject with the narrowest meaningful scope. Sign the commit when repository policy or the user's request requires it.

Do not amend an existing commit unless the user requested it or the commit was created in the current task and amending cannot absorb unrelated work.

## Verify the recorded object

Verify the commit itself rather than trusting command success:

```bash
git show --show-signature --format=fuller --stat --oneline HEAD
git diff-tree --no-commit-id --name-status -r HEAD
git status --short
```

Confirm:

- the signature is good when required;
- the subject and author are correct;
- every recorded path is task-owned;
- no required task file was omitted;
- unrelated staged and unstaged work remains intact.

For multiple commits, repeat the audit for every SHA. Do not summarize several unverified commits as one successful operation.
