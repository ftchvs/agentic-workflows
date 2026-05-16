---
name: growth-loop-diagnosis
description: Diagnose a product growth loop and produce a decision memo. Use when the user mentions growth loops, growth model, viral loop, content loop, paid loop, retention, activation, North Star metric, acquisition flywheel, loop health, or why growth has stalled.
license: CC-BY-4.0
metadata:
  category: growth-marketing
  authority: read_only
---

# Growth Loop Diagnosis

Use this skill to convert vague growth strategy questions into a concrete loop
diagnosis with assumptions, metrics, constraints, and one recommended next
experiment.

## Goal

Produce a decision memo that identifies the current growth loop, its weakest
link, measurement confidence, and the smallest useful next experiment.

## Inputs

- Product and audience context.
- Current acquisition channels.
- Activation and retention signals.
- Monetization or conversion model.
- Existing content, referral, sales, paid, or platform loops.
- Metrics, if available.
- Constraints such as budget, team, data quality, timeline, or compliance.

Use synthetic values in public examples:

- product: `Acme Sleep`
- acquisition: educational SEO and paid-social traffic
- conversion: waitlist signup
- activation: first sleep routine completed
- retention: weekly routine check-in

## Authority

`read_only`

The skill may inspect public-safe context and produce a recommendation. It must
not create campaigns, launch experiments, change budgets, contact customers, or
write to external systems.

## Procedure

1. Confirm the decision question and growth stage.
2. Identify candidate loops: content, paid, viral, sales, platform, product-led,
   lifecycle, community, or partnership.
3. Map the dominant loop as inputs, user action, value created, distribution
   path, conversion, and reinvestment.
4. Separate known metrics from assumptions.
5. Evaluate activation, retention, conversion, acquisition cost, cycle time,
   and compounding potential.
6. Identify the weakest link and the confidence level.
7. List risks: leaky retention, weak intent, slow cycle time, bad attribution,
   false-positive channel signals, or compliance constraints.
8. Recommend one next experiment with success criteria and a stop condition.
9. Produce a decision memo rather than a list of generic tactics.

## Verification Gate

The memo must include:

- loop map
- known metrics
- assumptions
- weakest link
- confidence level
- recommended next experiment
- success criteria
- stop condition
- approval needs

Do not recommend scaling acquisition before retention and activation evidence
are addressed.

## Approval Gates

Stop for explicit human approval before:

- launching campaigns or experiments
- changing budgets
- contacting users or prospects
- creating public content
- changing product analytics or event tracking
- using private customer or revenue data
- writing to external tools

Use `workflows/research-to-decision.workflow.yml` for source-heavy research and
`workflows/external-action-gate.workflow.yml` before external-visible action.

## Output

```md
# Growth loop diagnosis: <product>

## Decision

## Loop map

## Evidence

## Assumptions

## Weakest link

## Options

## Recommendation

## Next experiment

## Success criteria

## Stop condition

## Approval needed
```

## Public-Safe Example

Scenario: Acme Sleep gets traffic from educational sleep articles, but only a
small share of visitors join the waitlist.

Safe diagnosis:

- Current loop: content loop.
- Weakest link: content-to-waitlist conversion.
- Assumption: visitors trust educational content but do not understand the
  product promise.
- Next experiment: one landing-page variant that clarifies the educational
  offer and keeps non-diagnostic language.
- Stop condition: no lift in waitlist conversion after a fixed traffic
  threshold.

Unsafe notes to remove before publishing:

- real conversion rates
- private revenue data
- real cohort exports
- private customer notes
- account IDs
- private local paths
