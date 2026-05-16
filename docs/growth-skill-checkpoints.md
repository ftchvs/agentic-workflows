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
- Ranked eight implementation targets:
  `analytics-consent-audit`, `google-ads-upload-qa`,
  `ad-preflight-review`, `paid-social-launch-gate`,
  `technical-seo-launch-audit`, `product-marketing-context-builder`,
  `growth-loop-diagnosis`, and `social-content-fact-check-rewrite`.

### 4. Skills

- Added eight skill artifacts under `skills/`.
- Added one synthetic Acme Sleep example under
  `examples/fictional-growth-stack/`.
- Added synthetic eval prompts and a scoring rubric under
  `examples/growth-skill-evals/`.
- Kept all examples fictional with `example.com`, fake IDs, and fake budgets.

### 5. Validation

- Added `aw check-skills`.
- Added `aw new skill <name>` for validator-compliant skill scaffolds.
- Added `aw publication-scan` for repo-wide public-safety checks across
  public-facing files.
- Added `aw publication-scan --list` to show scan coverage.
- Included `check-skills` and `publication-scan` in `bun run validate`.
- Added tests for valid skill artifacts, mismatched skill names, and forbidden
  private-path patterns in skills and public-facing files.
- Updated the skill template to match the validator.

### 6. Workflows

- Added executable workflows and markdown playbooks for:
  - analytics consent audits
  - Google Ads upload QA
  - ad preflight review
  - paid-social launch gates
  - technical SEO launch audits
  - product marketing context building
  - growth loop diagnosis
  - social content fact-check rewrites
  - multi-skill growth launch readiness
- Each workflow declares risk, permissions, side effects, dry-run behavior,
  approval requirements, verification, artifacts, and memory update guidance.

## Current verification command

```sh
bun run validate
```

Expected high-level result:

- 10 Bun tests pass.
- 12 executable workflows validate.
- 8 skill artifacts validate.
- 65 publication files pass the public-safety scan.

## Recommended next PR

Add deeper quality infrastructure for the public-safe growth skill set:

1. Add machine-readable eval fixtures once the repo has a clear evaluator
   contract.
2. Add a generated examples index so new showcase material is easier to scan.
3. Add a lightweight changelog once the first public PR is ready.

These should stay dependency-free unless a clear validator gap requires a small
new parser.
