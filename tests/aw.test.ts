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
  expect(result.stdout).toContain("valid: workflows/google-workspace-operator-pack.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/growth-launch-readiness.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/meta-ads-cli-dry-run-adapter.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/paid-social-launch-gate.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/product-marketing-context-builder.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/growth-loop-diagnosis.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/repo-triage.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/research-to-decision.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/social-content-fact-check-rewrite.workflow.yml");
  expect(result.stdout).toContain("valid: workflows/technical-seo-launch-audit.workflow.yml");
  expect(result.stdout).toMatch(/checked \d+ workflow\(s\)/);
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

test("validate rejects credentialed workflows without meaningful approval gates", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-credentialed-invalid-"));

  try {
    const workflowPath = join(dir, "credentialed-missing-gates.workflow.yml");
    writeFileSync(
      workflowPath,
      `name: Credentialed Missing Gates
goal: Show credentialed validation failure.
trigger: Test only.
inputs:
  - Task brief
allowed_tools:
  - shell_read
authority: external_draft
risk_level: credentialed
required_permissions:
  - None
external_side_effects:
  - None
destructive_actions:
  - None
dry_run: Inspect synthetic context only.
approval_required:
  - None
steps:
  - Inspect context.
verification:
  - Confirm no external access occurred.
artifacts:
  - Report
memory_update: Save nothing from this test.
`,
    );

    const result = await runAw(["validate", workflowPath]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("credentialed risk_level must name required permissions");
    expect(result.stderr).toContain("credentialed risk_level must name approval requirements");
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
  expect(result.stdout).toContain("valid: skills/google-workspace-operator-pack/SKILL.md");
  expect(result.stdout).toContain("valid: skills/growth-loop-diagnosis/SKILL.md");
  expect(result.stdout).toContain("valid: skills/meta-ads-cli-dry-run-adapter/SKILL.md");
  expect(result.stdout).toContain("valid: skills/paid-social-launch-gate/SKILL.md");
  expect(result.stdout).toContain("valid: skills/product-marketing-context-builder/SKILL.md");
  expect(result.stdout).toContain("valid: skills/social-content-fact-check-rewrite/SKILL.md");
  expect(result.stdout).toContain("valid: skills/technical-seo-launch-audit/SKILL.md");
  expect(result.stdout).toMatch(/checked \d+ skill\(s\)/);
});

test("catalog-check validates workflow, skill, and example indexes", async () => {
  const result = await runAw(["catalog-check"]);

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain("catalog ok:");
  expect(result.stdout).toContain("workflows/");
  expect(result.stdout).toContain("skills/");
  expect(result.stdout).toContain("examples/");
  expect(result.stdout).toContain("evals/");
});

test("eval-check validates machine-readable eval fixtures", async () => {
  const result = await runAw(["eval-check"]);

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain("valid: examples/growth-skill-evals/ad-preflight-review.fixture.json");
  expect(result.stdout).toContain("valid: examples/growth-skill-evals/analytics-consent-audit.fixture.json");
  expect(result.stdout).toContain("valid: examples/growth-skill-evals/google-ads-upload-qa.fixture.json");
  expect(result.stdout).toContain("valid: examples/growth-skill-evals/growth-loop-diagnosis.fixture.json");
  expect(result.stdout).toContain("valid: examples/growth-skill-evals/paid-social-launch-gate.fixture.json");
  expect(result.stdout).toContain("valid: examples/growth-skill-evals/product-marketing-context-builder.fixture.json");
  expect(result.stdout).toContain("valid: examples/growth-skill-evals/social-content-fact-check-rewrite.fixture.json");
  expect(result.stdout).toContain("valid: examples/growth-skill-evals/technical-seo-launch-audit.fixture.json");
  expect(result.stdout).toContain("valid: examples/operator-skill-evals/google-workspace-operator-pack.fixture.json");
  expect(result.stdout).toContain("valid: examples/operator-skill-evals/meta-ads-cli-dry-run-adapter.fixture.json");
  expect(result.stdout).toMatch(/checked \d+ eval fixture\(s\)/);
});

test("eval-check rejects incomplete eval fixtures", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-eval-invalid-"));

  try {
    mkdirSync(join(dir, "examples", "growth-skill-evals"), { recursive: true });
    writeFileSync(
      join(dir, "examples", "growth-skill-evals", "missing-fields.fixture.json"),
      JSON.stringify(
        {
          id: "missing-fields",
          skill: "ad-preflight-review",
          prompt: "Review a fictional ad.",
        },
        null,
        2,
      ),
    );

    const result = await runAw(["eval-check"], dir);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("missing required field: expected_artifact");
    expect(result.stderr).toContain("missing required field: must_pass");
    expect(result.stderr).toContain("missing required field: must_stop_before");
    expect(result.stderr).toContain("missing required field: public_safety");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("catalog-check rejects missing index entries", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-catalog-invalid-"));

  try {
    mkdirSync(join(dir, "workflows"), { recursive: true });
    mkdirSync(join(dir, "skills", "sample-skill"), { recursive: true });
    mkdirSync(join(dir, "examples", "sample-example"), { recursive: true });
    writeFileSync(join(dir, "README.md"), "# Missing Catalog\n");
    writeFileSync(join(dir, "examples", "README.md"), "# Examples\n");
    writeFileSync(
      join(dir, "workflows", "sample.workflow.yml"),
      `name: Sample
goal: Show catalog failure.
trigger: Test only.
inputs:
  - Task brief
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
dry_run: Inspect only.
approval_required:
  - Approval required before writes.
steps:
  - Inspect context.
verification:
  - Confirm no files changed.
artifacts:
  - Report
memory_update: Save nothing from this test.
`,
    );
    writeFileSync(join(dir, "workflows", "sample.md"), "# Sample\n");
    writeFileSync(
      join(dir, "skills", "sample-skill", "SKILL.md"),
      `---
name: sample-skill
description: Review a synthetic skill.
---

# Sample Skill

## Goal

## Inputs

## Authority

## Procedure

## Verification Gate

## Approval Gates

## Output
`,
    );
    writeFileSync(join(dir, "examples", "sample-example", "README.md"), "# Sample Example\n");

    const result = await runAw(["catalog-check"], dir);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("README.md missing workflow entry: workflows/sample.workflow.yml");
    expect(result.stderr).toContain("README.md missing workflow playbook entry: workflows/sample.md");
    expect(result.stderr).toContain("README.md missing skill entry: skills/sample-skill/SKILL.md");
    expect(result.stderr).toContain("examples/README.md missing example entry: sample-example/README.md");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("catalog-check rejects missing eval fixture README entries", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-catalog-eval-invalid-"));

  try {
    mkdirSync(join(dir, "examples", "sample-evals"), { recursive: true });
    writeFileSync(join(dir, "README.md"), "# Sample\n");
    writeFileSync(
      join(dir, "examples", "README.md"),
      "# Examples\n\n[sample evals](sample-evals/README.md)\n",
    );
    writeFileSync(
      join(dir, "examples", "sample-evals", "README.md"),
      "# Sample Evals\n\nThis README forgot to link its fixture.\n",
    );
    writeFileSync(
      join(dir, "examples", "sample-evals", "missing.fixture.json"),
      JSON.stringify(
        {
          id: "missing-link",
          skill: "sample-skill",
          prompt: "Review a fictional example.",
          expected_artifact: ["report"],
          must_pass: ["Names the expected boundary."],
          must_stop_before: ["External action."],
          public_safety: ["Uses synthetic data only."],
        },
        null,
        2,
      ),
    );

    const result = await runAw(["catalog-check"], dir);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain(
      "examples/sample-evals/README.md missing eval fixture entry: missing.fixture.json",
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("publication-scan validates public repo artifacts", async () => {
  const result = await runAw(["publication-scan"]);

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain("checked ");
  expect(result.stdout).toContain(" publication file(s)");
});

test("inventory summarizes public workflow assets", async () => {
  const result = await runAw(["inventory"]);

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain("# Agentic Workflows Inventory");
  expect(result.stdout).toContain("- Workflows: 14");
  expect(result.stdout).toContain("- Skills: 10");
  expect(result.stdout).toContain("- Examples: 10");
  expect(result.stdout).toContain("| workflows/repo-triage.workflow.yml | Repo Triage | read-only | read_only |");
  expect(result.stdout).toContain("| skills/ad-preflight-review/SKILL.md | ad-preflight-review |");
  expect(result.stdout).toContain("| examples/fictional-product-audit/README.md | Fictional case study: product audit to decision memo |");
});

test("publication-scan lists covered public repo artifacts", async () => {
  const result = await runAw(["publication-scan", "--list"]);

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain("README.md");
  expect(result.stdout).toContain("CHANGELOG.md");
  expect(result.stdout).toContain("cli/aw.ts");
  expect(result.stdout).toContain("package.json");
  expect(result.stdout).toContain("examples/growth-skill-evals/README.md");
  expect(result.stdout).toContain("examples/growth-skill-evals/ad-preflight-review.fixture.json");
  expect(result.stdout).toContain("examples/growth-skill-evals/analytics-consent-audit.fixture.json");
  expect(result.stdout).toContain("examples/growth-skill-evals/google-ads-upload-qa.fixture.json");
  expect(result.stdout).toContain("examples/growth-skill-evals/growth-loop-diagnosis.fixture.json");
  expect(result.stdout).toContain("examples/growth-skill-evals/paid-social-launch-gate.fixture.json");
  expect(result.stdout).toContain("examples/growth-skill-evals/product-marketing-context-builder.fixture.json");
  expect(result.stdout).toContain("examples/growth-skill-evals/social-content-fact-check-rewrite.fixture.json");
  expect(result.stdout).toContain("examples/growth-skill-evals/technical-seo-launch-audit.fixture.json");
  expect(result.stdout).toContain("examples/operator-skill-evals/README.md");
  expect(result.stdout).toContain("examples/operator-skill-evals/google-workspace-operator-pack.fixture.json");
  expect(result.stdout).toContain("examples/operator-skill-evals/meta-ads-cli-dry-run-adapter.fixture.json");
  expect(result.stdout).toContain("examples/fictional-workspace-operator/README.md");
  expect(result.stdout).toContain("examples/fictional-meta-ads-cli/README.md");
  expect(result.stdout).toContain("workflows/growth-launch-readiness.workflow.yml");
  expect(result.stdout).toContain("workflows/google-workspace-operator-pack.workflow.yml");
  expect(result.stdout).toContain("workflows/meta-ads-cli-dry-run-adapter.workflow.yml");
  expect(result.stdout).toMatch(/listed \d+ publication file\(s\)/);
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

test("publication-scan rejects customer ID variants", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-publication-customer-id-"));

  try {
    mkdirSync(join(dir, "docs"), { recursive: true });
    writeFileSync(
      join(dir, "docs", "unsafe.md"),
      `# Unsafe

Customer ID: \`123-456-7890\`
customer_id: \`234-567-8901\`
`,
    );

    const result = await runAw(["publication-scan", "docs/unsafe.md"], dir);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("docs/unsafe.md:3 contains real-looking Google Ads customer ID");
    expect(result.stderr).toContain("docs/unsafe.md:4 contains real-looking Google Ads customer ID");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("publication-scan rejects credentialed platform IDs and tokens", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-publication-platform-secrets-"));

  try {
    mkdirSync(join(dir, "docs"), { recursive: true });
    const oauthClientId = `${"123456789012"}-${"abcdefghijklmnopqrstuvwxyz123456"}.apps.googleusercontent.com`;
    const metaToken = `EA${"ABwzLixnjYBOabcde1234567890ABCDE1234567890"}`;
    const metaAdAccountId = `act_${"1234567890"}`;

    writeFileSync(
      join(dir, "docs", "unsafe.md"),
      `# Unsafe

OAuth client: ${oauthClientId}
Meta token: ${metaToken}
Ad account: ${metaAdAccountId}
`,
    );

    const result = await runAw(["publication-scan", "docs/unsafe.md"], dir);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("docs/unsafe.md:3 contains real-looking Google OAuth client ID");
    expect(result.stderr).toContain("docs/unsafe.md:4 contains Meta access token");
    expect(result.stderr).toContain("docs/unsafe.md:5 contains real-looking Meta ad account ID");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("publication-scan rejects private key blocks", async () => {
  const dir = mkdtempSync(join(tmpdir(), "aw-publication-private-key-"));

  try {
    mkdirSync(join(dir, "docs"), { recursive: true });
    const privateKeyHeader = `-----BEGIN ${"PRIVATE"} KEY-----`;
    const privateKeyFooter = `-----END ${"PRIVATE"} KEY-----`;
    writeFileSync(
      join(dir, "docs", "unsafe.md"),
      `# Unsafe

${privateKeyHeader}
synthetic-key-body
${privateKeyFooter}
`,
    );

    const result = await runAw(["publication-scan", "docs/unsafe.md"], dir);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("docs/unsafe.md:3 contains private key block");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
