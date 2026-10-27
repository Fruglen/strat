# Output & process

## What you deliver

A working design, not a description of one.

- **Default:** a single self-contained HTML file with inline CSS (and minimal JS only where an interaction needs it), so it renders anywhere with no build step.
- **Fully self-contained, loads nothing from an external source.** No CDN scripts or stylesheets, no external fonts (Google Fonts included), no remote images or assets. Inline all CSS and JS, embed fonts as data URIs, and embed or locally reference every asset. The self-check flags any external resource and treats it as a hard block.
- **If the project has a stack or design system:** deliver in that (a React/Vue component, the project's tokens and classes). Honour the existing system over your own choices.
- **Real content throughout.** Never lorem ipsum. If you do not have the copy, write plausible real copy for the actual product.
- Alongside the design, a short **rationale**: the visual direction you chose and why it fits this product (not any product), and the notable guideline and token decisions.

## The mandatory loop (do not skip)

A design is not finished when it is drawn. It is finished when it has passed the checks and the fixes are applied. Order:

1. **Design** the page against `references/guidelines.md`, `references/design-tokens.md`, and `references/anti-ai-look.md`.
2. **Run the tests.** Save the design to a file and run:
   ```
   node scripts/ui-scan.mjs design.html
   ```
   Then run the critique agent (`references/agents/critique.md`) for the judgement checks the script cannot make.
3. **Apply the improvements yourself, before showing anything.** Fix every high and medium finding and every guideline violation the scan or critique raised. Do not present a design with known issues and a note saying "you could improve X"; make the improvement.
4. **Re-run** `ui-scan.mjs` until it exits clean (no high-severity findings) and the critique passes.
5. **Only then present** the design, with its rationale and a one-line note that it passed the guideline self-check.

If a finding genuinely should not be fixed (a deliberate, justified exception), say so explicitly with the reason, rather than leaving it silently unaddressed.

## Presentation

When you present, lead with the design itself. Then the short rationale. Then, briefly, what the self-check covered and anything that still needs a human eye (real-device testing, a screen-reader pass, content review). Never oversell: the scan proves the mechanical rules; taste, hierarchy, and copy are judgement.

## The bar

Before presenting, the design must:

- pass `ui-scan.mjs` with no high-severity findings,
- follow the guidelines in `guidelines.md`,
- use the token discipline in `design-tokens.md`,
- avoid the tells in `anti-ai-look.md`, and
- fail the "could this be any product?" test, it must look like a choice made for this one.
