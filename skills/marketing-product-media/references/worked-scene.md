# Worked scene contract: one connected operation

Read this for multi-step product demos. The example is fictional and must be adapted to verified capabilities and the approved art direction. It is not proof of a payment integration or a prescribed homepage story.

## Persistent model

Keep the business, product, customer, order ID, amount and currency outside scene components. Store the selected payment method there too. Scene navigation changes presentation; it must not reset these values accidentally. Distinguish illustrative payment state from fulfillment state.

Example invariants: Kora Studio; Loop cup; order 1042; GHS 180.00; one unit; fictional customer. If Card was selected, a later order detail and return to checkout should reflect Card. No network write is needed or authorized by this illustration.

## Visual hierarchy

Use an editorial heading outside the product frame. Inside it, prioritize the decisive amount/state and its connection to an order/customer. Keep surrounding chrome recognizable but subordinate. Do not put a second giant marketing headline inside a sparse “dashboard.”

Choose one stable visual anchor across scenes: the product thumbnail plus amount, or the order identity. It may change position, but should remain recognizable. An animated movement is optional; consistent data, placement and relationships can provide continuity in a static sequence.

## Layers and ownership

- Section grid owns page alignment and reading order.
- Scene frame owns reserved size, background and clip.
- Product layout owns readable content flow.
- Optional positioning wrapper owns art-directed overlap.
- Motion wrapper owns only its animation transform/opacity.
- Foreground control owns semantics, focus and immediate feedback.

Do not let the animation controller rewrite the semantic tree on every frame. Do not let a hover transform overwrite the timeline transform. Keep actual controls outside films and decorative screenshot layers.

## Transition sheet

| Stage | Trigger | What changes | What remains | Static/reduced version |
| --- | --- | --- | --- | --- |
| Offer | Initial display or explicit step | Product availability/illustration presented | Business, item, price | Same composed offer |
| Checkout | User selects next step | Payment-choice surface becomes focal | Item and price anchor | Instant change with stable context |
| Method choice | User selects a method | Selected state and model update | Amount/customer | Immediate visible selection |
| Result | Explicit “see example result” action | Illustrative order/payment relationship appears | Item, amount, method, order identity | Readable result without travel |
| Revisit | User selects prior step | Focal scene changes | All prior choices | Same data, no reset |

Give a scene handoff an explicit start/end, curve, duration hypothesis and result hold. Begin with modest timing, then watch actual playback at display size. The hold should accommodate reading the result; repeated looping must not steal focus or outrun the explanation.

## Controller rules

One selected scene drives text, media emphasis and aria-selected/expanded state. Separate playback intent (automatic/user paused), visibility, reduced-motion preference and media readiness. Effective playback requires all appropriate conditions, but do not automatically resume after an explicit user pause.

On input, cancel or retarget the active transition from its current value. Do not wait for an old scene to finish before honoring a new choice. Use monotonically increasing transition IDs or equivalent cancellation so a stale completion callback cannot overwrite current state.

In React, subscribe/clean up media listeners and observers in effects; avoid storing high-frequency visual values in state if that causes unnecessary full-tree renders. In a simpler DOM implementation, keep the same separation without importing a large framework merely for animation.

## Responsive version

Desktop may show context and consequence simultaneously. Phone should show one readable operation with a compact persistent context strip, or ordered static scenes. Do not shrink a full desktop dashboard to 320px. If a sticky story cannot fit both explanation and evidence in a short viewport, switch to ordinary flow.

The focal amount and state need to survive real mobile rendering without zoom. A decorative peripheral label can be subdued; a material limitation or payment status cannot. Test longer names/amounts and font fallback before locking geometry.

## Acceptance cases

1. Select Card → result → checkout: Card remains selected, and related values agree.
2. Select three different steps rapidly: the latest input wins; no stale completion changes it later.
3. Use keyboard only: focus is predictable and labels describe the current state.
4. Pause then scroll away/back: the scene remains paused.
5. Load with reduced motion and change the preference during the session: the intended static/instant treatment is visible.
6. Block the media request: proposition, context and action remain understandable, with a meaningful poster/fallback.
7. Compare desktop and phone captures: the same operation is understandable, not merely the same pixels at different scales.
8. Read every factual label: simulated money states are identifiable as illustrative and no unsupported availability is implied.
