import './styles.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { createHeroScene } from './three/hero.js';
import { createModelRoom, MODELS } from './three/modelroom.js';
import { DRAWINGS } from './icons.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(pointer: fine)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ───────── smooth scroll ───────── */
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

$$('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const el = id === '#top' ? document.body : $(id);
    if (!el) return;
    e.preventDefault();
    document.body.classList.remove('menu-open');
    if (lenis) lenis.scrollTo(el, { duration: 1.6, offset: id === '#top' ? 0 : -10 });
    else el.scrollIntoView();
  })
);

/* ───────── hero 3D ───────── */
const phaseEl = $('[data-phase]');
const spanEl = $('[data-span-readout]');
let hero = null;
try {
  hero = createHeroScene($('.hero__canvas'), {
    reducedMotion: reduced,
    onPhase: (p) => {
      if (!phaseEl) return;
      gsap.fromTo(phaseEl, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.5 });
      phaseEl.textContent = p;
    },
    onSpan: (m) => spanEl && (spanEl.textContent = `${m.toFixed(1)} m`),
  });
} catch (err) {
  console.warn('WebGL unavailable, hero falls back to static', err);
}

ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (st) => hero?.setScroll(st.progress),
});

/* ───────── preloader → intro ───────── */
function intro() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  const pct = $('.loader__pct b');
  const counter = { v: 0 };
  tl.to('.loader__mark path', { strokeDashoffset: 0, duration: 1.4, stagger: 0.15, ease: 'power2.inOut' }, 0)
    .to('.loader__bar i', { scaleX: 1, duration: 1.6, ease: 'power3.inOut' }, 0)
    .to(counter, { v: 100, duration: 1.6, ease: 'power3.inOut', onUpdate: () => (pct.textContent = String(Math.round(counter.v)).padStart(3, '0')) }, 0)
    .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, 1.75)
    .add(() => {
      document.body.classList.remove('is-loading');
      $('.loader').style.display = 'none';
      lenis?.start();
      hero?.startIntro();
    }, 2.3)
    .from('.hero__title .word', { yPercent: 115, rotate: 3, duration: 1.4, stagger: 0.11 }, 2.1)
    .from('.hero [data-reveal]', { y: 24, opacity: 0, duration: 1.2, stagger: 0.12 }, 2.5)
    .from('.nav > *', { y: -20, opacity: 0, duration: 1, stagger: 0.08 }, 2.3)
    .from('.hero__annot, .hero__scroll', { opacity: 0, duration: 1.2, stagger: 0.12 }, 2.8);
  if (reduced) tl.progress(1);
}
if (reduced) {
  $('.loader').style.display = 'none';
  document.body.classList.remove('is-loading');
  hero?.startIntro();
} else {
  Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 1500))]).then(intro);
}

// hero copy recedes as you scroll into the build
if (!reduced) {
  gsap.to('.hero__content', {
    yPercent: -12,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '28% top', scrub: true },
  });
  gsap.to('.hero__scroll', { opacity: 0, scrollTrigger: { trigger: '.hero', start: 'top top', end: '8% top', scrub: true } });
}

