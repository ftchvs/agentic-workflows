---
name: social-content-fact-check-rewrite
description: Fact-check and rewrite social posts before publication. Use when the user mentions LinkedIn posts, X/Twitter threads, founder posts, social copy, thought leadership, claims review, public-post approval, content rewrite, or making social content safer without losing the point.
license: CC-BY-4.0
metadata:
  category: growth-marketing
  authority: external_draft
---

# Social Content Fact-Check Rewrite

Use this skill to review social content before it becomes public.

## Goal

Produce a safer social draft that preserves the user's point while separating
facts, opinions, assumptions, unsupported claims, and approval requirements.

## Inputs

- Draft post, thread, caption, or carousel copy.
- Target platform and audience.
- Desired tone and conversion goal.
- Source links or proof points for factual claims.
- Topics, names, or claims to avoid.
- Whether the post is personal, company, or product-facing.

Use synthetic values in public examples:

- author: `Alex from Acme Sleep`
- platform: `LinkedIn`
- product: `Acme Sleep`
- source URL: `https://www.example.com/research-summary`

## Authority

`external_draft`

The skill may draft rewritten social content, source notes, and approval
records. It must not publish, schedule, send, comment, DM, tag real people, or
post to any platform.

## Procedure

1. Confirm the target platform, audience, goal, and whether the draft is
   personal or company-facing.
2. Extract factual claims, statistics, comparisons, customer references,
   competitor mentions, regulated claims, and attribution statements.
3. Mark each claim as sourced, unsupported, opinion, assumption, or remove.
4. Identify privacy, confidentiality, legal, platform, brand, and reputational
   risks.
5. Rewrite the post to keep the core point while reducing unsupported certainty,
   private detail, or risky implication.
6. Preserve the author's tone where possible, but prioritize factual accuracy
   and public safety.
7. Produce a claim table, rewritten draft, optional shorter variant, and
   approval note.
8. Stop before publishing or scheduling.

## Verification Gate

The output must include:

- claim table
- source status for each factual claim
- risk notes
- rewritten draft
- preserved intent summary
- approval requirement before publication

Do not invent statistics, customer quotes, or source links.

## Approval Gates

Stop for explicit human approval before:

- publishing or scheduling the post
- tagging real people or companies
- using real customer quotes
- naming competitors
- referencing private company metrics
- making regulated claims
- sending DMs or comments

Use `workflows/external-action-gate.workflow.yml` before any platform action.

## Output

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

## Public-Safe Example

Scenario: Alex from Acme Sleep drafts a LinkedIn post saying, "Our sleep check
can identify sleep disorder risk in under a minute."

Safe rewrite:

> Building better sleep habits starts with noticing patterns. At Acme Sleep, we
> are exploring an educational sleep check that helps people decide what to
> learn about next. It is informational only and does not diagnose medical
> conditions.

Unsafe notes to remove before publishing:

- real customer names
- private metrics
- private employer details
- real medical claims without source review
- private screenshots
- hidden drafts or internal review comments
