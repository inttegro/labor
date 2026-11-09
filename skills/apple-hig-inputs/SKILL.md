---
name: apple-hig-inputs
description: Apple Human Interface Guidelines input guidance for touch, gestures, keyboard, pointer, focus, eye input, Apple Pencil and Scribble, Camera Control, Digital Crown, game controls, sensors, nearby interactions, remotes, and related platform input systems. Use when designing, reviewing, or implementing Apple-platform input behavior or accessible alternatives.
---

# Apple HIG Inputs

Use this skill to design interaction behavior around the ways people control Apple devices. Source baseline reviewed against the official Apple Developer HIG on 2026-11-09.

Source: https://developer.apple.com/design/human-interface-guidelines/inputs

## Workflow

1. Identify available inputs and required fallbacks.
   - Touch, pointer, keyboard, remote, focus, eyes, hand gestures, Pencil, controller, crown, sensors, and camera hardware can coexist.
   - Never make a task depend on only one input path when the platform commonly supports alternatives.

2. Match the input to the task.
   - Direct manipulation: touch, gestures, Pencil, eyes/hands in spatial contexts.
   - Precision or productivity: keyboard, pointer, shortcuts, text input, selection, focus.
   - Lean-back navigation: focus engine, remotes, game controllers.
   - Personal/ambient control: Digital Crown, sensors, nearby interactions.

3. Design for stateful feedback.
   - Show hover, focus, press, drag, selected, disabled, error, and active states.
   - Keep feedback immediate and continuous during direct manipulation.
   - Preserve target stability so focus, pointer, and touch do not fight layout changes.

4. Use adjacent skills deliberately.
   - Use `fluid-interface-design` for gesture physics, velocity handoff, interruptibility, rubber-banding, springs, and reduced motion.
   - Use `apple-hig-components` for controls that expose the input behavior.

5. Refresh official HIG pages when exact hardware behavior or new OS support matters.

## Input Rules

- Touch targets need enough space, stable hit regions, and immediate response.
- Gestures need discoverability, cancellation, conflict resolution, and non-gesture alternatives.
- Pointer interactions need hover affordances, precision, and keyboard parity.
- Keyboard support needs visible focus, logical order, shortcuts only where useful, and no hidden keyboard traps.
- Focus-based interfaces need predictable movement, clear current focus, and layouts that support directional navigation.
- Eye and spatial input need comfort, clear targets, low fatigue, and confirmation for risky actions.
- Pencil and Scribble should support precision and creativity without blocking touch or keyboard workflows.
- Remotes and game controls need minimal text entry, clear focus, and quick recovery from misnavigation.
- Sensor-based input must be optional, privacy-aware, and robust to motion, orientation, and environment changes.

## Topic Map

Official HIG pages currently under Inputs:

- Action button: https://developer.apple.com/design/human-interface-guidelines/action-button
- Apple Pencil and Scribble: https://developer.apple.com/design/human-interface-guidelines/apple-pencil-and-scribble
- Camera Control: https://developer.apple.com/design/human-interface-guidelines/camera-control
- Digital Crown: https://developer.apple.com/design/human-interface-guidelines/digital-crown
- Eyes: https://developer.apple.com/design/human-interface-guidelines/eyes
- Focus and selection: https://developer.apple.com/design/human-interface-guidelines/focus-and-selection
- Game controls: https://developer.apple.com/design/human-interface-guidelines/game-controls
- Gestures: https://developer.apple.com/design/human-interface-guidelines/gestures
- Gyroscope and accelerometer: https://developer.apple.com/design/human-interface-guidelines/gyro-and-accelerometer
- Keyboards: https://developer.apple.com/design/human-interface-guidelines/keyboards
- Nearby interactions: https://developer.apple.com/design/human-interface-guidelines/nearby-interactions
- Pointing devices: https://developer.apple.com/design/human-interface-guidelines/pointing-devices
- Remotes: https://developer.apple.com/design/human-interface-guidelines/remotes

## Review Checklist

- Every primary task works with the platform's expected input methods.
- Focus, hover, press, drag, selected, disabled, and error states are visible.
- Gesture and hardware shortcuts have accessible alternatives.
- Input conflict, cancellation, recovery, and interruption behavior are defined.
- Motion and feedback respect Reduce Motion, assistive technology, and fatigue.

## Attribution

Apple, Apple Pencil, and related product names are trademarks of Apple Inc. This independently written skill is not affiliated with or endorsed by Apple.
