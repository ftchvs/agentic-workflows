# Changelog

## Unreleased

### Added

- `aw inventory` to summarize public workflow, skill, and example assets.
- A five-minute README tour for validating and evaluating the repo quickly.
- Package metadata for repository links, issue links, keywords, and Bun engine
  expectations.
- Public-safe growth marketing skill drafts for analytics consent audits,
  Google Ads upload QA, ad preflight review, paid social launch gating,
  technical SEO launch audits, product marketing context, growth loop
  diagnosis, and social content fact-check rewrites.
- A public-safe Google Workspace operator pack for draft-first SMB workflows
  across Sheets, Drive/Docs, Calendar, and Gmail.
- A public-safe Meta Ads CLI dry-run adapter for planning Marketing API work
  without default account access or spend mutation.
- Executable workflow files and markdown playbooks for the growth skill set,
  plus Workspace operator, Meta CLI adapter, and multi-skill growth launch
  readiness workflows.
- Synthetic Acme Sleep, Acme Repair, and Meta CLI examples, growth skill eval
  prompts, and an examples index.
- Machine-readable growth skill eval fixtures covering analytics consent
  audits, Google Ads upload QA, ad preflight review, growth loop diagnosis,
  paid-social launch gating, product marketing context building, social content
  fact-check rewrites, and technical SEO launch audits.
- Machine-readable operator eval fixtures for Google Workspace draft-first
  boundaries and Meta Ads CLI dry-run account, token, budget, pixel, catalog,
  submission, and destructive-action gates.
- `aw check-skills` for skill metadata, required sections, and obvious
  publication-policy issues.
- `aw publication-scan` and `aw publication-scan --list` for repo-wide
  public-safety checks and scan coverage visibility.
- `aw catalog-check` for README, examples-index, and eval fixture README
  coverage across workflows, skills, examples, and eval fixtures.
- `aw eval-check` for machine-readable eval fixture shape, skill references,
  stop conditions, and public-safety checks.
- `aw new skill <name>` for validator-compliant skill scaffolding.
- A public release checklist for validation, catalog review, public-safety
  review, repository-state review, release notes, and final handoff.

### Changed

- The README now includes a growth marketer quick path across context, consent,
  ad preflight, paid-social launch, Workspace operator, and Meta dry-run
  workflows.
- The public release gate now points to `bun run validate` and clarifies what
  the built-in publication scan covers.
- Credentialed workflow validation now rejects placeholder required-permission
  or approval-gate values.

### Safety

- All committed growth examples use fictional brands, `example.com` URLs, fake
  IDs, fake budgets, and synthetic claims.
- `aw publication-scan` now flags real-looking Google OAuth client IDs, Meta
  access-token shapes, Meta ad account IDs, and private-key blocks in addition
  to existing private path, token, email, Google Ads, and GA4 checks.
- External publishing, posting, account mutation, campaign enablement, and
  spend changes remain approval-gated in the workflow artifacts.
- Gmail sends, Calendar invitations, Drive permission changes, Docs edits,
  Sheets writes, credential changes, and OAuth scope expansion remain
  approval-gated in the Workspace operator artifacts.
- Meta CLI authentication, system-user token use, real account reads, campaign
  creation, ad submission, budget changes, pixel or catalog changes, and
  destructive ad-account actions remain approval-gated in the Meta artifacts.
