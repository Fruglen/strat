# The Superpowers — mechanisms & parameters

Each technique is self-contained. Mix freely. Code for most lives in
`components.md`; this file explains *how each works* and the knobs to turn.

---

## 1. Cursor-spotlight reveal

A base image sits at `z-10`. A reveal layer with a *second* image sits above it.
A soft circular mask, centered on the cursor, makes the second image visible
only inside the glow — so moving the mouse "uncovers" what's underneath.

**Mechanism**
- Track the mouse with smoothing: keep `raw` and `smooth` refs, and in a RAF
  loop lerp `smooth.x += (raw.x - smooth.x) * 0.1` (same for y). Set state from
  `smooth`. This trails the cursor for a luxurious feel.
- A hidden `<canvas>` sized to the viewport. Each frame: clear, build a
  `createRadialGradient(cx, cy, 0, cx, cy, R)` with soft falloff stops, e.g.
  `0→rgba(255,255,255,1)`, `0.4→1`, `0.6→0.75`, `0.75→0.4`, `0.88→0.12`, `1→0`.
  Fill an arc of radius `R`.
- `canvas.toDataURL()` → apply as `maskImage`/`WebkitMaskImage` (with
  `maskSize:'100% 100%'`) on the reveal `<div>`. The alpha of the mask is the
  visibility of the reveal image.

**Knobs**: `SPOTLIGHT_R` (~260px), gradient falloff, lerp factor (lower = laggier
trail). Init cursor offscreen (`{x:-999,y:-999}`) so nothing shows until move.

**Gotchas**: regenerate the mask every render; resize the canvas on
`window.resize`; keep canvas `display:none` and `pointer-events-none`.

---

## 2. Mouse-scrubbed video (horizontal)

Hero video starts **paused at t=0**. Horizontal mouse movement scrubs the
timeline — it's an interactive control surface, not autoplay.

**Mechanism**
- Listen to `mousemove`; compute the **delta** of `clientX` (not absolute
  position), multiply by a sensitivity factor (~0.8), accumulate into a target
  time.
- Seeking is async: only issue the next `currentTime = target` after the
  previous `seeked` event fires. This chains seeks and avoids dropped frames /
  decoder thrash.

**Knobs**: sensitivity (0.5 slow / 1.0 fast), clamp target to `[0, duration]`.

**Gotchas**: `preload="auto"`, `muted`, `playsInline`. Delta-based feels better
than mapping absolute X → time (no jump when the mouse enters).

---

## 3. Scroll-scrubbed video

Page scroll position maps to video progress. Two-tier approach for smoothness:

**Tier A — pre-extracted frames (preferred)**
- `fetch` the mp4 as a blob → `<video>` off-DOM. Seek to N evenly-spaced times
  (`frameCount ≈ clamp(30, dur*24, 120)`), and at each `seeked` capture a
  `createImageBitmap(video, {resizeWidth, resizeHeight})`. Store bitmaps.
- On scroll, map progress → frame index → `drawImage` onto a visible canvas
  (cover-fit). No live seeking = zero jank.

**Tier B — live seeking fallback**
- If extraction fails (CORS, codec), seek the real `<video>.currentTime` to
  `progress * duration`, guarded by a `seeking` flag cleared on `seeked`.

**Knobs**: scroll range mapping (`start = vh*0.5`, `end = scrollHeight - vh`),
frame count, downscale width (cap ~1280) to bound memory.

**Gotchas**: `crossorigin="anonymous"` + CORS-enabled host required for canvas
capture. Run the RAF tick continuously; recompute canvas size (DPR-aware) on
resize. Passive scroll listeners.

---

## 4. Liquid glass / glassmorphism

A genuinely beveled glass surface — not just a blur.

```css
.liquid-glass {
  background: rgba(255,255,255,0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
  position: relative; overflow: hidden;
}
.liquid-glass::before {            /* the masked gradient border */
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
.liquid-glass:hover { background: rgba(255,255,255,0.04);
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.15); }
.liquid-glass:active { transform: scale(0.98); }
```

The `mask-composite: exclude` trick paints the gradient only on the 1.4px
padding ring → a luminous edge that catches "light" top and bottom.

**Simpler variant** (frosted pill): `bg-white/15 backdrop-blur-md border
border-white/30 rounded-full`. Good for nav pills and chips.

**Mobile-menu glass**: `rgba(10,10,10,0.7)` + `blur(20px)` + faint white border +
`box-shadow: 0 8px 32px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1)`.

---

## 5. Scramble text

**Entrance (`ScrambleIn`)**: after a `delay`, run an interval (~25ms). A reveal
cursor advances ~0.5 chars/frame. Already-revealed chars show the real glyph;
the next ~3 chars show random glyphs from a charset
(`A-Za-z0-9!@#$%^&*()_+~|}{[]:;?><`); chars beyond that are blank. Spaces always
render as spaces.

