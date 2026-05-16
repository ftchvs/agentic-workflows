---
name: paid-social-launch-gate
description: Prepare a paid-social launch checklist and approval gate before campaigns go live. Use when the user mentions Meta Ads, LinkedIn Ads, TikTok Ads, paid-social launch, campaign activation, creative approval, event mapping, claim substantiation, launch checklist, or scaling a paid-social test.
license: CC-BY-4.0
metadata:
  category: growth-marketing
  authority: external_write_requires_approval
---

# Paid Social Launch Gate

Use this skill to turn paid-social launch readiness into a reviewable approval
artifact before any platform-visible action happens.

## Goal

Produce a launch gate that verifies campaign structure, creative readiness,
claims, destinations, tracking events, excluded sensitive events, and approval
requirements before a paid-social campaign is submitted, enabled, or scaled.

## Inputs

- Campaign brief and objective.
- Platform, market, placements, and budget.
- Campaign, ad set, and ad names.
- Creative assets and dimensions.
- Copy, claims, disclaimers, and proof source.
- Destination URLs.
- Event mapping and measurement plan.
- Known legal, privacy, brand, and platform guardrails.

Use synthetic values in public examples:

- brand: `Acme Sleep`
- platform: `Meta Ads`
- campaign: `C1_US_Traffic_AcmeSleep_Prospecting`
- destination: `https://www.example.com/sleep-check`
- event: `landing_page_view`
- budget: `$50/day`

## Authority

`external_write_requires_approval`

The skill may draft launch checklists, QA findings, approval records, and safer
launch recommendations. It must not submit ads, upload creative, enable
campaigns, edit event mappings, or change budgets without approval for the
exact action.

## Procedure

1. Confirm the launch is in review mode unless explicit approval is later
   granted.
2. Inventory campaign, ad set, ad, creative, destination, event, and budget
   inputs.
3. Verify naming conventions and launch status.
4. Confirm campaign objective and optimization event match the measurement plan.
5. Confirm destinations are approved and support the ad claims.
6. Confirm creative assets have required dimensions and no banned visual
   patterns.
7. Confirm copy, claims, disclaimers, and proof sources are reviewed.
8. Confirm event mapping excludes sensitive downstream or regulated events.
9. Confirm budget, audience, geo, placement, and schedule settings.
10. Produce blockers, warnings, passed checks, and an exact approval record.

## Verification Gate

The launch gate must separately verify:

- campaign/ad set/ad status
- objective and optimization event
- approved destinations
- claim substantiation
- disclaimers and restricted wording
- creative dimensions and placement fit
- sensitive-event exclusions
- budget and schedule
- rollback or pause path
- approval record for the exact platform-visible action

Mark unknowns as `not verified`.

## Approval Gates

Stop for explicit human approval before:

- submitting ads for review
- uploading creative
- enabling campaigns, ad sets, or ads
- changing objective, optimization event, budget, audience, placement, or
  schedule
- changing pixel, conversion API, or event mapping
- publishing landing-page changes
- scaling spend

Use `templates/approval-record-template.md` for the launch approval record.

## Output

```md
# Paid-social launch gate: <campaign>

## Summary

## Campaign inventory

## Blocking issues

## Warnings

## Passed checks

## Measurement and event mapping

## Claim and destination alignment

## Approval required

## Verification
```

## Public-Safe Example

Scenario: Acme Sleep is launching a fictional traffic campaign on Meta Ads.

Safe gate result:

- Campaign and ads are paused.
- Destination uses `https://www.example.com`.
- Optimization is `landing_page_view`.
- Sensitive downstream events such as questionnaire answers and health-derived
  results are excluded.
- The report stops before upload, submission, enablement, or spend scaling.

Unsafe notes to remove before publishing:

- real platform account names
- real pixel IDs
- real budgets
- private creative screenshots
- real customer claims
- private landing-page URLs
