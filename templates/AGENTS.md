# Agent Operating Contract

This repo uses agentic workflows as operating files, not prompt dumps.

## Operating Loop

1. Read the relevant workflow before acting.
2. Confirm the goal, inputs, allowed tools, authority level, expected artifacts,
   and verification gate.
3. Work inside the declared authority.
4. Stop for human approval before any external write or risky side effect.
5. Verify the result with the smallest meaningful check.
6. Leave an artifact that another operator can inspect.
7. Save only reusable, public-safe lessons.

## Authority Levels

| Level | Meaning |
| --- | --- |
| `read_only` | Inspect, summarize, and recommend. Do not modify files or external systems. |
| `local_write` | Modify files in the local repo or workspace. Do not write to external systems. |
| `external_draft` | Draft external-facing messages, issues, posts, or PR text. Do not send or publish. |
| `external_write_requires_approval` | Prepare an external write, then stop for explicit human approval before execution. |
| `destructive_forbidden` | Destructive actions are outside scope, even with tool access. |

## Public-Safe Rules

- Do not include secrets, credentials, account IDs, private memory, internal
  prompts, private paths, or proprietary context in artifacts.
- Use synthetic examples unless the user explicitly provides public material.
- Preserve the thesis: prompts are not the product; the operating loop is.

## Default Verification

- Validate workflow files before using them.
- Render a runbook when handing work to a person or another agent.
- Audit authority before any workflow that could touch external systems.
