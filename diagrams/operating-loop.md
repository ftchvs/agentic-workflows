# Agentic operating loop

```mermaid
flowchart LR
  A[Context] --> B[Delegation]
  B --> C[Execution]
  C --> D[Verification]
  D --> E{Approval needed?}
  E -- No --> F[Artifact]
  E -- Yes --> G[Human approval]
  G --> F
  F --> H[Learning]
  H --> A
```

## How to read it

- **Context** — give the agent the smallest useful scope.
- **Delegation** — define goal, authority, forbidden actions, and output.
- **Execution** — let the agent work, often with subagents for independent lanes.
- **Verification** — inspect evidence, tests, sources, diffs, or tracker state.
- **Approval** — gate external-visible, destructive, or privacy-sensitive actions.
- **Artifact** — produce a durable output, not just chat.
- **Learning** — save reusable procedures and failure modes, not raw transcripts.
