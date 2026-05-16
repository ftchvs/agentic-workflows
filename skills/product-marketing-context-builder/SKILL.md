---
name: product-marketing-context-builder
description: Build or refresh a product marketing context artifact for growth work. Use when the user needs positioning context, ICP, personas, objections, proof points, claim boundaries, customer language, product narrative, messaging foundations, or reusable marketing context before ads, SEO, social, lifecycle, or launch work.
license: CC-BY-4.0
metadata:
  category: growth-marketing
  authority: local_write
---

# Product Marketing Context Builder

Use this skill to create a durable product marketing context artifact that other
growth skills can rely on.

## Goal

Produce a structured context document that separates facts, assumptions,
claims, proof, open questions, forbidden language, and approval needs.

## Inputs

- Product or offer description.
- Public website, README, docs, or launch brief.
- Target audience and conversion goal.
- Existing positioning or messaging, if available.
- Proof points and claim sources.
- Known compliance, brand, privacy, or platform constraints.

Use synthetic values in public examples:

- brand: `Acme Sleep`
- product: educational sleep coaching companion
- domain: `https://www.example.com`
- conversion goal: waitlist signup
- proof source: `examples/acme-claims.csv`

## Authority

`local_write`

The skill may draft or update a local context artifact. It must not publish
positioning, contact customers, scrape private systems, create external tasks,
or make claims externally without approval.

## Procedure

1. Confirm the artifact location and whether the work is a new context or a
   refresh.
2. Inventory available public-safe source material.
3. Extract product facts separately from assumptions and opinions.
4. Identify target audience, jobs to be done, use cases, conversion goal, and
   buying or adoption triggers.
5. Capture positioning options, differentiation, objections, anti-personas, and
   switching dynamics.
6. Capture proof points and mark each as verified, needs source, or forbidden.
7. Capture customer language only if it is provided as public-safe or synthetic.
8. List words, claims, categories, or visuals that need legal, privacy, brand,
   or platform review.
9. Produce the context artifact and a short verification note.
10. Recommend which growth skill should use the context next.

## Verification Gate

The context artifact must include:

- product overview
- audience and use cases
- positioning and differentiation
- objections and anti-personas
- proof points and claim status
- customer language or synthetic stand-ins
- forbidden or review-required claims
- open questions
- source list

Do not present assumptions as facts.

## Approval Gates

Stop for explicit human approval before:

- publishing positioning externally
- using real customer quotes or testimonials
- contacting customers or prospects
- adding private sales, analytics, CRM, or support data
- creating tracker issues, docs, or external-facing campaign assets
- using unverified claims in ads, landing pages, or public posts

Use `workflows/external-action-gate.workflow.yml` before external-visible
changes.

## Output

```md
# Product marketing context: <product>

## Status

## Product overview

## Audience and use cases

## Positioning

## Differentiation

## Objections and anti-personas

## Proof points and claim status

## Customer language

## Forbidden or review-required language

## Open questions

## Source list

## Verification
```

## Public-Safe Example

Scenario: Acme Sleep needs a context artifact before ad preflight and SEO work.

Safe context notes:

- The audience is "adults exploring better sleep routines."
- The conversion goal is "join a waitlist."
- The phrase "diagnoses sleep disorders" is forbidden.
- The phrase "educational sleep-health signals" is allowed only with an
  informational disclaimer.
- Proof points are synthetic and marked as examples.

Unsafe notes to remove before publishing:

- real customer quotes
- private sales notes
- private analytics exports
- real competitor battlecards
- real account IDs
- private local paths
