---
name: interface-design
description: Design a page or UI on request that follows professional web interface guidelines and does not look AI-generated. Use when asked to design, build, or mock up a page, landing page, screen, component, or interface, or to improve how something looks. Commits to a specific visual direction and token system, builds to a strict guideline set, then runs a self-check and fixes every issue before presenting.
license: See LICENSE.md
---

# Interface Design

Designs a page that looks like a deliberate choice for *this* product, not an AI template, and that follows a strict set of web interface guidelines (interaction, accessibility, motion, forms, performance, content). What makes it reliable is the rule that a design is never presented until it has passed an automated self-check and every issue has been fixed.

Two failures are designed out from the start. First, the "AI look", the default indigo gradient, round-everything, stock-card-grid page that appears no matter the brief; `references/anti-ai-look.md` names the tells and how to escape them. Second, the invisible-quality failures (no focus ring, motion that ignores reduced-motion preferences, layout-shifting images); the bundled scanner proves those before the design ships.

## When to use

Trigger for any "design/build/mock up a page, landing page, screen, component, or interface", or "make this look better / redesign this". For a quick guideline check of an existing page, run `scripts/ui-scan.mjs` on it directly.

## Inputs

- **what to design** — the page or component, its purpose, and the audience (required).
- **brand / design system** — existing colours, fonts, tokens, or components. If they exist, they win over any default choice.
- **content** — the real copy and data, if available. If not, real copy is written; never lorem ipsum.
- **target** — a self-contained HTML file (default) or the project's stack/component.

## Process (the loop is mandatory)

**1. Direction** (`references/agents/direction.md`). Pin the subject, honour any existing brand or system, and commit to a specific visual direction and a token system (type scale, 8pt spacing, semantic colours grounded in the real brand, radius, elevation, motion) per `references/design-tokens.md`. Name the AI-look traps being avoided.

**2. Build** (`references/agents/build.md`). Produce the design against `references/guidelines.md` and the tokens: semantic HTML, one `<h1>`, real `<button>`/`<a>`, labelled forms, visible focus, contrast, reduced-motion-aware motion, explicit image dimensions, real content.

**3. Self-check (do not skip).** Save the design and run:
```
node scripts/ui-scan.mjs design.html
```
Then run the critique agent (`references/agents/critique.md`), a *different* agent than the builder, for the AI-look and judgement checks the script cannot make.

**4. Fix, then re-check.** Apply every high and medium finding and every guideline violation yourself, now, before showing anything. Re-run `ui-scan.mjs` until it exits clean and the critique passes. Never present a design with known issues and a "you could improve X" note; make the improvement.

**5. Present** only after it passes: the design first, then a short rationale (the direction and why it fits this product), then a one-line note on what the self-check covered and what still needs a human eye.

## Principles

- **Deliberate, not default.** The design must fail the "could this be any product?" test. Ground the palette, type, and layout in the subject; spend boldness in one place and keep the rest quiet.
- **Honour what exists.** The user's wishes first, then the project's design system, then your choices. Never override a brand with a default.
- **Guidelines are gates, not tips.** Visible focus, keyboard operability, reduced motion, contrast, real content, no layout shift, these are required, not optional polish.
- **Test then fix then present.** A design is finished when the checks pass and the fixes are in, not when it is drawn. The builder never signs off its own work.
- **Honest about limits.** The scan proves mechanical rules; taste, hierarchy, and copy are judgement, and real-device and screen-reader testing still matter.

## Output

The working design (self-contained HTML by default, or the project's component), with real content, that passed the self-check. Plus a short rationale and a note on what was verified versus what still needs a human eye. See `references/output-format.md`.

## What this skill will not do

- It will not present an unchecked or unfixed design. The self-check and fixes are mandatory.
- It will not ship lorem ipsum, a default AI look, or a design that ignores the accessibility and interaction guidelines.
- It will not claim the design is perfect; it states what the scan covered and what still needs human review. For a deep accessibility audit of the finished page, use the **accessibility-audit** skill.
