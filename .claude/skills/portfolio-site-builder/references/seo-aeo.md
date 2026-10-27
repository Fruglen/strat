# SEO and AEO (answer engines)

Top priority: when anyone asks a search engine or an AI assistant about the person, the answer should come from this site, in the right language, with the right facts.

## Per page
- Pre-rendered HTML with the real content (no empty SPA shell).
- One `<h1>`; ordered `h2`/`h3`; answer-first opening sentences that name the person.
- `PAGES` in `src/seo/RouteHead.tsx`: bilingual `title` ("Topic | Full Name"), `description` (150–160 chars, facts not adjectives), breadcrumb name. A new page is added to `PAGE_PATHS` **and** `PAGES`.
- Canonical to itself; `hreflang` for each language plus `x-default`; `<html lang>` set per page.
- Open Graph and Twitter tags, `og:locale` + alternate, a 1200×630 `og-image.jpg` with alt text.
- Unknown paths: `noindex`, no canonical, real 404 status.

## Structured data (JSON-LD, `src/seo/schema.ts`)
| Type | Where |
|---|---|
| `Person` (name, `alternateName` for every name form, jobTitle, affiliation, alumniOf, award, knowsAbout, image, `sameAs` = ORCID, Scholar, Scopus, institution profile, official social pages) | Home, About |
| `WebSite`, `ProfilePage` | Home, About |
| `Organization` / `ResearchOrganization` (the person's group) | Team, Research |
| `FAQPage` from the visible facts | About, Join |
| `BreadcrumbList` | Every inner page |
| `ItemList` of `ScholarlyArticle` (from `serverSchema.ts`, server-only) | Research, theme pages |
| `ItemList` of partner organisations | Collaborations |
| `ContactPage` | Contact |

Structured data must match visible content. Never add facts to JSON-LD that the page doesn't show.

## Answer-first facts (`src/seo/facts.ts`)
- 6–10 bilingual Q&A pairs from Question 9 ("Who is…?", "What is their role at…?", "What is their main work?", "What awards…?", "How many papers…?", "How to contact / apply…?").
- Each answer opens with a complete sentence naming the person, so it can be quoted alone; numbers carry their date and source.
- Shown **visibly** on About (a "Quick facts" block); the same data feeds FAQPage JSON-LD and `llms.txt`. Don't remove the visible block.

## Files written at build
- `sitemap.xml`: every page × language, `xhtml:link` alternates, honest `lastmod` (git), no priority/changefreq.
- `robots.txt`: allow all, sitemap line. Whether to opt out of AI training is the owner's decision; don't block AI crawlers by default.
- `llms.txt` (llmstxt.org): name forms, the facts in each language, timeline, awards, page list with descriptions, profile links. Built from the same data as the pages.
- `_redirects`: old-site URLs and unprefixed URLs → default language (301).
- `_headers`: `X-Robots-Tag: noindex` on the host's preview domains so only the real domain is indexed.

## Search terms (fill in from Question 9, keep in `docs/OPERATIONS.md`)
Group by intent and map each group to a page: the name (every spelling, older titles, common misspellings), current role, awards, research topics, students/admissions, partners and press, contact. Check them monthly in Search Console.

## Off-site
- Google Search Console (Domain property via DNS TXT; keep the record forever), submit the sitemap, request indexing for the language home pages.
- Bing Webmaster Tools ("import from Google Search Console"); Bing feeds several AI assistants.
- IndexNow key file in `public/` + `npm run indexnow` after each deploy.
- Ask the institution to link to the site (profile pages, old personal page); institutional links matter most.
- Update `sameAs` profiles (ORCID, Scholar) to link back to the site.
