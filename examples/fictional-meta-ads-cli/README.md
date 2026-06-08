# Fictional Meta Ads CLI example

Scenario: Acme Sleep is a fictional sleep coaching product preparing a small
Meta traffic campaign. The team wants an AI operator to inspect planned
structure, draft payloads, and produce approval records without authenticating
or touching a real ad account by default.

Use these artifacts together:

1. `meta-ads-cli-dry-run-adapter` to map the CLI and Marketing API boundary.
2. `paid-social-launch-gate` to review launch readiness before submission or
   spend changes.
3. `external-action-gate` before any real authentication, read, write,
   submission, budget change, pixel change, catalog change, or destructive
   action.

## Synthetic Meta surface

- Business Manager: `bm_example`
- App: `app_example`
- System user: `system_user_example`
- Page: `page_example`
- Ad account: `act_0000000000`
- Pixel or dataset: `dataset_example`
- Catalog: `catalog_example`
- Campaign: `C1_US_Traffic_AcmeSleep_Prospecting`
- Destination: `https://www.example.com/sleep-check`
- Daily budget: `$50`

## Asset boundary

| Asset | Role | Allowed by default | Requires approval |
| --- | --- | --- | --- |
| Business Manager | Owns or manages assets | synthetic mapping | real asset assignment |
| App | API caller boundary | synthetic app notes | app install or permission changes |
| System user | Automation principal | no token use | token generation, storage, or use |
| Page | Creative/Page identity | synthetic Page name | real Page read or ad use |
| Ad account | Campaign boundary | synthetic IDs only | real account read or mutation |
| Pixel or dataset | Event and optimization boundary | mark as not verified | event, dataset, or pixel changes |
| Catalog | Product feed boundary | synthetic catalog notes | feed, product set, or catalog changes |
| Insights | Reporting boundary | synthetic output shape | real account insight queries |

## Synthetic command plan

These examples are documentation-only and use fake IDs:

```sh
meta --output json ads adaccount current --ad-account-id act_0000000000
meta --output json ads campaign list --ad-account-id act_0000000000
meta --output json ads adset list --ad-account-id act_0000000000
meta --output json ads creative list --ad-account-id act_0000000000
meta --output json ads insights list --ad-account-id act_0000000000
```

Allowed by default:

- draft command plans with fake IDs
- inspect synthetic JSON fixtures
- prepare local payload checklists

Requires approval:

- authenticating the CLI
- reading or storing a system-user token
- replacing fake IDs with real account IDs
- running commands against real accounts

## Draft payload checklist

```md
# Meta campaign payload checklist: Acme Sleep

## Campaign
- Objective: traffic
- Status: draft only
- Destination: https://www.example.com/sleep-check

## Ad set
- Budget: $50 per day
- Optimization event: landing page view
- Pixel or dataset: not verified
- Placements: not verified

## Ad and creative
- Page: not verified
- Creative: draft only
- Claims: requires preflight review
```

## Approval gates

Stop before:

- Meta Ads CLI authentication
- token generation, storage, or use
- real-account reads
- campaign, ad set, ad, or creative creation
- ad submission
- budget or spend changes
- pixel, dataset, event, catalog, feed, or product-set changes
- deleting, pausing, archiving, replacing, disconnecting, or revoking assets

## Fail states

- The system user has ad-account access but not Page access.
- The Page is available but the pixel or dataset is not assigned.
- The campaign draft references an unverified destination.
- Insights commands return data for the wrong account.
- A synthetic command is copied into a real shell without an approval record.

## Output artifact

```md
# Meta Ads CLI dry-run adapter: Acme Sleep traffic test

## Summary
- Synthetic command plan drafted.
- No real CLI authentication was used.
- All account reads and mutations require approval.

## Blocking issues
- Pixel or dataset receipt is not verified.
- Page access is not verified.
- Catalog access is not verified.

## Approval required
- Approve exact token, scopes, account, command, and output handling before
  real read-only inspection.
- Approve exact payload, budget, status, and rollback path before any mutation.
```

## Verification

- All businesses, apps, system users, Pages, ad accounts, datasets, catalogs,
  campaigns, and commands are fictional.
- URLs use `example.com`.
- No real tokens, app secrets, account IDs, Page IDs, pixel IDs, catalog IDs,
  creative IDs, customer data, account exports, screenshots, or local file
  paths appear.
- The operator produces command plans, draft payloads, and approval records,
  then stops before authentication or external action.
