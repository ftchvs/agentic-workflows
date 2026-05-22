# Transcreation workflow

## Principle

Translate words when the content is purely informational. Transcreate when the
content has voice, persuasion, humor, metaphor, product framing, or local reader
expectations.

A good result should read as if a native speaker wrote it for that audience.

## Non-negotiables

- Preserve meaning, tone, and emotional impact.
- Preserve Markdown, MDX, HTML, JSX, code blocks, imports, component names, CSS
  classes, file paths, image paths, links, IDs, and dates.
- Keep product names, company names, technical identifiers, and API names
  unchanged unless the local community naturally localizes them.
- Adapt idioms instead of translating them literally.
- Reorder sentences when the target language needs a different rhythm.
- Do not invent claims, statistics, citations, screenshots, or links.
- Do not shorten the article unless explicitly asked.

## Workflow

1. **Scope the file**
   - Source file path.
   - Target locale.
   - Output file path.
   - Fields that must not be translated.

2. **Read the source**
   - Parse frontmatter.
   - Identify code blocks, MDX components, image tags, links, tables, and
     headings.
   - Note any idioms, jokes, or claims that need adaptation.

3. **Apply locale rules**
   - Use the appropriate formality level.
   - Keep locally common tech loanwords in English.
   - Adjust sentence structure for natural flow.

4. **Write complete MDX**
   - Include frontmatter.
   - Include the full body.
   - Preserve structural syntax exactly.

5. **Validate**
   - The output is not empty.
   - Frontmatter parses.
   - Body content exists.
   - Image paths and URLs are unchanged.
   - Code blocks are unchanged.
   - MDX components still parse.
   - Repository checks pass.

6. **Review**
   - Read the localized title, summary, first section, and all headings.
   - Spot-check paragraphs with claims or strong voice.
   - Compare the final diff before publishing.

## Prompt frame

```text
You are an expert transcreation editor for <locale>.

Transcreate the following MDX file. Do not translate literally.

Preserve:
- YAML frontmatter keys
- dates, IDs, slugs, image paths, links, code blocks, HTML attributes, MDX
  component names, CSS classes

Adapt:
- idioms
- sentence order
- register and tone
- examples only when they are culturally awkward and the meaning remains intact

Return only the complete MDX file.
```

## Failure modes

- Empty output that still writes a file.
- Translated file paths such as `/images/` becoming localized.
- HTML attributes translated into invalid values.
- Code comments or code identifiers translated.
- Product or framework names localized awkwardly.
- Headings changed so deeply that anchors or internal links break.
- Literal idioms that sound machine translated.
- The localized article becomes more formal, generic, or bland than the source.
