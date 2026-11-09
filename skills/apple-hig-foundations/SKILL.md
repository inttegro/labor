---
name: apple-hig-foundations
description: Apple Human Interface Guidelines foundations for accessibility, app icons, branding, color, Dark Mode, icons, images, immersive experiences, inclusion, layout, materials, motion, privacy, right-to-left layout, SF Symbols, spatial layout, typography, and writing. Use when designing, reviewing, or implementing Apple-platform interface foundations.
---

# Apple HIG Foundations

Use this skill to apply the cross-cutting design foundations that shape every Apple-platform experience. Source baseline reviewed against the official Apple Developer HIG on 2026-11-09.

Source: https://developer.apple.com/design/human-interface-guidelines/foundations

## Workflow

1. Establish the context.
   - Identify platform, device posture, input methods, content type, task criticality, user risk, and accessibility needs.
   - If the task is platform-specific, check `apple-hig-getting-started` first.

2. Design foundations in this order.
   - Accessibility and inclusion: make the experience operable, understandable, and respectful for more people.
   - Privacy: minimize collection, expose control, and avoid surprising disclosure.
   - Layout and spatial layout: make hierarchy, grouping, safe areas, depth, and adaptive behavior clear.
   - Typography and writing: make text legible, concise, localizable, and hierarchy-aware.
   - Color, Dark Mode, icons, images, and app icons: use visual identity to clarify meaning, not decoration.
   - Materials and motion: use depth, transparency, and movement only when they reinforce hierarchy, causality, or focus.

3. Prefer system primitives.
   - Use SF Symbols where a symbol exists and communicates clearly.
   - Use platform typography, Dynamic Type, semantic colors, system materials, and native accessibility semantics before custom styles.
   - For web implementations, map to the same intent: semantic HTML, responsive layout, reduced motion/transparency, high contrast, keyboard access, and localized text.

4. Use adjacent skills deliberately.
   - Use `fluid-interface-design` for fluid motion, direct manipulation, springs, materials, typography polish, and reduced-motion details.
   - Use `apple-charts` for chart-specific design.

5. Refresh official HIG pages when exact wording or recently changed guidance matters.

## Foundation Rules

- Accessibility is a design input. Include Dynamic Type, VoiceOver, Switch Control, keyboard navigation, contrast, reduced motion, reduced transparency, and alternate text where relevant.
- Inclusion affects language, imagery, defaults, pronouns, assumptions, and failure states. Avoid making a single user identity the default.
- Privacy-sensitive UI needs clear purpose, minimal data, transparent permission timing, and reversible choices.
- Layout should explain relationships. Use spacing, grouping, alignment, hierarchy, and platform safe areas before adding borders or decoration.
- Color must carry semantic or brand meaning and must not be the only signal.
- Dark Mode is not simple inversion. Verify contrast, emphasis, shadows, materials, imagery, and semantic colors in both appearances.
- Typography should support scanning and reading. Avoid tiny fixed text; test with Dynamic Type and localization.
- Motion should communicate state and causality, remain interruptible where interactive, and have a reduced-motion equivalent.
- Materials should express depth and separation; avoid stacking translucent surfaces until legibility collapses.
- RTL support is structural: navigation direction, alignment, icons, gestures, text fields, and layout mirroring all need review.

## Topic Map

Official HIG pages currently under Foundations:

- Accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility
- App icons: https://developer.apple.com/design/human-interface-guidelines/app-icons
- Branding: https://developer.apple.com/design/human-interface-guidelines/branding
- Color: https://developer.apple.com/design/human-interface-guidelines/color
- Dark Mode: https://developer.apple.com/design/human-interface-guidelines/dark-mode
- Icons: https://developer.apple.com/design/human-interface-guidelines/icons
- Images: https://developer.apple.com/design/human-interface-guidelines/images
- Immersive experiences: https://developer.apple.com/design/human-interface-guidelines/immersive-experiences
- Inclusion: https://developer.apple.com/design/human-interface-guidelines/inclusion
- Layout: https://developer.apple.com/design/human-interface-guidelines/layout
- Materials: https://developer.apple.com/design/human-interface-guidelines/materials
- Motion: https://developer.apple.com/design/human-interface-guidelines/motion
- Privacy: https://developer.apple.com/design/human-interface-guidelines/privacy
- Right to left: https://developer.apple.com/design/human-interface-guidelines/right-to-left
- SF Symbols: https://developer.apple.com/design/human-interface-guidelines/sf-symbols
- Spatial layout: https://developer.apple.com/design/human-interface-guidelines/spatial-layout
- Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- Writing: https://developer.apple.com/design/human-interface-guidelines/writing

## Review Checklist

- The interface remains usable with assistive technologies, increased contrast, reduced motion, reduced transparency, larger text, localization expansion, RTL layout, and dark appearance.
- Visual identity clarifies recognition and meaning without overpowering content.
- Privacy-sensitive states avoid surprise and give the user control.
- Motion, material, color, type, and imagery all support the task hierarchy.

## Attribution

Apple, SF Symbols, and related product names are trademarks of Apple Inc. This independently written skill is not affiliated with or endorsed by Apple.
