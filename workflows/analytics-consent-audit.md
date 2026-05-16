# Analytics consent audit

Use this workflow when analytics or paid-media tracking might be installed but
you need to prove how consent, runtime events, and platform receipt actually
behave.

## Risk level

Credentialed read-only when authenticated analytics or ad-platform access is
used. Otherwise public-site read-only. No tag, consent, CRM, or ad-account
changes are allowed without explicit approval.

## Process

1. Confirm the audited site, expected platforms, expected events, and consent
   requirements.
2. Inventory installed tags and where they load from.
3. Check default consent before the user chooses anything.
4. Check accept, reject, and custom-save paths.
5. Verify same-tab consent updates separately from refresh behavior.
6. Verify event dispatch separately from platform receipt.
7. Check privacy-page preference controls.
8. Test browser-extension or tracker-blocking behavior when relevant.
9. Produce a findings table with severity, evidence, minimal fix, and approval
   needed.

## Output artifact

```md
# Analytics consent audit: <site>

## Summary

## Tag inventory

## Consent defaults

## Stored preferences

## Runtime event checks

## Conversion-event checks

## Platform receipt

## Privacy-page controls

## Extension or blocker behavior

## Findings

| Severity | Finding | Evidence | Minimal fix | Approval needed |
| --- | --- | --- | --- | --- |

## Verification

## Open questions
```

## Verification gate

- Do not report "tracking works" unless both browser dispatch and platform
  receipt were checked.
- Do not report "consent works" unless default state, stored preference, and
  runtime update were checked separately.
- Mark anything not inspected as `not checked`.
- Remove private domains, account IDs, screenshots, user data, and local paths
  from any public artifact.

## Failure modes

- Treating localStorage consent as proof that the runtime analytics state
  updated.
- Treating browser event dispatch as proof that GA4, Google Ads, Meta, or a CRM
  received the event.
- Confusing tracker-extension blocking with a consent implementation bug.
- Submitting real test leads or changing production tags during an audit.
