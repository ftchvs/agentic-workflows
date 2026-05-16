# Fictional external action gate example

Scenario: a fictional product lead wants an agent to post a release note for
Acme Notes to a public status page.

Use:

1. `external-action-gate.workflow.yml` to prepare the exact external action.
2. `approval-record-template.md` to capture approval before anything is posted.
3. `external-action-gate.md` as the human-readable checklist.

## Dry-run output

The agent does not post during the dry run. It produces this approval record:

```md
# Approval record: publish Acme Notes release note

## Action

Publish a release note.

## Target

Fictional Acme Notes public status page at `https://status.example.com`.

## Exact content or diff

Acme Notes has shipped faster workspace search for fictional beta teams. No
customer data, incident details, or private roadmap dates are included.

## Authority

- Workflow: External Action Gate
- Risk level: external-write
- Required permissions: human approval for the exact post

## Safety check

- External side effects: public status-page update
- Destructive action: none
- Privacy or IP risk: low; content is synthetic
- Rollback path: remove or edit the fictional post

## Approval

- Approver: <human name>
- Approval timestamp: <timestamp>
- Approved exact action: publish the exact content above to the exact target
- Conditions: no edits without renewed approval

## Execution result

- Executed by:
- Execution timestamp:
- Receipt, link, or command result:
- Verification:
```

## Verification

- The target is fictional and uses `example.com`.
- The content contains no real customer, account, incident, or private roadmap
  details.
- The approval covers the exact target and exact content, not a general future
  posting authority.
