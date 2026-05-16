# Technical SEO launch audit

Use this workflow when a public page, marketing site, or migration needs
technical SEO launch QA.

## Risk level

Credentialed read-only when authenticated Search Console, analytics, hosting,
or DNS access is used. Otherwise public-site read-only. Publishing fixes,
submitting sitemaps, changing robots.txt, changing redirects, and editing DNS
require explicit approval.

## Process

1. Confirm the target domain, launch status, and expected indexable routes.
2. Compare important routes with sitemap entries.
3. Check robots.txt and sitemap references.
4. Check sitemap XML for canonical, indexable URLs only.
5. Check canonicals, alternates, redirects, status codes, protocol, host, and
   trailing slash consistency.
6. Check titles, descriptions, social previews, and image fallbacks.
7. Check noindex directives, robots meta, X-Robots-Tag, protected app routes,
   and private route exclusions.
8. Check structured data syntax and stable entity IDs.
9. Produce blockers, warnings, passed checks, and monitoring tasks.

## Output artifact

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

## Verification gate

- Robots, sitemap, canonical, indexation, redirect, metadata, schema,
  private-route, and route-coverage checks are separated.
- Search Console or analytics evidence is marked `not checked` unless
  authenticated read-only evidence was actually reviewed.
- Public examples use fictional domains, IDs, routes, and data.
- External-visible changes remain approval-gated.

## Failure modes

- Treating a generated sitemap as valid without checking canonical and noindex
  state.
- Including hash fragments or private app routes in a sitemap.
- Forgetting that canonical URLs must match production host and protocol.
- Publishing metadata or robots changes during an audit.
- Copying private staging URLs or Search Console property data into public
  artifacts.
