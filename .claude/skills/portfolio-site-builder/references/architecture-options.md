# Architecture options (opt-in only)

Read this only after the user says yes to architecture suggestions in Phase 2. The standard architecture (`architecture.md`) is the default and is proven in production; offer a change only when an intake answer calls for it. Present at most three options, each with what it costs and what it gains, and let the user choose. Record the choice in DECISIONS.

| Intake signal | Option | Gain | Cost |
|---|---|---|---|
| Q10: the person who maintains it doesn't code | Move copy into Markdown/MDX or JSON content files with a schema check at build, or add a git-based CMS (e.g. Decap, Tina) over those files | Edits without touching TSX; preview deploys per change | One more layer to set up; the CMS login lives with the owner |
| Q3: one language only | Drop the language prefix, `hreflang` and the redirect function; keep `t()` out | Simpler routing and build | Adding a language later means URL changes and redirects |
| Q3: three or more languages | Generate `Lang` and prefixes from one config; store copy as `{ [lang]: string }` with a build check that fails on a missing translation | No forgotten strings | Slightly more tooling |
| Q5: very large publication list (thousands) | Paginate or split the explorer by year into static pages; keep full lists server-only in JSON-LD | Faster pages | More pages to pre-render |
| Q5: frequent news | A `news/` content folder with one file per item, rendered to dated pages and an RSS feed | Easy posting; fresh signals for search | Needs a short posting recipe |
| Q10: the user prefers a framework | Astro or Next.js static export instead of the custom pre-renderer | Built-in SSG, image and i18n helpers | Migration of the patterns in this skill; re-verify hydration, URLs and SEO output |
| Q10: no custom domain yet | Start on `<project>.pages.dev` but set `VITE_SITE_URL` and canonical to the final domain only when it exists; do not submit the preview domain to search | Launch now | One re-submission later |
| Q2: needs a booking or enquiry flow | Keep the static site; link a hosted scheduler or form service instead of adding a backend | Stays free and static | Third-party dependency |

Never propose a parallel redesign. Options change how the site is built or edited, not a second visual direction.
