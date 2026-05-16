import { expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const repoRoot = new URL("..", import.meta.url).pathname;
const cliPath = join(repoRoot, "cli/aw.ts");

async function runAw(args: string[], cwd = repoRoot) {
  const proc = Bun.spawn(["bun", cliPath, ...args], {
    cwd,
    stderr: "pipe",
    stdout: "pipe",
  });

  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);

  return { stdout, stderr, exitCode };
}

test("check validates every executable workflow", async () => {
  const result = await runAw(["check"]);

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain("valid: workflows/external-action-gate.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/ad-preflight-review.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/analytics-consent-audit.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/google-ads-upload-qa.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/paid-social-launch-gate.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/product-marketing-context-builder.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/growth-loop-diagnosis.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/repo-triage.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/research-to-decision.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/social-content-fact-check-rewrite.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/technical-seo-launch-audit.workflow.yml");
  expect(result.stdout).toContain("checked 11 workflow(s)");
});

test("validate rejects workflows missing safety metadata", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-invalid-"));

  try {
    const workflowPath = join(dir, "missing-safety.workflow.yml");
    writeFileSync(
      workflowPath,
      `name: Missing Safety
goal: Show validation failure.
trigger: Test only.
inputs:
  - Task brief
allowed_tools:
  - shell_read
authority: read_only
steps:
  - Inspect context.
verification:
  - Confirm no files changed.
artifacts:
  - Triage report
memory_update: Save nothing from this test.
`,
    );

    const result = await runAw(["validate", workflowPath]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("missing required field: risk_level");
    expect(result.stderr).toContain("missing required field: approval_required");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("new workflow scaffolds valid safety metadata", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-new-"));

  try {
    mkdirSync(join(dir, "workflows"));

    const created = await runAw(["new", "workflow", "approval smoke"], dir);
    expect(created.exitCode).toBe(0);
    expect(created.stdout).toContain("created: workflows/approval-smoke.workflow.yml");

    const validated = await runAw(["validate", "workflows/approval-smoke.workflow.yml"], dir);
    expect(validated.exitCode).toBe(0);
    expect(validated.stdout).toContain("valid: Approval Smoke");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("new skill scaffolds valid skill metadata", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-new-skill-"));

  try {
    const created = await runAw(["new", "skill", "launch readiness"], dir);
    expect(created.exitCode).toBe(0);
    expect(created.stdout).toContain("created: skills/launch-readiness/SKILL.md");

    const validated = await runAw(["check-skills", "skills/launch-readiness"], dir);
    expect(validated.exitCode).toBe(0);
    expect(validated.stdout).toContain("valid: skills/launch-readiness/SKILL.md");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("check-skills validates growth skill artifacts", async () => {
  const result = await runAw(["check-skills"]);

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain("valid: skills/ad-preflight-review/SKILL.md");
  expect(result.stdout).toContain("valid: skills/analytics-consent-audit/SKILL.md");
  expect(result.stdout).toContain("valid: skills/google-ads-upload-qa/SKILL.md");
  expect(result.stdout).toContain("valid: skills/growth-loop-diagnosis/SKILL.md");
  expect(result.stdout).toContain("valid: skills/paid-social-launch-gate/SKILL.md");
  expect(result.stdout).toContain("valid: skills/product-marketing-context-builder/SKILL.md");
  expect(result.stdout).toContain("valid: skills/social-content-fact-check-rewrite/SKILL.md");
  expect(result.stdout).toContain("valid: skills/technical-seo-launch-audit/SKILL.md");
  expect(result.stdout).toContain("checked 8 skill(s)");
});

test("publication-scan validates public repo artifacts", async () => {
  const result = await runAw(["publication-scan"]);

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain("checked ");
  expect(result.stdout).toContain(" publication file(s)");
});

test("check-skills rejects mismatched skill names", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-skill-invalid-"));

  try {
    const skillDir = join(dir, "skills", "bad-skill");
    mkdirSync(skillDir, { recursive: true });
    writeFileSync(
      join(skillDir, "SKILL.md"),
      `---
name: different-name
description: Review a synthetic skill.
---

# Bad Skill

## Goal

## Inputs

## Authority

## Procedure

## Verification Gate

## Approval Gates

## Output
`,
    );

    const result = await runAw(["check-skills"], dir);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("name must match parent directory: bad-skill");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("check-skills rejects private paths in skill files", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-skill-private-"));

  try {
    const skillDir = join(dir, "skills", "private-path-skill");
    mkdirSync(skillDir, { recursive: true });
    const privatePath = `/${"Users"}/alice/private-client/export.csv`;
    writeFileSync(
      join(skillDir, "SKILL.md"),
      `---
name: private-path-skill
description: Review a synthetic skill.
---

# Private Path Skill

## Goal

Never publish ${privatePath}.

## Inputs

## Authority

## Procedure

## Verification Gate

## Approval Gates

## Output
`,
    );

    const result = await runAw(["check-skills"], dir);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("contains forbidden public-safety pattern: absolute macOS home path");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("publication-scan rejects private paths outside skills", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-publication-private-"));

  try {
    mkdirSync(join(dir, "docs"), { recursive: true });
    const privatePath = `/${"Users"}/alice/private-client/export.csv`;
    writeFileSync(
      join(dir, "docs", "unsafe.md"),
      `# Unsafe

Never publish ${privatePath}.
`,
    );

    const result = await runAw(["publication-scan", "docs/unsafe.md"], dir);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("docs/unsafe.md:3 contains absolute macOS home path");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
