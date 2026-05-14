# Subagent delegation brief

Use this workflow when a task can be split into independent workstreams.

## Risk level

Usually read-only. Subagents must not perform external writes unless explicitly
approved.

## Bad brief

> Research the market and tell me what you find.

## Good brief

```md
## Goal
Find three credible examples of AI workflow repositories and extract patterns
we can adapt.

## Context
We are designing a public repo for sanitized agentic workflows, not prompts.

## Constraints
- No external writes.
- Prefer primary sources.
- Avoid hype-only examples.

## Output
Return a table: URL, what it does well, what to avoid, ideas to adapt.

## Quality bar
Include at least five examples and mark confidence.
```

## Brief template

```md
## Goal

## Context

## Allowed actions

## Forbidden actions

## Output format

## Verification standard

## Time/budget limit
```

## Verification gate

The main operator reviews all subagent output, resolves contradictions, and runs
any final checks.
