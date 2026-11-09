# Scene engineering

## State contract

Define persistent business/object/customer/order/amount/currency; input; trigger; change; readable result; reverse/replay/interruption; static equivalent; and actual versus illustrative authority.

Distinguish initiated, authorized, collected, settled, refunded and fulfilled when relevant. A click must not silently imply verified money completion. Don't conflate settlement and fulfillment.

## Renderer

Use DOM/CSS for readable UI and accessible controls; SVG for crisp paths/connectors; video for complex fixed or photographed sequences; canvas/WebGL only when the mechanism justifies it. Keep functional controls outside prerecorded media. Don't make a film look like a working form.

## Layers

Separate semantic layout, clip, positioning, animation and content wrappers. Otherwise hover and timeline transforms overwrite each other. Reserve aspect ratio and stable geometry.

One active scene state drives text, media emphasis and accessibility. Independent timers cause drift. Preserve shared identifiers and objects; don't replace an entire panel to animate continuity.

Recompose for mobile. Decorative artboards can scale, but necessary text needs a readable equivalent. Sticky scenes need enough height for text and evidence; fall back to flow when short.

## Timing

Starting hypotheses, not reference constants: immediate press feedback;140–240ms small transition;350–650ms scene handoff; multi-second result hold tuned to reading. Validate actual playback.

Explicit properties/curves; transform/opacity often avoid layout but are not automatically free. Large blur/masks/layers and excessive will-change still cost. Batch reads before writes. Pause/release offscreen media.

User input beats autoplay. Cancel/retarget from current state; don't queue stale choices. Preserve user pause on re-entry. Clean up observers/animations.

## Alternatives

Reduced motion is a designed state, not global0.001ms. Remove parallax/oscillation/travel; provide static result or instant user-driven change. CSS does not alone stop custom players. Test initial and changed preferences with visible output/player time.

Provide appropriate pause/stop controls. Blocked video retains poster, copy and CTA; failed JS cannot leave essential content opacity0. Slow media reserves space.

Refresh implementation details against [MDN Web Animations](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API), [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), and [W3C Pause Stop Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). References aren't compliance certificates.
