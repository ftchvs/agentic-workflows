# Repo triage workflow

Use this workflow when an agent enters an unfamiliar codebase.

## Risk level

Read-only until an implementation is explicitly requested.

## Process

1. Map the repo structure.
2. Identify package manager, test commands, lint/typecheck gates, and CI.
3. Read README, agent instructions, and recent changes.
4. Locate the relevant code path.
5. Summarize risks before editing.
6. If asked to implement, make the smallest safe patch.
7. Verify with the smallest meaningful gate.

## Output artifact

```md
# Repo triage: <repo>

## What this repo does

## Stack and commands

## Relevant files

## Current risk

## Recommended next step

## Verification plan
```

## Failure modes

- Editing before understanding test gates.
- Running broad/destructive commands unnecessarily.
- Assuming generated or vendor files should be edited.
