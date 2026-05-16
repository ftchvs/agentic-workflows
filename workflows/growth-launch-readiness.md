# Growth launch readiness

Use this workflow when a growth launch needs one packet that ties together
product context, creative preflight, paid launch gates, analytics readiness, and
post-launch learning.

## Risk level

External-write. The default run is review-only. Publishing, posting,
submitting, enabling, sending, mutating platform events, or changing spend
requires explicit approval for the exact account, asset, budget, and timing.

## Process

1. Confirm the run is review-only and name the launch decision.
2. Build or refresh product context: facts, assumptions, proof, forbidden
   claims, and open questions.
3. Review ads, social posts, and landing pages for claim support, destination
   alignment, and safer rewrites.
4. Review paid launch settings: status, budget, placements, events, naming, and
   rollback readiness.
5. Review analytics and consent readiness: default consent, tag loading, event
   dispatch, platform receipt, and privacy controls.
6. Separate blockers, warnings, passed checks, required approvals, owners, and
   next actions.
7. Produce the launch packet and stop before external action.
8. After human-approved launch execution, capture only public-safe reusable
   lessons.

## Output artifact

```md
# Growth launch readiness: <launch>

## Decision needed

## Product context

## Claims and proof

## Creative and destination review

## Paid launch configuration

## Analytics and consent readiness

## Blockers

## Warnings

## Passed checks

## Approval record draft

## Rollback criteria

## Learning plan
```

## Verification gate

- Facts, assumptions, proof, and forbidden claims are separated before creative
  review.
- Every ad, post, landing-page claim, and conversion event has a source or is
  marked `not verified`.
- Public artifacts contain no account IDs, pixel IDs, customer data, private
  URLs, screenshots, local paths, or private launch context.
- External publishing, submission, enablement, event mutation, sending, posting,
  and spend changes remain approval-gated.
- The packet names rollback criteria and the learning goal before launch.

## Failure modes

- Treating product context as proof for claims it does not substantiate.
- Reviewing creative without checking destination-page alignment.
- Launching before conversion events and consent behavior are verified.
- Mixing multiple budget or creative changes in one test without a learning
  plan.
- Capturing private launch notes as reusable memory.
