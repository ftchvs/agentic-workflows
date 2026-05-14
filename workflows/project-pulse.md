# Agentic project pulse

Use this workflow when a project needs a compact status update and ranked next
actions.

## Risk level

Read-only unless the operator explicitly asks the agent to update a tracker.

## Inputs

- project name
- current tasks/issues/PRs
- recent activity
- known goals or deadlines
- blockers and risks

## Process

1. Pull current project state from the approved source of truth.
2. Group work by status: done, active, blocked, stale, next.
3. Identify risks, stale decisions, and hidden dependencies.
4. Recommend the smallest useful next action.
5. Produce a pulse memo.

## Output artifact

```md
# Project pulse: <project>

## Status
<one-line current state>

## Movement
- Done:
- Active:
- Blocked:

## Risk
- <risk> — <why it matters> — <suggested mitigation>

## Recommended next action
1. <action>
2. <action>

## Decision needed
- <decision or none>
```

## Verification gate

- Cross-check with the source of truth.
- Do not mark work complete unless the underlying tracker/code confirms it.
- Separate facts from recommendations.

## Failure modes

- Reporting stale state from memory.
- Burying the one real blocker under many updates.
- Creating tasks without approval.
