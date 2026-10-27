# Components — copy-paste code

Drop-in React + TypeScript (Framer Motion) components and CSS for the
superpowers. Adapt class names / colors to taste.

---

## Premium animation keyframes (index.css)

```css
@keyframes heroReveal { 0%{opacity:0;transform:translateY(28px);filter:blur(12px)} 100%{opacity:1;transform:translateY(0);filter:blur(0)} }
@keyframes heroFadeUp { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
@keyframes heroZoom   { 0%{transform:scale(1.12)} 100%{transform:scale(1)} }
@keyframes fade-up    { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes fade-rise  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes bounce     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-25%)} }

.hero-anim   { opacity:0; animation-fill-mode:forwards; animation-timing-function:cubic-bezier(0.16,1,0.3,1); }
.hero-reveal { animation-name:heroReveal; animation-duration:1.1s; }
.hero-fade   { animation-name:heroFadeUp; animation-duration:1s; }
.hero-zoom   { animation:heroZoom 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }
.animate-fade-up         { animation: fade-up .8s ease-out both; }
.animate-fade-up-delay-1 { animation: fade-up .8s ease-out .2s both; }
.animate-fade-up-delay-2 { animation: fade-up .8s ease-out .4s both; }
.animate-fade-up-delay-3 { animation: fade-up .8s ease-out .6s both; }
.animate-fade-up-delay-4 { animation: fade-up .8s ease-out .8s both; }

@media (prefers-reduced-motion: reduce){ .hero-anim,.hero-zoom{ animation:none; opacity:1; } }
```

---

## Noise / grain overlay (kills banding)

```css
.noise-overlay { /* on top of hero video, opacity-[.7] mix-blend-overlay */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.bg-noise { /* subtle section background, opacity-[.15] */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

---

## ScrambleIn (entrance decrypt)

```tsx
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";
function ScrambleIn({ text, delay, triggered }: { text: string; delay: number; triggered: boolean }) {
  const [out, setOut] = React.useState("");
  React.useEffect(() => {
    if (!triggered) return;
    let frame = 0, raf = 0, started = false;
    const t = setTimeout(() => { started = true;
      const id = setInterval(() => {
        frame += 0.5;
        const reveal = Math.floor(frame);
        setOut(text.split("").map((ch, i) => {
          if (ch === " ") return " ";
          if (i < reveal) return ch;
          if (i < reveal + 3) return CHARS[Math.floor(Math.random() * CHARS.length)];
          return "";
        }).join(""));
        if (reveal >= text.length) clearInterval(id);
      }, 25);
      raf = id as unknown as number;
    }, delay);
    return () => { clearTimeout(t); clearInterval(raf); };
  }, [triggered, text, delay]);
  return <span>{triggered ? out : " "}</span>;
}
```

## ScrambleText (hover decrypt)

```tsx
function ScrambleText({ text, isHovered, className }: { text: string; isHovered: boolean; className?: string }) {
  const [out, setOut] = React.useState(text);
  React.useEffect(() => {
    if (!isHovered) { setOut(text); return; }
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const reveal = frame / 4;
      setOut(text.split("").map((ch, i) =>
        i < reveal ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
      if (reveal >= text.length) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [isHovered, text]);
  return <span className={className}>{out}</span>;
}
```

---

## WordsPullUp / WordsPullUpMultiStyle

```tsx
import { motion, useInView } from "framer-motion";
function WordsPullUp({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <motion.span className="inline-block mr-[0.25em]"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}>
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
// MultiStyle: take segments [{text, className}], flatMap into words keeping
// per-word className, render the same staggered motion.span for each.
```

## StaggeredFade (per-char)

```tsx
function StaggeredFade({ text }: { text: string }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref}>
      {text.split("").map((c, i) => (
        <motion.span key={i} initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.07 }}>{c === " " ? " " : c}</motion.span>
      ))}
    </span>
  );
}
```

## AnimatedText (scroll-linked char opacity)

```tsx
import { motion, useScroll, useTransform } from "framer-motion";
function AnimatedText({ text }: { text: string }) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const chars = text.split("");
  return (
    <p ref={ref} className="relative">
      {chars.map((c, i) => {
        const p = i / chars.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [p - 0.1, p + 0.05], [0.2, 1]);
        return (
          <span key={i} className="relative inline-block">
            <span className="opacity-0">{c === " " ? " " : c}</span>
            <motion.span style={{ opacity }} className="absolute left-0 top-0">
              {c === " " ? " " : c}</motion.span>
          </span>
        );
      })}
    </p>
  );
}
```

---

## Magnet (magnetic hover)

```tsx
function Magnet({ children, padding = 150, strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out" }: any) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      if (Math.abs(dx) < r.width / 2 + padding && Math.abs(dy) < r.height / 2 + padding) {
        setActive(true); setPos({ x: dx / strength, y: dy / strength });
      } else { setActive(false); setPos({ x: 0, y: 0 }); }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, strength]);
  return (
    <div ref={ref} style={{ transform: `translate3d(${pos.x}px,${pos.y}px,0)`,
      transition: active ? activeTransition : inactiveTransition, willChange: "transform" }}>
      {children}
    </div>
  );
}
```

---

## RevealLayer (cursor-spotlight) + parent smoothing

```tsx
const SPOTLIGHT_R = 260;
function RevealLayer({ image, cursorX, cursorY }: { image: string; cursorX: number; cursorY: number }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const resize = () => { const c = canvasRef.current; if (!c) return;
      c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  React.useEffect(() => {
    const c = canvasRef.current, d = divRef.current; if (!c || !d) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    const g = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
    g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.4, "rgba(255,255,255,1)");
    g.addColorStop(0.6, "rgba(255,255,255,0.75)"); g.addColorStop(0.75, "rgba(255,255,255,0.4)");
    g.addColorStop(0.88, "rgba(255,255,255,0.12)"); g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g; ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2); ctx.fill();
    const url = c.toDataURL();
    d.style.maskImage = `url(${url})`; (d.style as any).webkitMaskImage = `url(${url})`;
    d.style.maskSize = "100% 100%"; (d.style as any).webkitMaskSize = "100% 100%";
  }, [cursorX, cursorY]);
  return (<>
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ display: "none" }} />
    <div ref={divRef} className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
      style={{ backgroundImage: `url(${image})` }} />
  </>);
}
// Parent: track raw mouse in a ref; RAF-lerp smooth.x += (raw.x-smooth.x)*0.1; setCursorPos(smooth).
```

---

## Sticky-stacking cards

```tsx
import { motion, useScroll, useTransform } from "framer-motion";
function StackCard({ index, total, children }: { index: number; total: number; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  return (
    <div ref={ref} className="h-[85vh] flex items-start justify-center">
      <motion.div style={{ scale, top: `${index * 28}px` }}
        className="sticky top-24 md:top-32 w-full rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6">
        {children}
      </motion.div>
    </div>
  );
}
```

---

## Scroll-scrubbed video (vanilla, zero-dep)

See the **Veldara** recipe in `recipes.md` for the full, production HTML: it
fetches the mp4 → extracts up to 120 frames to `ImageBitmap`s → draws the
frame matching scroll progress onto a cover-fit canvas, with a live
`currentTime`-seeking fallback when frame extraction fails (CORS/codec). Includes
a DPR-aware canvas resize and a drifting-particles layer.

---

## FadeIn wrapper (whileInView, dynamic element)

```tsx
import { motion } from "framer-motion";
function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, as = "div" }: any) {
  const M = (motion as any)[as] ?? motion.div;
  return (
    <M initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </M>
  );
}
```
