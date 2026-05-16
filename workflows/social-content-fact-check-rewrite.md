# Social content fact-check rewrite

Use this workflow before publishing or scheduling social content.

## Risk level

External-write if the content is published, scheduled, tagged, commented, or
sent. The default run is draft-only.

## Process

1. Confirm platform, audience, goal, and whether the draft is personal,
   company, or product-facing.
2. Extract factual claims, statistics, comparisons, customer references,
   competitor mentions, regulated claims, and attribution statements.
3. Mark each claim as sourced, unsupported, opinion, assumption, or remove.
4. Identify privacy, confidentiality, legal, platform, brand, and reputational
   risks.
5. Rewrite the draft to preserve intent while reducing unsupported certainty or
   risky implication.
6. Produce a claim table, rewritten draft, optional short variant, and approval
   note.
7. Stop before publication or scheduling.

## Output artifact

```md
# Social content fact-check rewrite: <platform>

## Summary

## Claim table

| Claim | Status | Source or issue | Action |
| --- | --- | --- | --- |

## Risk notes

## Rewritten draft

## Short variant

## Approval required

## Verification
```

## Verification gate

- Each factual claim has a source status.
- The rewrite does not invent statistics, customer quotes, source links, or
  proof.
- Private metrics, private names, private screenshots, hidden drafts, and local
  paths are absent from public artifacts.
- Publication, scheduling, tagging, commenting, messaging, and platform actions
  remain approval-gated.

## Failure modes

- Polishing an unsupported claim instead of removing or qualifying it.
- Inventing a source to make the copy sound stronger.
- Publishing from the review thread without exact approval.
- Keeping private operational detail in a public post.
