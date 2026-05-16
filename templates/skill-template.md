---
name: <skill-name>
description: <Use this skill when the user asks for this repeatable workflow, including the trigger phrases and contexts that should activate it.>
license: CC-BY-4.0
metadata:
  category: <category>
  authority: read_only
---

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

## Verification Gate

- <Concrete check that proves the output satisfies the goal.>
- <Concrete check that proves authority boundaries were respected.>
- <Concrete check that proves the artifact is public-safe.>

## Approval Gates

Stop for explicit human approval before:

- <External write, if any>
- <Credentialed access, if any>
- <Destructive action, if any>

## Output

- <Artifact name>

## Public-Safe Example

Use fictional names, example.com URLs, fake IDs, and fake data. Do not include
real clients, employers, account IDs, private URLs, screenshots, local home
paths, secrets, hidden prompts, or private operational details.

## Safety

Do not include secrets, private memory, real account IDs, hidden prompts, private
workspace paths, or internal operational details.
