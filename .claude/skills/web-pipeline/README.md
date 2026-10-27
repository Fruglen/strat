# Web Pipeline

Claude Code skill that orchestrates 6 specialized AI agents through a structured website/landing page creation workflow with 4 approval gates.

## Pipeline Flow

```
[Researcher] → [Content Strategist] → BRIEF.md → ⛔ USER APPROVAL
  → [Designer] → DESIGN_SYSTEM.md + SITEMAP.md → ⛔ USER APPROVAL
    → loop per page:
        [Frontend Dev] → code
        → [SEO Reviewer] ‖ [A11y Reviewer]
        → both APPROVE → next page
    → [QA Agent] → Lighthouse + responsive
        → QA PASS → PR → ⛔ USER REVIEWS
```

## Agents

| # | Agent | Phase | Output |
|---|-------|-------|--------|
| 1 | **Researcher** | 0a | Market research, competitor analysis, audience personas, SEO keywords |
| 2 | **Content Strategist** | 0b | `BRIEF.md` — page-by-page content plan with real copy |
| 3 | **Designer** | 1 | Domain exploration → `DESIGN_SYSTEM.md` + `SITEMAP.md` — domain-driven colors, typography, components, layouts |
| 4 | **Frontend Dev** | 2 | Code per page with self-review loop |
| 5 | **SEO Reviewer** | 2 | Technical SEO, meta tags, structured data, keyword optimization |
| 6 | **A11y Reviewer** | 2 | WCAG 2.2 AA compliance, contrast, keyboard nav, screen reader |
| 7 | **QA Agent** | 3 | Lighthouse audit, responsive check, content verification |

## Approval Gates

1. **Brief approved** — user reviews content strategy before design starts
2. **Design approved** — user reviews design system before coding starts
3. **Review gate** — both SEO + A11y reviewers must APPROVE each page
4. **QA gate** — Lighthouse ≥ 90, all checks pass before PR

## Features

- **Domain-driven design** — colors, tokens, and signature elements derived from product's real-world context, not generic palettes
- **Hard design rules** — no cards by default, one accent color, domain-named CSS variables, full-bleed heroes
- **Litmus checks** — swap test, token test, brand visibility, visual hierarchy validation
- **Stack-agnostic** — Next.js, Astro, Hugo, plain HTML/CSS
- **PROGRESS.md** — visual pipeline status auto-updated by every agent
- **Auto-commits** — `[phase-N]` prefixed, specific files only
- **Feature branches** — `feature/{slug}`, PR at the end
- **STRICT_MODE** — set `false` for rapid prototyping (review gates become advisory)
- **Recovery procedures** — structured flows for rejected briefs, stuck review loops, QA failures

## File Structure

```
web-pipeline/
├── SKILL.md                          # Main orchestration (291 lines)
└── references/
    ├── researcher-prompt.md          # Market research agent
    ├── content-strategist-prompt.md  # Content brief agent
    ├── designer-prompt.md            # Design system + sitemap agent
    ├── frontend-dev-prompt.md        # Coding agent with self-review
    ├── reviewer-seo-prompt.md        # SEO review agent
    ├── reviewer-a11y-prompt.md       # Accessibility review agent
    └── qa-prompt.md                  # QA validation agent
```

## Installation

Copy to your Claude Code skills directory:

```bash
cp -r . ~/.claude/skills/web-pipeline/
```

## Usage

Tell Claude Code: *"build a landing page for..."* or *"web pipeline"* — the skill triggers automatically.

## Design Philosophy

Designer agent runs a **mandatory domain exploration** before proposing any visual direction:

1. **Domain concepts** — 5+ words from the product's world
2. **Color world** — 5+ colors from the product's physical environment
3. **Signature element** — one unique visual idea for THIS product only
4. **Defaults to reject** — three generic patterns to avoid

This ensures every project gets its own visual identity instead of generic SaaS templates.

Based on ideas from [OpenAI Frontend Skill](https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4) and [Dammy's Interface Design](https://github.com/dammyjay93/interface-design).

## Related

- [Phased Engineering Pipeline](https://github.com/bestmark1/Phased-Engineering-Pipeline) — for full-stack apps with backend logic, databases, APIs
