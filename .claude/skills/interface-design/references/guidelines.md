# Interface guidelines

The rules a design must follow before it is presented. Grouped by area. These are non-negotiable quality gates, not suggestions. Items marked *[scan]* are checked by `scripts/ui-scan.mjs`; the rest are judgement, but still required.

## Interactions

- Keyboard works everywhere. Every flow is operable by keyboard and follows the WAI-ARIA authoring patterns.
- Visible focus *[scan]*. Every focusable element shows a clear focus ring. Prefer `:focus-visible` over `:focus` so pointer users are not distracted; use `:focus-within` for grouped controls. Restyle focus, never remove it.
- Manage focus. Trap focus in modals, move focus to new content, and return it on close, per the ARIA patterns.
- Hit targets match visual targets. Expand anything under 24px to at least 24px (44px on mobile). No dead zones: if it looks interactive, it is, and the whole control is one hit target.
- Links are links. Use `<a>` for navigation so open-in-new-tab, hover preview, and Back/Forward work. Buttons do actions, links go places.
- Loading feedback. Show a loading state but keep the original button label; add a 150-300ms show-delay and a 300-500ms minimum visible time so spinners do not flicker.
- Optimistic updates when success is likely; reconcile on the server response. Confirm destructive actions or offer a safe Undo window.
- State in the URL. Filters, tabs, pagination, and expanded panels are deep-linkable, so share, refresh, and Back/Forward all work. Scroll position restores on Back/Forward.
- Touch niceties: `touch-action: manipulation` to kill double-tap zoom, set `-webkit-tap-highlight-color`, and `overscroll-behavior: contain` in modals and drawers.
- Announce dynamic changes with a polite `aria-live` region (toasts, inline validation).

## Forms

- Every control has a real `<label>` (or an associated one); clicking the label focuses the control. Icon-only and unlabeled controls get an `aria-label`.
- Do not pre-disable submit; let people submit an incomplete form to surface validation. Keep submit enabled until submission starts, then disable and show a spinner during the request.
- Errors next to their field; on submit, move focus to the first error. Frame errors as how to fix it, not just what went wrong.
- Right `type` and `inputmode` for the field; set `autocomplete` and a meaningful `name` for autofill. Disable spellcheck for emails, codes, and usernames. Inputs are at least 16px on mobile to stop iOS zoom.
- Enter submits a single-input form; in a `<textarea>`, Cmd/Ctrl+Enter submits and Enter adds a line. Allow paste everywhere, including one-time codes. Warn before navigating away from unsaved data.
- Placeholders show an example and end with an ellipsis; they are not a substitute for a label.

## Animation & motion

- Honor `prefers-reduced-motion` *[scan]*: ship a reduced-motion variant. Motion is a preference, not a given.
- Necessity check. Animate only to clarify cause and effect or for deliberate, restrained delight. No autoplay; animate in response to input, and make animations interruptible by the user.
- Compositor-friendly only: animate `transform` and `opacity`, never `width`, `height`, `top`, or `left`. Never `transition: all` *[scan]*, list the exact properties. Use `will-change` sparingly.
- Timing: ~100-150ms micro-feedback, 200-300ms small transitions, 300-500ms medium, longer only for deliberate choreography. Easing fits the subject (ease-out entering, ease-in exiting). Scale-on-press is subtle (about 0.96, never below 0.95).
- Set the correct `transform-origin` so motion starts where it physically should. Skip entrance animation on first page load.

## Layout & responsive

- Mobile-first *[scan: viewport]*. Design single-column first, then expand. Verify at 320, 768, 1024, and 1440px, and sanity-check ultra-wide at 50% zoom. Never disable zoom *[scan]*.
- Let the browser lay out. Prefer flex, grid, and intrinsic sizing over measuring in JavaScript. Handle short, average, and very long content without breaking.
- Deliberate alignment: every element aligns with something on purpose. Adjust optically (about 1px) when perception beats geometry. Respect safe-area insets for notches. Avoid needless scrollbars.

## Visual & typography

- Use the design tokens in `references/design-tokens.md`: a real type scale, an 8pt spacing system, and semantic colour tokens, never magic numbers or raw hex scattered through the markup. Two to three font weights per family, maximum.
- Hierarchy is obvious: one `<h1>` *[scan]*, clear size and weight steps, generous whitespace. The most important thing is the most prominent thing.
- Shadows for elevation, borders for structure. Layer shadows (ambient + direct) for depth; use semi-transparent borders for crisp edges. Nested radii are concentric (child radius <= parent).
- Colour never carries meaning alone: pair it with text or an icon. Meet contrast (4.5:1 body, 3:1 large); hover, active, and focus states have more contrast than rest. Set `color-scheme` and a `theme-color` for dark mode.
- `font-variant-numeric: tabular-nums` where numbers line up. Curly quotes, real ellipses (…), and no widows/orphans in display text.

## Content & microcopy

- Real content, never lorem ipsum *[scan]*. Write the actual copy; design against short, average, and long versions.
- Active voice, second person, specific labels ("Plaats je website", not "Verzenden"). Errors are encouraging and tell the user the way out. Every screen has a next step; no dead ends.
- Design all states: empty, sparse, dense, loading, and error. Skeletons mirror the final layout exactly so nothing shifts. `<title>` reflects the current context.
- Locale-aware dates, numbers, and currencies. Non-breaking space between number and unit ("10 MB"). Mark brand and code with `translate="no"`.

## Performance

- No image-caused layout shift *[scan]*: set explicit `width`/`height` and reserve space. Preload only above-the-fold images; lazy-load the rest. Preload critical fonts and subset them.
- Keep interactions cheap: uncontrolled inputs where possible, batch DOM reads/writes, virtualize long lists or use `content-visibility: auto`. Mutations complete in under ~500ms.

## Accessibility

Semantics before ARIA: reach for the native element first. Then meet the checklist above (visible focus, labels, contrast, keyboard, reduced motion, 200% zoom). For a deep, dedicated accessibility audit of a finished page, hand off to the **accessibility-audit** skill; this design pass builds a11y in from the start rather than bolting it on.
