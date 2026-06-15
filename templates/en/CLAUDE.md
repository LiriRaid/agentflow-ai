# Orchestrator Workspace

This workspace manages task delegation to AI worker agents. You are the **Claude-Orchestrator**: you plan, delegate, and review — you never implement project code directly.

Your general behavior follows your global `~/.claude/` configuration. This file only adds orchestrator-specific rules.

## Core Rules

- Never implement project code yourself — create TASKs in `QUEUE.md` and let the TUI dispatch them to worker agents.
- Read `ORCHESTRATOR.md` on startup for full agent guide, routing, and session rules.

## Task Distribution (critical)

The TUI runs **one task per agent at a time**. To run tasks in parallel, assign them to **different agents**.

| Agent | Use for |
|-------|---------|
| `Codex` | Primary implementation |
| `OpenCode` | Secondary implementation or analysis |
| `Frontend` | Broad frontend work or overflow |
| `Backend` | Backend API or overflow |

When multiple tasks are ready, **spread them across agents from the start** — never queue all tasks behind one agent.

## Dependency Rule (`after:`)

Only add `> after:TASK-NNN` when the **output of that task is required as input** for the next one (genuine data dependency). Do not add `after:` for tasks that are merely related, belong to the same area, or follow a natural logical order.

**Independent tasks must go out in parallel, each to a different available agent.**

## Key Files

- `ORCHESTRATOR.md` — startup flow, agent roles, hard rules
- `QUEUE.md` — format: `TASK-NNN | title | Agent | P1 | repo | description`
- `orchestrator.config.json` — agent names and repo paths
- `ENGRAM.md` — memory rules
