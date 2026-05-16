# Open-source growth skill backlog

This backlog ranks public-safe growth marketing skills that fit the repository
thesis: repo-native operating files for controlled AI work.

The goal is not to publish prompt dumps. Each candidate should become a durable
skill or workflow with:

- explicit inputs
- authority boundaries
- approval gates
- verification steps
- synthetic examples
- reusable artifacts

## Sources reviewed

Public sources:

- OpenAI Codex goal, customization, skills, and AGENTS.md guidance:
  https://developers.openai.com/codex/use-cases/follow-goals and
  https://developers.openai.com/codex/concepts/customization
- OpenAI Codex best practices:
  https://developers.openai.com/codex/learn/best-practices
- Agent Skills specification:
  https://agentskills.io/specification
- Claude Code skills documentation:
  https://code.claude.com/docs/en/skills
- AGENTS.md reference repository:
  https://github.com/agentsmd/agents.md
- Public marketing skill libraries:
  https://github.com/kostja94/marketing-skills,
  https://github.com/ericosiu/ai-marketing-skills, and
  https://github.com/robertbstillwell/marketing-skills

Local raw material reviewed and generalized:

- Personal and archived marketing skills for analytics, SEO, paid ads, social
  content, product marketing context, growth loops, and programmatic SEO.
- A local ad preflight project with policy-as-code, evals, policy coverage,
  research-loop, and local-first trust documentation.
- Local Google Ads upload notes for staged campaign CSV/XLSX review, conversion
  readiness, paused-by-default launches, and guardrail checks.
- Local consent and analytics debugging notes for same-tab consent updates,
  localStorage consent state, dataLayer checks, extension interference, and
  event verification.
- Local paid-social campaign planning notes for campaign build, launch
  measurement, creative review, claim ledgers, and sensitive-event exclusions.
- Local marketing command playbooks for research, strategy, creative,
  execution, analytics, and media planning.

All private names, client/employer references, account identifiers, private
domains, budgets, screenshots, and local paths must be rewritten before any
material is committed here. Use fictional examples such as Acme Sleep,
example.com URLs, fake ad IDs, fake GA4 IDs, and fake campaign budgets.

## Ranking

1. **analytics-consent-audit**
   - Value: High. Tracking and consent failures directly affect attribution,
     paid-media learning, and privacy posture.
   - Repo fit: Excellent. It is an operating loop with read-only diagnosis,
     browser/runtime checks, concrete artifacts, and no default external write.
   - Public-safe rewrite: Replace all site-specific names, storage keys, and
     URLs with Acme Sleep and example.com.
   - Verification gate: Separate consent default, stored preference, runtime
     script load, event dispatch, platform receipt, extension behavior, and
     privacy-page controls.
   - Risk: Credentialed or production analytics access must be optional and
     approval-gated.
   - Recommended first artifact: skill plus fictional debugging example.

2. **google-ads-upload-qa**
   - Value: High. Bulk upload mistakes can spend money, launch broken ads, or
     create campaigns before conversion tracking is ready.
   - Repo fit: Strong. The workflow can inspect upload files, check launch
     defaults, verify guardrails, and produce a no-post approval record.
   - Public-safe rewrite: Use fake campaign names, fake customer IDs, fake
     budgets, fake conversion IDs, and example.com landing pages.
   - Verification gate: Upload order, paused status, conversion action
     readiness, final URLs, negative keywords, claims, policy guardrails, and
     preview-before-posting.
   - Risk: Posting uploads or mutating a Google Ads account is an external
     write and must stop for explicit approval.

3. **ad-preflight-review**
   - Value: High. A local preflight skill can catch risky ad copy, landing-page
     mismatch, regulated claims, disclosure gaps, and missing evidence before
     launch.
   - Repo fit: Strong. It models deterministic review language, source notes,
     eval rows, false-positive discipline, and local-first trust.
   - Public-safe rewrite: Do not copy policy rows or real examples from private
     work. Use fictional ads, paraphrased public policy-style examples, and
     conservative review labels.
   - Verification gate: Every high-risk finding needs a cited rule, a safer
     rewrite suggestion, and a human-review path. Synthetic fixtures should
     include positive and near-miss cases.
   - Risk: Must avoid legal/platform approval guarantees.

