# Inspection protocol

## Establish the specimen

Use an isolated unauthenticated context. Record canonical and redirected URL, date, locale, browser engine, viewport, DPR, consent and motion preference. Decline optional cookies through a real control; never accept for convenience. Capture campaign variants as variants, not one stable truth.

For a full-site study, follow the entire homepage through footer and product navigation. For a section-only request, inspect that section and the adjacent context needed to understand it; do not expand into a full-site audit automatically. Map category/audience, promise, mechanism, proof, objections and action at the requested scope. Suite taxonomy and descriptions are part of the message when in scope.

## Capture levels

- Rhythm: full-page image cross-checked against ordinary scrolling, showing chapter lengths, density and surface changes.
- Composition: viewport-sized capture of every major section at a settled meaningful state.
- Detail: exact crop, active tab, focus treatment or menu with enough surrounding context.
- Time: record a scene; sample rest, trigger, transition, result, interruption. Filename delays are not necessarily elapsed timestamps.
- Adaptation: narrow phone, intermediate width and desktop. Probe around relevant CSS breakpoints and short heights for sticky stories.

Warm lazy sections with actual scrolling. Coordinate-based crops are not automatically semantic section boundaries. Use a viewport sequence when sticky content defeats full-page capture. Never disable animation or reveal hidden elements and present the result as native behaviour; label diagnostic alterations.

## Measure the mechanism

Inspect computed family, loaded asset, size, weight, line height, tracking, optical sizing, variation axes, width and actual line breaks. CSS font-weight can mislead when font-variation-settings sets wght. Font identity does not grant a reuse license.

Record shell/gutter/grid/padding/gap, alignment lines, aspect ratios, clipping, overflow, fit/position, border/shadow/corners and ancestor transforms. A child's width can be scaled or masked upstream.

Fetch ordinary public CSS if cross-origin CSSOM is unreadable. Record source URL/hash and small relevant matched-rule excerpts with media/supports/container conditions. Computed style proves the current outcome; matching selectors alone do not prove active declarations or cascade winners. Avoid retaining entire proprietary apps.

JS bundle strings identify candidates only. Confirm execution through observable state or code unambiguously tied to the component. Framework identification is not an implementation recipe.

## Media

Inspect img, picture/source, video, canvas, SVG, CSS backgrounds, custom elements such as vimeo-video, accessible player groups, shadow roots and permitted frames. Zero native videos does not mean a static page. Record source/poster, natural/display sizes, loading, crop, format, duration, loop, muted/inline, pause, visible progress and reduced-motion behaviour.

Classify context, product evidence, explanation, breadth, trust and decoration. Determine whether meaningful UI is HTML, raster, prerecorded or uncertain. A convincing scene may still depict invented capability; provenance matters.

## Interaction

Test hover, keyboard focus, Enter/Space, Escape, outside dismissal, return focus, mobile navigation and a meaningful section interaction. Use fresh contexts so hover state does not invalidate keyboard testing.

A locator failure is not a website failure. Inspect the DOM and screenshot before coordinate clicks; log the target. Do not force-click through overlays. Verify focus actually moved—focus() on a non-focusable text wrapper can leave it on body.

Reduced motion needs a separate initial-load context and, when relevant, a live preference change. Compare visible motion/player time rather than merely finding a media query. Offscreen registered animations differ from visible accessibility impact.

## Synthesis

For each section explain what the visitor learns, focal order, deliberate omissions, copy/media relationship, responsive treatment and implementation mechanism. End with critical judgments about the references too; famous sites are not accessibility or conversion certificates.
