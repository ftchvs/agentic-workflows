# Fictional growth stack example

Scenario: Acme Sleep is a fictional sleep coaching product preparing a small
paid-search and paid-social test. The team wants attribution to work, uploads
to stay paused, and ads to avoid unsupported health claims.

Use these skills together:

1. `analytics-consent-audit` to verify tag installation, consent defaults,
   same-tab consent updates, conversion event dispatch, and privacy controls.
2. `google-ads-upload-qa` to review a paused Google Ads bulk upload before any
   account changes are posted.
3. `ad-preflight-review` to review ad copy, landing-page alignment, claims,
   disclosures, and approval requirements before submission.

## Synthetic inputs

- Site: `https://www.example.com`
- Product: Acme Sleep
- GA4 measurement ID: `G-EXAMPLE123`
- Google Ads conversion ID: `AW-123456789`
- Meta pixel ID: `123456789012345`
- Google Ads customer ID: `000-000-0000`
- Landing page: `https://www.example.com/sleep-check`
- Daily test budget: `$50`

## Operating loop

### 1. Consent and analytics audit

The agent checks whether analytics starts denied, whether the consent banner
stores preferences, whether the same tab receives a consent update, and whether
the fictional `trial_signup_submitted` event dispatches only after consent.

Output artifact:

```md
# Analytics consent audit: Acme Sleep

## Summary
- Default analytics consent starts denied.
- Consent preference persists under the fictional key
  `acme_consent_preferences`.
- Same-tab runtime update is verified through `acme-consent-update`.
- Platform receipt is not checked because no real account access was used.
```

### 2. Google Ads upload QA

The agent checks a fictional upload package before posting:

- campaigns, ad groups, ads, and assets are paused
- final URLs use `example.com`
- conversion action readiness is marked `not verified`
- preview-before-posting is required
- customer ID is fake or blank

Output artifact:

```md
# Google Ads upload QA: Acme Sleep search test

## Blocking issues
- Conversion action receipt is not verified.

## Passed checks
- Campaigns are paused.
- Final URLs use `https://www.example.com`.
- Negative keywords include medical-diagnosis and support-intent exclusions.
```

### 3. Ad preflight review

The agent reviews fictional ad copy:

```text
Predict your sleep disorder risk in one minute.
```

Output artifact:

```md
# Ad preflight review: Acme Sleep paid-social test

## Findings
| Severity | Asset ID | Concern | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| high | AD-001 | unsupported health prediction | "Predict your sleep disorder risk" | Rewrite as educational, non-diagnostic copy. |

## Safer rewrite
Explore educational sleep-health signals in about one minute. Informational
only.
```

## Approval boundary

The agent may draft reports and approval records. It must stop before:

- posting Google Ads uploads
- submitting social ads
- enabling campaigns
- changing conversion tags
- changing production consent behavior
- publishing landing-page copy

Use `workflows/external-action-gate.workflow.yml` if a human wants to execute
any external action.

## Verification

- All brands, IDs, URLs, budgets, and campaign names are fictional.
- No real account IDs, customer data, private domains, screenshots, or local
  file paths appear in the example.
- Each skill produces a durable artifact and names approval requirements before
  external writes.
