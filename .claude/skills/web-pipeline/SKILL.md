---
name: web-pipeline
description: |
  Web site/landing page pipeline: research, content strategy, design system, frontend coding, SEO + accessibility review, QA.
  Includes: PROGRESS.md tracking, SITEMAP.md, DESIGN_SYSTEM.md, Lighthouse validation, responsive checks.
  Use when the user wants a new website or landing page designed and built end-to-end.
  Does NOT handle: full-stack apps with backend logic, databases, APIs — use phased-engineering-pipeline instead.
---

# Web Pipeline

Six specialized agents. Four gates. Feature branches. Auto-commits.

```
[Researcher] → [Content Strategist] → BRIEF.md → ⛔ USER APPROVAL
  → git: create feature/{slug} branch, commit BRIEF
  → [Designer] → DESIGN_SYSTEM.md + SITEMAP.md → ⛔ USER APPROVAL → git: commit
    → loop per page/section:
        [Frontend Dev] → git: commit code
        → [SEO Reviewer] ‖ [A11y Reviewer]
        → both APPROVE → next page
    → [QA Agent] → Lighthouse + cross-browser + responsive
        → QA PASS → git: push → gh pr create → ⛔ USER REVIEWS DIFF
```

---

## Configuration

Fill these placeholders before starting. Every `{{PLACEHOLDER}}` in reference prompts resolves from this table.

| Placeholder | Description | Example |
|---|---|---|
| `{{SITE_NAME}}` | Website/project name | TechFlow Landing |
| `{{SITE_PURPOSE}}` | Type of site | SaaS landing page |
| `{{TECH_STACK}}` | Framework + tools | Next.js, Tailwind CSS, Framer Motion |
| `{{BUILD_COMMAND}}` | Build verification | `npm run build` |
| `{{LINT_COMMAND}}` | Linter | `npm run lint` |
| `{{TARGET_AUDIENCE}}` | Who visits the site | B2B SaaS founders, 25-45 |
| `{{BRAND_TONE}}` | Voice and personality | Professional, friendly, concise |
| `{{PRIMARY_CTA}}` | Main conversion action | Sign up for free trial |
| `{{DOCS_URL}}` | Framework docs | https://nextjs.org/docs |
| `{{REFERENCES}}` | Visual references: URLs, screenshots, mood boards (optional) | https://stripe.com, https://linear.app |
| `{{STRICT_MODE}}` | Gate enforcement | `true` (default) |

<details>
<summary>Stack profile examples</summary>

**Next.js/Tailwind:** `TECH_STACK=Next.js, Tailwind CSS, Framer Motion` (current stable versions) / `BUILD=npm run build` / `LINT=npm run lint`

**Astro/CSS:** `TECH_STACK=Astro, vanilla CSS, View Transitions` / `BUILD=npm run build` / `LINT=npm run lint`

**HTML/CSS/JS:** `TECH_STACK=HTML5, CSS3, vanilla JavaScript` / `BUILD=N/A` / `LINT=npx htmlhint "**/*.html"`

**Hugo/Tailwind:** `TECH_STACK=Hugo, Tailwind CSS, Alpine.js` / `BUILD=hugo --minify` / `LINT=npx tailwindcss --minify`
</details>

---

## Artifact Manifest

- [ ] Market Research Notes (Phase 0a — Researcher)
- [ ] `BRIEF.md` (Phase 0b — Content Strategist)
- [ ] `DESIGN_SYSTEM.md` (Phase 1 — Designer)
- [ ] `SITEMAP.md` (Phase 1 — Designer)
- [ ] Code + self-review reports (Phase 2 — Frontend Dev, per page)
- [ ] Review verdicts (Phase 2 — Reviewers, per page)
- [ ] QA Validation Report (Phase 3 — QA)
- [ ] `PROGRESS.md` (all phases — auto-updated by each agent)

---

## Progress Tracker

Every agent updates `PROGRESS.md` when starting and finishing their phase.

