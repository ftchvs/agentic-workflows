# MDX transcreation workflow

This example shows a public-safe workflow for turning English MDX content into
native-feeling localized editions.

The goal is not literal translation. The goal is transcreation: preserve the
meaning, tone, structure, and usefulness of the original while adapting the
language so a native reader would not feel like they are reading machine output.

## Use this when

- You publish MDX articles, docs, essays, or project pages.
- The content has voice, persuasion, examples, or cultural idioms.
- You need to preserve frontmatter, code blocks, links, images, HTML, and MDX
  components.
- You want a repeatable review gate before localized files are published.

## Files

| File | Purpose |
| --- | --- |
| [TRANSCREATION.md](TRANSCREATION.md) | Core operating principles and workflow steps |
| [locales.md](locales.md) | Example locale voice rules for pt-BR, es, fr, ja, and de |
| [CHECKLIST.md](CHECKLIST.md) | Post-run QA checklist |
| [mdx-transcreation.workflow.yml](mdx-transcreation.workflow.yml) | Machine-readable workflow definition |
| [scripts/i18n-agent.ts](scripts/i18n-agent.ts) | Generic script scaffold with guardrails |
| [fixtures/source/productivity-notes.mdx](fixtures/source/productivity-notes.mdx) | Synthetic source MDX |
| [fixtures/output/productivity-notes.es.mdx](fixtures/output/productivity-notes.es.mdx) | Synthetic example output |

## Operating loop

1. Identify the source MDX file and target locale.
2. Load locale voice rules.
3. Generate a complete localized MDX file.
4. Validate that frontmatter, body content, links, images, and code survived.
5. Run site-specific checks such as heading slugs, public links, i18n sync, lint,
   and build.
6. Review the diff before publishing.

## Authority

This workflow is `local_write` by default. It may create or update localized
files in a repository. It must not publish, deploy, comment, open a PR, or call
external systems unless a human explicitly approves that external action.

## Quick start

Copy the example folder into a repo that uses MDX content, then adapt:

- supported locale list
- locale voice rules
- source and output file naming convention
- model/provider invocation
- repository validation commands

The included script is intentionally provider-agnostic. It can either print a
transcreation prompt for a human or agent to run, or execute a configured command
that reads the prompt from stdin and returns full MDX on stdout.

```sh
bun examples/mdx-transcreation/scripts/i18n-agent.ts \
  --source content/blog/example.mdx \
  --locale es \
  --dry-run
```

To execute with a provider command:

```sh
TRANSCREATION_COMMAND="your-model-cli --print" \
  bun examples/mdx-transcreation/scripts/i18n-agent.ts \
  --source content/blog/example.mdx \
  --locale es \
  --execute
```

The command must return the complete translated MDX file, starting with YAML
frontmatter.

## Public-safety note

The examples are synthetic. Do not publish real private drafts, customer
content, unpublished strategy, hidden prompts, credentials, or personal context
as fixtures.
