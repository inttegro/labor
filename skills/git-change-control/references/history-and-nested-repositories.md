# History and nested repositories

Use this reference for rebases, cherry-picks, conflict resolution, force pushes, submodules, or nested Git repositories.

## Authorization boundaries

- A request to commit is not permission to rebase, amend older commits, push, force push, delete branches, or update unrelated gitlinks.
- Do not use `git reset --hard`, destructive checkout commands, or broad clean commands unless the user explicitly requested that exact destructive operation.
- Use `--force-with-lease`, never an unconditional force push, and only after explicit authorization to rewrite the remote branch.

## Rebases and cherry-picks

1. Identify the current branch, upstream, merge base, and checkout state.
2. Preserve unrelated changes. Do not begin a history operation with ambiguous ownership.
3. Inspect every conflict in context. Do not select ours or theirs wholesale unless the semantics justify it.
4. Run focused validation after conflict resolution.
5. Audit the resulting commit range and compare it with the intended range before any push.

If concurrent changes appear during the operation, treat them as someone else's work and reassess instead of overwriting them.

## Nested repositories and gitlinks

- Detect nested repositories and submodules before staging broad directories.
- Commit the child repository first, verify its commit and status, then update the parent gitlink only when both changes belong to the task.
- Do not commit a parent gitlink that points at an uncommitted, inaccessible, or unintended child SHA.
- Report child and parent SHAs separately. A clean parent does not prove the nested repository is clean.

## Push and deployment claims

After a push, verify that the remote ref moved to the intended SHA. Do not infer CI success, deployment, runtime configuration, data migration, or production behavior from the push. Use a production-verification workflow when the user asks whether the change is deployed, live, fixed, or production-ready.