```markdown
# {{SITE_NAME}} — Progress

| Phase | Agent | Status | Started | Finished | Notes |
|-------|-------|--------|---------|----------|-------|
| 0a Research | Researcher | ⏳ Pending | — | — | |
| 0b Brief | Content Strategist | ⏳ Pending | — | — | |
| 1 Design | Designer | ⏳ Pending | — | — | |
| 2.1 {page} | Frontend Dev | ⏳ Pending | — | — | |
| 2.1 Review | SEO + A11y | ⏳ Pending | — | — | |
| ... | ... | ... | ... | ... | |
| 3 QA | QA | ⏳ Pending | — | — | |
| Finish | — | ⏳ Pending | — | — | |
```

**Status values:** `⏳ Pending` → `🔄 In Progress` → `✅ Done` / `✅ Approved` / `❌ Rejected` / `🔁 Re-doing`

**Rules:**
- Designer creates `PROGRESS.md` during Phase 1, pre-filling rows from SITEMAP pages
- Each agent updates their row status + timestamp when starting and finishing
- `PROGRESS.md` is committed with every auto-commit

---

## Workflow Checklist

**Phase 0a — Market Research**
- [ ] Read `references/researcher-prompt.md`
- [ ] Fill `{{SITE_NAME}}`, `{{SITE_PURPOSE}}`, `{{TARGET_AUDIENCE}}`
- [ ] Spawn Researcher agent → asks 5-8 questions
- [ ] Answer questions → Researcher produces Market Research Notes

**Phase 0b — Content Strategy**
- [ ] Read `references/content-strategist-prompt.md`
- [ ] Paste Market Research Notes
- [ ] Spawn Content Strategist → produces `BRIEF.md` with page goals, CTAs, copy blocks
- [ ] ⛔ STOP — wait for user to approve BRIEF

**Feature Branch Creation**
- [ ] Derive `{slug}` from site name (kebab-case)
- [ ] `git checkout -b feature/{slug}`
- [ ] Commit: `git add BRIEF.md && git commit -m "[phase-0] brief: {site}"`

**Phase 1 — Design System + Sitemap**
- [ ] Read `references/designer-prompt.md`
- [ ] Provide approved BRIEF summary
- [ ] Spawn Designer → produces `DESIGN_SYSTEM.md` + `SITEMAP.md`
- [ ] ⛔ STOP — wait for user to approve design
- [ ] Commit: `git add DESIGN_SYSTEM.md SITEMAP.md PROGRESS.md && git commit -m "[phase-1] design: {site}"`

**Phase 2 — Frontend (repeat per page/section)**
- [ ] Read `references/frontend-dev-prompt.md`
- [ ] Fill `{{CURRENT_PAGE}}`, `{{PAGE_SECTIONS}}`, `{{PAGE_COPY}}`
- [ ] Spawn Frontend Dev → produces code + self-review report
- [ ] Commit: `git add <page files> && git commit -m "[phase-2.N] page: {page name}"`
- [ ] Spawn SEO Reviewer (`references/reviewer-seo-prompt.md`) IN PARALLEL with:
- [ ] Spawn A11y Reviewer (`references/reviewer-a11y-prompt.md`)
- [ ] Both return `APPROVE` → next page
- [ ] Any reviewer returns issues → Frontend Dev fixes → recommit → re-run BOTH reviewers

**Phase 3 — QA Validation**
- [ ] Read `references/qa-prompt.md`
- [ ] Provide BRIEF.md + all site code
- [ ] Spawn QA agent → Lighthouse audit + responsive check + validation
- [ ] QA returns `QA PASS` → proceed to finish
- [ ] QA returns issues → Frontend Dev fixes → recommit → QA re-validates

**Finish**
- [ ] `git push -u origin feature/{slug}`
- [ ] `gh pr create --title "feat: {site}" --body "Brief + Design + N pages. QA passed."`
- [ ] Verify CI: `gh pr checks`
- [ ] ⛔ STOP — user reviews diff, decides merge

---

## Phase 0a: Researcher Agent

**When to spawn:** At the very start.

**Provide to agent:** Site idea (1-2 sentences), `{{TARGET_AUDIENCE}}`, `{{SITE_PURPOSE}}`

**Expected output:** Market Research Notes: target audience personas, competitor analysis (3-5 sites), design trends, conversion benchmarks, SEO keyword opportunities.

Read full prompt: `references/researcher-prompt.md`

---

## Phase 0b: Content Strategist Agent

**When to spawn:** After Researcher completes research.

**Provide to agent:** Market Research Notes.

