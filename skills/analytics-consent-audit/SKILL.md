---
name: analytics-consent-audit
description: Audit analytics, consent mode, pixels, tag managers, local consent storage, and conversion-event firing for marketing sites. Use when the user mentions GA4, Google Tag Manager, Meta Pixel, consent banner, cookie preferences, localStorage consent, attribution loss, conversion tracking, or privacy-page tracking controls.
license: CC-BY-4.0
metadata:
  category: growth-marketing
  authority: read_only
---

# Analytics Consent Audit

Use this skill to diagnose whether analytics and advertising tags are installed,
gated by consent, and firing the intended conversion events.

## Goal

Produce a read-only audit that separates:

- installed tags
- default consent state
- stored consent preference
- runtime script loading
- event dispatch
- platform receipt
- privacy-page preference controls
- browser-extension or tracker-blocking behavior

## Inputs

- Site URL or local dev URL.
- Expected analytics and ad platforms.
- Expected conversion events and where they should fire.
- Consent banner and privacy-page requirements.
- Whether authenticated analytics access is available.

Use synthetic values in public examples:

- domain: `https://www.example.com`
- product: `Acme Sleep`
- GA4 measurement ID: `G-EXAMPLE123`
- Google Ads conversion ID: `AW-123456789`
- Meta pixel ID: `123456789012345`

## Authority

`read_only`

The skill may inspect pages, browser runtime state, local source files, and
public documentation. It must not change production analytics settings, publish
tags, edit consent policies, upload containers, or mutate ad-platform accounts.

## Procedure

1. Confirm the audit target, platforms, expected conversion events, and consent
   requirements.
2. Identify where tags are installed: source code, rendered HTML, tag manager,
   inline scripts, or third-party loaders.
3. Inspect default consent before the user makes a choice. Record whether
   analytics and ad storage start as granted, denied, or unknown.
4. Inspect stored consent after accept, reject, and custom-save paths. Note
   whether preferences are stored in cookies, localStorage, server state, or a
   consent platform.
5. Test same-tab consent updates. Do not assume a saved preference updates the
   current page unless a same-tab event, callback, or state update proves it.
6. Test refresh and navigation behavior with stored consent.
7. Check whether conversion events fire only after the required consent state.
8. If authenticated platform access is available and approved, verify platform
   receipt separately from browser dispatch.
9. Test common blockers separately: browser privacy mode, tracker extensions,
   content blockers, ad blockers, and blocked third-party scripts.
10. Produce an audit report with findings, evidence, severity, and minimal
    fixes.

## Verification Gate

The report must include evidence for each layer:

- **Tag inventory:** which scripts or containers are present.
- **Default consent:** state before interaction.
- **Preference persistence:** where consent is stored and whether it survives
  refresh.
- **Runtime update:** whether the same tab receives consent updates.
- **Event dispatch:** browser-visible event or network evidence.
- **Platform receipt:** marked verified, not available, or not checked.
- **Privacy controls:** whether a user can reopen and change preferences.
- **Blocker behavior:** whether an extension or browser setting changes the
  result.

Do not collapse these into one yes/no answer.

## Approval Gates

Stop for explicit human approval before:

- changing tag manager containers
- changing production environment variables
- enabling Google Ads, Meta, or other paid-media conversions
- sending test leads into a real CRM or ad account
- accepting cookies or consent on behalf of real users
- publishing privacy-policy or cookie-policy changes

Use `workflows/external-action-gate.workflow.yml` for any external write.

## Output

```md
# Analytics consent audit: <site>

## Summary

## Tag inventory

## Consent defaults

## Stored preferences

## Runtime event checks

## Conversion-event checks

## Privacy-page controls

## Extension or blocker behavior

## Findings

| Severity | Finding | Evidence | Minimal fix | Approval needed |
| --- | --- | --- | --- | --- |

## Verification

## Open questions
```

## Public-Safe Example

Scenario: Acme Sleep has a consent banner and wants to verify that
`trial_signup_submitted` fires only after analytics consent.

Safe audit notes:

- The default consent state is `analytics_storage=denied`.
- The stored preference uses a fictional key:
  `acme_consent_preferences`.
- A same-tab event named `acme-consent-update` updates the runtime analytics
  state.
- A browser extension blocks GA4 script loading even when consent is granted,
  so the report separates "user consent granted" from "script loaded."

Unsafe notes to remove before publishing:

- real domains
- real measurement IDs
- real customer IDs
- real session IDs
- private account screenshots
- private local paths
