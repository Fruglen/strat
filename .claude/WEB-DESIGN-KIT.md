# Web design kit

Installed Oct 27, 2026 from the pick list "Website skills and repos for Claude" (Oct 26).

## How it is installed

- **Plugins** are declared in `.claude/settings.json`: 15 GitHub marketplaces under
  `extraKnownMarketplaces` and 27 plugins under `enabledPlugins`. Claude Code fetches them
  from GitHub, so they keep their own scripts and updates.
- **Vendored skills** live in `.claude/skills/`. These are repos with no plugin
  marketplace, or single skills taken out of a bigger pack. Each folder keeps its upstream
  files and LICENSE.

## Default order for a client site

1. Intake: `website-discovery` or `site-brief`
2. Brand match: `extract-design-system` (pulls tokens from the prospect's live site)
3. Direction and build: `impeccable` is the house bar. `frontend-design`,
   `ultimate-frontend-skills`, `nateherk-design:scroll-craft` (motion) and
   `web-designer:web-designer` (award patterns) are the challengers.
4. Anti-slop pass: `anti-slop-design`, `taste-skill:*`, `uxkin:no-ui-slop`
5. Audit before sending: `frontend-design-audit`, `web-design-guidelines`,
   `accessibility-compliance:*`, `webapp-testing` / `openai-playwright`
6. SEO and CRO: `web-design-pack:*` (seo-audit, page-cro, schema-markup, copywriting)
7. Deploy: `openai-cloudflare-deploy`, `deploy-to-vercel`, `openai-netlify-deploy`

## By tier

| Tier | Item | Installed as |
|---|---|---|
| 1 | anthropics/skills | vendored: frontend-design, webapp-testing, theme-factory, canvas-design, web-artifacts-builder |
| 1 | scroll-craft | plugin `nateherk-design@nateherk` |
| 1 | web-designer-plugin | plugin `web-designer@web-designer-marketplace` |
| 1 | ui-ux-pro-max-skill | plugin `ui-ux-pro-max@ui-ux-pro-max-skill` (7 skills) |
| 1 | vercel-labs/agent-skills | vendored: web-design-guidelines, writing-guidelines, deploy-to-vercel, vercel-cli-with-tokens, vercel-optimize, vercel-react-best-practices, vercel-composition-patterns, vercel-react-view-transitions, vercel-react-native-skills |
| 2 | frontend-design-audit | plugin `frontend-design-audit@frontend-design-audit` (+ evaluate, improve, quick) |
| 2 | extract-design-system | vendored |
| 2 | anti-slop-design | plugin `anti-slop-design@anti-slop-design` |
| 2 | looks-expensive | vendored `looks-expensive` (its `looks-expensive-update` skill left out, see below) |
| 2 | ultimate-frontend-skills | plugin `ultimate-frontend-skills@ultimate-frontend-skills` (68 style packs, 23 commands) |
| 2 | 3d-frontend | vendored `3d-frontend` (upstream `3D-frontend.md` renamed to SKILL.md) |
| 2 | mimic | vendored `mimic` |
| 3 | web-design-skills | plugin `web-design-pack@web-design-skills` (17 skills) |
| 3 | premium-saas-web-skill | plugin `premium-saas-web@middlesugar7000` |
| 3 | Web-Pipeline | vendored `web-pipeline` |
| 3 | websitecreationSKILL | vendored `website-discovery` |
| 3 | free-claude-skill-interface-design | vendored `interface-design` |
| 3 | billion-dollar-website-skill | vendored `billion-dollar-website` |
| 3 | design-with-superpowers | vendored `design-with-superpowers` |
| 3 | claude-frontend-template | vendored: impeccable, emil-design-eng, design-motion-principles (its ui-ux-pro-max copy duplicates the plugin, so it was skipped) |
| 4 | TVALOUR website-builder | vendored `tvalour-website-builder` (whole workspace + wrapper SKILL.md) |
| 4 | string-os site-builder | plugin `site-builder@string-os` |
| 4 | agent-site-kit | vendored: site-brief, build-page, seo-research, seo-checkup, site-care |
| 4 | local-business-site-builder | vendored |
| 4 | portfolio-site-builder | vendored |
| 5 | buildwithclaude | plugins: frontend-design-pro, agents-design-experience, uxkin |
| 5 | n-skills | plugin `dev-browser@n-skills` |
| 5 | trailofbits skills-curated | plugins: openai-playwright, openai-screenshot, openai-cloudflare-deploy, openai-netlify-deploy, humanizer |
| 5 | LibreUIUX | plugins: design-mastery, archetypal-alchemy, accessibility-compliance, seo-technical-optimization, seo-content-creation, frontend-mobile-development, vibe-coding |
| 5 | pankaj claude-skills | plugins: taste-skill (13 skills), frontend-slides |
| 5 | awesome-claude-skills, awesome-claude-plugins | lists only, nothing to install |
| 6 | Starter templates | vendored `website-starter-templates/` (3 starters; HTML5 UP linked) |

## Left out on purpose

- Anthropic `skill-creator`, obra/superpowers, JaimeJunr/claude-code-frontend-skills: on the
  pick list's skip list.
- The non-design plugins in the Tier 5 marketplaces (Kubernetes, Python, blockchain, finance
  and so on). Each enabled skill adds to every prompt's context, so only web, design, SEO,
  testing and deploy plugins were enabled. To add one:
  `claude plugin install <plugin>@<marketplace> --scope project`.
- `looks-expensive-update`: it updates itself by piping a remote script into bash
  (`curl ... | bash`).

## Licenses

Most of these are MIT. vercel-labs/agent-skills had no root LICENSE when it was copied, and
HTML5 UP needs attribution (CC BY 3.0). Check a source's license before reusing it
commercially.
