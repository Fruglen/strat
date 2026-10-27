---
name: billion-dollar-website
description: Build landing pages and marketing websites with the design polish of a billion-dollar company (Stripe, Linear, Apple, Vercel). This is the specialist skill for any new public-facing page whose job is to present, promote, or sell — landing pages, homepages, product pages, coming-soon pages, one-page sites, portfolios, and brand sites — for a startup, app, product, local business, studio, shop, consultancy, or person. Use it whenever the user asks to "make" or "build" a website or landing page for something, even for casual or small-business asks and even when design quality isn't mentioned; prefer it over generic frontend or UI-design skills for these requests. Also use it when the user wants a page to look premium, gorgeous, expensive, or distinctive, or says an existing page looks "cheap", "generic", or "like AI made it". Not for app functionality or internal UIs (dashboards, auth, checkout, settings), fixing bugs on an existing site, copywriting-only requests, or slide decks.
---

# Billion-Dollar Website

You are building a landing page that should be indistinguishable from one shipped by a company with a world-class in-house design team. The bar is: if this page appeared on stripe.com, linear.app, apple.com, or vercel.com, nobody would blink.

## Your taste leads — read this first

You have genuine design taste — a sensibility for typography, color, composition, and wit that shows up when you design something you care about. This skill exists to *unleash* that taste, not to replace it with a recipe. Everything below falls into two categories:

- **Hard requirements** (marked as such, and everything under "Non-negotiable quality checks", "Motion — robust by construction", and the design-director pass): these protect against real failure modes and are not negotiable.
- **Everything else is a strong default.** It encodes lessons from pages that failed — but if your considered judgment for *this* brand says to break one, break it deliberately and make the result more distinctive, not less. A page that follows every guideline below but could have been designed by anyone is a worse outcome than a page that bends three guidelines in service of a vision.

The failure mode to fear is not weirdness — it's timidity. Design this page the way you would if a founder you loved gave you total creative control and one shot to amaze them. Follow your first genuinely exciting idea, not your first safe one. If at any point you notice you're assembling sections to satisfy this document rather than composing a page you find beautiful, stop and start from the vision instead.

## Output format

