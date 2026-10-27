# Intake: the 10 questions

Ask all ten in one message, numbered, each with its one-line "why". Short answers are fine. Save the answers verbatim in `docs/INTAKE.md`, then turn them into rules in `AGENTS.md` and rows in `docs/DECISIONS.md` (owner, date).

Questions 1, 2, 4 and 6 must be answered before research starts. The rest can follow.

---

**1. Who is the site about, and who is building it?**
Full name in every form and language (formal, short, in citations, older spellings), titles, how they want to be addressed (and any form of address they dislike). How you are related to them, whether they know about the site, and who approves facts and wording.
*Why: name forms drive the copy, page titles and structured data; the approver settles every disputed fact.*
→ Records: `AGENTS.md` naming rule; JSON-LD `name` / `alternateName`; DECISIONS.

**2. What is the site for, and who should it reach?**
The top 2–3 audiences and the one action each should take. Anything the site must **not** offer or invite (services someone else provides, topics with a conflict of interest).
*Why: sets the calls to action and the contact topics, and stops copy that promises the wrong thing.*
→ Records: CTA rules in `AGENTS.md`; contact-form topics.

**3. Which languages, and which comes first?**
Full versions or summaries? The register for each (formal institutional, plain, warm). Calendar and number conventions (e.g. a local era for years in prose).
*Why: decides language-prefixed URLs, hreflang, fonts and line-breaking work. Very expensive to add later.*
→ Records: `Lang` type, URL prefixes, fonts, the default for `/`.

**4. Where do the facts come from?**
Every existing source: CV (attach it), institution profile pages, ORCID / Google Scholar / Scopus / Semantic Scholar IDs, LinkedIn, personal or lab pages (old ones too), news, award pages, social pages. May I research the open web? What counts as enough proof (is the CV alone enough for a listing)?
*Why: sets up the research pipeline and the confidence markers.*
→ Records: `research/sources/profiles.md`; the ✅ / 🟡 / ❓ policy.

**5. What pages and features do you picture?**
For example: about, research or work, publications, teaching, leadership roles, team or students, partners, media, awards, gallery, join or hire, contact. Rank them; say which can wait.
*Why: sets the page list, navigation and build order.*
→ Records: `PAGE_PATHS`; chosen and not-chosen features in DECISIONS.

**6. What must never appear?**
Private details, people or organisations to leave out or keep low-key, past roles, products or projects to mention only plainly, links to remove, honours they prefer not to list. For students and co-workers: what may be shown?
*Why: privacy and relationships; mistakes here are the costliest to undo once indexed.*
→ Records: the privacy section of `AGENTS.md`; DECISIONS.

**7. How should it sound and feel?**
Modest or bold, formal or warm. Words or claims to avoid. Is anything playful allowed (illustrations, animated characters), and on which pages?
*Why: sets the copy tone and where any playful elements may appear.*
→ Records: copy-tone rule; the casual-pages list.

**8. What should it look like?**
Brand colours to follow (institution, personal), 2–3 sites they like and one they don't. Which photos exist, who owns them, and any photo rules (credits, cropping, who may appear, one photo per event).
*Why: sets design tokens and the photo licence rules.*
→ Records: Tailwind tokens; `gallery.ts` `licensed` policy; photo rules in `AGENTS.md`.

**9. When someone asks a search engine or an AI assistant about this person, what should the answer say?**
The 3–5 facts that must come up, and the phrases people search for, in each language (including misspellings and older titles).
*Why: drives the answer-first facts block, FAQ structured data, `llms.txt` and page descriptions.*
→ Records: `src/seo/facts.ts`; search-terms list in `docs/OPERATIONS.md`.

**10. Domain, hosting, budget and upkeep?**
Is there a domain (and who holds its DNS)? Must it stay free? Who updates the site after launch, how often, and how comfortable are they with code? Any old site whose URLs must keep working?
*Why: decides the host, the editing model and the redirects.*
→ Records: `docs/OPERATIONS.md`; `_redirects`; whether to offer `architecture-options.md`.

---

## After the answers
- Read the answers back as a short list of rules and ask for corrections.
- Turn every "never" into a rule in `AGENTS.md` before writing any copy.
- Gaps become entries in the questions file, not guesses.
