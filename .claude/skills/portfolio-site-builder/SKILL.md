---
name: portfolio-site-builder
description: Build a fact-checked, bilingual-ready personal portfolio website for a real person (an academic, researcher, executive or professional), from intake interview and source research through design, pre-rendered React build, SEO/AEO and free static hosting. Use when someone asks to create, plan or rebuild a portfolio, profile, CV or "about me" site for themselves or someone else.
---

# Portfolio site builder

You build a portfolio site about a **real person**. Everything on it must be true, sourced, modest and approved by the person or the site owner. The method below has shipped a live, 30-page, two-language academic portfolio with build-time pre-rendering, structured data and a free host.

Read this file first. Open a reference file only when you reach its phase.

| Reference | When |
|---|---|
| `references/intake-questions.md` | Phase 0: the 10 questions to ask before anything else |
| `references/data-gathering.md` | Phase 1: every method for finding and verifying facts and photos |
| `references/project-docs.md` | Phase 2: the docs every project gets (agent rules, decisions, open items, research files) |
| `references/architecture.md` | Phase 3: stack, folders, i18n routing, pre-rendering, code patterns |
| `references/ux-ui-style.md` | Phase 4: design system, page catalogue, motion, photos, copy tone |
| `references/seo-aeo.md` | Phase 5: metadata, JSON-LD, answer-first facts, llms.txt, sitemap |
| `references/operations.md` | Phases 6–8: QA, launch on a free host, publishing, yearly upkeep |
| `references/architecture-options.md` | Only if the user says yes to architecture suggestions (Phase 2) |

## Non-negotiable rules
1. **Facts need a source.** Every name, number, title, date, award and quote on the site comes from a file in `research/` that cites a URL or a document the person provided. Never invent, round up or "improve" a fact. Unsure → leave it out and add it to `docs/OPEN-ITEMS.md` and the questions file.
2. **No overclaiming.** Team work stays joint. Estimates say "estimated". "First", "leading", "only" appear only when a source says so, attributed. The second language is never stronger than the first.
3. **Privacy first.** Ask what must never appear (Question 6). Default exclusions: birth date, home address, personal phone numbers, family members who did not agree, health, and any honour or detail the person asks to leave out. For students or staff: name, degree, year and thesis/role title only. Do not repeat private details in the skill output, chat summaries or commits.
4. **The person's voice.** Use the exact name forms and forms of address the person chose, in every language. Plain, factual headings; no slogans or superlatives unless the person wants a bolder tone.
5. **Photos need rights.** Only photos the person owns, official photos from their institution, partner photos with permission, or properly licensed stock. Press photos stay hidden unless the owner explicitly accepts the risk for a named photo.
6. **One design.** Improve the chosen design in place. Never build a parallel redesign or "v2" unless the user asks for one.
7. **Ask before outward-facing actions.** Pushing to the production branch, contacting anyone, submitting forms, creating accounts or accepting terms all need the user's yes.

## Workflow

### Phase 0: Intake (always first)
Ask the 10 questions in `references/intake-questions.md`, in one message, numbered, each with a one-line "why". Accept short answers; follow up only on gaps that block Phase 1. Save the answers verbatim in `docs/INTAKE.md`. Nothing else starts until the answers to Questions 1, 2, 4 and 6 are in.

### Phase 1: Research
Follow `references/data-gathering.md`. Output, in `research/`:
- `sources/<topic>.md`: raw reports, one per topic, every claim with a URL and the date checked
- `PROFILE-DOSSIER.md`: the verified summary (the single source of truth for site copy), with ✅ / 🟡 / ❓ markers
- `FINDINGS-LOG.md`: corrections, conflicts between sources, wording rules
- `QUESTIONS-FOR-<PERSON>.md`: what only the person can answer, grouped, each saying what changes on the site once answered
- `README.md`: an index of all of the above

Show the user the dossier summary and the question list before building pages.

