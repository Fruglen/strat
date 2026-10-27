# CAMTEX Engineering — website

A rebuild of camtex-engineering.com as a fast, static, animated 3D site. There's no WordPress, plugins or database to hack.

## Run it

```bash
cd camtex-site
npm install
npm run dev            # local dev server
npm run build          # production site → dist/  (upload this folder to any host)
npm run build:single   # one self-contained HTML file → dist-single/index.html (for previews)
```

Hosting: `dist/` is plain HTML/CSS/JS. It works on Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any web host.

## What's on the page

| Section | What it does |
| --- | --- |
| Preloader | Survey-sheet loader: the logo draws in, the percentage counts up |
| Hero (3D) | three.js scene. It opens on an aerial survey plan where the contour lines scan outward. A cable-stayed bridge then draws as an orange blueprint and is built segment by segment (balanced cantilever, closing at midspan). The street lights come on and traffic starts. Scrolling flies the camera under the deck and past the pylon. |
| Marquee | Service categories. Speed and direction follow your scroll. |
| Statement | Words light up as you scroll |
| Disciplines | 10 rows. Hovering a row draws a small technical drawing that follows the cursor. |
| TxDOT | "17" counter, gauge ring, and the confirmed categories checked off one by one |
| Model Room (3D) | 5 interactive models you can drag to orbit: bridge, interchange, stadium, subdivision, steel frame with a working tower crane. Each one draws as a blueprint, then builds up solid. |
| Process | Pinned horizontal scroll along a dashed "road" with stationing (STA 0+00 → 8+00) |
| Clients | 3D-tilt cards with a cursor spotlight |
| Figures / Contact / Footer | Count-ups, floating-label form, footer laid out like a drawing title block |

Small touches throughout: a crosshair cursor with labels, magnetic buttons, rolling nav links, a live Alton, TX clock, and a scroll-progress readout in roadway stations ("STA 3+55"). It respects `prefers-reduced-motion`, scales down on phones, and pauses rendering when a 3D section is off-screen.

## Content: what was recovered vs. what needs confirming

The old site was offline (DNS not resolving) when this was built. Content came from search-engine snapshots and directory listings.

**Used as-is (from the old site / listings)**
- Civil & structural engineering firm; "Leader in civil & structural engineering"
- Services: surveying, planning, landscape architecture, athletic facility design. Categories: Construction Engineering & Inspection, Traffic & Transportation, Land Development, Public Works
- Landscape architecture: park planning, street beautification / roadway landscape, healthcare outdoor spaces, LEED sustainable design, irrigation design
- "Pre-certified by TxDOT in 17 areas, including virtually all the pertinent construction phase work categories." Named categories: roadway route studies, bridge layouts, roadway & highway design, bridge inspection, hydrologic & hydraulic studies, geotechnical testing
- Alton, TX 78573 · (956) 240-4657 · Mon–Sat 08:00–17:00

**Please confirm or supply**
- [ ] **Logo.** The current mark is a placeholder (a truss "A"). Drop in the real logo.
- [ ] **Full list of the 17 TxDOT categories**, ideally with category numbers
- [ ] **Email address or form service** for the contact form. Set `data-email="..."` or `data-endpoint="https://formspree.io/f/..."` on `<form class="contact__form">` in `index.html`. Until then, the form asks visitors to call.
- [ ] **Street address.** One old page mentioned a Katy, TX office. That may have been a theme placeholder, so confirm it.
- [ ] **Real projects and photos.** The Model Room shows project *types*, not specific jobs. If you have project names, photos or client logos, add a "Selected work" section.
- [ ] **The owner's name, PE license / Texas firm F-number, year founded.** All of these build trust and are worth showing.
- [ ] The client-type list (cities, TxDOT, school districts, parks, healthcare, developers) is inferred from the services. Edit it to match who you actually work for.

## Code map

```
index.html              all page content (edit text here)
src/styles.css          design system: ink / concrete paper / safety orange, Archivo + IBM Plex Mono
src/main.js             scroll (Lenis), GSAP animations, cursor, form
src/icons.js            hover drawings for the disciplines list
src/three/hero.js       procedural terrain, river, cable-stayed bridge, build sequence, camera path
src/three/modelroom.js  the five interactive models
src/three/blueprint.js  shared "draw it as a blueprint" edge shader
```
