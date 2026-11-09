# Materials, type, and accessibility

## Materials and depth

Use visual material to clarify hierarchy:

- A scrim signals modal focus and temporarily recedes the background.
- Blur or translucency can preserve context for floating chrome, but must not reduce text contrast.
- Larger surfaces generally need stronger separation than small controls.
- Avoid layering translucent surfaces over each other when the result becomes visually unstable.
- Prefer soft scroll-edge treatments where content passes under floating controls; avoid arbitrary dividers that do not explain structure.

When animating a material surface, coordinate position, scale, opacity, and blur so they describe one object. Do not animate blur continuously on low-power devices without measuring paint cost.

## Typography in motion

- Tighten tracking modestly as display text grows; keep body text near its font's intended spacing.
- Use more line height for long-form or small text and less for large display text.
- Scale spacing with text where layout should follow user font size.
- Avoid animating font size when a transform can communicate scale without causing repeated layout.
- Do not allow movement to make text temporarily unreadable during a task-critical transition.

## Reduced motion

Reduced motion preserves meaning while reducing vestibular impact:

- replace travel, parallax, and elastic motion with short fades or immediate state changes;
- remove decorative overshoot and looping movement;
- keep essential progress and cause-and-effect feedback;
- avoid large full-viewport movement and abrupt brightness changes.

On the web, test `prefers-reduced-motion: reduce`. In native apps, use the platform accessibility setting and its supported APIs.

## Transparency and contrast

For reduced transparency:

- increase surface opacity;
- remove or reduce backdrop blur;
- add a stable border or shadow only when needed for separation.

For increased contrast:

- strengthen the distinction between foreground and background;
- preserve focus and selected states without relying on subtle material changes;
- test semantic colors in light and dark appearances.

On the web, `prefers-reduced-transparency` support varies. Provide a product-level fallback or a reliably opaque default when the environment does not expose the preference.

## Input equivalence

- Every drag or swipe action needs a keyboard, button, menu, or other accessible path.
- Focus must remain visible before, during, and after the transition.
- Announce meaningful state changes, not every animation frame.
- Keep target order stable while elements move.
- Ensure cancellation and recovery are available without precise pointer input.

## Multimodal feedback

Visual, audio, and haptic feedback should share one cause and occur together. Confirm platform support and user preferences before using sound or haptics. Reserve strong feedback for meaningful commits, errors, warnings, or successful completion.