### Phase 2: Decisions and docs
1. Write the project docs from `references/project-docs.md`: `AGENTS.md` (the rules for any AI agent; `CLAUDE.md` points to it), `docs/DECISIONS.md`, `docs/OPEN-ITEMS.md`, `docs/CONTENT-PLAYBOOK.md`.
2. Propose the page list and the features per page (from Question 5 and the catalogue in `references/ux-ui-style.md`). Let the user pick; record the choice and the "not chosen" list in DECISIONS.
3. **Ask once:** "Do you want suggestions for adapting the architecture to this project (for example a CMS for a non-technical editor, or a single-language build), or should I use the standard architecture as is?" Only on a yes, read `references/architecture-options.md` and present the options that fit the intake answers, with trade-offs. Default: the standard architecture.

### Phase 3: Scaffold
Build the skeleton from `references/architecture.md`: Vite + React + TypeScript + Tailwind + React Router data router + build-time pre-rendering, language-prefixed URLs, the `t({ … })` helper, locale-aware links, the head/SEO layer and the image pipeline. Get one page rendering in both languages through `npm run build` before building more.

### Phase 4: Pages
Build pages in the order the user ranked them. All copy comes from `src/data/*` files that cite the dossier. One page at a time: build, lint, check both languages at 375 px and desktop, then show the user.

### Phase 5: SEO / AEO
Follow `references/seo-aeo.md`: per-page titles and descriptions, canonical + hreflang, JSON-LD, the visible answer-first facts block, `llms.txt`, sitemap, robots, redirects.

### Phase 6: QA
Run the checklist in `references/operations.md` (build, lint, hydration, both languages, widths 320/375/768/1280, keyboard, contrast, reduced motion, Lighthouse, no console errors). Fix before launch.

### Phase 7: Launch
Free static hosting (Cloudflare Pages by default), custom domain, Search Console, Bing/IndexNow. Ask before the first production push.

### Phase 8: Handover
Write `docs/OPERATIONS.md` (how to publish, roll back, stay on the free plan, check search performance) and the yearly refresh recipe in `CONTENT-PLAYBOOK.md`. Tell the user what is still open.

## Before you finish any task on the site
- `npm run build` and `npm run lint` pass with no errors.
- Serve `dist/` (not the dev server) and check every changed page in each language at 375 px and desktop; the console shows no hydration or other errors.
- New facts are in the dossier with a source; new decisions are in DECISIONS; anything unresolved is in OPEN-ITEMS.

## Pitfalls already paid for
- **Client-only SPA:** crawlers and AI engines saw an empty page. Pre-render every page at build time from day one.
- **Hydration mismatches:** reading `window`, `localStorage`, `Date` or random values during render, or URL query state in `useState` initializers. Read them in effects.
- **Language in storage:** the language must come from the URL, or the pre-rendered HTML and the client disagree.
- **Invisible characters for line breaking** (word joiners, zero-width spaces) hid the person's name from search and copy-paste. Use no-wrap spans (see `ux-ui-style.md`, "Languages without spaces").
- **Animated hero with JS-only entrance:** headings were invisible in the pre-rendered HTML. Use a CSS entrance class above the fold.
- **Many animated characters re-rendering at 60 fps** made scrolling lag. Throttle idle animation, pause off screen and while scrolling.
- **Shared layout animations in the header** made the nav indicator fly vertically on language switch. Use plain CSS transforms; keep one layout route above both languages.
- **Rounded or reinterpreted numbers** (a "results arrive X% sooner" figure turned into "X% more accurate", then rounded up). Quote what the source measured.
- **Transliterated names:** use each person's own published spelling; never invent one unless the owner asks, and log it when you do.
- **Several agent sessions in one folder** committed each other's files. Check `git status` and build the exact commit in a clean worktree before pushing to production.
- **Social-media walking:** logged-out photo pages work for a while, then hit a login wall. Collect the best albums first and log where you stopped.
