# Product marketing context builder

Use this workflow when growth work needs stable product, audience, proof, and
claim-boundary context before execution.

## Risk level

Local-write when creating a context artifact. It becomes credentialed or
external-write only if private data is introduced or the context is published,
which requires separate approval.

## Process

1. Confirm the artifact location and whether the context is new or a refresh.
2. Inventory public-safe source material.
3. Separate facts from assumptions and opinions.
4. Identify audience, use cases, jobs to be done, conversion goal, and adoption
   triggers.
5. Capture positioning, differentiation, objections, anti-personas, and
   switching dynamics.
6. Capture proof points and mark each as verified, needs source, or forbidden.
7. Capture customer language only when public-safe or synthetic.
8. List forbidden or review-required claims and wording.
9. Produce the context artifact and verification note.

## Output artifact

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

## Verification gate

- Facts, assumptions, claims, proof, forbidden language, and open questions are
  separated.
- Every proof point has a source status.
- No private customer quotes, sales notes, analytics exports, account IDs, or
  private paths appear in public artifacts.
- External publishing and customer contact remain approval-gated.

## Failure modes

- Treating positioning guesses as product facts.
- Reusing private customer language in a public template.
- Capturing proof points without source status.
- Letting downstream ad or SEO work use unverified claims.