/* ───────── nav behaviour ───────── */
const nav = $('.nav');
let lastY = 0;
ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: (st) => {
    const y = st.scroll();
    nav.classList.toggle('is-solid', y > window.innerHeight * 0.6);
    nav.classList.toggle('is-hidden', y > lastY && y > window.innerHeight && !document.body.classList.contains('menu-open'));
    lastY = y;
    // roadway stationing, 100-ft stations
    const sta = st.progress * 12;
    $('.station__value').textContent = `${Math.floor(sta)}+${String(Math.floor((sta % 1) * 100)).padStart(2, '0')}`;
    $('.station__track i').style.transform = `scaleX(${st.progress})`;
  },
});
$('.nav__burger').addEventListener('click', (e) => {
  const open = document.body.classList.toggle('menu-open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
  $('.menu').setAttribute('aria-hidden', String(!open));
  if (open) gsap.from('.menu nav a', { yPercent: 60, opacity: 0, stagger: 0.06, duration: 0.9, ease: 'expo.out', delay: 0.25 });
});

// rolling hover labels
$$('[data-split-hover]').forEach((a) => {
  const t = a.textContent;
  a.innerHTML = `<span class="roll"><span>${t}</span><span aria-hidden="true">${t}</span></span>`;
});

// active section in nav
$$('.nav__links a').forEach((a) => {
  const target = $(a.getAttribute('href'));
  if (!target) return;
  ScrollTrigger.create({
    trigger: target,
    start: 'top 50%',
    end: 'bottom 50%',
    onToggle: (st) => a.classList.toggle('is-active', st.isActive),
  });
});

// local clock
const clockEl = $('[data-clock]');
const fmt = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Chicago' });
const tick = () => clockEl && (clockEl.textContent = fmt.format(new Date()));
tick();
setInterval(tick, 15000);
$('[data-year]').textContent = new Date().getFullYear();

/* ───────── cursor ───────── */
if (fine) {
  const cur = $('.cursor');
  const label = $('.cursor__label');
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const xTo = gsap.quickTo(cur, 'x', { duration: 0.18, ease: 'power3' });
  const yTo = gsap.quickTo(cur, 'y', { duration: 0.18, ease: 'power3' });
  window.addEventListener('pointermove', (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
    xTo(pos.x);
    yTo(pos.y);
  });
  document.addEventListener('pointerover', (e) => {
    const el = e.target.closest('a, button, [data-cursor], label, input, textarea');
    cur.classList.toggle('is-hover', !!el);
    const text = el?.dataset?.cursor;
    cur.classList.toggle('has-label', !!text);
    if (text) label.textContent = text;
  });
}

/* ───────── magnetic buttons ───────── */
if (fine && !reduced) {
  $$('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.38);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ───────── text reveals ───────── */
document.fonts?.ready.then(() => {
  $$('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
    if (reduced) return;
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.2,
      stagger: 0.09,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  const words = $('[data-words]');
  if (words) {
    const split = SplitText.create(words, { type: 'words', wordsClass: 'w' });
    if (!reduced) {
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: words, start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
    }
  }

  // footer word: one wave per entry
  const fw = $('.footer__word');
  const fsplit = SplitText.create(fw, { type: 'chars', charsClass: 'ch' });
  if (!reduced) {
    gsap.from(fsplit.chars, {
      yPercent: 60,
      opacity: 0,
      stagger: 0.06,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: fw, start: 'top 95%' },
    });
  }
  ScrollTrigger.refresh();
});

// footer wordmark spans the full sheet width
function fitFooterWord() {
  const fw = $('.footer__word');
  fw.style.fontSize = '100px';
  const avail = fw.parentElement.clientWidth - parseFloat(getComputedStyle(fw.parentElement).paddingLeft) * 2;
  fw.style.fontSize = `${(100 * avail) / fw.scrollWidth}px`;
}
document.fonts?.ready.then(fitFooterWord);
window.addEventListener('resize', fitFooterWord);

if (!reduced) {
  $$('main [data-reveal]').forEach((el) => {
    if (el.closest('.hero')) return;
    gsap.from(el, { y: 30, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  gsap.from('.statement .dim i', { scaleX: 0, duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: '.statement', start: 'top 70%' } });
}

/* ───────── marquee (scroll-velocity aware) ───────── */
{
  const track = $('.marquee__track');
  track.innerHTML += track.innerHTML; // seamless loop
  const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
  if (reduced) loop.pause();
  else {
    let dir = 1;
    ScrollTrigger.create({
      trigger: '.marquee',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (st) => {
        const v = st.getVelocity();
        if (Math.abs(v) > 10) dir = v > 0 ? 1 : -1;
        gsap.to(loop, { timeScale: dir * (1 + Math.min(Math.abs(v) / 400, 5)), duration: 0.3, overwrite: true });
        gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.3 });
      },
    });
  }
}

/* ───────── discipline rows + floating drawing ───────── */
{
  const float = $('.dlist__float');
  const svg = float.querySelector('svg');
  const rows = $$('.dlist__row');
  if (!reduced) {
    gsap.from(rows, {
      opacity: 0,
      y: 30,
      stagger: 0.06,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.dlist', start: 'top 80%' },
    });
  }
  if (fine) {
    const xTo = gsap.quickTo(float, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(float, 'y', { duration: 0.5, ease: 'power3' });
    const rTo = gsap.quickTo(float, 'rotation', { duration: 0.8, ease: 'power3' });
    let px = 0;
    rows.forEach((row) => {
      row.addEventListener('pointerenter', () => {
        svg.innerHTML = DRAWINGS[row.dataset.icon] ?? '';
        svg.querySelectorAll('path, rect, circle').forEach((p) => {
          const len = p.getTotalLength?.() ?? 300;
          gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' });
        });
        gsap.fromTo(svg.querySelectorAll('text'), { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.4, stagger: 0.08 });
        gsap.to(float, { opacity: 1, scale: 1, duration: 0.45, ease: 'expo.out' });
      });
      row.addEventListener('pointerleave', () => gsap.to(float, { opacity: 0, scale: 0.85, duration: 0.3 }));
    });
    $('.dlist').addEventListener('pointermove', (e) => {
      xTo(e.clientX + 30);
      yTo(e.clientY - 170);
      rTo(gsap.utils.clamp(-8, 8, (e.clientX - px) * 0.6));
      px = e.clientX;
    });
  }
}

/* ───────── counters ───────── */
function countUp(el, { pad = 0, duration = 2 } = {}) {
  const end = Number(el.dataset.count);
  const o = { v: 0 };
  return gsap.to(o, {
    v: end,
    duration,
    ease: 'power3.out',
    onUpdate: () => (el.textContent = String(Math.round(o.v)).padStart(pad, '0')),
  });
}

/* ───────── TxDOT ───────── */
{
  const num = $('.txdot__num');
  if (reduced) {
    num.textContent = '17';
    gsap.set('.txdot__ring circle, .checks svg path', { strokeDashoffset: 0 });
  } else {
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.txdot', start: 'top 65%' } });
    tl.add(countUp(num, { pad: 2, duration: 2.2 }), 0)
      .to('.txdot__ring circle', { strokeDashoffset: 578 - 578 * (17 / 20), duration: 2.2, ease: 'power3.out' }, 0)
      .from('.checks li', { opacity: 0, x: -16, stagger: 0.09, duration: 0.8, ease: 'expo.out' }, 0.3)
      .to('.checks svg path', { strokeDashoffset: 0, stagger: 0.09, duration: 0.5, ease: 'power2.out' }, 0.5);
    gsap.to('.txdot__big', { rotate: -6, ease: 'none', scrollTrigger: { trigger: '.txdot', start: 'top bottom', end: 'bottom top', scrub: true } });
  }
}

/* ───────── model room ───────── */
{
  const tabs = $$('.models__tabs button');
  const nameEl = $('.models__name');
  const idxEl = $('.models__idx');
  const descEl = $('.models__desc');
  const specsEl = $('.models__specs');
  const setInfo = (i) => {
    const m = MODELS[i];
    tabs.forEach((t, j) => t.setAttribute('aria-selected', String(i === j)));
    const tl = gsap.timeline();
    tl.to([nameEl, descEl, specsEl], { opacity: 0, y: -10, duration: 0.25, stagger: 0.04 }).add(() => {
      idxEl.textContent = `${String(i + 1).padStart(2, '0')} / ${String(MODELS.length).padStart(2, '0')}`;
      nameEl.textContent = m.name;
      descEl.textContent = m.desc;
      specsEl.innerHTML = m.specs.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    });
    tl.fromTo([nameEl, descEl, specsEl], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'expo.out' });
  };
  let room = null;
  try {
    room = createModelRoom($('.models__canvas'), { reducedMotion: reduced, onChange: setInfo });
  } catch (err) {
    console.warn('Model room unavailable', err);
    setInfo(0);
  }
  tabs.forEach((t) => t.addEventListener('click', () => room?.show(Number(t.dataset.model))));
  $('.models__tabs').addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const i = tabs.indexOf(document.activeElement);
    const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[n].focus();
    room?.show(n);
  });
}

/* ───────── process: pinned horizontal ───────── */
{
  const mm = gsap.matchMedia();
  mm.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)', () => {
    const track = $('.process__track');
    const dist = () => track.scrollWidth - window.innerWidth;
    const line = $('.process__road-line');
    const tween = gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.process',
        start: 'top top',
        end: () => `+=${dist()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (st) => (line.style.strokeDashoffset = String(-st.progress * 600)),
      },
    });
    $$('.pcard').forEach((card, i) => {
      const from = { rotate: 6, y: 80, opacity: 0, ease: 'expo.out', duration: 1 };
      // cards already on screen when the pin starts reveal on entry; the rest as they slide in
      if (card.getBoundingClientRect().left - gsap.getProperty(track, 'x') < window.innerWidth * 0.9) {
        gsap.from(card, { ...from, delay: i * 0.12, scrollTrigger: { trigger: '.process', start: 'top 60%' } });
      } else {
        gsap.from(card, { ...from, scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 92%' } });
      }
    });
  });
  mm.add('(max-width: 820px) and (prefers-reduced-motion: no-preference)', () => {
    $$('.pcard').forEach((card) =>
      gsap.from(card, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 88%' } })
    );
  });
}

/* ───────── client cards: tilt + spotlight ───────── */
$$('[data-tilt]').forEach((card) => {
  if (!reduced) {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: card, start: 'top 92%' },
    });
  }
  if (!fine || reduced) return;
  const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
  const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty('--mx', `${x * 100}%`);
    card.style.setProperty('--my', `${y * 100}%`);
    ry((x - 0.5) * 10);
    rx((0.5 - y) * 10);
  });
  card.addEventListener('pointerleave', () => {
    rx(0);
    ry(0);
  });
});

/* ───────── figures ───────── */
$$('.fig b[data-count]').forEach((el) => {
  if (reduced) {
    el.textContent = el.dataset.count;
    return;
  }
  ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => countUp(el, { duration: 1.8 }) });
});

/* ───────── contact form ───────── */
{
  const form = $('.contact__form');
  const status = $('.contact__status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let ok = true;
    for (const id of ['f-name', 'f-phone']) {
      const input = $(`#${id}`);
      const bad = !input.value.trim();
      input.closest('.field').classList.toggle('is-invalid', bad);
      if (bad) ok = false;
    }
    if (!ok) {
      status.textContent = 'Please add your name and a phone number.';
      gsap.fromTo(form, { x: -6 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      return;
    }
    const data = new FormData(form);
    const types = data.getAll('type').join(', ') || '—';
    const body = `Name: ${data.get('name')}\nOrganization: ${data.get('organization') || '—'}\nPhone: ${data.get('phone')}\nProject type: ${types}\n\n${data.get('message') || ''}`;
    // Set data-endpoint (e.g. a Formspree URL) or data-email on the <form> to route submissions.
    const endpoint = form.dataset.endpoint;
    const email = form.dataset.email;
    if (endpoint) {
      status.textContent = 'Sending…';
      try {
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(res.statusText);
        status.textContent = 'Thank you — we will call you back within one business day.';
        form.reset();
      } catch {
        status.textContent = 'Could not send right now. Please call (956) 240-4657.';
      }
    } else if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent('Project inquiry — ' + types)}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Opening your email app…';
    } else {
      status.textContent = 'Online submissions are not connected yet — please call (956) 240-4657.';
    }
  });
}
