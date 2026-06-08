# Google Workspace operator pack

Use this workflow when an SMB AI operator needs a low-tech operating layer built
around Google Workspace: Sheets for state, Drive and Docs for files and drafts,
Calendar for scheduling context, and Gmail for message context and draft replies.

## Risk level

Credentialed when a real Google Workspace account is connected. Public examples
and default runs are synthetic and draft-first. No account access, credential
storage, sends, invitations, file permission changes, document edits, or
spreadsheet mutations are allowed without explicit approval for the exact scope
and action.

## Process

1. Confirm whether the run uses synthetic context, local exported files, or an
   approved Google account.
2. Define the operator objective, trigger, handoff point, and business outcome.
3. Map Sheets as the operating database: lead or task rows, owner, status, next
   action, follow-up date, source, summary, and escalation state.
4. Map Drive and Docs as the document layer: SOPs, proposal drafts, handoff
   notes, call summaries, and monthly report drafts.
5. Map Calendar as scheduling context: availability review, proposed slots,
   appointment holds, and owner approval before invitations.
6. Map Gmail as communication context: inbound thread review, intent
   classification, draft replies, and owner approval before sending.
7. Split OAuth needs by boundary:
   - read-only: inspect mailbox, calendar, file metadata, documents, and sheets
   - draft/compose: create email drafts or document drafts without sending
   - write: update Sheets, Docs, Drive files, or Calendar events
   - send/invite/share: send email, invite attendees, or change file access
8. Define approval gates for sends, invitations, document edits, spreadsheet
   writes, file sharing, credential changes, and destructive actions.
9. Define fail states, escalation rules, audit logs, and owner summary format.
10. Produce the operator pack and stop before credentialed access or external
    action.

## Output artifact

```md
# Google Workspace operator pack: <workflow>

## Summary

## Operator objective

## Workspace map

| Surface | Role | Allowed by default | Requires approval | Failure mode |
| --- | --- | --- | --- | --- |

## Sheet schema

## Drive and Docs drafts

## Calendar boundaries

## Gmail boundaries

## OAuth scope boundaries

| Boundary | Example capability | Approval needed |
| --- | --- | --- |

## Approval and escalation matrix

## Daily or weekly owner summary

## Verification

## Open questions
```

## Verification gate

- No real account names, email content, file IDs, calendar details, customer
  data, OAuth tokens, local paths, or private screenshots appear in public
  artifacts.
- Sheets, Drive and Docs, Calendar, and Gmail each have a role, boundary,
  failure mode, and artifact.
- Read-only, draft/compose, write, send, invite, and share scopes are separated.
- Every send, invite, share, edit, credential change, and destructive action is
  approval-gated.
- Any untested account state, delivery state, calendar receipt, file access, or
  platform receipt is marked `not verified`.

## Failure modes

- Treating an email draft as approval to send it.
- Creating Calendar invitations before the owner approves the exact attendees,
  time, location, and message.
- Updating Sheets or Docs from stale context without row, document, and owner
  confirmation.
- Requesting broad OAuth scopes when read-only or draft-only access would
  satisfy the workflow.
- Publishing real file IDs, customer rows, email content, or calendar details in
  reusable examples.
