# Fictional Workspace operator example

Scenario: Acme Repair is a fictional home-services business that misses inbound
leads when the owner is on job sites. The team wants an AI operator to organize
lead state, draft follow-ups, propose appointments, and summarize decisions
without sending messages or changing the live workspace by default.

Use these artifacts together:

1. `google-workspace-operator-pack` to map the Workspace operating layer.
2. `external-action-gate` before any send, invite, share, edit, or permission
   change.
3. `learning-extractor` after a reviewed run to capture reusable improvements.

## Synthetic workspace

- Business: Acme Repair
- Lead sheet: `Demo Lead Queue`
- Drive folder: `Acme Repair Demo Workspace`
- SOP doc: `Demo Follow-Up SOP`
- Calendar: `Demo Service Calendar`
- Gmail label: `Demo Leads`
- Owner contact: `owner@example.com`
- Lead contact: `lead@example.com`

## Operating loop

### 1. Sheet as operating database

The operator reads a synthetic lead row:

| Lead | Source | Service | Status | Next action | Owner | Follow-up |
| --- | --- | --- | --- | --- | --- | --- |
| Jordan Lee | Website form | Water heater quote | needs reply | draft quote follow-up | Sam | 2026-05-20 |

Allowed by default:

- inspect synthetic rows
- summarize stale leads
- draft next-action recommendations

Requires approval:

- updating row status
- assigning an owner in a real Sheet
- writing notes back to the spreadsheet

### 2. Drive and Docs as document layer

The operator drafts a note for `Demo Follow-Up SOP`:

```md
## Quote follow-up rule

If a lead has not replied within two business days, draft one short follow-up
that restates the requested service, asks whether they want available slots,
and routes pricing exceptions to the owner.
```

Allowed by default:

- draft SOP changes in the report
- summarize public-safe document structure

Requires approval:

- editing a real Doc
- moving files
- changing Drive permissions
- sharing a file externally

### 3. Calendar as scheduling context

The operator proposes two appointment slots:

```md
Proposed slots:
- 2026-05-21 10:00 local time
- 2026-05-21 14:00 local time
```

Allowed by default:

- draft proposed slots from synthetic availability
- note scheduling conflicts as `not verified`

Requires approval:

- reading a real calendar
- creating an event
- inviting attendees
- changing or canceling an appointment

### 4. Gmail as draft channel

The operator drafts, but does not send:

```md
Subject: Water heater quote follow-up

Hi Jordan,

Thanks for reaching out about the water heater quote. Do either of these times
work for a quick appointment: Thursday at 10:00 or Thursday at 14:00?

Acme Repair
```

Allowed by default:

- draft replies in a local report
- classify intent from synthetic thread snippets

Requires approval:

- reading real mailbox threads
- creating a draft in a real Gmail account
- sending email
- adding labels or changing thread state

## OAuth boundary table

| Boundary | Example capability | Default status |
| --- | --- | --- |
| read-only | inspect synthetic or approved exported files | allowed for synthetic only |
| credentialed read | read a real mailbox, calendar, file, Doc, or Sheet | approval required |
| draft or compose | create a Gmail draft or document draft in an account | approval required |
| write | update Sheets, Docs, Drive files, or Calendar events | approval required |
| send or invite | send mail or invite attendees | approval required |
| share | change Drive permissions or external access | approval required |
| destructive | delete, cancel, overwrite, move, or revoke access | separate approval required |

## Output artifact

```md
# Google Workspace operator pack: Acme Repair lead follow-up

## Summary
- Workspace role map drafted from synthetic data only.
- No real Google account access was used.
- Sends, invites, edits, shares, and credential changes require approval.

## Blocking issues
- Real calendar availability is not verified.
- Real lead ownership is not verified.

## Approval required
- Approve exact Gmail draft before sending.
- Approve exact Calendar event before creating invitations.
- Approve exact Sheet row updates before writing.
```

## Verification

- All company names, contacts, documents, folders, sheets, calendars, and rows
  are fictional.
- Email addresses use `example.com`.
- No real OAuth credentials, file IDs, calendar IDs, mailbox exports, customer
  data, screenshots, or local file paths appear.
- The operator produces drafts and approval records, then stops before external
  action.
