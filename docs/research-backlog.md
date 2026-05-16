# Research backlog: agentic workflow operating files

This backlog converts public research into small, public-safe improvements for
`agentic-workflows`. It favors repo-native operating artifacts over prompt
dumps, with explicit authority, verification, approval, and learning loops.

## Sources reviewed

- LangGraph overview and durable execution docs:
  https://docs.langchain.com/oss/python/langgraph/overview and
  https://docs.langchain.com/oss/python/langgraph/durable-execution
- OpenAI Agents SDK docs for guardrails, approvals, tracing, and evals:
  https://developers.openai.com/api/docs/guides/agents,
  https://developers.openai.com/api/docs/guides/agents/guardrails-approvals,
  https://developers.openai.com/api/docs/guides/agents/integrations-observability,
  and https://developers.openai.com/api/docs/guides/agent-evals
- Pydantic AI graph and output docs:
  https://pydantic.dev/docs/ai/graph/graph/ and
  https://pydantic.dev/docs/ai/core-concepts/output/
- PocketFlow docs: https://the-pocket.github.io/PocketFlow/
- AGENTS.md reference repo and Codex guidance:
  https://github.com/agentsmd/agents.md and
  https://developers.openai.com/codex/guides/agents-md
- Microsoft Conductor announcement and Agent Framework workflow docs:
  https://opensource.microsoft.com/blog/2026/05/14/conductor-deterministic-orchestration-for-multi-agent-ai-workflows/
  and https://learn.microsoft.com/en-us/agent-framework/workflows/workflows
- Dagger AI agent quickstart:
  https://docs.dagger.io/getting-started/quickstarts/agent/
- Temporal docs homepage and workflow message-passing docs:
  https://docs.temporal.io/ and
  https://docs.temporal.io/develop/go/workflows/message-passing
- Runbooks marketplace scan: https://tryrunbooks.com/

## Ranking

1. **Enforce publication-policy metadata in executable workflows.**
   The policy already requires risk level, permissions, side effects,
   destructive actions, dry-run behavior, and approval requirements. The schema
   and CLI should require those fields so workflows cannot drift away from the
   public safety contract.

2. **Add an all-workflow validation command.**
   The repo has multiple `.workflow.yml` files now, and future contributors
   should not need to remember every path. A `check` command should validate all
   executable workflow files and become the default `bun run validate` target.

3. **Create an executable external-action gate.**
   External writes are the highest-risk recurring boundary. A machine-readable
   workflow should model exact-content review, target confirmation, approval
   evidence, and no-op dry-run behavior.

4. **Make approval records first-class artifacts.**
   OpenAI approval interruptions, Temporal signals/updates, and LangGraph
   interrupts all point to the same pattern: approval should be represented as a
   durable receipt, not a vague chat message.

5. **Add a workflow output contract.**
   Pydantic AI and structured-output patterns suggest each workflow should name
   the expected artifact shape. A future schema field could define required
   headings or checklist items without pulling in new dependencies.

6. **Add deterministic routing notes for multi-agent workflows.**
   Conductor, Microsoft Agent Framework, LangGraph, and PocketFlow all separate
   graph topology from model reasoning. The repo should teach when routing is a
   declared workflow edge versus a model decision.

7. **Add a synthetic trace/eval example.**
   OpenAI and LangSmith patterns both treat traces as the bridge between one-off
   debugging and repeatable evals. A public-safe example can show how to turn a
   run trace into a checklist without exposing private logs.

8. **Add reproducible execution-environment guidance.**
   Dagger and containerized-agent patterns reinforce that agent workflows need
   repeatable environments. A future template can capture package manager,
   setup, cache boundaries, and local validation commands.

9. **Curate runbook-marketplace hygiene.**
   Public runbook libraries reduce blank-page friction, but many entries are
   prompt-like and external-write-heavy. This repo should differentiate by
   requiring authority labels, dry-run defaults, and artifact verification.

10. **Add AGENTS.md quality checks.**
    AGENTS.md guidance works best when it names concrete commands, conventions,
    and verification gates. A future linter could flag vague instructions,
    private paths, and missing test commands in generated agent contracts.

## Immediate implementation slice

Implement items 1-3 first. They are small, fit the existing Bun CLI, require no
new dependencies, and directly reinforce the repository thesis: controlled AI
work should be specified as reviewable operating files.
