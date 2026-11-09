# Composition and type engineering

## Frame before components

Choose a stable shell, deliberate full-bleed exceptions and named alignment lines. Specify what heading, body, CTA, media and captions share. Large layouts need relationships, not independent max-width utilities.

Use grid for two-dimensional alignment and flex for one axis. Fixed artboards may suit decorative scenes; copy and controls must reflow. Don't transform-scale an entire functional UI to fit.

Choose focal order among proposition, evidence and action. Figma's studied hero placed text/action around portrait media; Linear put a broad heading over a product scene; Mollie moved from business language to transaction context; Retool made a prompt surface the action. The lesson is one dominant relationship, not one universal layout.

Give space a job: arrival, reading pause, chapter change, media stage. Use several intentional density modes instead of identical section padding. A purposeless giant gap is not luxury.

## Type roles

Specify family, licensed asset, weight/axes, size, leading, tracking, measure and responsive behaviour for display, section heading, lead, body, label, data and navigation. Test final copy with the actual font. Extreme tracking cannot rescue the wrong face.

Short display headings can use tight leading; paragraphs require comfortable measure and line spacing. Prefer width constraints plus reflow. Use hard breaks only when meaningful at all target widths. Stress long copy, localization, zoom and fallback.

Dated observations, not tokens to copy:
- Linear: 64/64px hero at 1440, weight510, -1.408px tracking; 38/41.8px at390. Dominance doesn't require120px.
- Figma: width/weight axes and optical sizing are part of the role. Font-size alone misses the shape.
- Retool: variable Saans display300 and product labels380. Hierarchy is subtler than400/700.
- Mollie: small mono labels sit beneath plain sans business outcomes; ubiquitous eyebrows would invert that hierarchy.

Name tokens by purpose. Use stable numeric widths for changing finance data. Proprietary fonts require licensing; test an authorized face with desired metrics.

## Surface and depth

Define canvas, section, product surface, elevated panel, hairline, primary/secondary text and status. Product UI should retain truthful identity inside the editorial frame.

Depth should explain an operation: customer action foreground, operational result behind. Layer order, occlusion and contrast must agree. Peripheral detail may recede; relevant amounts, state labels, terms and CTAs may not be faded away.

Use a corner family, not one radius on every shape. Photo crops, product windows, pills and buttons have different jobs. Document reusable optical corrections. Shadows need elevation/light logic; blur everywhere destroys hierarchy and can be expensive.

## Responsive recomposition

For each section specify:
- Invariant: claim, evidence, action, object identity.
- Reflow: copy and columns.
- Reframe: crop, focal point and scale.
- Simplify: peripheral chrome/texture.
- Replace: sticky desktop sequence with stacked scenes or explicit accessible selection.
- Remove only redundancy, not suite meaning or proof.

Choose breakpoints where composition fails. Test intermediate and short-height screens. Mobile shouldn't contain several unreadable tiny dashboards; show one meaningful interaction and its result.

## Section contract

Record visitor question, focal path, alignment map, copy roles/measure, source/crop, layer order, state/trigger, mobile alternative, static/reduced fallback and screenshot-based pass condition. That is an implementable direction.
