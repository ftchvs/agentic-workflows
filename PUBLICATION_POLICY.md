# Publication policy

This repository contains sanitized AI workflow templates only.

Publish original, privacy-reviewed skills and workflows. For skills obtained
from other authors, include a short directory description and a link to the
original repository, not a copied implementation. Unknown provenance is not
evidence of authorship; leave those implementations unpublished until reviewed.

Do not commit:

- secrets, tokens, credentials, private URLs, or webhook endpoints
- personal memory, calendars, emails, messages, transcripts, or account details
- employer, client, customer, or proprietary material
- system prompts or hidden platform instructions
- real infrastructure names, device names, repo names, or internal project names
- screenshots that reveal private state

All examples must be synthetic.

Executable workflows must declare:

- risk level
- required permissions
- external side effects
- destructive actions
- dry-run behavior
- human approval requirements

External writes, destructive actions, credential use, and network operations must
be opt-in and clearly documented.

## Release gate

Before making this repository public:

1. Inventory every workflow and mark keep, rewrite, or remove.
2. Sanitize private details and replace them with fictional examples.
3. Run `bun run validate` from the repo root. It includes workflow validation,
   skill validation, catalog coverage, and the publication scan.
4. Run secret scanning on the working tree and full git history.
5. Search manually for private paths, tokens, emails, webhooks, and real account
   names.
6. Remove employer/client/internal material unless fully generalized.
7. Review executable examples for dry-run defaults and approval language.
8. Read the final diff as an attacker, employer, client, and random internet
   reader. If a line reveals private setup, remove or generalize it.

The built-in publication scan catches obvious private paths, non-example email
addresses, common API/token shapes, Google Ads IDs, GA4 IDs, Google OAuth client
IDs, Meta access-token shapes, and real-looking Meta ad account IDs. It is a
guardrail, not a substitute for human review.
