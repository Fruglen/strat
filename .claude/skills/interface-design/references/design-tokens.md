# Design tokens

Decide the system before drawing screens. Tokens are what stop a design drifting into magic numbers and inconsistency (a common AI tell). Adapt the values to the brand, but keep the discipline: a scale, not arbitrary numbers.

## Type scale

A modular, ratio-based scale rather than random sizes. A sensible default set:

- xs 12, sm 14, base 16, lg 18, xl 20, 2xl 24, 3xl 30, 4xl 36, 5xl 48 (px).

Line height by role: headings 1.1-1.3, body 1.5-1.7, UI labels 1.2-1.4. Limit to two or three weights per family. Pair fonts on purpose (one characteristic display face used sparingly, one workhorse body face), and inline them so there is no flash. For fluid sizing, use `clamp()` rather than a pile of breakpoints.

## Spacing

An 8-point system: 4, 8, 12, 16, 24, 32, 48, 64 (px). Everything, padding, gaps, margins, snaps to the scale. No `13px`, no `2.3rem`. Use `gap` on flex/grid rather than per-element margins that collapse. Maintain vertical rhythm.

## Colour

Semantic tokens, not raw hex sprinkled through the markup:

- brand / accent, plus neutral greys.
- state colours: success, warning, error, info (each distinct from the accent).
- surface, text, border tokens (`text-primary`, `bg-surface`, `border-default`).

Verify contrast as part of designing the system, not as a later fix: 4.5:1 for body text, 3:1 for large text and UI components. Interactive states (hover, active, focus) carry more contrast than rest. Design both light and dark: set `color-scheme` on `:root` and a matching `theme-color`. Choose a neutral with a slight hue bias toward the accent, a pure mid-grey reads as unconsidered.

## Radius & elevation

- One radius scale; radii used with intent, not "round everything". Nested corners are concentric: a child's radius equals the parent's radius minus the padding, so curves align.
- Shadows for elevation, borders for structure. Build shadows from at least two layers (a soft ambient plus a tighter direct) to mimic real light; combine a semi-transparent border with the shadow for a crisp edge. On a non-neutral surface, tint borders and shadows toward the surface hue.

## Icons

- Size scale from 12 to 32px, matched to the text beside them. Match icon stroke to text weight (about 1.5px next to regular, 2px next to semibold). Recolour a single SVG per state via `currentColor`; do not ship a separate icon per state.

## Motion tokens

- Durations: 150ms micro, 200-300ms small, 300-500ms medium. Easing: ease-out for entrances, ease-in for exits. Press feedback: `scale(0.96)`. Keep these as named tokens so motion is consistent across the interface.

## The rule

If a value is not in the system, it needs a reason. Consistency is most of what makes an interface feel designed rather than assembled.
