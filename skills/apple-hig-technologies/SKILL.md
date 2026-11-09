---
name: apple-hig-technologies
description: Apple Human Interface Guidelines technology-integration guidance for AirPlay, Always On, App Clips, Apple Pay, augmented reality, CareKit, CarPlay, Game Center, Generative AI, HealthKit, HomeKit, iCloud, ID Verifier, iMessage apps and stickers, in-app purchase, Live Photos, Mac Catalyst, machine learning, Maps, NFC, Photo editing, ResearchKit, SharePlay, ShazamKit, Sign in with Apple, Siri, Tap to Pay on iPhone, VoiceOver, and Wallet. Use when Codex is designing, reviewing, or implementing Apple technology integrations or Apple-platform service experiences.
---

# Apple HIG Technologies

Use this skill to decide whether and how an Apple technology belongs in an app experience. Source baseline reviewed against the official Apple Developer HIG on 2026-11-09.

Source: https://developer.apple.com/design/human-interface-guidelines/technologies

## Workflow

1. Confirm user value and eligibility.
   - State the user problem the technology solves.
   - Verify device/platform availability, entitlement requirements, geography, age, payment, account, privacy, and fallback constraints.
   - If the integration is not central to the task, keep it secondary or omit it.

2. Use system flows and branding rules.
   - Prefer Apple-provided UI, sheets, buttons, authorization flows, and terminology.
   - Do not re-create secure, payment, identity, health, wallet, Siri, or permission surfaces when system UI exists.
   - Keep Apple brand and product names exact; do not invent badges or endorsement language.

3. Design the permission and privacy story.
   - Explain why data or capability access is needed before asking.
   - Ask at the moment of clear user intent.
   - Provide useful denied, unavailable, restricted, and revoked states.
   - Avoid logging or exposing sensitive identifiers, payment details, health data, identity documents, precise location, or voice content.

4. Build lifecycle states.
   - Include setup, available, active, suspended, interrupted, denied, expired, failed, completed, and recovery states where applicable.
   - Make cross-device continuity explicit for iCloud, Handoff-like behavior, SharePlay, AirPlay, Wallet, CarPlay, and HomeKit.

5. Refresh official HIG and framework docs for exact requirements.
   - Many technology pages are policy-sensitive and change over time.
   - For implementation, check the relevant Apple framework documentation in addition to HIG design guidance.

## Integration Rules

- Secure payment, identity, health, wallet, and commerce integrations must use system trust surfaces and clear recovery states.
- AI and machine-learning features need transparent scope, user control, privacy protection, and graceful failure.
- CarPlay, watchOS, TV, and spatial integrations must be designed for their attention model, not copied from iPhone.
- SharePlay, AirPlay, Game Center, and collaboration features need clear participant state, ownership, privacy, and handoff behavior.
- Maps, location, NFC, nearby interactions, and AR need physical-world safety, permission clarity, and useful unavailable states.
- Siri, App Shortcuts, snippets, and voice flows need concise language, predictable results, and confirmation for risky operations.

## Topic Map

Official HIG pages currently under Technologies:

- AirPlay: https://developer.apple.com/design/human-interface-guidelines/airplay
- Always On: https://developer.apple.com/design/human-interface-guidelines/always-on
- App Clips: https://developer.apple.com/design/human-interface-guidelines/app-clips
- Apple Pay: https://developer.apple.com/design/human-interface-guidelines/apple-pay
- Augmented reality: https://developer.apple.com/design/human-interface-guidelines/augmented-reality
- CareKit: https://developer.apple.com/design/human-interface-guidelines/carekit
- CarPlay: https://developer.apple.com/design/human-interface-guidelines/carplay
- Game Center: https://developer.apple.com/design/human-interface-guidelines/game-center
- Generative AI: https://developer.apple.com/design/human-interface-guidelines/generative-ai
- HealthKit: https://developer.apple.com/design/human-interface-guidelines/healthkit
- HomeKit: https://developer.apple.com/design/human-interface-guidelines/homekit
- iCloud: https://developer.apple.com/design/human-interface-guidelines/icloud
- ID Verifier: https://developer.apple.com/design/human-interface-guidelines/id-verifier
- iMessage apps and stickers: https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers
- In-app purchase: https://developer.apple.com/design/human-interface-guidelines/in-app-purchase
- Live Photos: https://developer.apple.com/design/human-interface-guidelines/live-photos
- Mac Catalyst: https://developer.apple.com/design/human-interface-guidelines/mac-catalyst
- Machine learning: https://developer.apple.com/design/human-interface-guidelines/machine-learning
- Maps: https://developer.apple.com/design/human-interface-guidelines/maps
- NFC: https://developer.apple.com/design/human-interface-guidelines/nfc
- Photo editing: https://developer.apple.com/design/human-interface-guidelines/photo-editing
- ResearchKit: https://developer.apple.com/design/human-interface-guidelines/researchkit
- SharePlay: https://developer.apple.com/design/human-interface-guidelines/shareplay
- ShazamKit: https://developer.apple.com/design/human-interface-guidelines/shazamkit
- Sign in with Apple: https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple
- Siri: https://developer.apple.com/design/human-interface-guidelines/siri
- Tap to Pay on iPhone: https://developer.apple.com/design/human-interface-guidelines/tap-to-pay-on-iphone
- VoiceOver: https://developer.apple.com/design/human-interface-guidelines/voiceover
- Wallet: https://developer.apple.com/design/human-interface-guidelines/wallet

## Review Checklist

- The technology solves a clear user problem and is available for the target platform.
- System UI, permissions, branding, and policy-sensitive flows are respected.
- Denied, unavailable, failed, interrupted, and recovery states are designed.
- Sensitive data is minimized, protected, and never exposed unnecessarily.
- The integration remains understandable without assuming expert Apple terminology.

## Attribution

Apple and the product names listed above are trademarks of Apple Inc. This independently written skill is not affiliated with or endorsed by Apple.
