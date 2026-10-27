# Avoiding the AI look

The single most common failure of AI-designed pages is that they look AI-designed: a set of defaults that appear regardless of the subject. A good design looks like a deliberate choice made for *this* product, not a template. This file lists the tells and how to escape them.

## The tells (avoid these defaults)

- **Indigo/violet everything** *[scan]*. A purple or indigo primary with blue-purple gradients is the number-one giveaway. Use the product's real brand colour; if there is none, pick a considered accent from the subject's world, not the default.
- **Gradient overload** *[scan]*. Big gradient hero, gradient buttons, gradient text. Prefer flat or one subtle, intentional gradient.
- **Round everything** *[scan]*. `rounded-2xl` on every card, button, and input. Choose one radius scale and use radii with intent; some things should be sharp.
- **Heavy, uniform shadows**. Soft drop shadows on every card at the same depth. Use elevation sparingly and layer it (see design-tokens).
- **Oversized uniform padding**. Everything floating in the same generous space, so nothing has hierarchy. Vary spacing to signal importance.
- **Stock card grids**. Three equal cards with an icon, a heading, and a line of text, regardless of content. Design the layout around the actual information priority.
- **Generic hero**. A centred big headline, a subheading, and two buttons that could belong to any product. Open with the most characteristic thing about *this* one.
- **The "safe" fonts and centred everything**. Inter or Space Grotesk, everything centre-aligned, emoji as section markers. None are wrong by themselves; all of them together read as a default.
- **Lorem ipsum** *[scan]*. Placeholder copy is a tell and hides layout problems. Write real content.

## Some recognisable AI clusters to steer clear of

These looks appear no matter the brief; do not reach for them by default:

- Warm cream background with a high-contrast serif and a terracotta accent.
- Near-black background with a single acid-green or vermilion pop.
- Broadsheet layout with hairline rules, zero radius, and dense columns.
- A purple-to-blue gradient hero on white.
- Rounded cards each wearing a coloured left accent bar.

Any of these can be right when the brief asks for it. The point is not to spend your one aesthetic choice on a default.

## How to look intentional instead

- **Ground it in the subject.** Pull the palette, type, and imagery from the product's actual world (its materials, its audience, its tone). A tax tool and a skate brand should not look the same.
- **Honour what exists.** If the project has a design system, brand colours, or a token file, use them. Precedence is always: the user's stated wishes, then the project's existing system, then your choices.
- **Spend boldness in one place.** Pick one memorable element (a distinctive type treatment, one strong image, one interaction) and keep everything around it quiet. A page that shouts everywhere says nothing.
- **Real hierarchy over decoration.** Numbered markers, eyebrows, dividers, and accent bars should encode something true (a real sequence, a real grouping), not decorate. If it does not mean anything, cut it.
- **Write like a person.** Specific, active, second-person copy in the product's voice. Errors that help. Labels that say exactly what happens.
- **Polish the details** (see `references/design-tokens.md`): concentric radii, optical alignment, layered shadows, icon stroke matched to text weight, subtle press feedback. These small correct choices are what separate crafted from generated.

## The test

Before presenting, ask: *if I removed the product name, could this be any product?* If yes, it is still a template. Make a choice that only fits this one.
