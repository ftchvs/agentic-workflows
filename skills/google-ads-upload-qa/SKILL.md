---
name: google-ads-upload-qa
description: Review Google Ads bulk upload packages before posting them. Use when the user mentions Google Ads Editor, bulk upload CSV or XLSX files, responsive search ads, keywords, campaigns, ad groups, sitelinks, structured snippets, negative keywords, conversion actions, or paid-search launch QA.
license: CC-BY-4.0
metadata:
  category: growth-marketing
  authority: external_write_requires_approval
---

# Google Ads Upload QA

Use this skill to inspect a Google Ads upload package before anything is posted
to an ad account.

## Goal

Produce a no-post QA report that confirms the upload is safe to preview and
names any blockers before account changes happen.

## Inputs

- Upload files: CSV, XLSX, or exported editor sheets.
- Campaign objective and market.
- Landing pages and final URL rules.
- Budget and paused-by-default expectation.
- Conversion action setup requirements.
- Claim, policy, and brand guardrails.

Use synthetic values in public examples:

- brand: `Acme Sleep`
- customer ID: `000-000-0000`
- conversion ID: `AW-123456789`
- conversion label: `exampleSignupLabel`
- final URL: `https://www.example.com/signup`
- daily budget: `$50`

## Authority

`external_write_requires_approval`

The skill may read local upload files and draft QA reports. It must not post
changes, create conversion actions, enable campaigns, change budgets, or mutate
an ad account without explicit approval for the exact action.

## Procedure

1. Confirm that the requested work is review-only unless the user explicitly
   asks for an external action.
2. Inventory sheets and files: campaigns, ad groups, keywords, ads, assets,
   negative keywords, and shared lists.
3. Check upload order and dependencies.
4. Verify all campaigns, ad groups, ads, and assets are paused unless launch
   approval says otherwise.
5. Verify budgets, bid strategy, geo, language, network settings, and dates
   match the brief.
6. Verify final URLs use approved domains and route to the intended landing
   pages.
7. Check responsive search ads for enough unique headlines and descriptions,
   no duplicate pinning conflicts, and no unsupported claims.
8. Check keyword match types, negatives, competitor terms, and low-intent terms.
9. Check that sitelinks, callouts, and structured snippets match the offer.
10. Verify conversion readiness separately from upload readiness.
11. Produce a QA report with blockers, warnings, pass items, and approval
    requirements.

## Verification Gate

The report must explicitly check:

- upload file inventory
- preview-before-posting path
- campaign/ad group/ad status
- budget and bid strategy
- final URLs and domains
- conversion action readiness
- keyword match types
- negative keywords
- ad copy claim guardrails
- asset extensions
- policy-sensitive terms
- customer ID presence or intentional blank state

Mark any unknown as `not verified`, not as passed.

## Approval Gates

Stop for explicit human approval before:

- posting pending changes in Google Ads Editor
- uploading through the Google Ads UI
- creating or editing conversion actions
- changing production conversion tags or environment variables
- enabling campaigns, ad groups, ads, or assets
- changing budgets, bids, targeting, or account settings

Use `templates/approval-record-template.md` for the exact approval record.

## Output

```md
# Google Ads upload QA: <package>

## Summary

## File inventory

## Upload order

## Blocking issues

## Warnings

## Passed checks

## Conversion readiness

## Approval required

## Preview checklist

## Verification
```

## Public-Safe Example

Scenario: Acme Sleep is preparing a paused search-campaign upload for a new
sleep coaching waitlist.

Safe findings:

- Campaigns are paused by default.
- Customer ID is intentionally blank in the public example.
- Final URLs all use `https://www.example.com`.
- Conversion readiness is not verified because no real ad account access was
  used.
- The report says "preview in Google Ads Editor before posting" and stops.

Unsafe notes to remove before publishing:

- real customer IDs
- real budgets
- real conversion labels
- private account screenshots
- real competitor keyword lists
- private landing-page URLs
