# QA, launch and operations

## QA checklist (before launch and after every change)
- `npm run build` and `npm run lint`: 0 errors. After second-language text changes, regenerate the no-break word list; after new photos, `npm run images`.
- Serve `dist/` (e.g. `npx serve dist`), not the dev server. Check changed pages in every language at 320, 375, 768 and 1280 px: no sideways scroll, no clipped text.
- Console: no errors, no hydration warnings.
- View source: the heading and main copy are in the HTML; the head has title, description, canonical, hreflang, JSON-LD.
- Keyboard only: every control reachable, visible focus, dialogs trap and return focus, Escape works.
- Reduced motion on: nothing animates that shouldn't.
- Lighthouse (mobile): performance, accessibility, best practices, SEO. Usual fixes: size logos and images, lazy-load the map, preload the hero image, split heavy data out of the browser bundle.
- Validate structured data (Rich Results Test) on Home, About and one list page.
- Re-check facts on changed pages against the dossier.
- Ask a reviewer pass for design (hierarchy, spacing, consistency), SEO/AEO, performance/accessibility and mobile, and record findings in `research/*-REVIEW.md` or `*-AUDIT.md`.

## Launch (Cloudflare Pages, free)
1. Push the repo to GitHub (private is fine). Ask the user before creating anything on their accounts.
2. Cloudflare → Workers & Pages → Create → Pages → connect the repo. Production branch: the branch the user chooses. Root dir: the site folder; build `npm run build`; output `dist`; env `NODE_VERSION=22`, `VITE_SITE_URL=https://<domain>`.
3. Custom domain: add it in the Pages project. If DNS stays at the registrar, add a `CNAME <sub> → <project>.pages.dev` there. HTTPS is issued automatically.
4. Check: `/` redirects to a language (302), old URLs give 301, unknown pages 404, `robots.txt` allows all, `*.pages.dev` sends `X-Robots-Tag: noindex`.
5. Search Console (Domain property via TXT record), submit `sitemap.xml`, request indexing for each language's home page. Bing Webmaster Tools. `npm run indexnow`.

```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://<domain>/
```

## Staying free
- Static files: unlimited requests and bandwidth. Limits: 20,000 files per deploy, 25 MB per file, 500 builds a month (every push to any branch builds; push in batches). Functions: 100,000 requests a day; only `/` uses one; set it to fail open.
- The free plan has no billing; going over a limit fails requests, it never charges. Never add a payment method or upgrade without the owner.
- Other costs: the domain renewal (keep auto-renew on). Form service, Search Console, Bing and IndexNow are free.
- Fallback if the function is a problem: delete it; the static picker page does the same job.

## Publishing
1. Build, lint, check (above).
2. Before pushing: `git status` and `git log origin/<prod>..HEAD`. If several agent sessions work in the folder, build the exact commit in a clean `git worktree` first.
3. Push to the production branch only with the user's OK; every push is live in about a minute. Other branches get preview URLs.
4. After it's live: `npm run indexnow` (or with specific paths); URL Inspection → Request indexing for an important page.
5. Roll back: Pages project → Deployments → last good one → Rollback. Then fix and push.

## Routine
- **After every push:** the host's build check is green; open the changed page live; run IndexNow.
- **Monthly (10 min):** latest deployment succeeded; Search Console queries and indexing; send one test message through the contact form (form services can stop silently).
- **Yearly refresh (write it into `CONTENT-PLAYBOOK.md` with exact files):** citation metrics and their "as of" date (search the code for every copy of the old number), new papers (Crossref/OpenAlex query), role changes (institution directory), new awards, students, partner numbers.

## `docs/OPERATIONS.md` must record
What is live (domain, host project, repo, production branch, build settings, env vars, DNS records, verification records that must never be deleted), how to publish and roll back, free-plan limits vs the site's size, search tools and the search-terms list, routine checks, and still-to-do items.
