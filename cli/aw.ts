#!/usr/bin/env bun

import { mkdir } from "node:fs/promises";
import { basename, dirname } from "node:path";

type Scalar = string | number | boolean | null;
type YamlValue = Scalar | YamlValue[] | { [key: string]: YamlValue };

type Workflow = {
  name: string;
  goal: string;
  trigger: string;
  inputs: string[];
  allowed_tools: string[];
  authority: string;
  risk_level: string;
  required_permissions: string[];
  external_side_effects: string[];
  destructive_actions: string[];
  dry_run: string;
  approval_required: string[];
  steps: string[];
  verification: string[];
  artifacts: string[];
  memory_update: string;
};

type Skill = {
  name?: string;
  description?: string;
  body: string;
  text: string;
};

const AUTHORITY_LEVELS = [
  "read_only",
  "local_write",
  "external_draft",
  "external_write_requires_approval",
  "destructive_forbidden",
];

const RISK_LEVELS = [
  "read-only",
  "local-write",
  "external-write",
  "destructive",
  "credentialed",
];

const REQUIRED_FIELDS: Array<keyof Workflow> = [
  "name",
  "goal",
  "trigger",
  "inputs",
  "allowed_tools",
  "authority",
  "risk_level",
  "required_permissions",
  "external_side_effects",
  "destructive_actions",
  "dry_run",
  "approval_required",
  "steps",
  "verification",
  "artifacts",
  "memory_update",
];

const STRING_FIELDS: Array<keyof Workflow> = [
  "name",
  "goal",
  "trigger",
  "authority",
  "risk_level",
  "dry_run",
  "memory_update",
];

const LIST_FIELDS: Array<keyof Workflow> = [
  "inputs",
  "allowed_tools",
  "required_permissions",
  "external_side_effects",
  "destructive_actions",
  "approval_required",
  "steps",
  "verification",
  "artifacts",
];

const SKILL_REQUIRED_SECTIONS = [
  "## Goal",
  "## Inputs",
  "## Authority",
  "## Procedure",
  "## Verification Gate",
  "## Approval Gates",
  "## Output",
];

