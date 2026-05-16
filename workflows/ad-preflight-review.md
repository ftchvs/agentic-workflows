# Ad preflight review

Use this workflow before submitting, uploading, publishing, or launching paid
media assets.

## Risk level

External-write. The default run drafts a preflight report only. Submitting ads,
uploading creative, publishing landing pages, changing event mapping, or
launching campaigns requires explicit approval.

This workflow does not provide legal advice and does not guarantee platform
approval.

## Process

1. Confirm the platform, market, objective, landing page, and launch status.
2. Inventory the assets and assign stable local IDs.
3. Extract factual claims and proof requirements.
4. Compare ad claims with the landing page and offer terms.
5. Check disclosures, testimonials, personal-attribute language, regulated
   categories, privacy-sensitive events, and banned visual patterns.
6. Classify each asset as `approved`, `needs_review`, or `high_risk`.
7. Suggest minimal safer rewrites that preserve intent without adding new
   unsupported claims.
8. Name blockers and approval requirements before launch.

## Output artifact

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

## Verification gate

- Every finding includes asset ID, decision, concern, evidence, recommended
  action, and approval need.
- Unsupported claims are marked `needs_review` or `high_risk`, not smoothed
  over.
- Safer rewrites do not introduce new claims.
- Public examples use synthetic brands, URLs, IDs, and claim sources.
- The report states that it does not guarantee legal compliance or platform
  approval.

## Failure modes

- Rewriting copy before identifying the risky claim.
- Treating a landing-page mismatch as a copy issue only.
- Turning a human-review requirement into an automatic reject.
- Publishing revised copy or submitting ads during preflight.
- Copying real customer claims, account IDs, or creative screenshots into a
  public artifact.
