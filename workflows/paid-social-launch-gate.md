# Paid social launch gate

Use this workflow before a paid-social campaign is submitted, uploaded, enabled,
scaled, or changed in a platform account.

## Risk level

External-write. The default run is review-only. Platform submission, creative
upload, campaign enablement, event-mapping changes, and budget changes require
explicit approval for the exact action.

## Process

1. Confirm the launch is in review-only mode.
2. Inventory campaigns, ad sets, ads, creatives, destinations, events, and
   budget.
3. Check naming conventions, launch status, objective, optimization event,
   placements, geo, schedule, and budget.
4. Confirm destination pages support the ad claims.
5. Confirm creative dimensions and banned-visual checks.
6. Confirm claims, proof sources, disclaimers, and restricted wording.
7. Confirm sensitive or regulated downstream events are excluded from platform
   optimization.
8. Identify blockers, warnings, passed checks, and rollback path.
9. Produce an approval record draft and stop.

## Output artifact

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

## Verification gate

- Campaign status, objective, destination, claim source, creative fit, event
  mapping, budget, and rollback path are checked separately.
- Unknowns are marked `not verified`.
- Public examples use fictional brands, IDs, URLs, budgets, and claims.
- External platform actions remain approval-gated.

## Failure modes

- Treating a media plan as launch approval.
- Optimizing toward sensitive downstream events without privacy review.
- Changing budget and creative at the same time, making learning hard to
  interpret.
- Uploading creative before claim or disclaimer review.
- Scaling a campaign without a pause or rollback path.
