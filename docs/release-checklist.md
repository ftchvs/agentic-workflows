# Release checklist

Use this checklist before tagging or publishing a public release of
`agentic-workflows`.

## Scope

- Confirm the release includes only public-safe operating files, templates,
  examples, tests, and documentation.
- Confirm any new workflow has both:
  - `workflows/<name>.workflow.yml`
  - `workflows/<name>.md`
- Confirm any new skill has `skills/<name>/SKILL.md`.
- Confirm any new example uses a fictional company, `example.com` URLs, fake
  IDs, fake budgets, and invented data.

## Required validation

Run from the repository root:

```sh
bun run validate
```

The release is not ready until the command completes successfully. The command
checks:

- Bun tests
- executable workflow validation
- skill structure validation
- README, examples index, and eval fixture README coverage
- machine-readable eval fixture validation
- publication-safety scanning

## Public-safety review

Confirm public artifacts do not contain:

- secrets, tokens, private-key blocks, or OAuth client secrets
- real account IDs, ad IDs, customer IDs, pixel IDs, file IDs, or catalog IDs
- real customer data, private creative, screenshots, exports, or internal notes
- private local paths, private domains, or hidden prompts
- platform decisions that depend on private account context

## Catalog review

Run:

```sh
bun cli/aw.ts catalog-check
bun cli/aw.ts eval-check
bun cli/aw.ts publication-scan --list
```

Confirm every new workflow, playbook, skill, example, and eval fixture appears
in the appropriate README, examples index, or local eval prompt directory.

## Repository state review

Run:

```sh
git status --short
git diff --check
```

Confirm every modified or untracked release artifact is intentional and will be
included in the release branch or tag. Do not tag from a dirty tree unless the
remaining changes are explicitly out of scope and documented in the handoff.

## Release notes

- Update `CHANGELOG.md` under `Unreleased`.
- Keep wording public-facing and outcome-focused.
- Avoid implementation details that expose private source material.
- Move notes into a versioned heading only when an actual tag or release is
  being prepared.

## Final handoff

The release handoff should include:

- the validation command and result
- the repository-state review result
- a short list of changed workflows, skills, examples, eval fixtures, docs,
  tests, and CLI checks
- any known gaps or intentionally deferred follow-ups
