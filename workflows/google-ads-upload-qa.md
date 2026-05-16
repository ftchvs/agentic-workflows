# Google Ads upload QA

Use this workflow before posting a Google Ads bulk upload from Google Ads
Editor, CSV files, XLSX workbooks, or account-import sheets.

## Risk level

External-write. The default run is local review only. Posting pending changes,
creating conversion actions, enabling campaigns, or changing budgets requires
explicit approval for the exact account and exact upload.

## Process

1. Confirm that the package is in review-only mode.
2. Inventory the files and sheets.
3. Check upload order: campaigns, ad groups, negatives, keywords, ads, and
   assets.
4. Confirm paused-by-default status for campaigns, ad groups, ads, and assets.
5. Review budgets, bid strategy, geo, language, network settings, and dates.
6. Verify final URLs and approved domains.
7. Review responsive search ads for uniqueness, claims, pinning, and policy
   guardrails.
8. Review keywords, match types, negatives, competitor terms, and low-intent
   exclusions.
9. Check conversion action readiness separately from the upload files.
10. Produce blockers, warnings, passed checks, and an approval record draft.

## Output artifact

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

## Verification gate

- Do not say the upload is ready to launch unless conversion readiness is
  verified separately from file structure.
- Do not mark account settings as passed unless the upload files or approved
  account preview prove them.
- Mark all unknowns as `not verified`.
- Require preview-before-posting.
- Remove private customer IDs, conversion labels, account screenshots, private
  landing pages, and real budgets from public artifacts.

## Failure modes

- Treating a valid CSV shape as launch readiness.
- Posting pending changes without reviewing paused state.
- Forgetting that conversion actions are account-side dependencies.
- Letting real customer IDs or private landing pages leak into public examples.
- Changing budgets or enabling campaigns while trying to run QA.
