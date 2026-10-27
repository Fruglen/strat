# Architecture (standard)

A static, pre-rendered, multilingual React site. No backend. Every page ships complete HTML for crawlers and AI engines, then hydrates.

```
src/data/*  ──►  pages & components  ──►  src/routes.tsx  ──┬─► main.tsx (browser: hydrate)
(bilingual)      (React, Tailwind,                          │
                  framer-motion)                            └─► entry-server.tsx (build: render HTML)
                                                                     │
                                              scripts/prerender.mjs ─┴─► dist/*.html, sitemap.xml, robots.txt,
                                                                          llms.txt, _redirects, _headers
```

## Stack
- Vite, React 19, TypeScript (strict), Tailwind 3, framer-motion (`LazyMotion` + `domAnimation`, `m` components), React Router 7 data router with lazy pages.
- Optional: `d3-geo` + `topojson-client` + `world-atlas` for an impact map; `react-hook-form` for the contact form.
- Python 3 + Pillow for image processing; for languages without spaces, a word-segmentation library (e.g. PyThaiNLP for Thai).
- ESLint + Prettier (with the Tailwind plugin). `@/` alias for `src/`.
- Add dependencies only with the user's OK.

## Folders
```
<site>/
  index.html                 template with <!--seo:start-->…<!--seo:end--> and <div id="root"><!--app--></div>
  functions/index.js         host function for "/" only (language redirect)
  public/                    favicon, og-image.jpg, portrait.jpg, IndexNow key file
  scripts/
    prerender.mjs            render every route × language, write sitemap/robots/llms/_redirects/_headers
    optimize-images.py       originals → WebP (large + small)
    make-brand-images.py     favicon, og-image (1200×630), portrait
    <lang>-words.mjs/.py     (no-space languages) build the no-break word list
    indexnow.mjs             ping IndexNow after a deploy
  src/
    main.tsx                 hydrate or render
    entry-server.tsx         render(url) for the pre-renderer
    routes.tsx               one route table for browser and server; PAGE_PATHS
    pages/                   one file per route
    components/<page>/       components owned by that page
    components/layout/       Navbar, Footer, Layout, LanguageToggle, nav.ts
    components/ui/           LocaleLink, Reveal, SectionHeader, PageHero, KeepWords
    data/                    all content: profile.ts, publications, students, partners, media, gallery…
    i18n/                    LanguageContext, paths.ts, ui.ts (shared UI strings), line-breaking runtime
    seo/                     Head.tsx, RouteHead.tsx (PAGES), schema.ts, facts.ts, serverSchema.ts, site.ts
    lib/                     images.ts (photo(), logo()), credit.ts
    motion/                  (optional) animation clock and helpers
    assets/media/<folder>/   originals (never imported) + SOURCES.md
    assets/web/<folder>/     generated WebP
  docs/                      ARCHITECTURE, SITE_GUIDE, CONTENT-PLAYBOOK, OPERATIONS, DECISIONS, OPEN-ITEMS
research/                    dossier, findings log, questions, sources/
AGENTS.md, CLAUDE.md         agent rules (see project-docs.md)
```

## Languages and URLs
- Every language has a prefix: `/en/…`, `/<l2>/…`. The bare `/` only redirects (host function from `Accept-Language`, with a static picker page as fallback). Crawlers with no preference go to the default language.
- The language is read **from the URL only**, never storage, so server HTML and client agree.
- `x-default` hreflang points to the default language.

`src/i18n/paths.ts`
```ts
import type { Lang } from "./LanguageContext";
const PREFIX = /^\/(en|th)(?=\/|$|\?|#)/; // list your language codes

export function stripLang(pathname: string): string {
    const rest = pathname.replace(PREFIX, "");
    return rest === "" || rest.startsWith("?") || rest.startsWith("#") ? `/${rest}` : rest;
}
export function langFromPath(pathname: string): Lang {
    return pathname === "/th" || pathname.startsWith("/th/") ? "th" : "en";
}
export function localizePath(to: string, lang: Lang): string {
    if (!to.startsWith("/") || to.startsWith("//")) return to;
    const base = stripLang(to);
    if (base === "/") return `/${lang}`;
    if (base.startsWith("/?") || base.startsWith("/#")) return `/${lang}${base.slice(1)}`;
    return `/${lang}${base}`;
}
```

`src/i18n/LanguageContext.tsx` (core)
```tsx
export type Lang = "en" | "th";
export type L10n = { en: string; th: string };

export function LanguageProvider({ children }: { children: ReactNode }) {
    const { pathname, search, hash } = useLocation();
    const navigate = useNavigate();
    const lang = langFromPath(pathname);
    const setLang = useCallback((next: Lang) => {
        if (next !== lang) navigate(localizePath(pathname, next) + search + hash, { preventScrollReset: true });
    }, [lang, navigate, pathname, search, hash]);
    const t = useCallback((v: L10n | string) => (typeof v === "string" ? v : v[lang] || v.en), [lang]);
    const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
```
Every visible string: `t({ en: "…", th: "…" })`. Shared UI strings live in `i18n/ui.ts`.

`src/components/ui/LocaleLink.tsx`: drop-in `Link`/`NavLink` that call `localizePath(to, lang)`. **All internal links use these**, written as plain paths (`/research`).