4. **paid-social-launch-gate**
   - Value: High for teams moving from creative to media buying.
   - Repo fit: Strong, but slightly larger than the first PR because it touches
     creative, claim substantiation, event mapping, and launch approvals.
   - Public-safe rewrite: Use fictional campaign names, anonymized claims, and
     generic sensitive-event exclusions.
   - Verification gate: Destination claim alignment, source-backed claims,
     allowed events, excluded sensitive events, budget splits, naming
     convention, creative dimensions, and final approval record.
   - Risk: Platform account creation and launch actions are external writes.

5. **technical-seo-launch-audit**
   - Value: Medium-high. Search crawl, sitemap, canonical, robots, metadata,
     structured data, and page-speed regressions are repeatable checks.
   - Repo fit: Strong. It can extend existing SEO and website-audit skills into
     a tighter launch gate with public-safe examples.
   - Public-safe rewrite: Replace all real domains and product metadata.
   - Verification gate: Rendered source, sitemap, robots, canonical URLs,
     schema, noindex rules, redirects, and crawlability.
   - Risk: Live-site auditing makes network requests; external fixes require
     separate approval.

6. **product-marketing-context-builder**
   - Value: Medium-high. Many marketing skills degrade without stable product,
     audience, proof, and voice context.
   - Repo fit: Strong as a foundational context artifact.
   - Public-safe rewrite: Publish a template and synthetic Acme Sleep context,
     not any real product profile.
   - Verification gate: Context must distinguish facts, assumptions, claims,
     proof points, and forbidden language.

7. **growth-loop-diagnosis**
   - Value: Medium. Useful for strategy, but less immediately verifiable than
     consent, upload QA, or preflight review.
   - Repo fit: Good when framed as a decision memo and model of assumptions,
     metrics, and loop health.
   - Public-safe rewrite: Use fictional metrics and toy examples.
   - Verification gate: Separate retention, activation, acquisition loop,
     monetization loop, and measurement confidence.

8. **social-content-fact-check-rewrite**
   - Value: Medium. Helpful for public posting, but the biggest value comes
     from approval gates and claim verification rather than generation.
   - Repo fit: Good as an external-draft workflow.
   - Public-safe rewrite: Use fictional posts and generic claims.
   - Verification gate: Claims cited or marked as opinion, no private details,
     external-action approval before posting.

## Initial implementation slice

Start with the first three skills in small commits:

1. Add `analytics-consent-audit` with a synthetic Acme Sleep example.
2. Add `google-ads-upload-qa` with a paused-by-default upload QA checklist.
3. Add `ad-preflight-review` with conservative policy and claim-review
   language.

Add a minimal skill validation command only if it reinforces the public safety
contract. The first useful version should validate:

- `skills/<name>/SKILL.md` exists.
- frontmatter includes `name` and `description`.
- `name` matches the parent directory.
- skill names use lowercase kebab-case.
- descriptions are non-empty and under 1024 characters.

Future versions can add coverage reporting for publication-safety checks and
additional public-safe fixtures for non-synthetic example detection.

## Branch implementation status

The first implementation branch added all eight ranked skills:

- skill artifacts for `analytics-consent-audit`, `google-ads-upload-qa`,
  `ad-preflight-review`, `paid-social-launch-gate`, and
  `technical-seo-launch-audit`, `product-marketing-context-builder`,
  `growth-loop-diagnosis`, and `social-content-fact-check-rewrite`
- a synthetic Acme Sleep growth-stack example
- executable workflows and markdown playbooks for the same eight workflows
- `aw check-skills`
- `aw publication-scan` across public-facing repo artifacts
- skill validator coverage for frontmatter, required operating sections, name
  consistency, and obvious unsafe publication patterns
- publication-scan coverage for private paths, common token shapes,
  non-example emails, and real-looking ad/tracking IDs
- an updated skill template that matches the validator

Recommended next PR: add synthetic eval prompts for each growth skill, create
one multi-skill launch playbook that chains context, preflight, launch,
analytics, and learning artifacts, and add publication-scan coverage reporting.
