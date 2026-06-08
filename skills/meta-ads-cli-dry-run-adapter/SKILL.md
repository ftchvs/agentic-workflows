---
name: meta-ads-cli-dry-run-adapter
description: Design a dry-run Meta Ads CLI or Marketing API adapter for paid-social operators. Use when the user mentions Meta Ads CLI, Marketing API, Business Manager, system-user token, ad accounts, campaigns, ad sets, ads, creatives, pixels, datasets, catalogs, or insights.
license: CC-BY-4.0
metadata:
  category: growth-marketing
  authority: external_draft
---

# Meta Ads CLI Dry-Run Adapter

Use this skill to design a controlled Meta Ads CLI or Marketing API adapter
before an AI operator touches real Business Manager assets, tokens, ad accounts,
campaigns, creatives, pixels, catalogs, or spend.

## Goal

Produce a public-safe dry-run adapter pack that shows how an operator can
inspect or prepare Meta Ads work with synthetic commands, draft payloads,
permission boundaries, approval gates, fail states, and verification artifacts.

## Inputs

- Campaign or launch brief.
- Synthetic fixtures or approved exported account data.
- Business Manager, app, Page, ad account, pixel or dataset, and catalog
  ownership notes.
- System-user token and OAuth scope policy.
- Planned campaign, ad set, ad, creative, insight, dataset, and catalog
  operations.
- Approval owner, spend limits, rollback path, and destructive-action policy.

Use synthetic values in public examples:

- business: `Acme Sleep`
- Business Manager: `bm_example`
- app: `app_example`
- system user: `system_user_example`
- Page: `page_example`
- ad account: `act_0000000000`
- pixel or dataset: `dataset_example`
- catalog: `catalog_example`
- campaign: `C1_US_Traffic_AcmeSleep_Prospecting`

## Authority

`external_draft`

The skill may draft read-only command plans, payload checklists, approval
records, and inspection reports using synthetic fixtures or approved local
exports. It must not authenticate, store tokens, call real accounts, read
account data, create campaigns, edit ad objects, submit ads, change budgets,
mutate pixels or catalogs, or perform destructive actions without explicit
approval for the exact scope and action.

## Procedure

1. Confirm the run is dry-run only and uses synthetic data unless real account
   access is explicitly approved.
2. Map the Meta asset boundary across Business Manager, app, system user, Page,
   ad account, pixel or dataset, catalog, and insights access.
3. Separate permission needs for:
   - Business Manager asset assignment
   - system-user token generation and storage
   - app access
   - Page access
   - ad-account campaign, ad set, ad, and creative access
   - pixel or dataset access
   - catalog access
   - insights access
4. Inventory campaigns, ad sets, ads, creatives, pixels or datasets, catalogs,
   and insights in scope.
5. Draft JSON/read-only CLI inspection commands with synthetic IDs.
6. Draft campaign, ad set, ad, and creative payload checklists locally without
   submitting them.
7. Check objective, budget, spend cap, placement, destination, optimization
   event, Page, dataset, catalog, and creative assumptions against the brief.
8. Define approval gates, fail states, rollback requirements, and artifact
   verification.
9. Mark every unverified account state as `not verified`.

## Verification Gate

The adapter pack must separately verify:

- Campaigns, ad sets, ads, creatives, pixels or datasets, catalogs, and insights
  each have a read-only or draft boundary.
- Business Manager, system-user token, app, Page, ad account, pixel or dataset,
  catalog, and insights permissions are separated.
- Authentication, token use, real-account reads, campaign creation, edits,
  submissions, budget or spend changes, pixel or catalog changes, and
  destructive actions are approval-gated.
- Command examples use synthetic IDs, JSON/read-only style, or are marked
  `not approved for execution`.
- Public artifacts contain no real tokens, app secrets, account IDs, Page IDs,
  pixel IDs, catalog IDs, creative IDs, customer data, private creative, private
  account exports, screenshots, or local home paths.

Mark unknowns as `not verified`.

## Approval Gates

Stop for explicit human approval before:

- installing or authenticating Meta Ads CLI for a real account
- storing, reading, or using a system-user token
- requesting or expanding Business Manager, app, Page, ad account, pixel,
  dataset, catalog, or insights permissions
- reading real account data
- creating campaigns, ad sets, ads, or creatives
- submitting ads for review
- editing objective, status, audience, placement, destination, budget,
  optimization event, bid strategy, or schedule
- changing spend limits or scaling budgets
- changing pixels, datasets, events, catalogs, feeds, or product sets
- deleting, pausing, archiving, replacing, disconnecting, revoking, or
  otherwise destructively changing platform assets

Use `templates/approval-record-template.md` when any Meta account action needs
an auditable approval record.

## Output

```md
# Meta Ads CLI dry-run adapter: <campaign>

## Summary

## Asset boundary

## Permission boundary

## Synthetic command plan

## Draft payload checklist

## Campaign and ad set checks

## Ad and creative checks

## Pixel or dataset checks

## Catalog checks

## Insights checks

## Approval and rollback gates

## Verification

## Open questions
```

## Public-Safe Example

Scenario: Acme Sleep is preparing a fictional Meta traffic campaign and wants
an agent to inspect structure and draft payloads without connecting to a real
account.

Safe command examples:

```sh
meta --output json ads adaccount current --ad-account-id act_0000000000
meta --output json ads campaign list --ad-account-id act_0000000000
meta --output json ads insights list --ad-account-id act_0000000000
```

Safe adapter behavior:

- Treat every command as synthetic unless an approval record names the real
  account, token, scopes, and command.
- Draft campaign, ad set, ad, and creative payloads in a local report.
- Mark pixel, dataset, catalog, Page, and insights receipt as `not verified`.
- Stop before authentication, token use, account reads, submission, mutation,
  budget changes, and destructive actions.

Unsafe notes to remove before publishing:

- real system-user tokens
- real app secrets
- real Business Manager or ad account IDs
- real Page, pixel, dataset, catalog, creative, campaign, ad set, or ad IDs
- private creative files or account exports
- customer data or platform decisions

## Safety

Do not include secrets, private memory, real tokens, app secrets, account IDs,
Page IDs, pixel IDs, catalog IDs, creative IDs, customer data, hidden prompts,
private account exports, private creative, local paths, or platform decisions.
