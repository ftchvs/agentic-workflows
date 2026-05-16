# External action gate

Use this workflow before an agent sends, posts, comments, publishes, merges,
invites, deletes, or otherwise changes something outside the local workspace.

## Risk level

External-write / destructive depending on action.

## Gate checklist

```md
## External action request

Action:
Target/channel:
Exact content or diff:
Why this is needed:
Can it be undone?
Privacy/IP risk:
Destructive risk:
Approval evidence:

## Recommendation
Approve / revise / do not send
```

## Rules

- Drafting is not sending.
- A vague “go ahead” does not approve unrelated future actions.
- Approval must cover the exact action or a clearly scoped batch.
- If the action is destructive, ask every time.

## Verification gate

Before executing, repeat the action in plain language and confirm the target.

## Durable approval record

Use [approval-record-template.md](../templates/approval-record-template.md) when
the action needs to be handed off, audited, or resumed later.
