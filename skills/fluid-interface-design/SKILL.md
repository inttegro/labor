---
name: fluid-interface-design
description: Platform-neutral guidance for responsive, physical, and accessible interface motion. Use when designing or reviewing direct manipulation, drag and swipe interactions, springs, velocity handoff, momentum, interruptible transitions, sheets, soft boundaries, translucent materials, interaction typography, or reduced-motion behavior on the web or in native apps.
---

# Fluid Interface Design

Build interfaces that respond immediately, preserve continuity, and remain controllable while they move. Treat motion as behavior produced by state and input, not decoration added after the interaction.

This is a platform-neutral design skill. It draws on public interaction-design research and platform guidance, but it does not ask for the visual imitation of any company or operating system.

## Workflow

1. Define the interaction contract.
   - Name the user action, the state change it causes, and the recovery path.
   - Decide whether motion communicates causality, hierarchy, spatial continuity, progress, or completion.
   - Remove motion that serves none of those purposes.

2. Trace the input path.
   - Identify pointer, touch, keyboard, assistive-technology, and programmatic paths.
   - Respond visually on press, not only after activation.
   - For direct manipulation, update continuously and preserve the exact grab offset.

3. Design continuity.
   - Keep interactive motion interruptible and redirectable.
   - Start a new transition from the current rendered value, not from a stale logical target.
   - Use the same spatial path for entry and exit unless the change in path carries meaning.

4. Choose motion behavior.
   - Use an easing curve for a short, noninteractive state transition with a known duration.
   - Use a spring when an object can be grabbed, redirected, or handed velocity.
   - Use momentum projection before snapping when a flick should affect the destination.
   - Use progressive resistance at boundaries instead of a hard visual stop.

5. Design alternatives.
   - Preserve feedback under reduced motion with short fades, color, or immediate state changes.
   - Replace translucency when reduced transparency or increased contrast is requested.
   - Keep every gesture available through another accessible input path.

6. Verify in motion.
   - Test interruption, reversal, rapid repeated input, slow drags, fast flicks, cancellation, and boundary cases.
   - Inspect real frames or a recording; a nominal frame rate does not prove smooth visual motion.
   - Test on representative low-power and high-refresh-rate devices.

## Core Rules

### Response

- Keep the input-to-feedback path free of artificial delays.
- Use pointer capture for drags so the interaction remains coherent outside the original bounds.
- Separate recognition thresholds from visible lag: a gesture may need hysteresis, but the interface should still acknowledge contact.

### Direct manipulation

- Map drag distance to object movement one-to-one until the interaction reaches a meaningful constraint.
- Preserve where the user grabbed the object; do not jump its center under the pointer.
- Track a short timestamped position history so release velocity is stable rather than based on one noisy event.

### Interruptibility

- Do not disable input merely because a transition is running.
- Retarget from the live presentation value and carry current velocity into the new motion.
- Model independent axes independently when their velocities or targets differ.

### Springs and momentum

- Start with critically damped motion for ordinary interface changes.
- Add overshoot only when the initiating action carries physical momentum or the overshoot communicates state.
- Hand release velocity into the spring so the seam between gesture and animation is not visible.
- Project the likely resting point before selecting a snap target; do not choose only from the release position.

Read [motion and gesture mechanics](references/motion-and-gestures.md) for formulas and implementation notes.

### Space and hierarchy

- Anchor menus, popovers, and expanding surfaces to their trigger.
- Keep the source and destination visually related throughout the transition.
- Use depth, scrims, blur, and shadow to express hierarchy, not to decorate every surface.
- Avoid stacking translucent layers until text and controls lose stable contrast.

### Typography and feedback

- Tune tracking and line height by text size; a single letter-spacing value is rarely correct across a type scale.
- Synchronize visual, audio, and haptic feedback to the same causal event.
- Reserve multimodal feedback for meaningful state changes so it remains informative.

Read [materials, type, and accessibility](references/materials-type-accessibility.md) for implementation constraints.

## Implementation Boundary

- Prefer compositor-friendly properties such as transforms and opacity for continuous motion.
- Measure before introducing `will-change`; persistent promotion can waste memory.
- Prefer a motion library that exposes current values, velocity, cancellation, and retargeting for gesture-driven work.
- CSS transitions remain appropriate for simple noninteractive state changes.
- Do not claim native haptic support on platforms or browsers that do not provide it.

## Review Checklist

- Feedback begins immediately and remains continuous.
- Direct manipulation preserves the grab point and tracks input accurately.
- Motion can be interrupted and reversed without jumps.
- Release velocity carries into the settling behavior.
- Entry and exit preserve spatial logic.
- Boundaries communicate resistance without appearing frozen.
- Keyboard and assistive-technology paths produce equivalent outcomes.
- Reduced motion, reduced transparency, and increased contrast have useful alternatives.
- Motion has been reviewed with real input and representative content, not only a scripted demo.

## Sources and Attribution

This skill is a substantial rewrite derived from Emil Kowalski's [`apple-design`](https://github.com/emilkowalski/skills/tree/main/skills/apple-design) skill, sourced from the `emilkowalski/skills` GitHub repository. Labor generalized the platform framing, rewrote the workflow, and split implementation detail into references; that modification does not erase the upstream origin.

The interaction principles also draw on public sources, including Apple's [Designing Fluid Interfaces](https://developer.apple.com/videos/play/wwdc2018/803/) session and web-platform documentation. The upstream skill is MIT-licensed, Copyright (c) 2026 Emil Kowalski; its required notice is preserved in [LICENSE](LICENSE). Product names and trademarks belong to their respective owners. Labor is not affiliated with or endorsed by Emil Kowalski or Apple.
