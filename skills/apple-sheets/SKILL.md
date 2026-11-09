---
name: apple-sheets
description: Apple-native guidance for sheets, action sheets, menus, popovers, modal surfaces, scrims, detents, and bottom-sheet interactions. Use when designing, reviewing, or implementing modal presentation on Apple platforms with SwiftUI or native system components.
---

# Apple Sheets

Use this skill when designing, reviewing, or implementing Apple-platform sheets, action sheets, confirmation dialogs, menus, popovers, bottom sheets, stacked sheets, modal overlays, custom presentation panels, or sheet dismissal and drag behavior.

## Source Model

- Sheets help people complete a scoped task that is closely related to the current context.
- Action sheets present choices related to an action the user initiated; keep them brief, focused, and clearly tied to the source action.
- WWDC 2025 design system guidance emphasizes content-first structure, legible floating controls, concentric geometry, soft scroll-edge effects, and consistent component anatomy across devices.
- Prefer system presentation APIs first. Custom sheets are acceptable only when the product interaction cannot be expressed with the platform presentation while preserving native motion, accessibility, and appearance.

Primary references:
- https://developer.apple.com/design/human-interface-guidelines/sheets
- https://developer.apple.com/design/human-interface-guidelines/action-sheets
- https://developer.apple.com/videos/play/wwdc2025/356/

Source baseline reviewed against official Apple Developer material on 2026-11-09.

## Presentation Choice

- Use `.sheet` for a focused task or detail surface related to the current screen.
- Use `.confirmationDialog` for action-sheet style decisions, especially destructive choices or short option lists triggered by a user action.
- Use `Menu` for nonmodal command groups that should not interrupt the task.
- Use `Popover` on iPad/macOS for contextual controls anchored to a source; adapt to sheets on compact iPhone where appropriate.
- Use full-screen cover only for immersive flows, authentication, capture, or tasks that need a complete context break.

## Visual Rules

- The sheet surface must feel native to the current appearance. In light mode, avoid pure white-on-white seams; in dark mode, avoid a flat black slab.
- Use material, shadow, and scroll-edge blending to separate a sheet from content. Do not use hard dividers or opaque header bands to solve legibility.
- Keep the sheet's top edge soft: drag indicator, close controls, and pinned headers should sit on the same surface material as the content below.
- Match shapes concentrically. A rounded sheet should contain controls whose radii, inset, and spacing feel derived from the parent geometry.
- Scrims should recede the background without fighting the sheet. Make the scrim adaptive to light/dark appearance.
- Avoid nested borders, bordered controls inside bordered cards, and extra separators after the final row in a section.

## Motion Rules

- Entry and exit must share one spatial path. If a sheet rises from the bottom, it should dismiss downward with velocity-aware spring motion.
- Sheet movement should be interruptible. Drag progress should map directly to sheet position and continue from the current visual state on release.
- Scroll views inside sheets should scroll normally until they reach the top. Only then should a downward pull transfer to interactive dismissal.
- Stacked sheets should preserve depth: dismissing the front sheet should restore the previous sheet without a visual reset.
- Respect Reduce Motion by shortening duration and avoiding decorative movement while preserving state changes.

## SwiftUI Guidance

- Prefer `.sheet`, `.presentationDetents`, `.presentationDragIndicator`, `.presentationCornerRadius`, and `.presentationBackground` for native presentation.
- For custom bottom sheets:
  - Put the scrim and sheet in one root overlay that ignores safe areas.
  - Build the sheet surface once, then place the drag indicator, close affordance, and scroll content on that same surface.
  - Use `.regularMaterial` or an adaptive `UIColor.systemGroupedBackground` blend; avoid separate header rectangles.
  - Add a soft top scroll-edge treatment when controls overlap scroll content.
  - Use `@Environment(\.colorScheme)` for adaptive foregrounds, scrims, and shadows.
- For action menus:
  - Use SF Symbols only when the symbol improves recognition.
  - Do not repeat similar icons in a related command group; use labels for clarity.
  - Keep destructive actions separated and tinted with the destructive role.

## Review Checklist

- The source action and sheet purpose are obvious.
- Text, buttons, drag handles, and close controls are legible in light and dark mode.
- The sheet has no hard top seam, accidental border, or mismatched header background.
- Last rows in grouped sections do not render trailing dividers.
- Background content recedes, but the sheet still feels connected to the originating context.
- Drag-to-dismiss, tap-outside dismissal, keyboard behavior, Dynamic Type, Reduce Motion, and VoiceOver labels have been tested.
- For screenshots, capture both light and dark appearances plus at least one active sheet/menu state.

## Attribution

Apple, SwiftUI, SF Symbols, and related product names are trademarks of Apple Inc. This independently written skill is not affiliated with or endorsed by Apple.
