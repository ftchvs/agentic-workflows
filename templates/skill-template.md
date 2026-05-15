# <Skill Name>

Use this skill when <trigger>.

## Goal

<Outcome this skill should reliably produce.>

## Inputs

- <Required context or file>

## Authority

`read_only`

Allowed levels:

- `read_only`: inspect, summarize, and recommend only.
- `local_write`: write inside the local repo or workspace only.
- `external_draft`: draft external-facing artifacts without sending.
- `external_write_requires_approval`: stop for approval before external writes.
- `destructive_forbidden`: destructive actions are out of scope.

## Procedure

1. Confirm the goal and available context.
2. Follow the repo workflow that most closely matches the task.
3. Produce the artifact named by the workflow.
4. Run the workflow verification gate.
5. Record only reusable, public-safe lessons.

## Output

- <Artifact name>

## Safety

Do not include secrets, private memory, real account IDs, hidden prompts, private
workspace paths, or internal operational details.
