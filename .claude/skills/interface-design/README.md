# Interface Design — Web UI & Landing Page Design Skill for Claude

> A free, open-source **interface design** Skill for Claude that generates a page or UI that looks like a deliberate choice for *your* product — not an AI template. It commits to a specific visual direction and token system, builds to a strict web interface guideline set (interaction, accessibility, motion, forms, performance, content), then runs a mandatory **test-then-improve loop** — a dependency-free scanner plus an adversarial critique — and fixes every issue before it ever presents the design.

Built for the reality that most AI-generated pages look identical: the same indigo gradient hero, everything rounded, three stock cards, lorem ipsum, and no focus ring. This skill is designed to refuse that default and ship a design that has already passed its own quality gates.

Free to use and share. Made by [CreativeDeals](https://creativedeals.nl).

---

## What it does

`interface-design` is an Agent Skill you drop into Claude Code (or any skill-aware AI assistant). Ask it to design, build, or mock up a page, landing page, screen, component, or interface — or to make an existing one look better — and it works through a fixed loop instead of drawing one and stopping:

- **Direction** — it pins the subject, honours any brand or design system you provide (your colours, fonts, tokens, and components always win over a default), and commits to a specific visual direction and a token system: type scale, 8pt spacing, semantic colours grounded in the real brand, radius, elevation, and motion. It names the "AI-look" traps it is avoiding up front.
- **Build** — it produces the design against the full interface checklist and the tokens: semantic HTML, one `<h1>`, real `<button>`/`<a>` elements, labelled forms, visible focus, sufficient contrast, reduced-motion-aware motion, explicit image dimensions, and real copy — never lorem ipsum.
- **Self-check (mandatory)** — it saves the design and runs the bundled scanner (`ui-scan.mjs`) to prove the mechanical rules a script can verify, then runs a separate **critique agent** — a different agent than the builder — for the AI-look and judgement checks a script cannot make.
- **Fix, then re-check** — it applies every finding and guideline violation itself, now, and re-runs the scan until it exits clean and the critique passes. It never presents a design with known issues and a "you could improve X" note; it makes the improvement first.
- **Present** — only after it passes: the design first, then a short rationale for the direction and why it fits this product, then a one-line note on what the self-check covered and what still needs a human eye.

Two failures are designed out from the start. First, the generic **AI look** — the default gradient, round-everything, stock-card-grid page that appears no matter the brief — which a bundled guide names and teaches the design to escape. Second, the invisible-quality failures — no focus ring, motion that ignores reduced-motion preferences, layout-shifting images — which the scanner proves before the design ships.

## Features

- ✅ **Anti-AI-look direction** — grounds palette, type, and layout in your real product so the design fails the "could this be any product?" test
- ✅ **Token-system first** — type scale, 8pt spacing, semantic colour, radius, elevation, and motion, defined before a pixel is drawn
- ✅ **Strict interface guidelines** — interaction, accessibility, motion, forms, performance, and content rules applied as gates, not tips
- ✅ **Dependency-free UI scanner** (`ui-scan.mjs`) — plain Node.js (18+), no `npm install`: visible focus, reduced-motion, no disabled zoom, semantic buttons, no layout-shift images
- ✅ **Mandatory test-then-improve loop** — the design is fixed and re-scanned until it passes; you never see the unfinished version
- ✅ **Adversarial critique agent** — a separate agent from the builder hunts the AI look and the judgement calls a script can miss
- ✅ **Honours your brand and design system** over any default — give it your tokens for the best result
- ✅ **Real content, not lorem ipsum** — writes real copy and data when you do not supply it
- ✅ Runs the critique as a **separate subagent**, or sequentially before presenting when subagents are unavailable

## Requirements

- An AI assistant that can read a skill folder — [Claude Code](https://claude.com/claude-code) or any Agent Skills host. With subagents the critique runs as a separate agent from the builder; without, run the critique pass explicitly before presenting.
- **Node.js 18+** for the scanner. No dependencies, no build step.

## Installation

Drop the `interface-design/` folder into your skills directory and reload:

```bash
# Claude Code
git clone https://github.com/<your-username>/interface-design.git \
  ~/.claude/skills/interface-design
```

After that you can invoke it as `/interface-design`, or simply ask for a page or UI design in plain language.

## Usage

Ask for a design and give it the subject, the audience, any brand, and the real content:

```
Use the interface-design skill. Design a landing page for <product> aimed at
<audience>. Brand: <colours/fonts, or "none yet">. Here is the content: <paste>.
```

You get a working design — a self-contained HTML file by default, or a component in your stack — that has already passed the guideline self-check, plus a short rationale of the direction and a note on what still needs a human eye.

Check any existing page against the guidelines standalone, any time:

```bash
# Guideline self-check on a design or page
node scripts/ui-scan.mjs design.html
```

## What's inside

```
interface-design/
  SKILL.md                     Orchestrator: direction -> build -> self-check -> fix -> present
  references/
    guidelines.md              The full interface checklist (interaction, a11y, motion, forms, performance, content)
    anti-ai-look.md            The AI-design tells and how to escape them
    design-tokens.md           Type scale, 8pt spacing, semantic colour, radius, elevation, motion
    output-format.md           What to deliver, and the mandatory test-fix-present loop
    agents/
      direction.md             Commit to a specific direction and tokens (anti-generic)
      build.md                 Build to the guidelines and tokens
      critique.md              Adversarial self-check: run the scan, hunt the AI look
  scripts/
    ui-scan.mjs                Guideline self-check (run it on the generated design)
  README.md
  LICENSE.md
```

## FAQ

**Does it just draw a page and stop?**
No. The loop is mandatory: it commits to a direction, builds, runs the scanner and a separate critique agent, fixes every finding, and re-scans until it passes — then it presents. The builder never signs off its own work.

**Why won't my page look like the usual AI design?**
A bundled guide names the tells — default gradients, round-everything, stock card grids, generic heroes, lorem ipsum — and the direction step forces choices grounded in your actual product, palette, and content instead.

**What does the scanner actually check?**
`ui-scan.mjs` proves the mechanical rules: visible focus, reduced-motion-aware motion, zoom not disabled, semantic buttons and links, explicit image dimensions to avoid layout shift. Taste, hierarchy, spacing rhythm, and copy stay human judgement.

**Can I use my own brand and design system?**
Yes — that is the point. Your colours, fonts, tokens, and components win over any default. Give it those inputs for the best result. For a deep accessibility audit of the finished page, use the companion accessibility-audit skill.

## License

Free to use. See [`LICENSE.md`](LICENSE.md). Made and shared by [CreativeDeals](https://creativedeals.nl) — a commission-free marketplace for websites, domains, and digital services.

---

<sub>**Keywords:** interface design · web UI design · landing page design · UI design skill · page design · web design guidelines · design tokens · design system · anti-AI-look · doesn't look AI-generated · semantic HTML · visible focus · reduced motion · accessibility · UI self-check · Claude Skill · Claude Code · Agent Skills · Anthropic · frontend design tool</sub>
