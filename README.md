# Agentic Workflows

Repo-native operating files for controlled AI work.

> Prompts are not the product. The product is the operating loop: context,
> delegation, verification, approval, artifact, learning.

## What this is

`agentic-workflows` turns AI workflows into repo-native operating files:
validate them, render runbooks, audit authority, and compile them into agent
skills.

It is still a playbook, but v2 adds a runnable foundation:

- `.workflow.yml` files for executable-style workflow definitions
- a machine-readable workflow schema
- a Bun CLI for validation, runbook rendering, authority audit, and scaffolding
- repo templates for `AGENTS.md` and skill drafts

The emphasis is not on clever phrasing. The emphasis is on the operating system
around the agent:

- what context the agent receives
- what authority it has
- how work is delegated
- what must be verified
- which actions require human approval
- what artifact is produced
- what lesson is saved for next time

This is not a prompt dump. Each workflow includes:

- when to use it
- required context
- authority boundaries
- expected artifact
- verification gate
- failure modes
- public-safe synthetic examples

## Quick start

Requirements:

- [Bun](https://bun.sh/)

Run the CLI from the repo root:

```sh
bun run validate
bun cli/aw.ts check
bun cli/aw.ts check-skills
bun cli/aw.ts publication-scan
bun cli/aw.ts publication-scan --list
bun cli/aw.ts runbook workflows/repo-triage.workflow.yml
bun cli/aw.ts audit workflows/research-to-decision.workflow.yml
bun cli/aw.ts new workflow customer-feedback-triage
bun cli/aw.ts new skill launch-readiness
```

CLI commands:

```text
aw validate <workflow>
aw check [workflow...]
aw check-skills [skill...]
aw publication-scan [--list] [file...]
aw runbook <workflow>
aw audit <workflow>
aw new workflow <name>
aw new skill <name>
```

## Who this is for

- founders, operators, chiefs of staff, and product leads adopting AI agents
- engineering and product teams designing human-in-the-loop workflows
- people evaluating what competent AI delegation looks like in practice
- anyone who wants less AI theater and more reliable AI-assisted execution

## The operating loop

```mermaid
flowchart LR
  A[Context] --> B[Delegation]
  B --> C[Execution]
  C --> D[Verification]
  D --> E{Approval needed?}
  E -- No --> F[Artifact]
  E -- Yes --> G[Human approval]
  G --> F
  F --> H[Learning]
  H --> A
```

A good agentic workflow is a loop, not a one-off prompt. It starts with scoped
context, delegates work with clear authority, verifies the result, gates risky
actions, produces an artifact, and captures reusable lessons.

## Core principles

1. **Artifacts over prompts** — a workflow should end in something durable:
   a memo, PR, issue tree, checklist, test result, decision log, or report.
2. **Human-controlled authority** — AI may draft, inspect, summarize, and
   propose; humans approve external writes, destructive actions, and sensitive
   decisions.
3. **Main-agent accountability** — parallel agents can help, but the operator
   synthesizes, verifies, and owns the recommendation.
4. **Private by default** — workflows are templates. Examples are synthetic.
   Private memory, secrets, client work, and internal context do not belong here.
5. **Learning compounds** — save reusable procedures and failure modes, not raw
   transcripts.

## Executable workflow files

Executable-style examples live beside the markdown playbooks:

| Workflow file | Use it for | Try it |
| --- | --- | --- |
| [repo-triage.workflow.yml](workflows/repo-triage.workflow.yml) | Mapping an unfamiliar repo before edits | `bun cli/aw.ts runbook workflows/repo-triage.workflow.yml` |
| [research-to-decision.workflow.yml](workflows/research-to-decision.workflow.yml) | Research that must end in a recommendation | `bun cli/aw.ts audit workflows/research-to-decision.workflow.yml` |
| [external-action-gate.workflow.yml](workflows/external-action-gate.workflow.yml) | Preparing an external write for approval | `bun cli/aw.ts runbook workflows/external-action-gate.workflow.yml` |
| [analytics-consent-audit.workflow.yml](workflows/analytics-consent-audit.workflow.yml) | Auditing consent-gated analytics and conversion tracking | `bun cli/aw.ts runbook workflows/analytics-consent-audit.workflow.yml` |
| [google-ads-upload-qa.workflow.yml](workflows/google-ads-upload-qa.workflow.yml) | Reviewing Google Ads bulk uploads before posting account changes | `bun cli/aw.ts audit workflows/google-ads-upload-qa.workflow.yml` |
| [ad-preflight-review.workflow.yml](workflows/ad-preflight-review.workflow.yml) | Reviewing ad copy, claims, landing-page alignment, and launch approvals | `bun cli/aw.ts audit workflows/ad-preflight-review.workflow.yml` |
| [paid-social-launch-gate.workflow.yml](workflows/paid-social-launch-gate.workflow.yml) | Gating paid-social submission, enablement, event changes, and spend scaling | `bun cli/aw.ts audit workflows/paid-social-launch-gate.workflow.yml` |
| [technical-seo-launch-audit.workflow.yml](workflows/technical-seo-launch-audit.workflow.yml) | Auditing crawl, indexation, metadata, sitemap, robots, and schema launch readiness | `bun cli/aw.ts runbook workflows/technical-seo-launch-audit.workflow.yml` |
| [product-marketing-context-builder.workflow.yml](workflows/product-marketing-context-builder.workflow.yml) | Building stable product, audience, proof, and claim-boundary context | `bun cli/aw.ts runbook workflows/product-marketing-context-builder.workflow.yml` |
| [growth-loop-diagnosis.workflow.yml](workflows/growth-loop-diagnosis.workflow.yml) | Diagnosing growth loops, weak links, confidence, and next experiments | `bun cli/aw.ts audit workflows/growth-loop-diagnosis.workflow.yml` |
| [social-content-fact-check-rewrite.workflow.yml](workflows/social-content-fact-check-rewrite.workflow.yml) | Reviewing and rewriting social posts before publication | `bun cli/aw.ts audit workflows/social-content-fact-check-rewrite.workflow.yml` |
| [growth-launch-readiness.workflow.yml](workflows/growth-launch-readiness.workflow.yml) | Chaining context, creative, launch, analytics, approval, and learning checks | `bun cli/aw.ts runbook workflows/growth-launch-readiness.workflow.yml` |

The schema is [schema/workflow.schema.json](schema/workflow.schema.json).

Each workflow declares:

- `name`
- `goal`
- `trigger`
- `inputs`
- `allowed_tools`
- `authority`
- `risk_level`
- `required_permissions`
- `external_side_effects`
- `destructive_actions`
- `dry_run`
- `approval_required`
- `steps`
- `verification`
- `artifacts`
- `memory_update`

## Growth marketing skills

The `skills/` directory contains repo-native skill drafts for repeatable growth
marketing workflows. These skills are public-safe operating files, not private
prompt dumps. Each skill names its inputs, authority boundary, approval gates,
verification gate, and output artifact. `check-skills` also rejects a small set
of obvious publication-policy violations such as private home paths and common
token shapes.

Current skills:

| Skill | Use it for |
| --- | --- |
| [analytics-consent-audit](skills/analytics-consent-audit/SKILL.md) | Auditing consent state, tag loading, conversion-event dispatch, and attribution evidence |
| [google-ads-upload-qa](skills/google-ads-upload-qa/SKILL.md) | Reviewing Google Ads bulk upload packages before posting account changes |
| [ad-preflight-review](skills/ad-preflight-review/SKILL.md) | Reviewing ad copy, claims, landing-page alignment, and approval requirements before launch |
| [paid-social-launch-gate](skills/paid-social-launch-gate/SKILL.md) | Verifying paid-social launch readiness before submission, enablement, or scaling |
| [technical-seo-launch-audit](skills/technical-seo-launch-audit/SKILL.md) | Checking crawl, indexation, metadata, sitemap, robots, and schema launch readiness |
| [product-marketing-context-builder](skills/product-marketing-context-builder/SKILL.md) | Building stable product, audience, proof, and claim-boundary context for growth work |
| [growth-loop-diagnosis](skills/growth-loop-diagnosis/SKILL.md) | Diagnosing the current growth loop, weakest link, confidence, and next experiment |
| [social-content-fact-check-rewrite](skills/social-content-fact-check-rewrite/SKILL.md) | Fact-checking and rewriting social posts before publication |

Use
[growth skill eval prompts](examples/growth-skill-evals/README.md)
to test each skill with synthetic Acme Sleep scenarios and a shared scoring
rubric.

Validate skills and public-facing files with:

```sh
bun cli/aw.ts check-skills
bun cli/aw.ts publication-scan
bun cli/aw.ts publication-scan --list
```

## Authority levels

| Level | Meaning |
| --- | --- |
| `read_only` | Inspect, summarize, and recommend. Do not modify files or external systems. |
| `local_write` | Modify files in the local repo or workspace. Do not write to external systems. |
| `external_draft` | Draft external-facing messages, issues, posts, or PR text. Do not send or publish. |
| `external_write_requires_approval` | Prepare an external write, then stop for explicit human approval before execution. |
| `destructive_forbidden` | Destructive actions are outside scope, even with tool access. |

## Markdown playbooks

| Workflow | Use it for | Output artifact |
| --- | --- | --- |
| [Agentic project pulse](workflows/project-pulse.md) | Project health and next actions | Pulse memo |
| [Approval boundary matrix](workflows/approval-boundary-matrix.md) | Defining what agents may do | Authority table |
| [Subagent delegation brief](workflows/subagent-delegation-brief.md) | Parallel task delegation | Brief + result spec |
| [Multi-agent review loop](workflows/multi-agent-review-loop.md) | Research/review/design sprints | Synthesized recommendation |
| [External action gate](workflows/external-action-gate.md) | Sending/posting/commenting/publishing | Approval checklist |
| [Analytics consent audit](workflows/analytics-consent-audit.md) | Checking consent-gated analytics and conversion tracking | Audit report |
| [Google Ads upload QA](workflows/google-ads-upload-qa.md) | Reviewing paid-search bulk uploads before account changes | QA report |
| [Ad preflight review](workflows/ad-preflight-review.md) | Reviewing ad claims, landing-page alignment, and launch approvals | Preflight report |
| [Paid social launch gate](workflows/paid-social-launch-gate.md) | Checking paid-social launch readiness before platform-visible changes | Launch gate report |
| [Technical SEO launch audit](workflows/technical-seo-launch-audit.md) | Checking crawl, indexation, sitemap, robots, metadata, and schema readiness | SEO audit report |
| [Product marketing context builder](workflows/product-marketing-context-builder.md) | Building reusable product, audience, proof, and claim-boundary context | Context document |
| [Growth loop diagnosis](workflows/growth-loop-diagnosis.md) | Diagnosing growth loops and selecting the next experiment | Decision memo |
| [Social content fact-check rewrite](workflows/social-content-fact-check-rewrite.md) | Reviewing and rewriting social content before publication | Claim table + draft |
| [Growth launch readiness](workflows/growth-launch-readiness.md) | Chaining context, creative, launch, analytics, approval, and learning checks | Launch packet |
| [Learning extractor](workflows/learning-extractor.md) | Turning hard-won fixes into reusable knowledge | Lesson or skill proposal |
| [Research-to-decision pipeline](workflows/research-to-decision.md) | Research that must become a decision | Decision memo |
| [Repo triage workflow](workflows/repo-triage.md) | Auditing unfamiliar codebases | Triage report |

## Why this is different

Most public AI repositories show prompts, vendor skills, or tool recipes. This
repo shows the operating layer around AI work: delegation contracts, approval
gates, verification standards, learning loops, and measurable artifacts.

The goal is to make AI work safer and more legible, especially when agents touch
real projects, code, tasks, or external systems.

## Safety posture

All examples are synthetic. Do not commit secrets, private conversations,
client/employer material, real account IDs, internal repo names, or hidden system
prompts. See [Publication policy](PUBLICATION_POLICY.md).

## Repository layout

```text
cli/         Bun CLI for workflow validation, runbooks, audits, and scaffolds
principles/   Core operating beliefs
schema/      Machine-readable workflow schema
skills/      Public-safe skill drafts for repeatable AI-assisted work
workflows/   Reusable playbooks and executable-style workflow files
templates/   Copy/paste templates, AGENTS.md template, skill draft template
examples/     Synthetic case studies
diagrams/     Visual explanations
```

## Contributing

Contributions should improve public-safe workflows, templates, examples, or
safety practices. See [Contributing](CONTRIBUTING.md).

## License

CC BY 4.0. See [License](LICENSE.md).
