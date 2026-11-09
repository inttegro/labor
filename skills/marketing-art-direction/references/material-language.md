# Material language: an implementable design contract

A coherent material system makes it obvious what belongs to the page, what is evidence of the product, and what can be operated. “Premium”, “clean”, “Linear-like”, “warm” and “rounded” do not specify one.

## Work from perceptual relationships

Choose one dominant visual logic per audience mode and explain it. Examples: white editorial canvas with expansive saturated artwork; warm canvas with tactile merchant imagery and precise white software; near-black canvas with lit, layered product scenes. These are alternatives, not ingredients to mix equally.

Build a **role table before implementation**. For page, chapter, media field, product window, inner UI and controls, specify fill, edge mechanism, radius, elevation, type role and mobile change. Give concrete starting values for the proposed brand, labelled as proposed, with a reason and a screenshot test. A token dump without role/use is not a contract.

For audience modes, specify each complete journey: visitor question, navigation emphasis, chapter order, evidence, objections and primary/secondary routes. Keep explicit shared brand anchors. Different audience does not automatically mean a dark theme; a developer experience can stay light while changing density, language, artifact selection and interaction. A recolour or hero-copy toggle is not a complete mode. Keep both views addressable and navigation/focus/history predictable when that routing is in scope.

Separate three sources of colour: brand identity; editorial/media atmosphere; semantic product state. A blue image does not require blue buttons. Green atmosphere must not turn every panel into a success state. Choose a neutral temperature, define text/secondary text against actual surfaces, and reserve the highest chroma or luminance contrast for the focal claim/action/state. Verify text and essential controls meet applicable contrast requirements; decorative seams have a different job.

## Boundaries are decisions

Default to no container for ordinary editorial text. Add a container only when it groups a discrete object, establishes an interaction, clips media intentionally, or distinguishes a genuinely separate field. Alignment and spacing can provide grouping without drawing it.

Choose a primary separation mechanism at each boundary: whitespace, fill change, crop, overlap, edge or shadow. Combining several requires a reason, not a utility class habit. Reject a frame around a frame around UI when all three edges carry the same weight and no distinct role. Preserve actual product/control boundaries; don't erase them to meet an aesthetic rule.

For existing work, make an **edge ledger**. Every repeated rule family receives retain/change/remove, its semantic job and the replacement if removed. A section divider can support a deliberate editorial grid. Repeating it at the header, each chapter, every card and every link can flatten hierarchy. The test is what the eye sees first at normal size, not the CSS border count.

## Corners and elevation

Define radii by object role, not one global rounding value. Square artwork may be intentionally edge-to-edge. A large chapter may have a generous top curve; a media object a moderate curve; a product window its real product radius; a pill a distinct action affordance. Neither pills nor 16px cards are universally correct.

For nested concentric curves, start from outer radius minus inset, then inspect optical alignment. If corners are not concentric, don't mechanically apply that formula. Avoid a tiny radius looking accidentally clipped on a huge photograph. Test at phone size; large desktop curves can waste useful image area or collide with labels.

Use shadows to imply an object leaving a plane. Place soft ambient depth below the object and reserve harder contact edges for attachment. For dark scenes, subtle tonal lifts and directional edge light can be more effective than a black drop shadow. Never give every marketing section the same floating-card shadow. Blur/grain/glow must remain subordinate at actual display size and have a static fallback.

## Typography is material

Inspect the rendered face, not just its CSS family name. Match real file weights/axes to declarations; use a variable font only with its supported axes. Don't label a static medium file 500–800. Do not inherit a competitor's proprietary font. Use a licensed face with comparable role, then retune width, line breaks, leading and tracking rather than assume numerical equivalence.

Specify display, section, body, interface and metadata separately. Light large sans type can make a dense software page feel open; compact UI type can make evidence credible. Oversized serif copy inside a fake application may confuse editorial voice with product UI. Keep that distinction even when the brand uses serif headlines. Optical balance and readable measures matter more than a fashionable font pairing.

## Dated calibration, not a universal token kit

The following are measured examples from public pages at 1440px, 11 October 2026. Reinspect before claiming current parity. The lesson is the relationship, not copying proprietary design or media.

| Reference | Measured relationship | Implementation lesson / counterexample |
| --- | --- | --- |
| Linear | Canvas #08090A; product panels #0F1011; white edges at 8–12% opacity; 22px stage, 16px chat, 12px panels, 9px issue objects in sampled scenes; Inter Variable display 64/64, weight 510 | Layer the product world using close dark values, subdued seams, light and masks. This is not a borderless site, nor a flat black card grid. Don't copy atmospheric fading onto information users must read. |
| Figma | White canvas, black editorial text; figmaSans 56/56 with width 96 and weight 400; square gallery panels; 8px nav CTAs and 16px hero CTA | The art, not a card shell, supplies colour and texture. Don't add a universal radius to output artwork or pretend the embedded artwork's UI is the page's CSS. |
| Mollie | White canvas, #F7F4F1 cash-flow field, brown #3B281D action, approximately 12px broad media corners; pill actions; Inter Variable 82/82 at weight 400; IBM Plex Mono labels | Warmth comes from photography, neutral temperature and brown actions, not beige boxes everywhere. A white dashboard on warm/dark media stays recognisably software. |
| Retool | #151515 canvas, #E9EBDF text/prompt; Saans display 72/75.6 at 300; 20px prompt, 16px story media, pill CTAs | Distinguish a raised interactive prompt from a media field and the unboxed narrative beside it. A pale prompt is justified only if the product actually offers that interaction. |
| Stripe | White/cool-neutral field; #E5EDF5 edge layer; 6px outer/5px inner suite crop, #533AFD 4px CTAs; Söhne display 48/55.2 at 300; layered software shadows | Small corners and grid lines can be sophisticated when edges recede behind richly authored, asymmetrically sized product scenes. Don't turn this into “all boxes are bad” or copy the grid without its media. |
| Shopify | #02090A coal canvas; purple-to-navy chapter; 48px top chapter corners, 12px media cards, pill actions; Shopify Inter section 56/60.48 at 330 | Different scales of rounding signal chapter/object/action; colour and media change by chapter while type/grid anchor the page. Don't mix its global theatrics into every developer explanation. |

Sources: [Linear](https://linear.app/), [Figma](https://www.figma.com/), [Mollie](https://www.mollie.com/), [Retool](https://retool.com/), [Stripe Ireland](https://stripe.com/ie), [Shopify Ireland](https://www.shopify.com/ie). Values refer to sampled roles, not official design tokens or whole-site rules.

## Deliver and falsify the contract

For each major section choose a presentation format, material role and focal evidence. State what must be seen without animation. Include one rejected plausible alternative and why. A gallery is warranted by meaningful breadth, not by a desire to fill a row; a loop is warranted by a change to understand, not an empty hero.

Specify one representative proof before broad rollout: a desktop and phone crop containing display type, media, a real product object and an action. Compare equivalent reference jobs, including the quiet edges at 100% scale. Approve narrative and materials separately. If everything becomes a pale equal card, labels dominate evidence, or borders are the strongest repeated visual element, the contract has not survived implementation.

Research-only scope: deliver the contract and critique, not a secretly redesigned prototype. Skills improve decisions through evidence and review; their use alone does not certify expert-level output.

Scale the written output to the request. For a narrow refinement, update the existing contract and supply the decisive scene/edge changes rather than generate another complete dossier. The roles, evidence and choices remain necessary; a long document is not itself evidence of better judgement. Worked examples are illustrations, never evidence that the next product supports the same capabilities.
