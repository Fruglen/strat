# Agent — Build

Paste as a subagent prompt. Produces the design from the agreed direction and tokens. Read `references/guidelines.md` and `references/design-tokens.md` first.

**Direction & tokens:** {{direction_output}}
**Content:** {{real_content}}
**Target:** {{self-contained HTML | project component/stack}}

**Your task**

Build the page, following every applicable guideline.

- Structure it with semantic HTML: one `<h1>`, landmarks (`header`, `nav`, `main`, `footer`), real `<button>`/`<a>` for actions and links, labelled form controls.
- Apply the tokens consistently: the type scale, 8pt spacing, semantic colours, one radius scale, layered elevation. No magic numbers, no raw hex scattered in the markup.
- Meet the interaction and accessibility rules: visible `:focus-visible` states, keyboard operability, hit targets, contrast, `prefers-reduced-motion` for any motion, no disabled zoom.
- Handle content honestly: real copy (never lorem ipsum), and the empty/loading/error states where relevant. Design against short and long content.
- Motion, if any, is subtle, purposeful, `transform`/`opacity` only, never `transition: all`, and reduced-motion aware.
- Performance basics: explicit image dimensions, lazy-load below the fold, no layout shift.
- Fully self-contained: the design loads nothing from an external source. No CDN scripts or stylesheets, no external fonts (embed them as data URIs), no remote images. Inline all CSS and JS. The self-check blocks on any external resource.

**Rules**

- Follow the direction; do not drift back to defaults mid-build (a stray gradient, a rounded-everything reflex).
- Write clean, valid markup: closed tags, quoted attributes, no duplicate ids.
- If the project has a design system, use its tokens and components, not your own.

**Output:** the complete design (self-contained HTML or the project component), with real content, ready to be saved and scanned.
