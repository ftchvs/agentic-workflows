# Contributing

Thanks for helping improve `agentic-workflows`.

This repository is for public-safe workflow templates, not private agent memory
or raw prompt dumps. Contributions should make AI-assisted work more legible,
safe, repeatable, and measurable.

## What belongs here

Good contributions include:

- reusable workflows with clear context, authority, verification, and outputs
- templates that help humans delegate, review, approve, or learn from AI work
- fictional case studies that demonstrate an operating pattern
- safety checklists for external actions, destructive actions, credentialed
  work, or multi-agent delegation
- diagrams or explanations that make agentic work easier to govern

## What does not belong here

Do not contribute:

- secrets, tokens, API keys, webhook URLs, private infrastructure details, or
  credentials
- real emails, calendars, messages, transcripts, customer data, account IDs, or
  personal memory
- employer, client, customer, or proprietary workflows unless fully rewritten as
  generic original material
- hidden system prompts, private agent instructions, or platform-internal policy
- examples that reveal a real person’s setup, access, operational habits, or
  security boundaries
- destructive or external-write automation without dry-run defaults and human
  approval gates

All examples must be synthetic.

## Workflow quality bar

Each workflow should answer:

1. **When should you use it?**
2. **What context does the agent need?**
3. **What authority does the agent have?**
4. **What actions are forbidden or approval-gated?**
5. **What artifact should the workflow produce?**
6. **How should the output be verified?**
7. **What are common failure modes?**
8. **What should be learned or saved for next time?**

Prefer practical checklists and examples over abstract advice.

## Risk labels

If a workflow could trigger meaningful side effects, label it clearly:

| Label | Meaning |
| --- | --- |
| `read-only` | The workflow only inspects or analyzes information. |
| `local-write` | The workflow may create or edit local files. |
| `external-write` | The workflow may send, post, publish, comment, create issues, or call external APIs. |
| `destructive` | The workflow may delete, overwrite, revoke, merge, or otherwise make hard-to-reverse changes. |
| `credentialed` | The workflow may use authenticated accounts, tokens, or private data. |

External-write, destructive, and credentialed workflows must include explicit
human approval requirements.

## Public-safe examples

Use fictional names and generic paths:

- `Acme Notes`, not a real company or client
- `example.com`, not a private domain
- `alice@example.com`, not a real email
- `/path/to/workspace`, not a real home directory
- `PROJECT-123`, not a real tracker issue

If an example feels like it reveals how a real person or organization operates,
rewrite it.

## Review checklist

Before opening a contribution, check:

- [ ] The contribution contains no secrets or private identifiers.
- [ ] Examples are synthetic.
- [ ] External side effects are labeled and approval-gated.
- [ ] The workflow produces a durable artifact.
- [ ] Verification steps are concrete.
- [ ] Failure modes are named.
- [ ] The contribution is not just a prompt; it is an operating pattern.

## License

By contributing, you agree that your contribution may be distributed under the
repository license.
