# UX / UI style

The target: **a professional portfolio first, fresh and modern on top**, with a little personality where the person allows it. Never a dated template site, never childish.

## Design system
Put tokens in `tailwind.config.js`; never hard-code colours in components.

| Token | Use |
|---|---|
| `brand-50…950` | Primary colour from the person's institution or their own brand. Primary actions `brand-700`; dark sections `brand-950` with white text |
| `accent-100…700` | One warm accent for awards and highlights only (check a darker step for text on light backgrounds: AA) |
| `ink`, `ink-muted`, `ink-soft` | Text |
| `paper`, `paper-warm`, `paper-line` | Surfaces and borders |
| `shadow-card` | The one card shadow |

- **Fonts:** a display face for headings and numbers (e.g. Plus Jakarta Sans) and a body face that covers every site language (e.g. IBM Plex Sans + its script variant). Switch headings to the script font when `lang` is the second language. Load from Google Fonts with `display=swap`.
- **Breakpoints:** `xs 480`, `sm 640`, `md 900`, `lg 1100`, `xl 1280`. Mobile-first. Desktop nav at `xl` if the menu is long.
- **Component classes** in `index.css`: `container-page`, `eyebrow`, `btn-primary`, `btn-ghost`, `btn-light`, `card`, `chip`.
- **Look:** generous white space, big bold headings, rounded-2xl cards, one strong accent per section, real photos over illustrations.

## Page catalogue (pick with the user)
| Page | Typical sections |
|---|---|
| Home | Hero (official portrait, name, current role, one-line summary, 2 CTAs, a key-metric chip), impact counters, highlights, a scroll story of the main work, "what we built", global reach map teaser, partner logo marquee, latest media, closing CTA |
| About | Intro, **visible quick facts (Q&A)**, bio, education, career timeline, awards wall (one photo per event), teaching, closing CTA |
| Research / Work | Themes grid (a page per theme), methods, publication explorer (search, filter by year/theme/role, citation export), most cited, analytics, books, projects and funding, innovations (plain cards) |
| Leadership | Current roles story, roles explorer (by period and type), service list |
| Team | Faculty grid, students (list and academic family tree), about the group |
| Collaborations | Impact map (world + home country), partner directory by group, stats, research-cooperation CTA |
| Media | Press list (dated, linked), video (lite YouTube embed), photo gallery with lightbox, social links |
| Join / Work with me | Programmes, how to apply (official facts only), FAQ (also FAQ JSON-LD), student work |
| Contact | Contact panel (official channels only), form with topic picker |
| 404 | Friendly, both languages, links home |

Features worth offering: impact counters, career timeline, global map, scroll story, publication explorer, gallery lightbox, research themes, academic family tree, media and video, logo marquee, join page, contact form. Record which were **not** chosen (e.g. an AI chat assistant) in DECISIONS.

## Copy
- **Answer-first:** the first sentence of a section answers the question a visitor (or search engine) would ask, with the person's name.
- One `<h1>` per page, then `h2`/`h3` in order.
- Plain, factual headings ("Main work", not "Changing the world"). No slogans or superlatives unless the person wants them.
- Use the forms of address from Question 1 everywhere; full formal name in titles and metadata.
- Technical terms the field writes in English may stay in English in the second language; give established local terms with English in brackets on first use.
- Proper names (journals, paper titles, people's own spellings) stay as published.
- Years in prose follow the language's convention.

## Languages without spaces (Thai, Lao, Khmer, Burmese, Chinese, Japanese)
Browsers may break such text mid-word. Do **not** insert invisible characters (word joiners, zero-width spaces) or `<wbr>`: they hide names from search and copy-paste.
Instead:
1. A custom JSX runtime (`jsxImportSource` in Vite and tsconfig) passes each text child through a function that wraps words that must not break in `<span class="whitespace-nowrap">`, with the whole string in one span so it stays a single flex/grid item.
2. The word list = a hand-picked `PROTECTED` list (names, terms) + a generated list: a script compares the browser's word breaker (`Intl.Segmenter`, ICU) with a dictionary segmenter (PyThaiNLP for Thai) over every string in `src/` and keeps each real word ICU would split. Re-run after text changes.
3. Attributes (`alt`, `aria-label`, meta) get plain text; `<title>`, `<option>`, `<textarea>`, SVG text stay plain.
4. A `KeepWords` component for names in headings.
5. After changes, check every page in that language at 320 and 375 px for sideways scroll.
6. Turn a space before repeat/abbreviation marks (e.g. ๆ, ฯ) into a no-break space.

## Photos
- Only licensed photos (`livePhotos`). `photo(key).small` in grids, `.full` in heroes and lightboxes.
- Every `<img>` has non-empty `alt`; add `aria-hidden` when the same words are visible right beside it.
- Fixed aspect ratios; `loading="lazy"` + `decoding="async"` below the fold.
- Each photo has a `position` focal point; default upper third (`50% 25%`) so heads are never cropped. Check every new thumbnail.
- Strips and carousels: one photo per event; the full set stays in the gallery.
- Captions say what the photo shows. Stock photos never claim to show the person's work.

## Motion
- framer-motion with `MotionConfig reducedMotion="user"` globally; custom loops check `useReducedMotion()`.
- `Reveal` fades content up on scroll; a `<noscript>` style reveals it without JS.
- **Above the fold**, use a CSS entrance class (`animate-rise`) instead of JS so the heading and hero photo exist in pre-rendered HTML (LCP, crawlability).
- Interaction transitions ≤ 300 ms; exits faster than entrances; nothing scales from 0; no bouncy springs on UI. Easing `[0.23, 1, 0.32, 1]` (out), `[0.77, 0, 0.175, 1]` (in-out).
- Header indicator and language toggle slide with CSS transforms only (no shared-layout animation).
- Marquees pause for keyboard focus and offer a pause control (WCAG 2.2.2).

## Optional playful layer (only if Question 7 allows)
Small animated SVG characters tied to the person's field (e.g. the animals, instruments or objects they work with).
- Shared frame (e.g. 120×120, feet on one baseline), living eyes, idle breathing/blinks, a squash-and-stretch hop on hover/tap.
- Performance: idle at 30 fps, hops at full rate, all frozen while scrolling, off screen or under reduced motion.
- Placement is the person's decision: e.g. a footer parade on every page (with extra bottom padding so it never covers content) and inside content only on casual pages (join, team, media, 404). Never in formal sections or the hero unless they say so. 1–3 per section, each with its own seed.

## Accessibility and quality
- Real buttons and links; visible `:focus-visible` ring; `aria-*` on toggles, tabs, dialogs.
- Dialogs: Escape closes, focus moves in and returns, background doesn't scroll; focus is trapped in mobile menus.
- Contrast at least AA. Label-in-name: accessible names start with the visible text.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Longer second-language text must not break layouts.
- No console errors, no `any`, no unused code.