**Expected output:** `BRIEF.md` with: site goals, page-by-page content plan, headline/subhead copy, CTA text per section, tone guidelines, image/illustration direction.

Read full prompt: `references/content-strategist-prompt.md`

---

## Phase 1: Designer Agent

**When to spawn:** After user approves `BRIEF.md`.

**Provide to agent:** Approved BRIEF, `{{TECH_STACK}}`, `{{BRAND_TONE}}`

**Expected output:**
- `DESIGN_SYSTEM.md` — colors, typography, spacing, components, responsive breakpoints
- `SITEMAP.md` — page list with sections, layout description, component mapping
- `PROGRESS.md` — initial scaffold with rows for each page

Read full prompt: `references/designer-prompt.md`

---

## Phase 2: Frontend Dev + Review Loop

**When to spawn:** After user approves design.

**Per page/section:**
1. Spawn Frontend Dev for current page only
2. Dev performs self-review: responsive, semantic HTML, design system compliance
3. Auto-commit page code
4. Spawn both reviewers IN PARALLEL
5. Gate: both must return exact strings:
   - `APPROVE: SEO is optimized.`
   - `APPROVE: Accessibility meets WCAG 2.2 AA.`
6. If either returns issues → fix → recommit → re-run BOTH
7. Mark page complete. Move to next page.

Read full prompts:
- Frontend Dev: `references/frontend-dev-prompt.md`
- SEO Reviewer: `references/reviewer-seo-prompt.md`
- A11y Reviewer: `references/reviewer-a11y-prompt.md`

---

## Phase 3: QA Agent

**When to spawn:** After ALL pages pass both reviewers.

**Provide to agent:** `BRIEF.md` + all site code.

**Expected output:** QA Report with:
- Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- Responsive check: mobile (375px), tablet (768px), desktop (1280px)
- HTML validation, broken links, image optimization
- Binary verdict: `QA PASS` or failure list

Read full prompt: `references/qa-prompt.md`

---

## Auto-Commit Protocol

| Trigger | Commit Message | Files |
|---------|---------------|-------|
| Brief approved | `[phase-0] brief: {site}` | `BRIEF.md` |
| Design approved | `[phase-1] design: {site}` | `DESIGN_SYSTEM.md`, `SITEMAP.md` |
| Page N code written (before review) | `[phase-2.N] page: {page name}` | Page files |
| Dev fix after review | `[phase-2.N] fix: {issue}` | Changed files |
| QA passes | `[phase-3] QA passed` | Test/config files |

Rules:
- Use `git add <specific files>` — never `git add .` or `git add -A`
- Always include `PROGRESS.md` in every commit
- Commit message must be a single line
- Do NOT push until all phases complete

---

## Stop Conditions

| Gate | Trigger | Action |
|------|---------|--------|
| After Phase 0b | `BRIEF.md` produced | Show to user. Wait for approval. |
| After Phase 1 | Design produced | Show to user. Wait for approval. |
| Review issue | Either reviewer non-APPROVE | Dev fixes → re-run BOTH reviewers. |
| QA issue | QA non-PASS | Dev fixes → QA re-validates. |
| PR created | CI results | Show to user. User decides merge. |

Do not proceed past a ⛔ gate without user approval.

**`{{STRICT_MODE}}` = `false`:** Review and QA gates become advisory. Useful for rapid prototyping.

---

## Recovery Procedures

### User rejects Brief
1. Ask: "What's missing — wrong audience? Wrong CTA? Tone off?"
2. Re-spawn Content Strategist with research + feedback
3. Present revised `BRIEF.md` — ⛔ STOP again

### User rejects Design
1. Ask: "Colors? Layout? Components? Spacing?"
2. Re-spawn Designer with BRIEF + feedback
3. Present revised design — ⛔ STOP again

### Review loop stuck (3+ rounds)
1. Show outstanding issues
2. Ask: "(a) try again, (b) accept as-is, (c) simplify page?"
3. User decides.

### QA fails
1. Show failure report
2. Dev fixes specific items
3. QA re-validates

---

## Integration

- **Feature isolation:** Use `using-git-worktrees` skill for worktree-based isolation
- **Finish flow:** Trigger `finishing-a-development-branch` skill after QA pass + PR
- **Parallel agents:** Phase 2 reviewers run in parallel — use `dispatching-parallel-agents` skill
