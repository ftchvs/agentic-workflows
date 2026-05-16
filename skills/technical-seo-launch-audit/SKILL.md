---
name: technical-seo-launch-audit
description: Audit technical SEO launch readiness for sites and landing pages. Use when the user mentions SEO launch, technical SEO, sitemap, robots.txt, canonical URLs, metadata, structured data, noindex, redirects, crawlability, Search Console, or pre-launch SEO QA.
license: CC-BY-4.0
metadata:
  category: growth-marketing
  authority: read_only
---

# Technical SEO Launch Audit

Use this skill to verify that a site or landing page is crawlable, indexable,
and internally consistent before or after launch.

## Goal

Produce a technical SEO launch audit that checks crawl controls, canonical
signals, sitemap quality, metadata, structured data, social previews, redirects,
and verification evidence.

## Inputs

- Site URL or local dev URL.
- Expected production domain.
- Important routes and landing pages.
- Sitemap and robots URLs.
- Whether Search Console or analytics access is available.
- Any recent migration, domain, routing, or metadata changes.

Use synthetic values in public examples:

- brand: `Acme Sleep`
- production domain: `https://www.example.com`
- sitemap: `https://www.example.com/sitemap.xml`
- robots: `https://www.example.com/robots.txt`
- page: `https://www.example.com/sleep-check`

## Authority

`read_only`

The skill may inspect source files, rendered pages, public URLs, and read-only
search tooling after approval. It must not publish pages, change redirects,
submit sitemaps, edit DNS, or modify Search Console settings.

## Procedure

1. Confirm the target domain, route list, launch status, and source of truth for
   expected indexable pages.
2. Inventory important routes and compare them with sitemap entries.
3. Check robots.txt for accidental blocks and sitemap references.
4. Check sitemap XML for canonical, indexable URLs only.
5. Check canonical tags, alternates, redirects, trailing slash, protocol, and
   host consistency.
6. Check titles, meta descriptions, Open Graph, Twitter cards, and image
   fallbacks.
7. Check noindex, robots meta, X-Robots-Tag, and protected app routes.
8. Check structured data syntax and whether entity IDs are stable.
9. Check key page rendering, HTTP status, and basic performance signals when
   available.
10. Produce blockers, warnings, passed checks, and post-launch monitoring tasks.

## Verification Gate

The audit must separately verify:

- robots.txt
- sitemap XML
- canonical URLs
- index/noindex state
- redirects and status codes
- metadata and social previews
- structured data
- protected/private route exclusions
- launch route coverage
- post-launch monitoring requirements

Mark any unavailable source as `not checked`.

## Approval Gates

Stop for explicit human approval before:

- publishing metadata or route changes
- submitting or resubmitting sitemaps
- changing robots.txt
- changing canonical URLs
- changing redirects
- using authenticated Search Console or analytics access
- editing DNS or hosting settings

Use `workflows/external-action-gate.workflow.yml` before external-visible
changes.

## Output

```md
# Technical SEO launch audit: <site>

## Summary

## Route inventory

## Crawl and indexation controls

## Canonical and redirect checks

## Metadata and schema checks

## Findings

| Severity | Finding | Evidence | Minimal fix | Approval needed |
| --- | --- | --- | --- | --- |

## Post-launch monitoring

## Verification
```

## Public-Safe Example

Scenario: Acme Sleep is launching `https://www.example.com/sleep-check`.

Safe audit result:

- The landing page has a self-referencing canonical.
- The sitemap includes only canonical URLs.
- Hash fragments are excluded from the sitemap.
- App-only or API routes are blocked or omitted.
- Search Console is marked `not checked` because no real account access was
  used.

Unsafe notes to remove before publishing:

- real private domains
- private staging URLs
- real Search Console property IDs
- private sitemap exports
- private local paths
- screenshots that reveal logged-in state