**Hover (`ScrambleText`)**: on hover, scramble all chars, then resolve
left-to-right at ~4 frames/char (25ms interval). On unhover, snap back to the
original string immediately.

**Feel**: reads as "decrypting". Pair with monospace faces for a terminal vibe.

---

## 6. Pull-up / staggered reveal

Words (or characters) start at `opacity:0, translateY(20–28px)` (optionally
`filter: blur(12px)`) and animate to rest, staggered by index (~0.07–0.08s).
Trigger once with `useInView`. The blur-rise variant (`heroReveal`) is the
premium hero entrance.

- **`WordsPullUp`**: split by spaces; each word is a `motion.span` with delay
  `i * 0.08`. Optional superscript `*` on the final word.
- **`WordsPullUpMultiStyle`**: array of `{text, className}` segments so parts of
  a heading can be serif-italic while the rest is sans — words still animate
  individually.
- **`StaggeredFade`**: per-character, delay `i * 0.07`.

Ease: `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 7. Scroll-linked character opacity ("read-along")

Body paragraph reveals as you scroll past it. Each character interpolates
`opacity 0.2 → 1` based on scroll progress.

**Mechanism**: `useScroll({ target, offset: ['start 0.8', 'end 0.2'] })`. For
char `i` of `N`, `charProgress = i / N`; map the scroll progress over
`[charProgress - 0.1, charProgress + 0.05]` → opacity. Wrap each char in an
invisible placeholder + an absolutely-positioned animated span so layout
doesn't shift.

---

## 8. Magnetic hover

When the cursor is within `padding` px of an element, translate the element
toward it by `delta / strength`; ease back to 0 on leave.

**Knobs**: `padding` (activation radius, ~150), `strength` (divisor, ~3 — higher
= subtler), `activeTransition: transform 0.3s ease-out`,
`inactiveTransition: transform 0.6s ease-in-out`. Use `translate3d` +
`will-change: transform`. Great on hero portraits and primary CTAs.

---

## 9. Sticky-stacking cards

A stack of cards where each pins near the top and the next scales/slides over it.

**Mechanism**: each card lives in a tall (`h-[85vh]`) container and is
`sticky top-24`. Use `useScroll` on each card's container and `useTransform` to
drive `scale`. `targetScale = 1 - (total - 1 - index) * 0.03`, and offset each
card `top: index * 28px` so the stack peeks. Earlier cards shrink as later ones
arrive.

---

## 10. Scroll-driven marquee

Two rows of media translate in opposite directions, speed proportional to scroll.

**Mechanism**: triple the image list per row for seamless wrap. Compute
`offset = (scrollY - sectionTop + innerHeight) * 0.3`. Row 1:
`translateX(offset - 200)` (moves right). Row 2: `translateX(-(offset - 200))`
(left). `will-change: transform`, passive scroll listener, `loading="lazy"`.

---

## 11. Ken Burns / slow zoom

Subtle life on a static hero image:
```css
@keyframes heroZoom { 0%{transform:scale(1.12)} 100%{transform:scale(1)} }
.hero-zoom { animation: heroZoom 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }
```
Disable under `prefers-reduced-motion`. Pair with a gradient overlay so text
stays legible as the image moves.

---

## 12. Particle field

A `pointer-events-none` fixed canvas of slow-drifting dots over the video for
depth. Count ∝ area (`area / 12000`); each particle has position, tiny velocity,
size 0.5–2px, opacity 0.2–0.8; wrap around edges. ~Negligible cost, big payoff
on otherwise-flat video backgrounds.

---

## 13. Nav patterns

- **Hanging pill**: nav is an absolutely-centered black pill hugging the top
  edge with `rounded-b-2xl` corners — looks like it's "hanging" into the hero.
- **Center glass pill**: `absolute left-1/2 -translate-x-1/2`, frosted
  (`bg-white/20 backdrop-blur-md border border-white/30 rounded-full`), with the
  active link in solid white.
- **Expanding menu pill**: a 48px circle that springs open to ~290px (Framer
  spring stiffness 350, damping 28) revealing links that fade in with `x:15→0`.
- **Fullscreen overlay menu**: `fixed inset-0 bg-black/95 backdrop-blur`, links
  in giant display type with staggered `transitionDelay: i*80+100ms`.

Always: collapse to a hamburger below `md`, `fixed top-0 z-[100]`.

---

## 14. Watermark display type

A giant word behind the hero for scale and texture:
- `clamp(120px, 30vw, 521px)`, uppercase, tight `letter-spacing: -4px`,
  `opacity: 0.10`.
- Color via `background: radial-gradient(circle, rgba(...,0) 0%, #8E7F94 70%)`
  + `background-clip: text` + `color: transparent` for a vignetted fill.
- Use a heavy display face (Anton SC). Center it, offset slightly off the
  content's optical center.
