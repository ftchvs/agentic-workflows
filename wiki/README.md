# Skills and workflows wiki

A practical reference for choosing a skill, learning its purpose, and finding
the source. This wiki expands the original seven-library design catalog.

## What is included

| Material | Count | What you can use |
| --- | ---: | --- |
| Distinct skill names reviewed | 511 | Inventory denominator |
| Public skill entries | 505 | Names, short descriptions, categories, and available sources |
| MIT reference copies | 268 | Definition snapshots from the seven credited libraries |
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
- [Sources and licenses](sources.json): upstream attribution for copied material.

## Use a skill

1. Find the job you need to do and read the definition.
2. Open the source library for installation and dependencies.
3. Mention the available skill in your assistant, then supply a concrete goal,
   relevant files, constraints, and the checks you expect.
4. Review the result. A skill is guidance, not evidence that work succeeded.

The files under `wiki/skills` are documentation snapshots, not an installation
bundle. Referenced scripts, assets, and supporting documents remain upstream.
Use the source links in the catalog to obtain the complete maintained package.
The English directory summarizes the skills; snapshots retain their original
language. Supporting-file links are pinned to verified upstream commits.
Thirteen references across three snapshots were absent upstream and are
explicitly marked as unavailable text rather than left as broken links.

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

The 268 snapshots retain their upstream MIT licenses, collected in
[licenses](licenses). Original wiki prose and the existing repository workflow
material remain CC BY 4.0. Changes to snapshot formatting or links must be
identified. These copies preserve the installed definition text except for
supporting-link repairs, unavailable-reference labels, and trailing whitespace.

## Keep it current

Review the source, license, and privacy boundary before adding a copy. Keep
`catalog.json` and `catalog.md` aligned. Run the repository validation and wiki
tests before publishing. Refresh the portfolio copy from the same catalog,
not from a separate handwritten list.
