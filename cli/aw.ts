#!/usr/bin/env bun

type Scalar = string | number | boolean | null;
type YamlValue = Scalar | YamlValue[] | { [key: string]: YamlValue };

type Workflow = {
  name: string;
  goal: string;
  trigger: string;
  inputs: string[];
  allowed_tools: string[];
  authority: string;
  steps: string[];
  verification: string[];
  artifacts: string[];
  memory_update: string;
};

const AUTHORITY_LEVELS = [
  "read_only",
  "local_write",
  "external_draft",
  "external_write_requires_approval",
  "destructive_forbidden",
];

const REQUIRED_FIELDS: Array<keyof Workflow> = [
  "name",
  "goal",
  "trigger",
  "inputs",
  "allowed_tools",
  "authority",
  "steps",
  "verification",
  "artifacts",
  "memory_update",
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

  fail(`unknown command: ${[command, ...args].join(" ")}\n\nRun: bun cli/aw.ts help`);
}

function printHelp() {
  console.log(`agentic-workflows

Usage:
  aw validate <workflow>
  aw runbook <workflow>
  aw audit <workflow>
  aw new workflow <name>
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

function validateWorkflow(workflow: Workflow): string[] {
  const errors: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (!(field in workflow)) errors.push(`missing required field: ${field}`);
  }

  for (const field of ["name", "goal", "trigger", "authority", "memory_update"] as const) {
    if (field in workflow && typeof workflow[field] !== "string") {
      errors.push(`${field} must be a string`);
    }
  }

  for (const field of ["inputs", "allowed_tools", "steps", "verification", "artifacts"] as const) {
    if (field in workflow && !isStringArray(workflow[field])) {
      errors.push(`${field} must be a list of strings`);
    }
  }

  if (typeof workflow.authority === "string" && !AUTHORITY_LEVELS.includes(workflow.authority)) {
    errors.push(`authority must be one of: ${AUTHORITY_LEVELS.join(", ")}`);
  }

  if (isStringArray(workflow.steps) && workflow.steps.length === 0) {
    errors.push("steps must include at least one step");
  }

  if (isStringArray(workflow.verification) && workflow.verification.length === 0) {
    errors.push("verification must include at least one check");
  }

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

## Authority
${workflow.authority}

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

- authority: ${workflow.authority}
- local writes: ${localWriteAllowed ? "allowed" : readOnly ? "forbidden" : "limited by workflow"}
- external writes: ${externalAllowed ? "requires human approval" : "forbidden"}
- destructive actions: forbidden
- allowed tools: ${workflow.allowed_tools.join(", ")}
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
