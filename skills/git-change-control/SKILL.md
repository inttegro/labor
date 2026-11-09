---
name: git-change-control
description: Use when staging, committing, amending, rebasing, cherry-picking, resolving conflicts, updating nested repositories or gitlinks, pushing rewritten history, or auditing Git scope in a shared or dirty checkout. Preserve unrelated work, prove task ownership, and verify recorded history; do not use for ordinary read-only code inspection.
---

# Git Change Control

Treat an unexplained change as someone else's work. A request to commit authorizes committing the task-owned change; it does not authorize including unrelated work, rewriting history, pushing, or changing nested repositories outside the task.

## Route the work

- For an ordinary commit, commit audit, or commit-splitting request, read [references/commits.md](references/commits.md).
- For rebases, cherry-picks, conflict resolution, force pushes, nested repositories, or gitlink updates, also read [references/history-and-nested-repositories.md](references/history-and-nested-repositories.md).

## Invariants

- Inspect `git status --short` before editing and again before staging.
- Build an explicit allowlist of task-owned files or hunks. Never use `git add .`, `git add -A`, broad path globs, or destructive cleanup merely to make the checkout look tidy.
- Do not discard, reset, overwrite, or unstage changes you did not create. Work around unrelated staged entries instead of disturbing them.
- If a task-owned file also contains unrelated edits, isolate owned hunks. If exact isolation cannot be proven, stop before committing that file and report the ambiguity.
- Follow the repository's established subject, scope, authorship, and signing policy. Do not invent a new convention during an unrelated task.
- Keep materially separate changes in separate commits when their ownership, review, rollback, or release paths differ.
- A commit is not a push. A push is not a build. A build is not a deployment. Report each state separately.

## Completion standard

Before reporting a history operation complete, verify the recorded paths, subject, author, signature when required, and remaining checkout state. State the commit SHA or affected range, validation performed, exact scope, and whether unrelated changes remain.
