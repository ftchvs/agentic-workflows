# Approval boundary matrix

Use this workflow to define what an AI agent can do without asking and what must
be approved.

## Risk level

Governance workflow. No external side effects.

## Matrix

| Action type | Default | Notes |
| --- | --- | --- |
| Read public docs/web | Allowed | Cite sources when relevant. |
| Read local project files | Allowed when scoped | Avoid unrelated private files. |
| Create local draft artifacts | Allowed | Keep drafts internal. |
| Edit local files for requested work | Allowed | Verify with diff/test when possible. |
| Create commits/branches | Ask or scoped approval | Depends on repo policy. |
| Push branches/open PRs | Ask first | External-visible. |
| Merge PRs/delete branches/releases | Explicit approval every time | Irreversible or high-impact. |
| Send email/message/post/comment | Explicit approval every time | External-visible. |
| Access secrets/credentials | Avoid unless necessary | Never reveal or store. |
| Destructive shell commands | Explicit approval every time | Prefer reversible alternatives. |

## Output artifact

A project-specific authority table that can be pasted into `AGENTS.md`, a runbook,
or a project kickoff document.

## Verification gate

Ask: “Would I be comfortable with this action happening silently?” If not, it
requires approval.
