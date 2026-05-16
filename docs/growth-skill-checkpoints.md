# Growth skill showcase checkpoints

Branch: `codex/growth-skills-showcase-20260516`

This note records public-safe progress for the growth marketing skill showcase
slice. It intentionally omits private paths, client names, account identifiers,
private domains, screenshots, and raw local source material.

## Checkpoints

### 1. Repo and branch safety

- Confirmed the starting tree was clean on `main`.
- Created `codex/growth-skills-showcase-20260516`.
- Preserved the rule that no commits go directly to `main`.

### 2. Research and source review

- Reviewed current repo contract: README, contribution guide, publication
  policy, workflow schema, CLI, templates, examples, workflows, and prior PR
  context.
- Reviewed public examples for long-running Codex goals, repo guidance,
  skill packaging, AGENTS.md-style instructions, and public marketing skill
  libraries.
- Reviewed local growth-marketing raw material only for reusable patterns:
  consent analytics audits, Google Ads upload QA, ad preflight review,
  paid-social launch gates, SEO audits, product marketing context, and growth
  loops.

### 3. Backlog

- Added a ranked public-safe backlog in
  `docs/open-source-growth-skill-backlog.md`.
- Ranked the first five implementation targets:
  `analytics-consent-audit`, `google-ads-upload-qa`,
  `ad-preflight-review`, `paid-social-launch-gate`, and
  `technical-seo-launch-audit`.

### 4. Skills

- Added five skill artifacts under `skills/`.
- Added one synthetic Acme Sleep example under
  `examples/fictional-growth-stack/`.
- Kept all examples fictional with `example.com`, fake IDs, and fake budgets.

### 5. Validation

- Added `aw check-skills`.
- Added `aw new skill <name>` for validator-compliant skill scaffolds.
- Included `check-skills` in `bun run validate`.
- Added tests for valid skill artifacts, mismatched skill names, and forbidden
  private-path patterns.
- Updated the skill template to match the validator.

### 6. Workflows

- Added executable workflows and markdown playbooks for:
  - analytics consent audits
  - Google Ads upload QA
  - ad preflight review
  - paid-social launch gates
  - technical SEO launch audits
- Each workflow declares risk, permissions, side effects, dry-run behavior,
  approval requirements, verification, artifacts, and memory update guidance.

## Current verification command

```sh
bun run validate
```

Expected high-level result:

- 6 Bun tests pass.
- 8 executable workflows validate.
- 5 skill artifacts validate.

## Recommended next PR

Add the next two public-safe strategy/content skills:

1. `product-marketing-context-builder`
2. `growth-loop-diagnosis`

Both should include synthetic examples, clear assumptions, and decision-memo
outputs. They are lower external-risk than paid-media launch skills, but they
still need claim/proof separation.