const FORBIDDEN_PUBLICATION_PATTERNS = [
  {
    label: "absolute macOS home path",
    pattern: /\/Users\/[A-Za-z0-9._-]+(?:\/[^\s)`'"]*)?/,
  },
  {
    label: "OpenAI API key",
    pattern: /sk-[A-Za-z0-9_-]{20,}/,
  },
  {
    label: "GitHub token",
    pattern: /gh[pousr]_[A-Za-z0-9_]{20,}/,
  },
  {
    label: "Slack token",
    pattern: /xox[baprs]-[A-Za-z0-9-]{10,}/,
  },
  {
    label: "non-example email address",
    pattern: /[A-Za-z0-9._%+-]+@(?!example\.com\b)[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
  },
  {
    label: "real-looking Google Ads customer ID",
    pattern: /customer[\s_-]*id:\s*`?(?!000-000-0000\b)\d{3}-\d{3}-\d{4}`?/i,
  },
  {
    label: "real-looking GA4 measurement ID",
    pattern: /\bG-(?!EXAMPLE)[A-Z0-9]{8,}\b/,
  },
  {
    label: "real-looking Google Ads conversion ID",
    pattern: /\bAW-(?!123456789\b)\d{8,}\b/,
  },
  {
    label: "real-looking long numeric ad ID",
    pattern: /\b(?!123456789012345\b)\d{15,16}\b/,
  },
];

const PUBLICATION_SCAN_GLOBS = [
  "*.md",
  "package.json",
  "cli/**/*.ts",
  "diagrams/**/*.md",
  "docs/**/*.md",
  "examples/**/*.md",
  "principles/**/*.md",
  "schema/**/*.json",
  "skills/**/*.md",
  "templates/**/*.md",
  "tests/**/*.ts",
  "workflows/**/*.md",
  "workflows/**/*.yml",
];

const [, , command, ...args] = Bun.argv;

async function main() {
  if (!command || command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "validate") {
    const workflow = await loadWorkflow(requiredArg(args[0], "workflow"));
    const errors = validateWorkflow(workflow);
    if (errors.length > 0) fail(errors.map((error) => `- ${error}`).join("\n"));
    console.log(`valid: ${workflow.name}`);
    return;
  }

  if (command === "check") {
    const paths = args.length > 0 ? args : await findWorkflowPaths();
    await checkWorkflows(paths);
    return;
  }

  if (command === "check-skills") {
    const paths = args.length > 0 ? args.map(normalizeSkillPath) : await findSkillPaths();
    await checkSkills(paths);
    return;
  }

  if (command === "publication-scan") {
    const listOnly = args[0] === "--list";
    const scanArgs = listOnly ? args.slice(1) : args;
    const paths = scanArgs.length > 0 ? scanArgs : await findPublicationPaths();
    if (listOnly) {
      printPublicationCoverage(paths);
      return;
    }
    await scanPublication(paths);
    return;
  }

  if (command === "inventory") {
    await printInventory();
    return;
  }

  if (command === "runbook") {
    const workflow = await checkedWorkflow(requiredArg(args[0], "workflow"));
    console.log(renderRunbook(workflow));
    return;
  }

  if (command === "audit") {
    const workflow = await checkedWorkflow(requiredArg(args[0], "workflow"));
    console.log(renderAudit(workflow));
    return;
  }

  if (command === "new" && args[0] === "workflow") {
    const name = requiredArg(args[1], "name");
    await createWorkflow(name);
    return;
  }

  if (command === "new" && args[0] === "skill") {
    const name = requiredArg(args[1], "name");
    await createSkill(name);
    return;
  }

  fail(`unknown command: ${[command, ...args].join(" ")}\n\nRun: bun cli/aw.ts help`);
}

function printHelp() {
  console.log(`agentic-workflows

Usage:
  aw validate <workflow>
  aw check [workflow...]
  aw check-skills [skill...]
  aw publication-scan [--list] [file...]
  aw inventory
  aw runbook <workflow>
  aw audit <workflow>
  aw new workflow <name>
  aw new skill <name>
`);
}

async function checkedWorkflow(path: string): Promise<Workflow> {
  const workflow = await loadWorkflow(path);
  const errors = validateWorkflow(workflow);
  if (errors.length > 0) fail(errors.map((error) => `- ${error}`).join("\n"));
  return workflow;
}

async function loadWorkflow(path: string): Promise<Workflow> {
  const file = Bun.file(path);
  if (!(await file.exists())) fail(`workflow not found: ${path}`);
  const text = await file.text();
  const parsed = parseYaml(text);
  if (!isObject(parsed)) fail(`workflow must be a YAML object: ${path}`);
  return parsed as Workflow;
}

async function findWorkflowPaths(): Promise<string[]> {
  const glob = new Bun.Glob("workflows/*.workflow.yml");
  const paths: string[] = [];

  for await (const path of glob.scan(".")) {
    paths.push(path);
  }

  return paths.sort();
}

async function findSkillPaths(): Promise<string[]> {
  const glob = new Bun.Glob("skills/*/SKILL.md");
  const paths: string[] = [];

  for await (const path of glob.scan(".")) {
    paths.push(path);
  }

  return paths.sort();
}

async function findPublicationPaths(): Promise<string[]> {
  const paths = new Set<string>();

  for (const pattern of PUBLICATION_SCAN_GLOBS) {
    const glob = new Bun.Glob(pattern);
    for await (const path of glob.scan(".")) paths.add(path);
  }

  return [...paths].sort();
}

async function checkWorkflows(paths: string[]): Promise<void> {
  if (paths.length === 0) fail("no workflow files found");

  let failures = 0;

  for (const path of paths) {
    const workflow = await loadWorkflow(path);
    const errors = validateWorkflow(workflow);

    if (errors.length > 0) {
      failures += 1;
      console.error(`invalid: ${path}`);
      for (const error of errors) console.error(`- ${error}`);
      continue;
    }

    console.log(`valid: ${path} (${workflow.name})`);
  }

  if (failures > 0) fail(`${failures} workflow(s) failed validation`);
  console.log(`checked ${paths.length} workflow(s)`);
}

async function checkSkills(paths: string[]): Promise<void> {
  if (paths.length === 0) fail("no skill files found");

  let failures = 0;

  for (const path of paths) {
    const skill = await loadSkill(path);
    const errors = validateSkill(skill, path);

    if (errors.length > 0) {
      failures += 1;
      console.error(`invalid: ${path}`);
      for (const error of errors) console.error(`- ${error}`);
      continue;
    }

    console.log(`valid: ${path} (${skill.name})`);
  }

  if (failures > 0) fail(`${failures} skill(s) failed validation`);
  console.log(`checked ${paths.length} skill(s)`);
}

async function scanPublication(paths: string[]): Promise<void> {
  if (paths.length === 0) fail("no publication files found");

  let failures = 0;

  for (const path of paths) {
    const file = Bun.file(path);
    if (!(await file.exists())) {
      failures += 1;
      console.error(`missing: ${path}`);
      continue;
    }

    const text = await file.text();
    const errors = scanPublicationText(text, path);
    if (errors.length > 0) {
      failures += 1;
      console.error(`unsafe: ${path}`);
      for (const error of errors) console.error(`- ${error}`);
    }
  }

  if (failures > 0) fail(`${failures} publication file(s) failed safety scan`);
  console.log(`checked ${paths.length} publication file(s)`);
}

function printPublicationCoverage(paths: string[]): void {
  for (const path of paths) console.log(path);
  console.log(`listed ${paths.length} publication file(s)`);
}

async function printInventory(): Promise<void> {
  const workflowPaths = await findWorkflowPaths();
  const skillPaths = await findSkillPaths();
  const examplePaths = await findExampleReadmes();

  const workflows = await Promise.all(
    workflowPaths.map(async (path) => ({ path, workflow: await loadWorkflow(path) })),
  );
  const skills = await Promise.all(
    skillPaths.map(async (path) => ({ path, skill: await loadSkill(path) })),
  );
  const examples = await Promise.all(
    examplePaths.map(async (path) => ({ path, title: await readMarkdownTitle(path) })),
  );

  console.log(`# Agentic Workflows Inventory

## Summary
- Workflows: ${workflows.length}
- Skills: ${skills.length}
- Examples: ${examples.length}

## Workflows
| File | Name | Risk | Authority |
| --- | --- | --- | --- |`);

  for (const { path, workflow } of workflows) {
    console.log(
      `| ${path} | ${escapeTableCell(workflow.name)} | ${workflow.risk_level} | ${workflow.authority} |`,
    );
  }

  console.log(`
## Skills
| File | Name | Description |
| --- | --- | --- |`);

  for (const { path, skill } of skills) {
    console.log(
      `| ${path} | ${escapeTableCell(skill.name ?? "")} | ${escapeTableCell(compact(skill.description ?? "", 96))} |`,
    );
  }

  console.log(`
## Examples
| File | Title |
| --- | --- |`);

  for (const { path, title } of examples) {
    console.log(`| ${path} | ${escapeTableCell(title)} |`);
  }
}

function validateWorkflow(workflow: Workflow): string[] {
  const errors: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (!(field in workflow)) errors.push(`missing required field: ${field}`);
  }

  for (const field of STRING_FIELDS) {
    if (field in workflow && typeof workflow[field] !== "string") {
      errors.push(`${field} must be a string`);
      continue;
    }

    if (field in workflow && typeof workflow[field] === "string" && workflow[field].trim() === "") {
      errors.push(`${field} must not be empty`);
    }
  }

  for (const field of LIST_FIELDS) {
    if (field in workflow && !isStringArray(workflow[field])) {
      errors.push(`${field} must be a list of strings`);
      continue;
    }

    if (field in workflow && isStringArray(workflow[field]) && workflow[field].length === 0) {
      errors.push(`${field} must include at least one item`);
    }
  }

  if (typeof workflow.authority === "string" && !AUTHORITY_LEVELS.includes(workflow.authority)) {
    errors.push(`authority must be one of: ${AUTHORITY_LEVELS.join(", ")}`);
  }

  if (typeof workflow.risk_level === "string" && !RISK_LEVELS.includes(workflow.risk_level)) {
    errors.push(`risk_level must be one of: ${RISK_LEVELS.join(", ")}`);
  }

  if (
    workflow.risk_level === "external-write" &&
    workflow.authority !== "external_write_requires_approval"
  ) {
    errors.push("external-write risk_level requires authority: external_write_requires_approval");
  }

  if (
    workflow.authority === "external_write_requires_approval" &&
    !hasMeaningfulItems(workflow.approval_required)
  ) {
    errors.push("external_write_requires_approval workflows must name approval requirements");
  }

  return errors;
}

async function loadSkill(path: string): Promise<Skill> {
  const file = Bun.file(path);
  if (!(await file.exists())) fail(`skill not found: ${path}`);
  const text = await file.text();
  return parseSkill(text, path);
}

async function findExampleReadmes(): Promise<string[]> {
  const glob = new Bun.Glob("examples/**/README.md");
  const paths: string[] = [];

  for await (const path of glob.scan(".")) {
    if (path !== "examples/README.md") paths.push(path);
  }

  return paths.sort();
}

function validateSkill(skill: Skill, path: string): string[] {
  const errors: string[] = [];
  const directoryName = basename(dirname(path));

  if (!skill.name || skill.name.trim() === "") {
    errors.push("missing required frontmatter field: name");
  } else {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.name)) {
      errors.push("name must use lowercase kebab-case");
    }

    if (skill.name !== directoryName) {
      errors.push(`name must match parent directory: ${directoryName}`);
    }
  }

  if (!skill.description || skill.description.trim() === "") {
    errors.push("missing required frontmatter field: description");
  } else if (skill.description.length > 1024) {
    errors.push("description must be 1024 characters or fewer");
  }

  for (const section of SKILL_REQUIRED_SECTIONS) {
    if (!hasMarkdownSection(skill.body, section)) {
      errors.push(`missing required section: ${section}`);
    }
  }

  for (const forbidden of FORBIDDEN_PUBLICATION_PATTERNS) {
    if (forbidden.pattern.test(skill.text)) {
      errors.push(`contains forbidden public-safety pattern: ${forbidden.label}`);
    }
  }

  return errors;
}

function parseSkill(text: string, path: string): Skill {
  const normalized = text.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    fail(`skill must start with YAML frontmatter: ${path}`);
  }

  const closeIndex = normalized.indexOf("\n---", 4);
  if (closeIndex === -1) fail(`skill frontmatter must close with ---: ${path}`);

  const frontmatter = normalized.slice(4, closeIndex);
  const body = normalized.slice(closeIndex + 4).trimStart();
  const fields: Record<string, string> = {};

  for (const rawLine of frontmatter.split("\n")) {
    const line = rawLine.trimEnd();
    if (!line.trim() || line.trimStart().startsWith("#") || /^\s/.test(line)) continue;

    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (!match) fail(`unsupported skill frontmatter line in ${path}: ${rawLine}`);

    const [, key, value = ""] = match;
    if (value.trim() !== "") fields[key] = parseSkillScalar(value);
  }

  return {
    name: fields.name,
    description: fields.description,
    body,
    text,
  };
}

function scanPublicationText(text: string, path: string): string[] {
  const errors: string[] = [];
  const lines = text.replace(/\r\n/g, "\n").split("\n");

  lines.forEach((line, index) => {
    for (const forbidden of FORBIDDEN_PUBLICATION_PATTERNS) {
      if (forbidden.pattern.test(line)) {
        errors.push(`${path}:${index + 1} contains ${forbidden.label}`);
      }
    }
  });

  return errors;
}

function renderRunbook(workflow: Workflow): string {
  return `# ${workflow.name}

## Goal
${workflow.goal}

## Trigger
${workflow.trigger}

## Inputs
${bulletList(workflow.inputs)}

## Allowed Tools
${bulletList(workflow.allowed_tools)}

## Safety Contract
- Risk level: ${workflow.risk_level}
- Authority: ${workflow.authority}
- Dry-run behavior: ${workflow.dry_run}

## Required Permissions
${bulletList(workflow.required_permissions)}

## External Side Effects
${bulletList(workflow.external_side_effects)}

## Destructive Actions
${bulletList(workflow.destructive_actions)}

## Approval Required
${bulletList(workflow.approval_required)}

## Steps
${numberedList(workflow.steps)}

## Verification
${bulletList(workflow.verification)}

## Artifacts
${bulletList(workflow.artifacts)}

## Memory Update
${workflow.memory_update}`;
}

function renderAudit(workflow: Workflow): string {
  const externalAllowed = workflow.authority === "external_write_requires_approval";
  const localWriteAllowed = workflow.authority === "local_write";
  const readOnly = workflow.authority === "read_only";

  return `# Authority audit: ${workflow.name}

- risk level: ${workflow.risk_level}
- authority: ${workflow.authority}
- local writes: ${localWriteAllowed ? "allowed" : readOnly ? "forbidden" : "limited by workflow"}
- external writes: ${externalAllowed ? "requires human approval" : "forbidden"}
- destructive actions: ${hasMeaningfulItems(workflow.destructive_actions) ? "declared; explicit approval required" : "forbidden"}
- allowed tools: ${workflow.allowed_tools.join(", ")}
- required permissions: ${workflow.required_permissions.join(", ")}
- external side effects: ${workflow.external_side_effects.join(", ")}
- approval required: ${workflow.approval_required.join(", ")}
- dry-run behavior: ${workflow.dry_run}
- verification gates: ${workflow.verification.length}

Result: ${auditResult(workflow.authority)}`;
}

function auditResult(authority: string): string {
  if (authority === "destructive_forbidden") {
    return "Workflow explicitly forbids destructive actions. Confirm any other write authority in the steps before use.";
  }
  if (authority === "external_write_requires_approval") {
    return "Workflow may prepare external changes, but execution must stop for human approval.";
  }
  if (authority === "external_draft") {
    return "Workflow may draft external-facing artifacts, but must not publish or send them.";
  }
  if (authority === "local_write") {
    return "Workflow may write inside the repo or local workspace and should verify before handoff.";
  }
  return "Workflow is read-only. It may inspect and summarize but must not change files or external systems.";
}

async function createWorkflow(name: string) {
  const slug = slugify(name);
  const path = `workflows/${slug}.workflow.yml`;
  const file = Bun.file(path);
  if (await file.exists()) fail(`workflow already exists: ${path}`);

  await Bun.write(
    path,
    `name: ${titleize(name)}
goal: Describe the outcome this workflow should produce.
trigger: Describe when to run this workflow.
inputs:
  - README or task brief
allowed_tools:
  - shell_read
authority: read_only
risk_level: read-only
required_permissions:
  - Local repository read access
external_side_effects:
  - None
destructive_actions:
  - None
dry_run: Default behavior is inspection only; do not modify files during triage.
approval_required:
  - Approval required before local edits, commits, external writes, or destructive actions.
steps:
  - Map the available context.
  - Identify the smallest useful artifact.
  - Produce the artifact.
verification:
  - Check the artifact against the stated goal.
artifacts:
  - Runbook or decision note
memory_update: Save reusable procedure notes only; do not save private context.
`,
  );

  console.log(`created: ${path}`);
}

async function createSkill(name: string) {
  const slug = slugify(name);
  const dir = `skills/${slug}`;
  const path = `${dir}/SKILL.md`;
  const file = Bun.file(path);
  if (await file.exists()) fail(`skill already exists: ${path}`);

  await mkdir(dir, { recursive: true });
  await Bun.write(
    path,
    `---
name: ${slug}
description: Use this skill when a repeatable workflow needs structured inputs, authority boundaries, verification gates, approval gates, and a durable output artifact.
license: CC-BY-4.0
metadata:
  category: general
  authority: read_only
---

# ${titleize(name)}

Use this skill when a user needs ${titleize(name).toLowerCase()}.

## Goal

Describe the outcome this skill should reliably produce.

## Inputs

- Task brief or user request.
- Relevant files, URLs, or context.
- Known constraints and approval requirements.

## Authority

\`read_only\`

Allowed levels:

- \`read_only\`: inspect, summarize, and recommend only.
- \`local_write\`: write inside the local repo or workspace only.
- \`external_draft\`: draft external-facing artifacts without sending.
- \`external_write_requires_approval\`: stop for approval before external writes.
- \`destructive_forbidden\`: destructive actions are out of scope.

## Procedure

1. Confirm the goal, inputs, and authority boundary.
2. Inspect only the context needed for the task.
3. Produce the durable artifact named by the skill.
4. Run the verification gate.
5. Record only reusable, public-safe lessons.

## Verification Gate

- Confirm the output satisfies the stated goal.
- Confirm authority boundaries were respected.
- Confirm the artifact contains no secrets, private paths, real account IDs, or private operational details.

## Approval Gates

Stop for explicit human approval before:

- External writes.
- Credentialed account access.
- Destructive actions.
- Publishing, sending, posting, merging, or enabling anything.

## Output

- Runbook, report, checklist, approval record, or decision memo.

## Public-Safe Example

Use fictional names, example.com URLs, fake IDs, and fake data. Do not include
real clients, employers, account IDs, private URLs, screenshots, local home
paths, secrets, hidden prompts, or private operational details.

## Safety

Do not include secrets, private memory, real account IDs, hidden prompts, private
workspace paths, or internal operational details.
`,
  );

  console.log(`created: ${path}`);
}

function parseYaml(text: string): YamlValue {
  const root: Record<string, YamlValue> = {};
  let currentKey: string | null = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const withoutComment = rawLine.replace(/\s+#.*$/, "");
    if (!withoutComment.trim()) continue;

    const indent = withoutComment.match(/^ */)?.[0].length ?? 0;
    const line = withoutComment.trim();

    if (indent === 0) {
      const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
      if (!match) fail(`unsupported YAML line: ${rawLine}`);
      const [, key, value = ""] = match;
      if (value === "") {
        root[key] = [];
        currentKey = key;
      } else {
        root[key] = parseScalar(value);
        currentKey = null;
      }
      continue;
    }

    if (indent === 2 && line.startsWith("- ") && currentKey) {
      const list = root[currentKey];
      if (!Array.isArray(list)) fail(`YAML key is not a list: ${currentKey}`);
      list.push(parseScalar(line.slice(2)));
      continue;
    }

    fail(`unsupported YAML nesting: ${rawLine}`);
  }

  return root;
}

function parseScalar(value: string): Scalar {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseSkillScalar(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function normalizeSkillPath(path: string): string {
  return path.endsWith("SKILL.md") ? path : `${path.replace(/\/$/, "")}/SKILL.md`;
}

async function readMarkdownTitle(path: string): Promise<string> {
  const text = await Bun.file(path).text();
  const title = text.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return title || basename(dirname(path));
}

function requiredArg(value: string | undefined, name: string): string {
  if (!value) fail(`missing required argument: ${name}`);
  return value;
}

function bulletList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function numberedList(items: string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function isObject(value: YamlValue): value is Record<string, YamlValue> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function hasMeaningfulItems(value: unknown): boolean {
  return isStringArray(value) && value.some((item) => !/^none\b/i.test(item.trim()));
}

function hasMarkdownSection(body: string, section: string): boolean {
  return new RegExp(`^${escapeRegex(section)}\\s*$`, "m").test(body);
}

function compact(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 3).trimEnd()}...`;
}

function escapeTableCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleize(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

main().catch((error) => fail(error instanceof Error ? error.message : String(error)));
