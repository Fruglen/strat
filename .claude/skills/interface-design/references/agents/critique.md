# Agent — Critique (adversarial self-check)

Paste as a subagent prompt. Runs on the built design, before it is presented. It must be a **different** agent than the one that built it: a builder rationalises its own choices. Its findings are then fixed by the builder and re-checked; nothing is presented with known issues. Read `references/anti-ai-look.md`, `references/guidelines.md`, and `references/design-tokens.md` first.

**Design (saved to a file):** {{design_path}}

**Your task**

1. **Run the scan.** `node scripts/ui-scan.mjs <design_path>`. Report every finding; the high-severity ones are hard blocks.
2. **Hunt the AI look.** Go through `anti-ai-look.md`: default indigo/gradient/round-everything, stock card grid, generic hero, uniform padding, safe-font-plus-centred-everything, lorem ipsum. For each present, say where and what to replace it with. Apply the test: *remove the product name, could this be any product?* If yes, it is still a template, and that is a blocking finding.
3. **Check the guidelines** the script cannot: real hierarchy (is the most important thing the most prominent?), spacing rhythm on the 8pt system, token discipline (no magic numbers), all states designed, copy quality (specific, active, real), motion restraint and purpose.
4. **Check the craft details:** concentric radii, optical alignment, layered shadows, icon stroke matched to text weight, subtle press feedback, focus states that look intentional.

**Rules**

- Be specific and actionable: location, what is wrong, what to change to. A bare "improve spacing" is useless.
- Default to blocking on a real AI-look tell or any high-severity scan finding. Better to send it back than to ship a template.
- Do not rewrite the design here; produce the fix list. The builder applies it and re-runs the scan until clean.

**Output:** `{ scan_result, blocking: [{ where, problem, fix }], should_fix: [...], verdict (block / needs-changes / pass) }`. Verdict is `pass` only when the scan is clean of high-severity findings and no AI-look tell remains.
