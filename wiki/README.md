# Skills and workflows wiki

A practical reference for choosing a skill, learning its purpose, and finding
the source. This wiki expands the original seven-library design catalog.

## What is included

| Material | Count | What you can use |
| --- | ---: | --- |
| Distinct skill names reviewed | 511 | Inventory denominator |
| Public skill entries | 505 | Names, short descriptions, categories, and available sources |
| Original published skills | 10 | Full source in this repository's skills folder |
| Other authors' skills | 362 | Links to original repositories or maintained sources |
| Ownership not verified | 133 | Reference entries only; not claimed as original work |
| Existing public workflow playbooks | 19 | Reusable playbooks already in this repository |
| Private-project skills withheld | 6 | Names and instructions are not published |

The inventory covers shared, Codex, Cursor, portfolio-local, and public workflow
skill folders. It does not represent every vendor plugin or every project on
the machine. The 362 local command files are pending individual publication
review; they are not silently represented as public workflows.

## Browse

- [Skill directory](catalog.md): one row per distinct skill name.
- [Machine-readable catalog](catalog.json): the same public entries.
- [Workflow playbooks](../workflows): existing Markdown and executable templates.
- [Original published skills](../skills): reusable source maintained here.
- [Source history](sources.json): attribution for the seven original libraries.

## Use a skill

1. Find the job you need to do and read the definition.
2. Open the source library for installation and dependencies.
3. Mention the available skill in your assistant, then supply a concrete goal,
   relevant files, constraints, and the checks you expect.
4. Review the result. A skill is guidance, not evidence that work succeeded.

Publish original, privacy-reviewed skills in `skills/`. For another author's
skill, follow the original repository link for installation, instructions,
dependencies, and licensing. Do not copy its implementation into this wiki.
An installed skill with no source is not automatically original work: ownership
must be established before publishing it as such.

The 268 third-party definition snapshots from the first edition have been
removed from the current tree. They remain recoverable in Git history; no
history rewrite was performed. Local installed skills are unchanged.

## Distinct entries

Entries are grouped by frontmatter name. Real-path aliases are resolved before
counting. Repeated names appear once, with the shared copy preferred. Different
implementations with different names are not claimed to be equivalent. This
process does not delete working copies from an assistant's installation.

Counts describe catalog composition, not usage, popularity, quality, or proof
that a skill is currently enabled. The labels are editorial browsing aids.

## Publication boundary

No credentials, conversations, calendars, account data, private project names,
or hidden platform instructions are exported. Source ownership and licensing
for reference-only entries remain unreviewed. Listing an entry does not place
its implementation under this repository's license.

Original wiki prose, published skills, and workflow material use CC BY 4.0.
Third-party implementations remain in their upstream repositories under their
authors' licenses. Historical snapshot notices remain in [licenses](licenses)
for attribution of earlier revisions, not as a license for linked content.

## Keep it current

Review ownership and privacy before publishing original work. Link to upstream
for other authors' skills; keep uncertain ownership unpublished. Keep
`catalog.json` and `catalog.md` aligned. Run the repository validation and wiki
tests before publishing. Refresh the portfolio copy from the same catalog,
not from a separate handwritten list.
