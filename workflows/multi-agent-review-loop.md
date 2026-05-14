# Multi-agent review loop

Use this workflow when quality improves by having independent agents examine the
same question from different angles.

## Risk level

Read-only by default.

## Pattern

```text
Main operator
  ├─ Examples / benchmark agent
  ├─ Positioning / strategy agent
  └─ Risk / guardrails agent
        ↓
Main operator synthesizes one recommendation
        ↓
Verification gate
        ↓
Human approval if external action follows
```

## When to use

- repo/product audit
- market/competitive research
- implementation plan review
- security/risk review
- content strategy
- launch planning

## Output artifact

A synthesis memo with:

- what each lane found
- disagreements or confidence gaps
- final recommendation
- next action
- approval needed

## Failure modes

- Treating subagent output as truth without verification.
- Spawning too many agents for trivial work.
- Letting agents perform external-visible actions.
