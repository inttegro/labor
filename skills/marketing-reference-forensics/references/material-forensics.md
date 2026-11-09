# Material forensics: investigate what the browser actually paints

The output is a usable explanation of why the page looks as it does, not a list of hex codes or framework classes. Pair visual judgement with measurements. Research only: do not restyle a reference to make a cleaner specimen.

## Collect by role, not frequency

For each reference inspect a hero, one major product-proof scene, a second contrasting section, a control and a phone recomposition. Capture full viewport context plus a readable detail. Open every image used in the argument. Choose an equivalent job when comparing a candidate; a developer console and a customer film are not interchangeable specimens.

Map these roles separately: page canvas; chapter field; media stage; product window; nested product object; primary/secondary control; actual focus/selection state. Record absent roles as absent. For each record:

- URL, date, engine, viewport, scroll/interaction state, capture and target selector or DOM evidence ID.
- Background colour and image/gradient, including the containing background for transparent layers. Distinguish brand accent, semantic status, photo colour and temporary campaign colour.
- Boundary mechanism: space, contrasting fill, clip, stroke, inset ring, pseudo-element, shadow, mask or overlap. Record which edge, width, opacity and neighbouring material. `border: 0` does not mean no visible edge.
- Radius by object and size, including asymmetric corners. Differentiate the media wrapper, nested product window and pictured UI. Do not infer raster-image controls' CSS from their wrapper.
- Shadow offsets/blur/spread/colour, lighting direction, blur, grain and masks. Determine whether they describe elevation, focus or atmosphere; “glow” is not an adequate explanation.
- Typography by role: actual loaded family, file/variable axes, weight, optical size, width, size/leading/tracking, measure and wrap. Check the font resource supports the declared range; static files cannot supply arbitrary variable weights.
- Media aspect ratio, object-fit/position, focal content, crop/occlusion, image versus DOM versus video, and what changes on phone.

An extractor must include square, transparent, borderless containers and images; filtering only decorated surfaces systematically misses deliberate absence. Include generated `::before`/`::after`, ancestor surfaces and inset shadows. Separate duplicate text layers used for blending from the perceived text colour. Record authored CSS and computed state separately if a fractional value could result from scaling or a CSS unit.

For local uncompressed TTF/OTF resources, run `node scripts/inspect-sfnt.mjs /absolute/font.ttf` from this skill's directory. The read-only helper reports OS/2 weight and actual variation axes without installing a font library. It deliberately rejects WOFF/WOFF2/collections rather than guessing. This verifies font metadata, not licensing or which font the browser actually rendered.

## Reconstruct a paint stack

For a representative scene, name the back-to-front stack: canvas → atmospheric field → media object → product UI → state emphasis → controls. Explain which layers create hierarchy and which disappear perceptually. Example: a low-opacity white line on near-black can describe a lit edge; the same alpha on cream barely exists. Evaluate the composed result, not the alpha alone. A light line is not suitable as a necessary input boundary merely because it works decoratively.

Inspect at normal display size and a close crop. A 1px outline that is acceptable around a large product window may become noisy around every text block. Count repeated roles only as a diagnostic; there is no universal permitted number of borders.

## Turn observation into implementation knowledge

Each key finding has four parts:

1. **Observed/measured:** what is visible and its supported values.
2. **Design judgement:** why these relationships work for this content. Label the interpretation.
3. **Transferable rule:** what to preserve in a different brand and why.
4. **Do not copy / reject:** the conditions under which the same treatment fails.

Example: “This page has cards” is useless. “The large payment scene occupies twice the width of the billing scene; both have a quiet cool edge, but different product compositions and coloured light fields; media leads and the frame recedes” can guide implementation. Do not reduce that to “make a bento grid.”

Document material contrasts across the page: dark/light, square/soft, still/moving, sparse/dense, photo/product, framed/unboxed. Also document consistent anchors. Variation without anchors is incoherence; consistency without contrast becomes a template.

## Required end product

Deliver an illustrated material dossier with a role table, one paint-stack explanation, font evidence, a control treatment, desktop/phone comparison, a presentation-format decision and counterexample. If media is blank or consent obscures the focal object, recapture or explicitly label the limitation and use another valid specimen. Don't conceal it with a crop and claim the whole state passed.

When reviewing a candidate, add an edge ledger: selector/object, current material, intended semantic job, retain/change/remove recommendation and replacement separation mechanism. Never prescribe “remove all borders”; Stripe and Linear are useful counterexamples to that oversimplification.
