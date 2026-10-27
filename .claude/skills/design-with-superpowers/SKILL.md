---
name: design-with-superpowers
description: >-
  A catalog of cinematic, award-winning web design ideas and copy-paste-ready
  recipes for building premium landing pages and hero sections with React +
  Vite + TypeScript + Tailwind + Framer Motion (and vanilla HTML/JS). Use this
  whenever the user wants to "design with superpowers", build a striking hero
  section, a creative-agency / portfolio / product landing page, a video-
  background site, glassmorphism / liquid-glass UI, cursor-spotlight reveals,
  scroll-scrubbed video, scramble / pull-up / staggered text animations,
  magnetic hover, marquees, sticky-stacking cards, or any high-polish,
  cinematic, "make it look incredible" front-end. Trigger words: hero section,
  landing page, design ideas, cinematic, premium UI, glassmorphism, liquid
  glass, video background, scroll animation, text reveal, design with
  superpowers.
---

# Design With Superpowers

A field guide for building the kind of landing pages that win awards: dark,
cinematic, video-driven, with buttery text reveals and tactile micro-
interactions. This skill gives you **(1)** a menu of reusable "superpowers"
(self-contained techniques), **(2)** drop-in component code, and **(3)** eight
complete, battle-tested page recipes you can adapt wholesale.

## How to use this skill

1. **Pick the goal.** Hero section? Full landing page? Portfolio? Product site?
2. **Compose superpowers.** Each superpower in `references/techniques.md` is
   independent — mix and match (e.g. video background + scramble text + liquid
   glass nav + magnetic CTA).
3. **Grab the code.** `references/components.md` has copy-paste React/TS + CSS
   for every reusable piece (text animators, magnetic hover, sticky cards,
   scroll-scrubbed video, glass effects).
4. **Or clone a recipe.** `references/recipes.md` has eight full page specs
   (Lithos, SynapseX, Prisma, VANGUARD, Jack 3D, Organic Visions, Velorah,
   Veldara) — each is a complete, detailed build prompt.
5. **Always finish with the polish checklist** below.

## The default stack

Unless the user says otherwise, reach for:

- **React 18 + TypeScript + Vite**
- **Tailwind CSS 3** for layout/utility styling
- **Framer Motion** for orchestrated animation (scroll, stagger, springs)
- **lucide-react** (or Bootstrap Icons CDN) for icons
- Google Fonts / onlinewebfonts for type
- Pure **vanilla HTML + Canvas + JS** when there's no build step (see the
  Veldara recipe for scroll-scrubbed video done with zero dependencies)

Single-page, no routing, no state library unless the design demands it.

## The superpowers (quick menu)

The full how-to for each is in `references/techniques.md`. The headline ideas:

| # | Superpower | What it does |
|---|------------|--------------|
| 1 | **Cursor-spotlight reveal** | A soft circular mask follows the cursor and reveals a *second* image/layer underneath. Canvas radial-gradient → `maskImage`. |
| 2 | **Mouse-scrubbed video** | Hero video is paused; horizontal mouse movement scrubs the timeline frame-by-frame (delta-based, chained `seeked` events). |
| 3 | **Scroll-scrubbed video** | Page scroll drives video playback — pre-extract frames to a canvas for jank-free seeking, fall back to live `currentTime` seeking. |
| 4 | **Liquid glass / glassmorphism** | `backdrop-blur` + a masked gradient border via `::before` + `mask-composite: exclude` for a real glass bevel. |
| 5 | **Scramble text** | Characters cycle through random glyphs then resolve left-to-right — on entrance (`ScrambleIn`) or on hover (`ScrambleText`). |
| 6 | **Pull-up / staggered reveal** | Words or characters rise from `y:20`+blur with staggered delays, triggered by `useInView`. |
| 7 | **Scroll-linked char opacity** | Each character fades `0.2 → 1` as it passes through the viewport — progressive "read-along" reveal via `useScroll`. |
| 8 | **Magnetic hover** | An element leans toward the cursor when it's nearby, easing back when it leaves. |
| 9 | **Sticky-stacking cards** | Cards pin and scale down as later ones slide over them (`useScroll` + `useTransform`). |
| 10 | **Scroll-driven marquee** | Rows of media translate opposite directions, speed tied to scroll position. |
| 11 | **Ken Burns / slow zoom** | A 1.8s `scale(1.12 → 1)` on the hero image for subtle cinematic life. |
| 12 | **Particle field** | A lightweight canvas of drifting dots layered over video for depth. |
| 13 | **Hanging-pill nav** | A nav that drops from the top edge with `rounded-b` corners, or a center glass pill that expands on open. |
| 14 | **Watermark display type** | Giant low-opacity background word with `background-clip: text` gradient fill. |

## Aesthetic principles (avoid AI-slop design)

- **Commit to a mood.** Dark + cinematic, or warm-cream editorial, or stark
  monospace-futurist — pick one and push it all the way. Half-measures read as
  generic.
- **Type does the heavy lifting.** Pair a characterful display face (Playfair
  italic, Instrument Serif, Garamond, Anton, PODIUM, Kanit) with a clean body
  face (Inter, Geist, Almarai, Space Mono). Use `clamp()` for fluid sizing and
  tight negative `letterSpacing` on big headings (`-0.02em` to `-0.08em`).
- **Motion is choreography, not decoration.** Stagger entrances (0.15–0.25s
  apart), use the `cubic-bezier(0.16, 1, 0.3, 1)` "premium ease", and let
  scroll *drive* state instead of firing everything at once.
- **Negative space + a single accent.** Mostly black/white/cream with one
  saturated accent (`#e8702a` orange, magenta gradients) used sparingly on CTAs.
- **Tactile micro-interactions.** `hover:scale-[1.03] active:scale-95`, glow
  shadows on accent buttons, gap-grows-on-hover, arrow nudges.
- **Real depth.** Layer video + gradient overlay + noise/grain + content. The
  `.noise-overlay` SVG turbulence trick (see components) kills banding.

## Polish checklist (run before declaring done)

- [ ] `100dvh` (not just `100vh`) on full-height sections so mobile chrome
      doesn't clip.
- [ ] `@media (prefers-reduced-motion: reduce)` disables zooms/reveals.
- [ ] Fully responsive: heading `clamp()`, nav collapses to hamburger below
      `md`, side captions `hidden sm:block`, grids reflow 1→2→4 cols.
- [ ] Videos: `autoPlay muted loop playsInline object-cover` (muted is required
      for autoplay).
- [ ] `pointer-events-none` on decorative overlays so they don't eat clicks.
- [ ] `will-change: transform` on scroll/RAF-animated layers; clean up
      listeners + `cancelAnimationFrame` on unmount.
- [ ] Images: `loading="lazy"`, explicit dimensions where possible.
- [ ] Test the cursor/scroll/scrub interactions actually feel smooth (lerp
      smoothing ~0.1 factor, passive scroll listeners).

## Reference files

- **`references/techniques.md`** — the 14 superpowers, each with the mechanism,
  parameters, and gotchas.
- **`references/components.md`** — copy-paste code: `ScrambleIn`, `ScrambleText`,
  `WordsPullUp`, `StaggeredFade`, `AnimatedText`, `Magnet`, `RevealLayer`,
  sticky-stacking cards, scroll-scrubbed video, `.liquid-glass`, `.noise-overlay`,
  animation keyframes.
- **`references/recipes.md`** — eight complete page build specs to clone and
  adapt.
