#!/usr/bin/env node
// Interface Design — guideline self-check. Zero dependencies, Node 18+.
//
// Run this on the design you just generated (an HTML file or a URL) to catch the
// mechanical guideline violations and the tell-tale "AI look" before you ship.
// It cannot judge taste, hierarchy, or whether the layout is good, that stays
// human. It DOES prove the checkable rules: visible focus, reduced-motion,
// zoom not disabled, semantic interactive elements, no layout-shift images, a
// disciplined palette and type scale, and the common AI-default giveaways.
//
// Usage:
//   node ui-scan.mjs design.html
//   node ui-scan.mjs https://example.com
//
// Exit 1 if any high-severity guideline is violated.

import { readFileSync } from 'node:fs'

const arg = process.argv[2]
if (!arg) { console.error('Usage: node ui-scan.mjs <file.html | https://url>'); process.exit(2) }

let html
if (/^https?:\/\//i.test(arg)) {
  html = await fetch(arg, { headers: { 'user-agent': 'CreativeDeals-interface-design/1.0' } }).then(r => r.text()).catch(e => { console.error('fetch failed:', e.message); process.exit(2) })
} else html = readFileSync(arg, 'utf8')

// CSS corpus = <style> blocks + inline style attributes
const styleBlocks = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n')
const inlineStyles = [...html.matchAll(/\bstyle\s*=\s*("([^"]*)"|'([^']*)')/gi)].map(m => m[2] ?? m[3]).join(';')
const css = styleBlocks + '\n' + inlineStyles
const lc = html.toLowerCase()

const flags = []
const flag = (sev, msg) => flags.push({ sev, msg })
const note = []

// 1. visible focus
const outlineKilled = /outline\s*:\s*(none|0(px)?)\b/i.test(css)
const hasFocusVisible = /:focus-visible/i.test(css) || /:focus\b[^{]*\{[^}]*(outline|box-shadow|border)/i.test(css)
if (outlineKilled && !hasFocusVisible) flag('high', 'Focus outline removed without a :focus-visible replacement (keyboard users lose the focus ring)')

// 2. reduced motion
const hasMotion = /(transition\s*:|animation\s*:|@keyframes|framer-motion|animate=)/i.test(css + html)
const hasReducedMotion = /prefers-reduced-motion/i.test(css)
if (hasMotion && !hasReducedMotion) flag('med', 'Animations/transitions present but no prefers-reduced-motion variant')

// 3. zoom disabled
const viewport = (html.match(/<meta[^>]*name\s*=\s*["']viewport["'][^>]*>/i) || [''])[0]
if (/user-scalable\s*=\s*no|maximum-scale\s*=\s*1\b/i.test(viewport)) flag('high', 'Browser zoom disabled in the viewport meta (accessibility failure)')
if (!viewport) flag('high', 'No viewport meta (not responsive on mobile)')

// 4. transition: all
if (/transition\s*:\s*all\b|transition-property\s*:\s*all\b/i.test(css)) flag('low', 'Uses transition: all (list the exact properties instead)')

// 5. non-semantic interactive elements
let nonSemantic = 0
for (const m of html.matchAll(/<(div|span)\b([^>]*)>/gi)) {
  const a = m[2] || ''
  if (/\bon click\b/i.test(a.replace(/onclick/i, 'on click')) || /\bonclick\b/i.test(a) || /role\s*=\s*["']button["']/i.test(a)) nonSemantic++
}
if (nonSemantic) flag('med', `${nonSemantic} <div>/<span> used as a button (use <button> or <a> for real affordance and keyboard support)`)

// 6. images without dimensions (CLS)
const imgs = html.match(/<img\b[^>]*>/gi) || []
const imgNoDims = imgs.filter(t => !/\bwidth\s*=/i.test(t) || !/\bheight\s*=/i.test(t)).length
if (imgNoDims) flag('med', `${imgNoDims}/${imgs.length} images without width/height (causes layout shift)`)

// 7. palette + type-scale discipline
const colors = new Set((css.match(/#[0-9a-fA-F]{3,8}\b/g) || []).map(c => c.toLowerCase()))
if (colors.size > 24) flag('low', `${colors.size} distinct hex colours (a disciplined palette is usually far fewer; use tokens)`)
const fontSizes = new Set((css.match(/font-size\s*:\s*[^;}]+/gi) || []).map(s => s.replace(/\s+/g, '').toLowerCase()))
if (fontSizes.size > 12) flag('low', `${fontSizes.size} distinct font-size values (use a type scale, not magic numbers)`)

// 8. AI-look giveaways
const aiPurple = /#(6366f1|818cf8|8b5cf6|a855f7|7c3aed|4f46e5)\b/i.test(css) || /\b(indigo|violet)-(4|5|6)00\b/i.test(html)
const gradients = (css.match(/linear-gradient|radial-gradient/gi) || []).length
const bigRadius = (css.match(/border-radius\s*:\s*(1[6-9]|[2-9]\d)px|rounded-(2xl|3xl|full)/gi) || []).length
const lorem = /lorem ipsum|dolor sit amet/i.test(lc)
if (lorem) flag('med', 'Lorem ipsum placeholder text shipped (write real copy)')
if (aiPurple && gradients >= 2) note.push('Indigo/violet accent plus multiple gradients: the most common AI-generated look. Make sure this is a deliberate brand choice, not a default.')
else if (aiPurple) note.push('Indigo/violet accent detected: fine if it is the real brand, a default AI palette if not.')
if (bigRadius >= 6) note.push(`${bigRadius} large/rounded radii: check this is intentional, not "round everything".`)
if (gradients >= 4) note.push(`${gradients} gradients: heavy gradient use reads as AI-generated; prefer flat or subtle.`)

// 9. structure
const h1 = (html.match(/<h1\b/gi) || []).length
if (h1 === 0) flag('med', 'No <h1> (every page needs one clear title)')
else if (h1 > 1) flag('low', `${h1} <h1> elements (expected one)`)
if (!/<main\b/i.test(html)) flag('low', 'No <main> landmark (add semantic landmarks: header, nav, main, footer)')

// 10. self-contained: no external resources (only for a local design file, not a live URL)
if (!/^https?:\/\//i.test(arg)) {
  const ext = []
  const push = (kind, u, sev) => { if (/^https?:\/\//i.test(u)) ext.push({ kind, u, sev }) }
  for (const m of html.matchAll(/<link\b[^>]*\bhref\s*=\s*("([^"]*)"|'([^']*)')/gi)) {
    if (!/rel\s*=\s*["']?canonical/i.test(m[0])) push('link', m[2] ?? m[3], 'high')
  }
  for (const m of html.matchAll(/<script\b[^>]*\bsrc\s*=\s*("([^"]*)"|'([^']*)')/gi)) push('script', m[2] ?? m[3], 'high')
  for (const m of css.matchAll(/@import\s+(?:url\()?\s*["']?(https?:\/\/[^"')\s]+)/gi)) push('@import', m[1], 'high')
  for (const m of css.matchAll(/@font-face[\s\S]*?url\(\s*["']?(https?:\/\/[^"')\s]+)/gi)) push('font', m[1], 'high')
  for (const m of css.matchAll(/url\(\s*["']?(https?:\/\/[^"')\s]+)/gi)) push('css-url', m[1], 'med')
  for (const m of html.matchAll(/<img\b[^>]*\bsrc\s*=\s*("([^"]*)"|'([^']*)')/gi)) push('img', m[2] ?? m[3], 'med')
  for (const m of html.matchAll(/<iframe\b[^>]*\bsrc\s*=\s*("([^"]*)"|'([^']*)')/gi)) push('iframe', m[2] ?? m[3], 'med')
  if (ext.length) {
    const worst = ext.some(e => e.sev === 'high') ? 'high' : 'med'
    const sample = [...new Set(ext.map(e => `${e.kind}: ${e.u.slice(0, 60)}`))].slice(0, 5)
    flag(worst, `${ext.length} external resource(s) loaded, the design must be self-contained: inline CSS/JS, embed fonts as data URIs, keep assets local (${sample.join('; ')})`)
  }
}

// ── report ───────────────────────────────────────────────────────────────────
console.log(`Interface guideline self-check — ${arg}\n`)
if (!flags.length && !note.length) {
  console.log('No mechanical guideline violations found. Now judge the parts a script cannot: hierarchy, spacing rhythm, copy, and whether it actually looks intentional.')
  process.exit(0)
}
const order = { high: 0, med: 1, low: 2 }
for (const f of flags.sort((a, b) => order[a.sev] - order[b.sev])) console.log(`  [${f.sev.toUpperCase().padEnd(4)}] ${f.msg}`)
if (note.length) { console.log('\n  AI-look checks (judge, not fail):'); for (const n of note) console.log(`   - ${n}`) }
console.log('\nA clean scan proves the checkable rules only. Taste, hierarchy, and layout still need human judgement.')
process.exit(flags.some(f => f.sev === 'high') ? 1 : 0)
