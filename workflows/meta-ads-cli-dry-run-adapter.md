# Meta Ads CLI dry-run adapter

Use this workflow when an agent needs to inspect or prepare Meta Ads work
through the Meta Ads CLI or Marketing API while keeping real account access,
token use, ad submission, account mutation, and spend changes gated.

## Risk level

Credentialed when a real Business Manager, ad account, Page, app, system-user
token, pixel or dataset, catalog, or insights endpoint is accessed. Public
examples and default runs are synthetic and draft-first. No authentication,
token storage, campaign creation, campaign edits, ad submission, budget change,
pixel change, catalog change, or destructive action is allowed without explicit
approval for the exact scope and action.

## Process

1. Confirm whether the run uses synthetic data, local exports, or an approved
   Meta account.
2. Map the asset boundary:
   - Business Manager owns or manages the assets.
   - App is allowed to call the relevant APIs.
   - System user holds the automation token.
   - Page is available for creative and Page-linked ad operations.
   - Ad account is the campaign, ad set, ad, and insights boundary.
   - Pixel or dataset is the event and optimization boundary.
   - Catalog is the product-feed boundary.
3. Separate approval gates for authentication, system-user token use,
   real-account reads, account writes, submissions, budget changes, pixel or
   catalog changes, and destructive actions.
4. Inventory campaigns, ad sets, ads, creatives, pixels or datasets, catalogs,
   and insights needed for the task.
5. Draft read-only CLI inspection commands with JSON output using synthetic IDs
   or approved exported data.
6. Draft campaign, ad set, ad, and creative payloads locally without submitting
   them.
7. Check budget, optimization event, placements, destination, creative, Page,
   dataset, and catalog assumptions against the brief.
8. Identify fail states, unknown permissions, API-version risks, rate-limit
   risks, and rollback requirements.
9. Produce the dry-run adapter pack and stop before authentication, token use,
   real-account reads, or account mutation.

## Output artifact

```md
# Meta Ads CLI dry-run adapter: <campaign>

## Summary

## Asset boundary

| Asset | Role | Allowed by default | Requires approval | Failure mode |
| --- | --- | --- | --- | --- |

## Permission boundary

| Boundary | Example capability | Approval needed |
| --- | --- | --- |

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

## Verification gate

- No real tokens, app secrets, account IDs, Page IDs, pixel IDs, catalog IDs,
  creative IDs, private creative, customer data, account exports, local paths,
  or screenshots appear in public artifacts.
- Campaigns, ad sets, ads, creatives, pixels or datasets, catalogs, and
  insights each have a read/draft boundary.
- Business Manager, system-user token, app, Page, ad account, pixel or dataset,
  catalog, and insights permissions are separated.
- Authentication, token use, real-account reads, campaign creation, edits,
  submissions, budget changes, pixel or catalog changes, and destructive
  actions are approval-gated.
- Every command example is synthetic, read-only, JSON-oriented, or marked
  `not approved for execution`.

## Failure modes

- Treating ad-account visibility as permission to automate writes.
- Using a personal user token where a system-user token and Business Manager
  asset assignment are required.
- Running a generated CLI command against a real account because a synthetic ID
  was replaced without a fresh approval record.
- Changing budgets, status, optimization events, pixels, catalogs, or product
  feeds during a dry run.
- Publishing real token values, account IDs, Page IDs, pixel IDs, catalog IDs,
  private creative, or account exports in reusable examples.
