# Fictional case study: product audit to decision memo

This example shows how the workflows combine into one operator-grade loop. The
company, product, sources, and details are fictional.

## Scenario

**Acme Notes** is a fictional team knowledge product. The founder asks:

> Should we reposition Acme Notes around AI meeting follow-up or stay focused on
> team knowledge search?

The goal is not to generate taglines. The goal is to produce a decision memo
with evidence, tradeoffs, and a recommended next action.

## Operating loop

### 1. Context

The operator gives the agent:

- fictional product description
- target user: small product teams
- current positioning: team knowledge search
- candidate positioning: AI meeting follow-up
- constraint: no external posts, no customer contact, no real company data

### 2. Delegation

The operator splits the work into three independent lanes.

```md
## Lane A: Market examples
Find public examples of products positioned around meeting follow-up and team
knowledge search. Return positioning, audience, proof points, and caveats.

## Lane B: Messaging critique
Evaluate the two candidate positions for clarity, urgency, differentiation, and
buyer pain. Return a scorecard and recommendation.

## Lane C: Risk review
Identify risks: crowded category, weak claims, privacy concerns, enterprise
adoption friction, and what evidence would reduce uncertainty.
```

All lanes are read-only. No posting, outreach, or account access is allowed.

### 3. Verification

The main operator checks:

- did each lane cite sources or mark assumptions?
- are claims separated from opinions?
- did any lane overstate confidence?
- are the recommended next actions small and testable?

### 4. Artifact

The final output is a decision memo.

```md
# Decision memo: Acme Notes positioning

## Decision
Whether to reposition from team knowledge search to AI meeting follow-up.

## Summary
- Meeting follow-up is clearer and more urgent for small teams.
- Team knowledge search is broader but harder to make immediately painful.
- The meeting angle risks competing in a crowded assistant category.
- Recommended path: test a landing-page variant before changing the product
  roadmap.

## Options
1. Stay with team knowledge search
   - Pros: broader platform story, less crowded messaging.
   - Cons: lower urgency, harder to demo value quickly.

2. Shift to AI meeting follow-up
   - Pros: concrete pain, frequent workflow, easier demo.
   - Cons: crowded category, privacy objections, requires strong integrations.

## Recommendation
Run a two-week positioning test around AI meeting follow-up while keeping the
core product narrative flexible.

## Next action
Draft a landing-page variant and five customer interview prompts. Do not publish
without founder approval.
```

### 5. Approval

Publishing the landing page is external-visible, so the external action gate
applies:

- exact page copy reviewed
- target URL confirmed
- analytics/tracking checked
- founder approval recorded
- rollback path known

### 6. Learning

If the workflow reveals a reusable pattern, capture a lesson:

```md
## Lesson

Trigger: Product positioning question with two competing narratives.
Procedure: Split research into market examples, messaging critique, and risk
review; synthesize into a decision memo with one small test.
Verification: Claims must cite sources or be marked as assumptions.
Pitfalls: Do not let the agent rewrite positioning before evidence is reviewed.
Promote to skill? yes, if repeated across multiple product audits.
```

## Workflows used

- [Research-to-decision pipeline](../../workflows/research-to-decision.md)
- [Subagent delegation brief](../../workflows/subagent-delegation-brief.md)
- [Multi-agent review loop](../../workflows/multi-agent-review-loop.md)
- [External action gate](../../workflows/external-action-gate.md)
- [Learning extractor](../../workflows/learning-extractor.md)
