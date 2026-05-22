# MDX transcreation checklist

Use this before publishing localized MDX.

## File coverage

- [ ] Every required locale file exists.
- [ ] Output filenames match the repo convention, such as `post.es.mdx`.
- [ ] No empty files were written.
- [ ] No generated placeholder text remains.

## Frontmatter

- [ ] Frontmatter parses.
- [ ] Required fields are present.
- [ ] Non-translatable fields are unchanged: `date`, `slug`, `id`,
      `audioProjectId`, `heroImage`.
- [ ] Title and summary sound native in the target language.
- [ ] Tags follow the repo convention, either localized or intentionally stable.

## MDX integrity

- [ ] Code blocks are unchanged.
- [ ] Imports and component names are unchanged.
- [ ] HTML attributes are unchanged.
- [ ] CSS classes are unchanged.
- [ ] Image paths still point to the same assets.
- [ ] Links still point to valid paths or URLs.
- [ ] Tables still have valid Markdown pipes.
- [ ] Internal heading links still resolve.

## Language quality

- [ ] The first three paragraphs read naturally.
- [ ] Headings sound like native editorial headings.
- [ ] Idioms were adapted, not translated literally.
- [ ] Product and technical terms match local usage.
- [ ] The tone is not more formal, generic, or bland than the source.

## Repository checks

Run the checks that matter for your repo. Examples:

```sh
npm run check:heading-slugs
npm run check:i18n
npm run check:public-links
npm run lint
npm run build
```

## Review gate

- [ ] Diff reviewed by a human or a second agent.
- [ ] No private content, secrets, unpublished strategy, or internal paths were
      introduced.
- [ ] External publishing, PR creation, comments, and deploys have explicit
      human approval.
