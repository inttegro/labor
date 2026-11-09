---
name: apple-hig-getting-started
description: Apple Human Interface Guidelines getting-started and platform-fit guidance. Use when designing, reviewing, or implementing an app for iOS, iPadOS, macOS, tvOS, visionOS, watchOS, or Apple-platform games, especially before choosing foundations, patterns, components, inputs, or technologies.
---

# Apple HIG Getting Started

Use this skill to decide how an experience should adapt to each Apple platform before selecting lower-level components or patterns. Source baseline reviewed against the official Apple Developer HIG on 2026-11-09.

Source: https://developer.apple.com/design/human-interface-guidelines/getting-started

## Workflow

1. Identify the target platform set.
   - Ask which platforms are first-class and which are adaptations.
   - If the user names no platform, choose the primary usage context from the product: phone, tablet, desktop, TV, spatial, watch, or game.

2. Start from platform intent, not screen size.
   - iPhone: short, personal, one-handed, interruptible tasks.
   - iPad: focused touch work, larger layouts, multitasking, keyboard and pointer support.
   - Mac: dense productivity, windows, menu bar, keyboard fluency, file workflows.
   - Apple TV: distance viewing, focus engine, minimal text entry, remote-first navigation.
   - Apple Vision Pro: spatial context, depth, eye and hand input, comfort, persistent surroundings.
   - Apple Watch: glanceable, short interactions, complications, haptics, personal health/safety context.
   - Games: immersion and responsiveness first; system conventions still apply around controls, settings, privacy, and purchase.

3. Preserve the product's identity while adapting structure.
   - Keep the same core model, terminology, and task outcomes across platforms.
   - Let navigation density, command placement, input support, and presentation style differ by platform.
   - Do not ship one scaled layout across all devices.

4. Choose the next HIG skill.
   - Use `apple-hig-foundations` for accessibility, layout, color, materials, motion, typography, privacy, writing, and related primitives.
   - Use `apple-hig-patterns` for user flows such as onboarding, search, settings, loading, notifications, or file management.
   - Use `apple-hig-components` for controls, navigation, presentation surfaces, status UI, and system experiences.
   - Use `apple-hig-inputs` for touch, pointer, keyboard, focus, gaze, remote, game controller, and sensor input.
   - Use `apple-hig-technologies` for Apple Pay, Siri, Wallet, CarPlay, HealthKit, SharePlay, iCloud, and other Apple technology integrations.

5. Verify with platform evidence.
   - For native work, inspect the target SDK/framework conventions before inventing custom behavior.
   - For web approximations, translate the behavior and hierarchy rather than cloning Apple chrome literally.
   - If exact current wording, new platform behavior, or OS-version support matters, reopen the official HIG page before finalizing.

## Design Principles

- Make the primary task obvious in the first screen or state.
- Prefer direct manipulation, familiar system conventions, and immediate feedback.
- Preserve user control: clear exits, reversible operations, predictable state, and safe destructive actions.
- Keep visual hierarchy calm. Let content and task state drive emphasis.
- Respect accessibility, localization, privacy, and platform input from the start, not as late QA.
- Make cross-platform adaptation feel native on each platform, not merely responsive.

## Topic Map

Official HIG pages currently under Getting started:

- Design principles: https://developer.apple.com/design/human-interface-guidelines/design-principles
- Designing for iOS: https://developer.apple.com/design/human-interface-guidelines/designing-for-ios
- Designing for iPadOS: https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados
- Designing for macOS: https://developer.apple.com/design/human-interface-guidelines/designing-for-macos
- Designing for tvOS: https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos
- Designing for visionOS: https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos
- Designing for watchOS: https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos
- Designing for games: https://developer.apple.com/design/human-interface-guidelines/designing-for-games

## Review Checklist

- The platform choice is explicit.
- Each platform adaptation has a clear reason.
- The design uses system conventions where they fit.
- Content, navigation, commands, input, and presentation match the platform's dominant context.
- Accessibility, localization, privacy, and state recovery are accounted for.

## Attribution

Apple and related platform names are trademarks of Apple Inc. This independently written skill is not affiliated with or endorsed by Apple.
