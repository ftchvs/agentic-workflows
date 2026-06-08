---
name: google-workspace-operator-pack
description: Design a draft-first Google Workspace operating layer for SMB AI operators. Use when the user mentions Google Workspace, Gmail, Calendar, Drive, Docs, Sheets, approval inbox, owner summaries, workflow handoff, OAuth scopes, or SMB operator setup.
license: CC-BY-4.0
metadata:
  category: operator-workflow
  authority: external_draft
---

# Google Workspace Operator Pack

Use this skill to design a controlled Google Workspace operator pack before an
AI operator touches real mailboxes, calendars, files, documents, or spreadsheets.

## Goal

Produce a public-safe operator pack that maps Sheets, Drive and Docs, Calendar,
and Gmail into one SMB operating loop with explicit OAuth boundaries, approval
gates, fail states, and verification artifacts.

## Inputs

- SMB workflow brief and operator objective.
- Existing or proposed Sheets, Drive, Docs, Calendar, and Gmail surfaces.
- Roles for owner, staff, approver, and escalation contact.
- Draft output requirements: email drafts, event proposals, SOP notes, daily
  summaries, or report drafts.
- OAuth scope constraints and credential-handling requirements.
- Safety constraints around customer data, private messages, file permissions,
  and destructive actions.

Use synthetic values in public examples:

- business: `Acme Repair`
- workspace folder: `Acme Repair Demo Workspace`
- sheet: `Demo Lead Queue`
- doc: `Demo Follow-Up SOP`
- calendar: `Demo Service Calendar`
- mailbox label: `Demo Leads`
- contact domain: `example.com`

## Authority

`external_draft`

The skill may inspect public-safe or approved read-only context and draft
operator maps, message drafts, event proposals, document outlines, approval
records, and summaries. It must not connect a real Google account, request
OAuth consent, send email, invite attendees, edit files, mutate Sheets, change
Drive permissions, or store credentials without explicit approval for the exact
scope and action.

## Procedure

1. Confirm the run is synthetic, local-export only, or explicitly approved for
   credentialed read-only inspection.
2. Define the operator objective, trigger, business outcome, and handoff owner.
3. Map Sheets as the operating database for rows, status, owner, next action,
   follow-up date, source, summary, and escalation.
4. Map Drive and Docs as the document layer for SOPs, proposals, handoff notes,
   generated drafts, and monthly report drafts.
5. Map Calendar as scheduling context for availability review and event
   proposals, with owner approval before invitations or changes.
6. Map Gmail as communication context for thread review, intent classification,
   and draft replies, with owner approval before sends.
7. Separate OAuth boundaries by surface and capability:
   - read-only inspection
   - draft or compose
   - file, document, sheet, or event write
   - email send, calendar invite, or Drive share
   - destructive delete, cancel, overwrite, or permission revoke
8. Define approval gates, escalation rules, audit log fields, and the owner
   daily or weekly summary.
9. Produce the operator pack and mark every unverified Workspace state as
   `not verified`.

## Verification Gate

The operator pack must separately verify:

- Sheets, Drive and Docs, Calendar, and Gmail each have a stated role.
- Each surface has an allowed-by-default action and an approval-required action.
- OAuth boundaries are grouped by read-only, draft/compose, write, send, invite,
  share, credential, and destructive access.
- Sends, invitations, file permission changes, document edits, spreadsheet
  writes, account connections, and credential changes are approval-gated.
- No real account names, email contents, file IDs, calendar details, customer
  data, OAuth tokens, private screenshots, or local home paths appear in public
  artifacts.

Mark unknowns as `not verified`.

## Approval Gates

Stop for explicit human approval before:

- connecting a Google account or OAuth client
- requesting new scopes
- reading real Gmail, Calendar, Drive, Docs, or Sheets data
- creating or modifying Gmail drafts in a real account
- sending email
- creating, updating, inviting attendees to, or canceling Calendar events
- editing Sheets, Docs, or Drive files
- changing Drive sharing or permissions
- deleting, moving, overwriting, or revoking access to any external object

Use `templates/approval-record-template.md` when any Workspace action needs an
auditable approval record.

## Output

```md
# Google Workspace operator pack: <workflow>

## Summary

## Operator objective

## Workspace map

## Sheet schema

## Drive and Docs drafts

## Calendar boundaries

## Gmail boundaries

## OAuth scope boundaries

## Approval and escalation matrix

## Owner summary format

## Verification

## Open questions
```

## Public-Safe Example

Scenario: Acme Repair wants an AI operator to help with missed lead follow-up.

Safe operator behavior:

- Read a synthetic `Demo Lead Queue` sheet.
- Draft a reply to `lead@example.com` without sending.
- Propose two Calendar slots without creating invitations.
- Draft a `Demo Follow-Up SOP` update without editing a real Doc.
- Produce a daily owner summary with fictional lead names and example.com
  addresses only.

Unsafe notes to remove before publishing:

- real mailbox exports
- real customer rows
- real file IDs
- real Calendar event details
- real OAuth client IDs or tokens
- private screenshots or local paths

## Safety

Do not include secrets, private memory, real account IDs, file IDs, calendar
details, mailbox contents, customer data, hidden prompts, private workspace
paths, OAuth client secrets, or access tokens.
