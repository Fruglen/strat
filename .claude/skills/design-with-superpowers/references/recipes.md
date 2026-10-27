# Recipes — eight complete page specs

Each is a full, self-contained build prompt. Clone one and adapt copy / colors /
assets, or harvest individual sections. They demonstrate the superpowers in
context. Swap the asset URLs for the user's own.

Index:
1. **Lithos** — geology hero with cursor-spotlight image reveal
2. **SynapseX** — monospace-futurist multi-section site, mouse-scrubbed hero video
3. **Prisma** — warm-cream cinematic creative studio, scroll-reveal type
4. **VANGUARD** — agency hero over looping video, staggered fade-up
5. **Jack — 3D Creator** — dark portfolio: magnetic portrait, marquee, sticky cards
6. **Organic Visions** — nature hero, staggered-char heading, liquid-glass CTA
7. **Velorah** — minimalist navy hero over video, serif display
8. **Veldara** — vanilla HTML scroll-scrubbed video + particles + sticky cards

---

## 1. Lithos — cursor-spotlight geology hero

**Stack**: React 18 + TS + Vite + Tailwind + lucide-react. Full-screen dark hero
whose signature is a **cursor-following spotlight that reveals a second image**
through a soft circular mask over a base image (Superpower #1).

**Fonts** (top of `index.css`): Inter (300–700) as default; Playfair Display
italic for the wordmark/display accent. `.font-playfair { font-family:'Playfair Display',serif }`.

**Section**: `relative w-full overflow-hidden h-screen bg-black`,
`style={{height:'100dvh'}}`. Layers by z-index:
1. Base image `z-10` — `absolute inset-0 bg-center bg-cover bg-no-repeat` +
   `hero-zoom` (Ken Burns).
2. Reveal layer `z-30` — the `RevealLayer` component (components.md) showing the
   second image through the cursor mask. `SPOTLIGHT_R = 260`. Parent tracks raw
   mouse, RAF-lerps `smooth += (raw-smooth)*0.1`, feeds `cursorPos`.
3. Heading `z-50` — `absolute top-[14%] inset-x-0 flex flex-col items-center
   text-center px-5 pointer-events-none`. `<h1 className="text-white
   leading-[0.95]">` two block spans:
   - line 1 `font-playfair italic text-5xl sm:text-7xl md:text-8xl`,
     `letterSpacing:'-0.05em'` — "Layers hold"; class `hero-anim hero-reveal`,
     `animationDelay:'0.25s'`.
   - line 2 same sizes `-mt-1`, `letterSpacing:'-0.08em'` — "tales of time";
     delay `0.42s`.
4. Bottom-left caption `z-50` `hidden sm:block absolute bottom-14 left-10
   max-w-[260px]` `text-sm text-white/80` (`hero-anim hero-fade`, delay 0.7s).
5. Bottom-right block `z-50` paragraph + **Start Digging** button
   `bg-[#e8702a] hover:bg-[#d2611f] text-white px-7 py-3 rounded-full
   transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg
   hover:shadow-[#e8702a]/30` (delay 0.85s).

**Nav** `fixed top-0 z-[100] flex justify-between p-4 sm:p-5`: inline-SVG logo
(26×26, viewBox `0 0 256 256`, white, path
`M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z`) +
Playfair-italic "Lithos"; center frosted pill `hidden md:flex bg-white/20
backdrop-blur-md border border-white/30 rounded-full` (Course active, +Field
Guides/Geology/Plans/Live Tour); right white "Sign Up" pill; hamburger below md.

**Responsive**: heading `5xl→7xl→8xl`; center pill + Sign Up `hidden` below md;
`100dvh`; reduced-motion disables zoom + reveal.

---

## 2. SynapseX — monospace-futurist, mouse-scrubbed hero video

**Stack**: React + TS + Vite + Tailwind + Framer Motion + lucide-react. Black bg,
white text, full-viewport videos. **Space Mono** for ALL text (override Tailwind
`sans/serif/mono`); **Anton SC** for the background watermark only; Bootstrap
Icons CDN for the Apple icon.

**Custom pieces**: `ScrambleIn` (entrance), `ScrambleText` (hover) — both
components.md. `SynapseXLogo`: 4-fold rotationally symmetric SVG
(`viewBox="-50 -50 100 100"`, each quadrant the path
`M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33
Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5
L 23,1.5 Q 12,12 1.5,23 Z` rotated 0/90/180/270). `SquashHamburger` (spring
stiffness 300 damping 20).

**Sections** (each `h-screen`/`h-[100dvh]`, video `object-cover`):
1. **Hero** — video is **NOT autoplay**; mouse-scrubbed (Superpower #2,
   sensitivity 0.8, `seeked`-chained). 800ms `entranceComplete` fades content
   in. Dot-grid overlay `radial-gradient(#fff 1px,transparent 1px)` 24×24
   opacity .05. Watermark "TRANSCENDENCE" in Anton SC `clamp(120px,30vw,521px)`,
   opacity .10, radial-gradient `background-clip:text`. Bottom row: left h1
   "Brain"/"And Body" `text-[clamp(40px,10vw,100px)] font-light leading-[0.95]
   tracking-[-0.03em]` (ScrambleIn delays 200/500ms) + fade-up description
   (`max-w-sm text-white/60`); right h1 "One"/"Network" `text-left md:text-right`
   (ScrambleIn 700/1000ms).
2. **Navbar** `fixed h-20 z-50`, fades in with entrance. Left: logo pill + an
   **expanding menu pill** (48→290px, spring stiffness 350 damping 28) with
   About/Metrics links (ScrambleText hover, smooth-scroll to `innerHeight`/`*2`).
   Right: white **Download** pill (Apple icon + ScrambleText). Scaled-down mobile
   variant (h-9 pills).
3. **Cinematic text** — autoplay video, top gradient overlay; centered
   `max-w-5xl` paragraph with 3D `perspective:400px`, `rotateX(24deg)
   translateY(yScale) translateZ(15px)` where `yScale` springs 60→-120 over
   scroll (`useScroll` offset `["start end","end start"]` → `useSpring` stiffness
   15 damping 32 mass 1.8 → `useMotionTemplate`), opacity 0→1 between progress
   0.3–0.5.
4. **Metrics** — 3-col grid (2.4ms / 99.7% / 140B), values
   `text-[clamp(48px,10vw,96px)] font-light`, staggered fade-up 0.15s.
5. **Technology / Adaptive Intelligence** — heading + right paragraph + 4-item
   bottom grid (Cortical Mapping / Signal Isolation / State Prediction / Loop
   Feedback), staggered.
6. **Architecture** — pure black, "Three layers. Zero friction.", 3 bordered
   layer cards (Capture/Process/Interface).
7. **Footer** — two-column, video left, logo + tagline + copyright right.

App wrapper inline `fontFamily:'"Space Mono",monospace'`. Lenis smooth-scroll
utility classes. No routing/state lib.

---

## 3. Prisma — warm-cream cinematic creative studio

**Stack**: React 18 + TS + Vite + Tailwind + Framer Motion + lucide-react. Dark,
moody, warm-cream palette. 3 sections: Hero, About, Features.

**Fonts**: Almarai (300/400/700/800) global; Instrument Serif italic for accent.
Tailwind `colors.primary:#DEDBC8`, `fontFamily.serif:['"Instrument Serif"']`.
**Colors**: bg black; About card `#101010`; Features cards `#212121`; primary
text `#E1E0CC`; grays `400/500`.

**Utilities**: `.noise-overlay` (turbulence .85/3, on hero video,
`opacity-[.7] mix-blend-overlay`) and `.bg-noise` (.9/4, Features bg
`opacity-[.15]`).

**Hero** `h-screen`, `p-4 md:p-6` inset, inner `rounded-2xl md:rounded-[2rem]
overflow-hidden`. Bg video (autoplay loop muted playsInline object-cover) +
noise overlay + `bg-gradient-to-b from-black/30 via-transparent to-black/60`.
Hanging black nav pill `rounded-b-2xl` (Our story / Collective / Workshops /
Programs / Inquiries). Bottom 12-col grid: giant **Prisma** via `WordsPullUp`
(`text-[26vw]…lg:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]`,
superscript `*` on final "a") + right description (fade-up delay .5s) +
**Join the lab** pill (`bg-primary rounded-full`, black ArrowRight in a black
circle, `hover:gap-3 group-hover:scale-110`, delay .7s, ease `[0.16,1,0.3,1]`).

**About** `bg-black`, card `bg-[#101010]`, centered. Label "Visual arts". Heading
via `WordsPullUpMultiStyle` 3 segments: "I am Marcus Chen," (Almarai) / "a self-
taught director." (Instrument Serif italic) / "I have skills in color grading,
visual effects, and narrative design." (Almarai) —
`text-3xl…xl:text-7xl max-w-3xl leading-[0.95]`. Body paragraph uses
`AnimatedLetter` scroll-linked opacity (`['start 0.8','end 0.2']`, char range
`[p-0.1, p+0.05]`, 0.2→1).

**Features** `min-h-screen bg-black` + `.bg-noise opacity-[.15]`. Header
`WordsPullUpMultiStyle` (cream line + gray line). 4-col card grid
(`lg:h-[480px]`, staggered scale-0.95+fade `useInView` once, 0.15s, ease
`[0.22,1,0.36,1]`): Card 1 video ("Your creative canvas."), Cards 2–4 `bg-[#212121]`
with image icon + numbered title + green-Check checklist + "Learn more" arrow
rotated -45deg (Project Storyboard 01 / Smart Critiques 02 / Immersion Capsule 03).

**Shared**: `WordsPullUp` (split by spaces, `motion.span` y:20→0 stagger 0.08,
`useInView` once, optional asterisk); `WordsPullUpMultiStyle` (per-segment
className, `inline-flex flex-wrap justify-center`).

---

## 4. VANGUARD — agency hero over looping video

**Stack**: React + Tailwind + Vite (single `App.tsx`, `useState` menu). One
viewport-height section, looping bg video (`autoPlay muted loop playsInline
object-cover`), all content overlaid.

**Fonts**: "FSP DEMO - PODIUM Sharp 4.11" (onlinewebfonts) → `.font-podium` /
`fontFamily.podium` for brand + heading; Inter (400–700) for body. **Icons**
lucide: `ArrowUpRight, Award, Crown, X`.

**Navbar** `px-6 sm:px-10 lg:px-16 py-5 lg:py-7`: left brand "VANGUARD"
(podium, white, bold, uppercase, `text-2xl sm:text-3xl tracking-wider`); center
(hidden < md) Projects/Studio/Offerings/Inquire (`text-sm text-white/80
tracking-widest`); right (hidden < md) bordered "GET IN TOUCH" + ArrowUpRight;
below md a 3-bar hamburger (`w-6/w-6/w-4 h-0.5 space-y-1.5`).

**Mobile menu** `fixed inset-0 z-50 bg-black/95 backdrop-blur-sm`, toggled
`opacity-100 visible` / `opacity-0 invisible` `transition-all duration-500`.
Links `font-podium text-4xl sm:text-5xl` with staggered inline
`transitionDelay:i*80+100ms`, opacity + `translateY(20px)`.

**Hero** (vertically centered, left-aligned), all `animate-fade-up*`:
1. Tagline: Crown icon + "World-Class Digital Collective" (`text-white/70
   tracking-[0.3em] uppercase`).
2. Heading 3 lines `font-podium uppercase leading-[0.92]
   text-[clamp(2.8rem,8vw,7rem)]` — "Design." / "Disrupt." / "Conquer."
   (`animate-fade-up-delay-1`).
3. Subtext `text-white/70 max-w-md` with bold "they lead." (delay-2).
4. CTA row (delay-3): black "SEE OUR WORK" + ArrowUpRight
   (`group-hover:translate-x-0.5 -translate-y-0.5`) + Award badge "Top-Rated /
   Brand Studio" (`hidden sm:flex`).
5. Stats row (delay-4, `flex-wrap`): 250+ / 95% / 10+ with labels.

Keyframes `fade-up`, `fade-in`, `scale-in` under `@layer utilities`.

---

## 5. Jack — 3D Creator portfolio

**Stack**: React + TS + Tailwind + Framer Motion + lucide. Dark `#0C0C0C`, Kanit
(300–900). `.hero-heading` gradient text
(`linear-gradient(180deg,#646973,#BBCCD7)` + `background-clip:text` +
`text-fill-color:transparent`). Wrapper `overflowX:clip`.

**Sections**: Hero → Marquee → About → Services → Projects.

- **Hero** `h-screen`. Nav (About/Price/Projects/Contact). Massive h1 "Hi, i'm
  jack" `.hero-heading font-black uppercase text-[14vw]…lg:text-[17.5vw]
  leading-none`. Centered portrait wrapped in **`Magnet`** (padding 150,
  strength 3) — Superpower #8. Bottom bar: left tagline + right `ContactButton`.
  FadeIn delays 0/0.15/0.35/0.5/0.6.
- **Marquee** (Superpower #10): 21 GIFs, two rows tripled; row1 moves right
  `translateX(offset-200)`, row2 left; `offset=(scrollY-sectionTop+innerHeight)
  *0.3`; tiles 420×270 `rounded-2xl object-cover` lazy; `will-change:transform`,
  passive listener.
- **About** `min-h-screen`. Four corner 3D images (FadeIn x:±80). Heading
  "About me" `.hero-heading clamp(3rem,12vw,160px)`. `AnimatedText` scroll-linked
  char opacity paragraph. `ContactButton`.
- **Services** white `#FFFFFF` `rounded-t-[40px]…md:rounded-t-[60px]`. "Services"
  heading. 5 numbered rows (01 3D Modeling … 05 Web Design), number
  `clamp(3rem,10vw,140px)`, 1px borders, staggered FadeIn `i*0.1`.
- **Projects** dark, `rounded-t` top, `-mt-10`. 3 **sticky-stacking cards**
  (Superpower #9): each `sticky top-24` in `h-[85vh]`, `targetScale = 1 -
  (total-1-index)*0.03`, `top:index*28px`. Card = number + category + name +
  ghost "Live Project" button + 2-col image grid (40/60). Projects: Nextlevel
  Studio / Aura Brand Identity / Solaris Digital.

**Reusable**: `ContactButton` (gradient pill `linear-gradient(123deg,#18011F,
#B600A8,#7621B0,#BE4C00)`, inset shadows, white outline -3px offset);
`LiveProjectButton` (ghost, `border-2 #D7E2EA`); `FadeIn` (`whileInView` once,
ease `[0.25,0.1,0.25,1]`, `motion.create()`); `Magnet`; `AnimatedText`.

---

## 6. Organic Visions — nature hero, liquid-glass CTA

**Stack**: React + Tailwind + Framer Motion + lucide + Vite/TS. Full-screen
looping bg video (`object-cover object-center`), page bg `#010101`.

**Fonts**: Garamond (onlinewebfonts) → `.font-garamond`; Geist (300/400/500)
body.

**Nav** `relative z-20`: brand "Organic Visions" (uppercase,
`letter-spacing 0.25–0.3em`, font-light); desktop links
Wander/Archive/Story/Connect (`white/80 tracking-0.2em`); mobile hamburger
(lucide `Menu`/`X` size 22).

**Mobile menu** `fixed top-16 inset-x-4 z-50 .mobile-menu-glass rounded-2xl`,
`AnimatePresence` fade `y:-10→0` 0.3s, links stagger `delay:0.05+i*0.06`.
`.mobile-menu-glass` = `rgba(10,10,10,0.7)` + `blur(20px)` + faint border +
layered shadow.

**Hero** centered: heading two lines "WITNESS THE" / "HIDDEN REALM" in Garamond
`4xl…9xl leading-[1.08]`, each via **`StaggeredFade`** (per-char 0.07s,
`useInView` once). Subtitle (fade `delay 1.6s`). **CTA** "Begin the Experience"
with **`.liquid-glass`** (Superpower #4) `rounded-full`, fade `delay 2.0s`.
Page title "Synthetic Nature".

---

## 7. Velorah — minimalist navy hero over video

**Stack**: React + Vite + TS + Tailwind + shadcn/ui. Fullscreen looping video
(`absolute inset-0 object-cover z-0`).

**Fonts**: Instrument Serif (display, inline `fontFamily`) + Inter (400/500).
**Theme** (HSL CSS vars, dark): `--background:201 100% 13%` (deep navy),
`--foreground:0 0% 100%`, `--muted-foreground:240 4% 66%`, borders `0 0% 18%`.

**Nav** `relative z-10 justify-between px-8 py-6 max-w-7xl mx-auto`: logo
"Velorah®" (`®` as `<sup>`, `text-3xl`, Instrument Serif); links
Home/Studio/About/Journal/Reach Us (`text-muted-foreground hover:text-foreground`);
**Begin Journey** `.liquid-glass rounded-full hover:scale-[1.03]`.

**Hero** centered `pt-32 pb-40`: h1 "Where dreams rise through the silence."
`text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl`,
words "dreams" and "through the silence." wrapped
`<em className="not-italic text-muted-foreground">`. Subtext
`text-muted-foreground max-w-2xl mt-8`. CTA **Begin Journey**
`.liquid-glass rounded-full px-14 py-5 mt-12`. H1 `animate-fade-rise`, subtext
`-delay`, CTA `-delay-2` (keyframe `fade-rise`). No blobs/overlays — the video is
the depth.

---

## 8. Veldara — vanilla HTML scroll-scrubbed video

**Zero-dependency** (plain HTML + Canvas + JS). The reference implementation of
**scroll-scrubbed video** (Superpower #3) + **particle field** (#12) +
**sticky-reveal cards** + IntersectionObserver section reveal.

**Background**: `#scroll-video-container` (`position:fixed inset-0 z-:-10`).
- `extractFrames()`: `fetch(VIDEO_URL,{mode:'cors'})` → blob → off-DOM `<video>`;
  `frameCount = clamp(30, dur*24, 120)`; seek each evenly-spaced time, await
  `seeked`, `createImageBitmap(video,{resizeWidth,resizeHeight})` (downscale to
  ≤1280). On success hide the fallback `<video>`, show canvas.
- `videoTick()` (RAF): `progress = clamp((scrollY-start)/(end-start))` with
  `start=vh*0.5, end=scrollHeight-vh`; if frames ready draw frame
  `round(progress*(n-1))` cover-fit; else seek the live `<video>.currentTime`
  guarded by a `seeking` flag.
- DPR-aware `resizeCanvas` (cap dpr 2) on resize.

**Particles**: `#particles-canvas` fixed `pointer-events-none z-3`; count
`area/12000`; drift + wrap; `rgba(255,255,255,opacity)`.

**Nav** fixed; logo "veldara" + Guides/Journal + 3 social SVGs (GitHub/Discord/
Twitter).

**Hero**: subtitle "Our Purpose:" + h1 "Instantly craft immersive [3D worlds]
on the web." (the bracketed phrase has an underline bar `#2C5C88`) + code-box
`npm i @veldara/core` + accent CTA. Bounce arrow (`@keyframes bounce`). Hero
opacity fades on scroll (`1 - scrollY/(vh*0.3)`).

**Fixed cards**: `#fixed-cards` pinned bottom, opacity driven by a 200vh
`#cards-trigger` zone; a `linear-gradient` `maskImage` wipes the grid in
(horizontal on desktop, vertical on mobile) as scroll progresses.

**Section 3**: IntersectionObserver (threshold 0.15) adds `.visible` →
opacity/translateY/blur transition; "Presenting / Veldara 8".

Accent color `#2C5C88`. Fully responsive (`@media max-width:768px`).