## Routes
```tsx
export const PAGE_PATHS = ["/", "/about", "/research", "/contact" /* … */];
const pageChildren: RouteObject[] = [
    { index: true, element: <Home /> },
    { path: "about", element: <About /> },          // lazy() for every page except Home
    { path: "*", element: <NotFound /> },
];
export const routes: RouteObject[] = [
    { path: "/old-address", element: <Navigate to="/en/about" replace /> }, // old site URLs
    { index: true, element: <LanguageRedirect /> },                         // "/" in dev
    { element: <Layout />, children: [                                      // ONE layout above all languages
        { path: "/th", children: pageChildren },
        { path: "/en", children: pageChildren },
        { path: "*", element: <NotFound /> },
    ] },
];
```
One `Layout` above every language keeps the header mounted when switching language.

## Pre-rendering
`npm run build` = `tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs`

`entry-server.tsx` exports `render(url)`:
```tsx
const handler = createStaticHandler(routes);
const context = await handler.query(new Request(`http://localhost${url}`));
const router = createStaticRouter(handler.dataRoutes, context);
const store = new HeadStore();
const { prelude } = await prerenderToNodeStream(   // react-dom/static: waits for lazy pages
    <StrictMode><HeadProvider store={store}>
        <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user">
            <StaticRouterProvider router={router} context={context} />
        </MotionConfig></LazyMotion>
    </HeadProvider></StrictMode>);
return { html: await streamToString(prelude), head: headToHtml(store.data!) };
```
It also re-exports the data the pre-renderer needs (`PAGE_PATHS`, `facts`, `PAGES`, profile data) so `llms.txt` is built from the same data the pages show.

`scripts/prerender.mjs`:
1. For every path × language: `render(url)`, inject HTML into `<!--app-->`, head into the SEO markers, set `<html lang>`.
2. Write **flat files** (`en/about.html`): static hosts serve `/en/about` from them (clean URLs).
3. Write `404.html` per language (served with status 404).
4. Replace `dist/index.html` with a tiny `noindex` language picker (script redirect + two links).
5. `sitemap.xml` with hreflang alternates; `lastmod` = last git commit touching the page's sources (not the build date).
6. `robots.txt` (allow all, sitemap line), `llms.txt`, `_redirects` (old URLs and unprefixed URLs → default language, 301), `_headers` (immutable cache on `/assets/*`, security headers, `X-Robots-Tag: noindex` on the host's preview domains).
7. Delete `dist-ssr/`.

`main.tsx`: `hydrateRoot` when `#root` has children, else `createRoot` (dev).

**Hydration rules**
- No `window`, `document`, `localStorage`, `navigator`, `Date.now()` or random values in render or `useState` initializers.
- URL-query state (`?topic=`) is applied in an effect after mount.
- Counters render the real number first; any count-up animation starts after mount.

## Head / SEO layer
- `Head.tsx`: a `HeadStore` collects head data on the server; `headToHtml` escapes every value and marks tags `data-seo`; in the browser, later navigations replace `[data-seo]` tags. On first load, keep the pre-rendered head (it may contain server-only JSON-LD).
- `RouteHead.tsx` (rendered by `Layout`): `PAGES` maps each path to bilingual title, description and breadcrumb name; adds canonical, hreflang, Open Graph/Twitter and per-page JSON-LD; unknown paths get `noindex` and no canonical.
- `serverSchema.ts`: large JSON-LD (publication lists) imported only by `entry-server.tsx`, so the data stays out of the browser bundle.
- `site.ts`: `SITE_URL` from `VITE_SITE_URL` with the real domain as default.
Details: `seo-aeo.md`.

## Language switch at "/" (Cloudflare Pages Function)
```js
// functions/index.js — runs only for "/"
function preferred(header) { /* highest-q language tag from Accept-Language */ }
export function onRequest({ request }) {
    const url = new URL(request.url);
    const lang = preferred(request.headers.get("Accept-Language")).startsWith("th") ? "th" : "en";
    return new Response(null, { status: 302, headers: {
        Location: `${url.origin}/${lang}${url.search}`, Vary: "Accept-Language", "Cache-Control": "private, no-store" } });
}
```

## Content data
- All copy and facts live in `src/data/*.ts|json`, typed, bilingual (`L10n`), with a comment naming the research source.
- Flags in data: `unconfirmed: true` (hidden), `licensed: false` (photo hidden), `highlight: true` (national-level awards only).
- Derived helpers (counts, analytics, citation formats) in separate files so numbers come from one place. Search the code for an old number before changing it.

## Images
- Originals in `src/assets/media/<folder>/` (portraits, awards, events, work, logos…), never imported, credited in `SOURCES.md`.
- `npm run images` → `src/assets/web/<folder>/<name>.webp` (≈1800 px) and `<name>-sm.webp` (≈720 px).
- `photo("folder/name")` → `{ full, small }`; `logo(file)`.
- `gallery.ts`: every photo with bilingual caption, credit, category, `licensed`, `position` (focal point for crops), optional year. Pages use only `livePhotos` (licensed).
- `credit.ts`: rule for when a credit line is shown (e.g. hidden on the person's own photos, shown for institutions, partners and stock that requires attribution).

## Contact form
Static form service (e.g. FormSubmit AJAX endpoint, using its anonymised address, not the raw email), honeypot field, topic picker from Question 2, `mailto:` fallback on error. The endpoint and recipient are private: keep them in the project, never in shared docs or skills.

## Hosting
Cloudflare Pages, free plan: root dir `<site>`, build `npm run build`, output `dist`, env `NODE_VERSION=22`, `VITE_SITE_URL=https://<domain>`. See `operations.md`.
