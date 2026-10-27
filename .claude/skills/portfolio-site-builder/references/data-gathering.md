# Gathering and verifying data

How to find every fact and photo for the site, check it, and file it so any agent can reuse it.

## Ground rules
- **Read-only.** No logins, no form submissions, no account creation, no messages to anyone. Public pages, catalogue searches and public APIs only.
- **Every claim gets a URL (or a named document) and the date you checked it.**
- **The person's own documents** (CV, slides, award certificates) are valid sources; mark claims backed only by them as 🟡.
- **Never transliterate a name** when the person's own published spelling can be found. Search their papers, thesis records and bilingual author fields first.
- **Record what you searched and found nothing.** "Searched, nothing found" saves the next agent hours and is not proof that nothing exists.
- **Log where a source blocked you** (login wall, offline, rate limit) and how far you got.
- Files you download go into `research/sources/<topic>/`, never into the app's source tree until approved.

## Confidence markers
| Marker | Meaning | On the site |
|---|---|---|
| ✅ | Confirmed by a source other than the person's own CV (awarding body, institution, partner, publisher) | Yes |
| 🟡 | Only in the CV or a single secondary source | Yes, worded modestly ("lists", "according to") |
| ❓ | Uncertain, conflicting or unconfirmed | **No.** Hide it (`unconfirmed: true` in data), add it to the questions file |

## Sources and methods, by topic

### Identity, titles and current roles
- **Institution pages:** official staff/administrator directories, department faculty pages, institute profile pages (often the best bilingual bio). Check both language versions; they differ.
- **Research-unit or lab registries** at the institution.
- **Government or funder announcements** (official gazettes, research council news) for appointments and title changes with dates.
- **Old personal or lab sites:** often offline. Try the live URL, then the Wayback Machine (`web.archive.org/web/*/<url>`), then search-engine caches. Note the title the old page used; titles change over time.
- **Journal editorial-board pages** for editor roles.
- Note **how titles change over time** (e.g. assistant → associate → full professor) so older press is not "corrected" wrongly.

### Publications and metrics
- **Crossref API:** `https://api.crossref.org/works?query.author=<Surname>&sort=published&order=desc&rows=100` (filter by affiliation/co-authors to avoid namesakes).
- **OpenAlex:** `https://api.openalex.org/authors?search=<name>` then `https://api.openalex.org/works?filter=author.id:<id>&sort=publication_date:desc&per-page=200`.
- **ORCID public API:** `https://pub.orcid.org/v3.0/<orcid>/works` (Accept: application/json).
- **Semantic Scholar:** `https://api.semanticscholar.org/graph/v1/author/search?query=<name>`; there may be several author IDs for one person.
- **Google Scholar profile:** no API; read the public profile page for citations, h-index, i10 and record the date (these change monthly).
- **Scopus / Web of Science:** cite the public author page if available; do not log in.
- **The CV** for the authoritative list and the author role (first, corresponding, co-author).
- Reconcile counts: journal papers vs conference papers vs all works; say which count the site shows and keep it consistent everywhere ("80+ journal papers", not "80 papers").
- Store the list as data (`academicWorks.json`), newest first, with DOI, year, venue, authors and role.

### Students and team
- **National thesis catalogues** (for Thailand: ThaiLIS Digital Collection) browsed by advisor/contributor name, in every spelling.
- **University graduate-school news and repository** for theses and names in both languages.
- In thesis records, the first-listed advisor is usually the main advisor; record main vs co-advisor and how you decided.
- Compare counts with the CV and explain differences.
- Show **name, degree, year and thesis title only**. No current jobs, photos or contact details unless the owner says otherwise.

### Awards
- **Awarding bodies' announcements** (often scanned PDFs: OCR them and quote the exact award name in the original language).
- **Institution research-news posts** and faculty social pages for photos of the ceremony.
- Record for each: year (both calendars if relevant), exact name, giver, level (international / national / association / university / faculty), what it was for, team or personal, source, photo and its licence.
- Leave out anything the person asked to exclude (Question 6). Don't list excluded items in user-facing summaries either.

### Partners and collaborations
- Partner organisations' official sites (what the public record says about the relationship), signed agreements (MoUs) announced by either side, co-authored papers (count co-authorships via Crossref/OpenAlex).
- Partners listed only in the CV may be shown if the owner accepts the CV as enough; otherwise ❓.
- **Logos:** from the partner's official site (prefer SVG), or its archived site; note the source in the photo/logo sources file. No logo → text only.

### Media, talks and press
- National and regional news sites, searched in every language and name spelling (and older titles). Open every item; mark unverified ones.
- Institution news, research-news tags, radio/TV units of the institution.
- YouTube and conference sites for talks; confirm the person actually appears before embedding.
- Mark the best 10 for a "Media" section; duplicates of the same press release count once.

### Admissions or "work with me" pages
Official program and admission pages only: program names and codes, steps, requirements, rounds and fees, language rules. Never state an "official step" that the official page doesn't state.

### Photos
- Ask the person/owner first for their own photos and official portraits.
- **Institution and funder sites** (award ceremonies, official portraits): note owner and URL.
- **The person's or their group's public social pages**, with the owner's approval:
  - use a headless browser, logged out, desktop user agent;
  - album grids show few items without login, but single photo pages usually work and have "next photo": walk albums from their first photo;
  - save the largest image with the post date and any visible caption;
  - expect a login wall after a few thousand pages: do the best albums first and log where you stopped.
- **Licensed stock** (Unsplash, Pexels, Wikimedia) only for generic subjects; caption it honestly (never imply it shows the person's own work).
- Log every photo in `src/assets/media/SOURCES.md`: file, source page, original URL, owner, licence, approved or not.
- Don't use photos where someone else (including the site owner) is the main subject, group photos of unnamed people without approval, or anything showing private life the person didn't choose to share.

## Filing the research
1. One **source report** per topic in `research/sources/<topic>.md`: scope and date at the top, method, a table with a URL per claim, "searched, nothing found", "blocked".
2. Roll verified facts into **`PROFILE-DOSSIER.md`**, numbered sections, with markers.
3. Every correction, conflict or wording decision goes into **`FINDINGS-LOG.md`** (what was said, what the source supports, what the site now says, source).
4. Every unanswered item goes into **`QUESTIONS-FOR-<PERSON>.md`**, grouped, each with "what changes on the site once answered".
5. Update **`research/README.md`** (the index) whenever a file is added.

## Wording rules that come out of research
1. Joint work stays joint: name the partners; "led", "co-developed", "with".
2. Estimates are estimates.
3. Use the source's meaning of a number.
4. No unsourced superlatives.
5. Count the right thing (theses vs students, journal vs all papers).
6. Current vs past: ended roles show dates; nothing is "current" without a current source.
7. The second language is never stronger than the first.
8. Captions describe what the photo shows, not what you assume.
9. Unconfirmed items are hidden, not deleted.
