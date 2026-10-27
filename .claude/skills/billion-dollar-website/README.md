# billion-dollar-website

A [Claude](https://claude.com/claude-code) skill that builds landing pages with the design polish of a billion-dollar company — the kind of page that wouldn't look out of place on stripe.com, linear.app, apple.com, or vercel.com.

Most AI-generated landing pages are competent but generic: the purple-to-blue gradient, three identical feature cards, emoji icons, a timid hero. This skill is built to escape that. It pushes the model to commit to a single tangible design concept, carry it through the whole page, and critique its own rendered output before finishing.

## What it does

Given a product description, it produces a **single self-contained HTML file** (all CSS and JS inline, no external dependencies) with:

- **A committed creative concept.** The page is built out of a tangible world drawn from the product — an accounting tool rendered as a beautifully kept ledger book, a sleep device as a night that passes from dusk to dawn, an edge database as a printed international timetable.
- **A tonal journey.** Sections vary in background, layout, and light so the page reads as chapters rather than one uniform wall — the main antidote to the "monotone and cheap" feel.
- **Real typographic and color taste.** Editorial type pairings, deep saturated accents instead of default blue, textures that make flat color feel physical.
- **Robust, accessible motion.** Scroll reveals that never leave the page blank, `prefers-reduced-motion` support, readable buttons, WCAG-conscious contrast.
- **A mandatory self-review pass.** The skill renders its own output, critiques the screenshots like a senior design director, and fixes what looks cheap before delivering.

## Install

**Option A — install the packaged skill.** Download [`billion-dollar-website.skill`](./billion-dollar-website.skill) and install it in Claude Code.

**Option B — copy the skill folder.** Place `SKILL.md` in a `billion-dollar-website/` directory under your skills folder (e.g. `~/.claude/skills/billion-dollar-website/SKILL.md`).

## Usage

Just ask for a landing page and describe the product:

> Build me a landing page for Ledgerly, a B2B accounting automation platform for mid-size companies. It syncs with ERPs and closes the books automatically.

The skill triggers on landing-page, homepage, product-page, marketing-site, and "make me a website for…" requests — including casual and small-business asks — and when you say a page looks *cheap*, *generic*, or *like AI made it*.

## Repo contents

- `SKILL.md` — the skill itself
- `billion-dollar-website.skill` — the packaged, installable bundle
- `evals/evals.json` — the test prompts used to develop and evaluate the skill

## How it was built

Developed with the skill-creator over six evaluation iterations, each one running the same three product briefs (a B2B SaaS, a consumer hardware product, and a developer database) through the skill and a no-skill baseline, then rendering every page and reviewing it for design quality. The skill grew from a generic "polished page" recipe into one centered on taste, concept commitment, and self-critique.
