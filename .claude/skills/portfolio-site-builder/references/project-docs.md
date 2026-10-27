# Project docs

Every project gets these files so any AI agent (or person) can pick up the work cold. Write them in Phase 2 and keep them current: a decision that is not written down will be reversed by the next session.

## Repo layout
```
AGENTS.md                 rules for every agent (canonical)
CLAUDE.md                 one line: "Read AGENTS.md." (plus anything Claude-specific)
<site>/docs/ARCHITECTURE.md   how it works (from architecture.md, filled in)
<site>/docs/SITE_GUIDE.md     design and code rules for writing pages
<site>/docs/CONTENT-PLAYBOOK.md  recipes for updates
<site>/docs/OPERATIONS.md    the live site
<site>/docs/DECISIONS.md     owner decisions, newest first
<site>/docs/OPEN-ITEMS.md    to confirm or do next
<site>/docs/INTAKE.md        the intake answers, verbatim
research/README.md, PROFILE-DOSSIER.md, FINDINGS-LOG.md, QUESTIONS-FOR-<PERSON>.md, sources/
```
Tools that read other files (`.cursor/rules`, `.github/copilot-instructions.md`, `GEMINI.md`) get a one-line pointer to `AGENTS.md`, never a copy that can drift.

## `AGENTS.md` template
```markdown
# <Site name>

The <languages> portfolio site of **<Full name>** (<other name forms>). <One factual line on who they are.> The repo owner is <relation>.

**Start here:** this file, then `<site>/docs/ARCHITECTURE.md` and `<site>/docs/SITE_GUIDE.md`. For content changes follow `<site>/docs/CONTENT-PLAYBOOK.md`.

## Layout
| Path | What |
|---|---|
| `<site>/` | The website. Run every command here. |
| `<site>/docs/` | ARCHITECTURE, SITE_GUIDE, CONTENT-PLAYBOOK, OPERATIONS, DECISIONS, OPEN-ITEMS |
| `research/` | Verified facts (PROFILE-DOSSIER = source of truth), FINDINGS-LOG (wording rules), questions, sources/ |

## Commands
npm install · npm run dev · npm run build · npm run lint · npm run images · <no-break words script> · npm run indexnow

**Verify before you finish:** build and lint with no errors, serve `dist/`, check changed pages in every language at 375 px and desktop, no console errors.

## Rules that are easy to break
1. Every visible string is in every language via `t({ … })`. <Register per language.>
2. Internal links use `Link`/`NavLink` from `@/components/ui/LocaleLink`, with plain paths.
3. Pre-rendered: no browser globals in render or `useState` initializers; URL query state in effects.
4. Facts only from `research/`. Never invent. Unsure → OPEN-ITEMS.
5. Privacy: <the list from Question 6>.
6. Naming: <forms of address from Question 1; forms to avoid>.
7. Calls to action: <what may and may not be offered, Question 2>.
8. Photos: only `licensed: true`; <photo rules from Question 8>.
9. Tone: <Question 7>. <Where playful elements may appear.>
10. SEO/AEO: one h1, answer-first copy; new pages go in `PAGE_PATHS` and `PAGES`.
11. Hosting: <host>, production branch `<branch>` publishes on every push; push only reviewed builds.

## Current state
<Phase, what is live, what is pending (link OPEN-ITEMS).>
```
Keep the private things the site must not show **out** of public docs too: write the rule ("no personal phone numbers"), not the data.

## `docs/DECISIONS.md`
```markdown
# Decision log
The owner's decisions and the main technical choices, newest first. Don't reverse one without asking the owner.

| Date | Decision | Why / by |
|---|---|---|
| YYYY-MM-DD | … | Owner ("quote if short") |
```
Longer decisions get their own `##` section below the table with the full rule and its edges (what is still allowed).

## `docs/OPEN-ITEMS.md`
Grouped checklists: facts to confirm with the person, launch items, off-site items (institution links, Bing), review follow-ups. Each item says what changes when it is done.

## `docs/CONTENT-PLAYBOOK.md`
Numbered recipes with exact files: yearly refresh (metrics, new papers, roles), add an award, add a photo, add a student, add a partner, add a press item or video, add a page, change the domain. End each with "build, lint, check every language".

## `docs/SITE_GUIDE.md`
Goal, stack, folders, ownership of shared files (if several agents work in parallel, name who may edit layout, tokens, i18n and shared data), pre-rendering rules, bilingual text rules, design tokens, motion and playful-element placement, photos, accessibility, facts and privacy.

## Research files
- `research/README.md`: index table of every file, status markers, the owner's rules for using facts.
- `PROFILE-DOSSIER.md`: numbered sections (name and titles, education, career, leadership, awards, impact numbers, publications, themes, collaborations, team, media, things to confirm), each fact with a marker and source.
- `FINDINGS-LOG.md`: 1. corrections (said before / sources support / now on site / source), 2. wording rules, 3. people, 4. groups, 5. photo provenance decisions, 6. site decisions that affect content.
- `QUESTIONS-FOR-<PERSON>.md`: grouped questions, each with "changes on the site".
- `sources/<topic>.md`: scope + date, method, table with URLs, searched-nothing-found, blocked.