A single self-contained HTML file: all CSS in one `<style>` block, all JS in one `<script>` block, no external dependencies (no CDN frameworks, no icon libraries, no font CDNs unless the user's environment allows network access — prefer system font stacks that look premium, see Typography below). The file must look correct when opened directly in a browser from disk.

## Step 0: Find the one big idea — taste is the whole game

Competent execution of a standard landing page layout is worthless — any tool can produce that. What separates a billion-dollar site from a template is a *point of view*: one distinctive, brand-specific design idea that could only belong to this product, carried through the whole page.

Before anything else, write a 2–3 line creative brief for yourself:

1. **A tangible world, not an abstract theme.** The strongest concepts make the page feel like a physical artifact or place from the product's world: an accounting page that *is* a beautifully kept ledger book — ruled lines, red margin rule, paper texture, ink. A sleep product page that *is* a night, passing from dusk to dawn as you scroll. A distributed database that *is* a cartographer's atlas — map projections, route lines, coordinate stamps. Ask: "what object or place does this product live in?" and build the page out of that material. An abstract theme ("dark and technical", "clean and calm") is not a world — it produces wallpaper, not identity. A data readout or a stat, however clever, is not a world either; it's one prop inside one.
2. **A motif from that world that recurs in every section** — a graphic device (ruled lines, a horizon arc, contour lines), a texture (paper grain, film grain, blueprint), a typographic voice, a signature interaction. If the motif appears only in the hero, the concept dies at the fold and the rest reads as template.
3. **One deliberate risk.** Something a template would never do: an oversized numeral, an editorial serif in a B2B context, a hero that's 90% typography, an off-kilter asymmetric layout, a palette nobody expects (warm paper + deep racing green for fintech). Safe on every axis = generic. Expensive-looking sites always have one choice that makes you look twice.

Then execute the brief with total commitment, *all the way down the page*. The quality floor below (spacing, hierarchy, responsiveness) is the *minimum* — it keeps the risk from looking like a mistake. But the brief is what makes the page worth looking at. If you finish and the page could belong to any company in the category — or if the concept is only visible above the fold — you have failed the assignment; go back and push the world into the sections that lost it.

## Step 1: Choose a design direction

Three proven directions are sketched below — treat them as reference points on a map, not a menu you must order from. If your creative brief points somewhere none of them cover (an editorial print aesthetic, a brutalist poster, a museum catalog), go there. What matters is committed execution of *one* coherent direction. State your choice and your creative brief before you start.

**Stripe/Linear minimal** — for B2B SaaS, fintech, developer tools with a business audience, productivity products. Light backgrounds, typography does the heavy lifting, generous whitespace, one restrained accent color, subtle gradients and shadows, small refined details.

**Apple product drama** — for consumer hardware, premium physical products, lifestyle brands, anything where the product itself is the hero. Huge type, cinematic pacing, full-bleed sections, scroll-driven reveals, confident short copy ("Blazingly fast. Impossibly thin.").

**Vercel/dark tech** — for infrastructure, AI products, developer platforms, anything with hacker energy. Near-black backgrounds, glowing accents, grid/dot textures, monospace details, sharp borders, terminal aesthetics. **Warning: this is the most dangerous direction.** Every AI-generated dev-tool page is a near-black slab with a neon accent and a code window — the direction itself has become the generic look. Dark alone earns nothing. If you choose it, your world-concept has to work *harder* here, not less: bring in unexpected material (cartography, print, engineering drawings, warm light against the dark), and obey the tonal-journey rule below with extra force. Often the more tasteful move for a dev product is to *defy* the expectation entirely — an editorial light page for a database reads as confidence.

If the product doesn't clearly match one, default to Stripe/Linear minimal — it's the most versatile and hardest to get wrong.

## The tonal journey — the anti-monotony rule

A page where every section sits on the same background is monotone, and monotone reads as cheap no matter how refined the details are. Scrolling a great landing page feels like moving through chapters, not reading one long wall. Design the page as a sequence of tonal moments:

- Vary the section backgrounds deliberately: on a light page, alternate paper-white, a tinted band, one full dark "night" section, back to light. On a dark page this is *mandatory*, not optional — vary the darkness (near-black → deep navy → a lifted charcoal panel), add one section that inverts to light or floods with the accent color, and let warmth into the dark (amber light, warm gray) so it doesn't read as one black slab.
- Vary the layout rhythm section to section: full-bleed, then contained split, then bento, then a single centered oversized statement. Two adjacent sections should never feel like the same template row with different words.
- Place one **showpiece section** mid-page — a moment as considered as the hero (an oversized pull-quote, a full-width illustrated diagram from your world, a dramatic number). Pages that spend everything on the hero and coast afterward are the ones that get called generic.

Squint test for this rule: scrolled end to end, the page should produce at least three visibly different "scenes". If the thumbnail strip of your sections looks uniform, break it up.

## Step 2: Design system first, sections second

Billion-dollar sites feel coherent because everything derives from a small set of decisions. Define these as CSS custom properties at the top of your stylesheet and never deviate:

- **One accent color** (plus its hover/muted variants). Everything else is a neutral ramp (8–10 grays from background to text). Two competing accents is how pages start looking cheap — but the *choice* of accent and neutrals is a taste decision: warm paper instead of white, ink instead of gray, racing green or dawn amber instead of the ten-thousandth blue. Let the creative brief pick the palette; avoid the default-blue-on-white that says "nobody decided anything here". And commit to the accent with *conviction*: deep, saturated, ink-dense — a color that could be a luxury brand's signature (bottle green, oxblood, ultramarine, burnt orange). Timid mid-tone accents (sage, dusty teal, muted anything) read as weak and tasteless; if the accent wouldn't hold up embossed on a business card, darken and saturate it until it would. Then use it boldly somewhere — a whole flooded section, an oversized numeral — not just on buttons. A whisper of texture (paper grain, film grain, subtle noise via SVG turbulence) can make flat color feel physical.
- **A type scale** with real contrast: hero headline should be 3.5–6rem on desktop, body 1rem–1.125rem. The jump between levels should be dramatic, not timid. Use `clamp()` so it scales with viewport.
- **A spacing scale** (e.g. 4/8/12/16/24/32/48/64/96/128px). Sections need breathing room: 96–160px vertical padding on desktop. Cramped spacing is the #1 tell of an amateur page.
- **One border radius** value family (e.g. 8px for small elements, 16px for cards). Consistency here matters more than the value.
- **A max content width** (usually 1100–1200px) with consistent horizontal padding.

## Typography — where premium is won or lost

Typography is the strongest taste signal you control without assets. Choose a typographic *voice*, not just a stack:

- **Give the display face character.** A serif display stack (`Georgia, "Iowan Old Style", "Palatino Linotype", serif` or `"New York", ui-serif, Georgia, serif`) over sans body is the fastest route to "editorial, expensive" — especially powerful where it's unexpected (B2B, fintech). Sans-display (`-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif`) reads sharp and product-led. Monospace accents (`ui-monospace, "SF Mono", Menlo, monospace`) for labels, stats, and eyebrows add technical precision. Pick the pairing that serves your creative brief — but pick deliberately; defaulting to sans-everything is how pages end up anonymous.
- Headlines: tight letter-spacing (`-0.02em` to `-0.04em`), tight line-height (1.05–1.15), heavy but not black weight (600–700). Loose default letter-spacing on big type instantly reads as amateur.
- Body: line-height 1.6–1.7, never pure black on white — use a dark gray (#1a1a1a-ish) on off-white, or off-white on near-black.
- Eyebrow labels above headlines (small, uppercase, letter-spaced, accent-colored or muted) are a cheap way to add hierarchy and polish.

## Copy — write like the company is worth a billion dollars

You are also the copywriter. Never use lorem ipsum or `[placeholder]`. Invent a coherent, specific fictional product voice:

- Headlines are short, declarative, benefit-first. "Payments infrastructure for the internet" not "We provide innovative payment solutions for your business needs".
- Give the page at least one moment of *wit* — a headline with a turn ("The books close ~~you~~ themselves", with the strikethrough drawn as a red-ink correction), a footer that signs off in the product's voice, a log line with a human touch. Wit is the strongest single signal that people, not a template, made this page. One moment, executed perfectly; more becomes cute.
- Kill filler words: "innovative", "cutting-edge", "seamless", "empower", "revolutionize", "unleash". These are the vocabulary of cheap sites.
- Feature descriptions are one or two tight sentences, specific over vague ("Sub-50ms responses from 30 edge regions" beats "Lightning-fast performance worldwide").
- Social proof uses realistic invented details: real-sounding company names, specific metrics, plausible person names with titles.

## Page anatomy — jobs to cover, not a sequence to follow

The elements below are *jobs the page must do*, not an ordered blueprint. If every page you produce has the same skeleton — centered hero, proof strip, split section, big numeral, bento, quote, flooded CTA — then the structure itself has become a template and the page is boring before a single style loads. Let the creative brief drive the architecture: maybe the page opens *inside* the product world and the nav is the only orthodox element; maybe social proof is woven through the features as margin notes rather than parked in a strip; maybe the testimonial IS the showpiece. Cover the jobs, break the order, and make at least one structural decision that surprised even you:

1. **Nav** — logo (styled text is fine), 4–5 links, one CTA button. Sticky with a backdrop blur (`backdrop-filter: blur()` + semi-transparent background) — this single detail signals modern polish.
2. **Hero** — eyebrow, huge headline, one-sentence subhead, primary + secondary CTA, and a visual anchor (see Imagery below). This section makes or breaks the page; spend disproportionate effort here.
3. **Social proof strip** — "Trusted by" logo row (styled text wordmarks are fine) or a metric bar.
4. **Feature sections** — 2–4 sections, varied layouts (don't repeat the same three-card grid three times): alternating text/visual splits, a bento grid, a large centered showcase.
5. **Testimonial or stats section** — one strong quote with attribution, or big numbers.
6. **Final CTA section** — a full-width closer with the headline restated as an invitation.
7. **Footer** — multi-column links, muted, generous padding. A thin footer looks cheap.

## Imagery without images

You have no image assets, and premium pages never use obvious stock photos anyway. Build visual interest with:

- **CSS/SVG product mockups**: browser-chrome frames, dashboard skeletons, terminal windows, phone outlines — built from divs and inline SVG. A fake dashboard with realistic-looking chart shapes (inline SVG paths) is far more convincing than a gradient blob.
- **Know what SVG cannot do.** Some illustration types consistently come out looking childish when hand-drawn in SVG: world maps and geographic charts (sparse dots with wobbly arcs across an empty grid), renders of physical products (a headband, a phone, a device — they read as clip-art), organic shapes, faces, scenes. Avoid these as centerpieces. What SVG *does* do convincingly: dense abstract geometry (dot fields, concentric arcs, precise grids), UI artifacts filled with believable data (tables, terminals, dashboards, logs), and typography. The density test: a convincing technical visual has dozens of precise, data-bearing details; if yours has six dots and three curves, it will look like a five-year-old drew it — replace it with a data-rich artifact or monumental type.
- **Gradient atmospherics**: large soft radial gradients behind the hero (mesh-gradient feel via multiple overlapping `radial-gradient`s), used sparingly.
- **Texture**: subtle dot grids or line grids via CSS gradients (dark-tech direction especially).
- **Inline SVG icons**: simple 24px stroke icons drawn by hand (circles, paths, rects). Never emoji as icons — emoji instantly destroy the premium feel.

## Motion — restrained but present

- Scroll-reveal: elements fade up 12–20px as they enter the viewport (`IntersectionObserver` + a CSS transition class). Stagger siblings by 60–100ms. Once, on entry — never re-trigger.
- Hover states on every interactive element: buttons lift or brighten, cards get a border/shadow shift, links get a color transition. All transitions 150–250ms with `ease` or a gentle cubic-bezier.
- One "signature moment" maximum: a subtle animated gradient in the hero, a slowly drifting glow, or an animated number counter. More than one competing animation reads as a template.
- Respect `prefers-reduced-motion: reduce` — disable transforms/animations under it.

## Scale and density — fewer, bigger, braver

Billion-dollar pages make a small number of large, confident moves; cheap pages make many small, timid ones. Audit every section for this:

- If a section is a row of three-or-more medium cards with medium text, ask whether it should instead be one big statement, one large visual, or two big asymmetric panels. Card grids are permitted once per page, at most.
- Push the type scale past comfortable: the hero headline and at least one mid-page moment should feel *monumental* — viewport-filling numerals, a pull-quote set at display size. If nothing on the page makes you slightly nervous about how big it is, it's all too small.
- **Every visual must earn its place or be replaced by typography.** A dim product render, a vague illustration, or a small murky diagram actively cheapens the page — worse than nothing. Build each centerpiece visual with real care (layered detail, believable data, precise strokes), and judge it honestly: if it doesn't look like it took a professional a week, cut it and make that section typography-monumental instead. Type you control completely; mediocre pictures you can't rescue.

## Dark pages: light discipline

Darkness is a stage, not a fog. The most common dark-page failure is everything sinking into murk:

- Primary text on dark backgrounds must be near-white (#e8e8ec-ish), not gray. Secondary text one step down at most. If any headline or key numeral sits below 60% perceived brightness, it's invisible — brighten it.
- Every dark section needs a light source: a glowing element, a bright numeral, a warm gradient, an illuminated panel. Sections that are dark-gray-boxes-on-black with dim text read as unfinished, not moody.
- Check the page at 50% screen brightness (mentally or actually): whatever disappears was already too dim.

## Motion — robust by construction

Scroll-reveals must never leave the page blank: content that starts at `opacity: 0` and waits for a scroll event is invisible in screenshots, previews, print, and any environment where the observer doesn't fire. Reveal elements start at partial visibility (e.g. `opacity: .15`, small translate) OR include a timed fallback that force-reveals everything within ~1.5s of load. Animated counters must render their final value as static text when animation can't run (`prefers-reduced-motion`, no scroll). The page must be fully readable with JavaScript disabled.

## Mandatory: the design-director pass

Do not deliver the first draft. The single biggest quality difference comes from looking at your own page rendered and judging it ruthlessly. After the page is complete:

1. Open it in a real browser (serve it and screenshot it headlessly if you have the tools — full page at ~1440px and at 375px).
2. Review the screenshots as a design director who bills $800/hour would: What looks cheap? What's too dim to read? Which visual isn't earning its place? Where does the tonal journey flatten out? Does the concept survive below the fold? Is anything overflowing or misaligned?
   Inspect the nav and hero at close range too — these carry the first impression. Read every button literally: text on accent-colored fills is the most common contrast failure (light text on a bright amber button is invisible; bright accents almost always need *dark* text). And judge the hero's centerpiece visual brutally — it is the single most-judged element on the page; if it looks even slightly amateur, cutting it for monumental typography is an upgrade, not a loss.
3. Fix what you found and look again. At least one full critique-and-fix cycle; two if the first found real problems.

If you have no browser tooling available, simulate the pass: re-read the full HTML top to bottom imagining each section rendered, against the same questions.

## Non-negotiable quality checks

Before you finish, verify each of these — they're the difference between "AI-generated" and "designed":

- Fully responsive: looks intentional at 375px, 768px, and 1440px. Nav collapses gracefully (a simple functional hamburger is fine). No horizontal scroll at any width.
- Consistent max-width container across every section — sections that don't line up scream template.
- Every interactive element has hover and focus-visible states.
- Contrast meets WCAG AA (4.5:1 body text).
- No lorem ipsum, no placeholder.png, no empty href="#" cursor dead-ends without at least a hover state.
- The page has a `<title>`, meta viewport, and a favicon (inline SVG data URI is fine).
- Open the mental "squint test": squinting at the page, you should see clear visual hierarchy — one dominant element per section, not uniform noise.

## What billion-dollar pages never do

These patterns are the fingerprint of generic AI output — avoid all of them:

- Purple-to-blue gradient on everything (the default AI aesthetic).
- Emoji as feature icons.
- Three identical cards with icon-title-text, repeated as every section.
- Center-aligning all text everywhere (mix left-aligned sections in).
- `border-radius: 50px` pill-everything.
- Drop shadows on every element. Shadows are seasoning, not sauce.
- "Lorem ipsum", "Your Company", "John Doe".
- Timid 2rem hero headlines.
- Equal visual weight on everything — hierarchy requires sacrifice.
