# Accessibility

`agentic-workflows` is mostly documentation, templates, diagrams, and a small
CLI. Accessibility work in this repo focuses on making those artifacts usable
with screen readers, keyboard-only workflows, non-color output, and assisted
reading tools.

## What we aim for

- Documentation uses a clear heading hierarchy.
- Links describe their destination instead of relying on vague text.
- Diagrams have surrounding text that explains the same idea.
- CLI output remains useful without color.
- CLI commands expose machine-readable output where practical.
- Examples avoid image-only or color-only meaning.
- Generated templates remind contributors to check accessibility before review.

## Reporting accessibility issues

Please open an accessibility issue if you find:

- confusing heading order or table structure
- missing text alternatives around diagrams or screenshots
- CLI output that depends on color alone
- terminal output that is hard to parse with assistive technology
- examples or templates that encourage inaccessible defaults

Include the page, file, command, terminal, assistive technology, and operating
system when relevant.

## Contribution expectations

For documentation changes, check headings, link text, tables, diagrams, and
examples. For CLI changes, check color-independent output, readable errors, and
whether structured output is needed for automation.
