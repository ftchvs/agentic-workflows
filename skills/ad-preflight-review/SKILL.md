---
name: ad-preflight-review
description: Preflight ad copy, landing pages, claims, disclosures, creative metadata, and launch materials before ads ship. Use when the user mentions ad review, paid social preflight, Meta Ads, Google Ads, LinkedIn Ads, TikTok Ads, landing-page mismatch, regulated claims, testimonials, health claims, financial claims, or creative compliance review.
license: CC-BY-4.0
metadata:
  category: growth-marketing
  authority: external_draft
---

# Ad Preflight Review

Use this skill to review ad materials before a growth team submits or launches
them.

## Goal

Produce a conservative preflight report that helps a human decide what to
revise, substantiate, approve, or escalate before launch.

The skill does not provide legal advice and does not guarantee platform
approval.

## Inputs

- Ad copy, headlines, descriptions, scripts, or creative metadata.
- Landing page URL or landing-page extract.
- Platform and market.
- Campaign objective and target audience.
- Claim ledger or proof source for factual claims.
- Known policy, privacy, brand, and legal guardrails.

Use synthetic values in public examples:

- brand: `Acme Sleep`
- platform: `Meta Ads`
- market: `US`
- landing page: `https://www.example.com/sleep-check`
- fictional claim source: `examples/acme-claims.csv`

## Authority

`external_draft`

The skill may draft review notes, safer copy, QA checklists, and approval
records. It must not submit ads, publish pages, contact platforms, upload
creative, or change campaign settings.

## Procedure

1. Confirm platform, market, objective, landing page, and launch status.
2. Inventory every reviewed asset and assign a stable local ID.
3. Extract claims: performance, health, finance, availability, pricing,
   comparison, testimonial, social proof, and urgency.
4. Check each claim against the provided proof source. Mark missing proof as
   `needs_review`.
5. Compare ad claims with landing-page claims and offer terms.
6. Check policy-sensitive categories: personal attributes, health or appearance
   outcomes, financial products, housing, employment, restricted products,
   data privacy, testimonials, and disclosures.
7. Check creative metadata for banned or risky visual patterns if supplied.
8. Produce a decision for each asset:
   - `approved`
   - `needs_review`
   - `high_risk`
9. Suggest minimal safer rewrites that preserve intent without adding new
   unsupported claims.
10. Name the approval required before launch or upload.

## Verification Gate

Every finding must include:

- asset ID
- decision
- reason
- evidence from the reviewed material
- recommended action
- whether human approval is required

Every high-risk or needs-review item should be traceable to at least one review
concern, such as unsupported claim, landing-page mismatch, missing disclosure,
regulated-category review, sensitive data event, or banned creative pattern.

Do not tune the review to make all ads pass. Near-miss examples are useful
because they reduce false positives.

## Approval Gates

Stop for explicit human approval before:

- submitting ads to a platform
- uploading creative assets
- changing landing pages
- enabling campaigns or ad sets
- publishing revised copy externally
- changing platform event mapping
- using real customer or testimonial claims

Use `workflows/external-action-gate.workflow.yml` before any external action.

## Output

```md
# Ad preflight review: <campaign>

## Summary

## Reviewed assets

| Asset ID | Platform | Destination | Decision | Reason |
| --- | --- | --- | --- | --- |

## Findings

| Severity | Asset ID | Concern | Evidence | Recommended action |
| --- | --- | --- | --- | --- |

## Safer rewrites

## Landing-page alignment

## Approval required

## Verification

## Limits
```

## Public-Safe Example

Scenario: Acme Sleep wants to run a fictional paid-social ad that says a sleep
check "predicts your sleep disorder risk in one minute."

Safe preflight result:

- Decision: `high_risk`.
- Concern: medical-style prediction and unsupported health claim.
- Safer rewrite: "Explore educational sleep-health signals in about one
  minute. Informational only."
- Approval required: legal and platform-policy review before any submission.

Unsafe notes to remove before publishing:

- real ad account names
- real customer claims
- real patient or health data
- private claim ledgers
- private creative screenshots
- private platform policy interpretations presented as approval guarantees
