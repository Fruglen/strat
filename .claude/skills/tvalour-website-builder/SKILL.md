---
name: tvalour-website-builder
description: Staged website-build workflow (brief, facts ledger, copy, design, build, review, revise) that refuses invented facts and generic AI layouts. Use when building a complete small-business or client demo site from a description and you want a gated process; follow AGENTS.md in this folder.
---

# TVALOUR website-builder

Vendored from https://github.com/TVALOUR/website-builder (see LICENSE). The repo is meant to
be used as a workspace: its contract lives in `AGENTS.md`, the Claude Code notes in
`CLAUDE.md`, and the stage instructions in `stages/*/CONTEXT.md`.

How to use it from this project:

1. Read `AGENTS.md` in this folder first, then `CLAUDE.md`.
2. Work stage by stage from `stages/01_*` onward. Put each build in `builds/<slug>/` here,
   or in the project, but keep the same file set (`brief.md`, `facts.md`, `content.md`,
   `design.md`, then `site/`).
3. Run the zero-dependency checks with `node checks/run.mjs` from this folder before calling
   a build done.

The upstream repo's own hooks (`.claude/hooks/gate.mjs`) only fire when Claude runs with this
folder as its working directory. From the project root they do not run, so apply the gates
yourself: no site files before the brief, facts ledger, copy and design exist and are filled.
