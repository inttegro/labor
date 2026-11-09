---
name: apple-hig-patterns
description: Apple Human Interface Guidelines patterns for common user actions, tasks, and experiences. Use when Codex is designing, reviewing, or implementing flows such as onboarding, searching, settings, loading, notifications, feedback, file management, drag and drop, collaboration, media playback, haptics, undo and redo, accounts, ratings, help, workouts, or other Apple app workflow patterns.
---

# Apple HIG Patterns

Use this skill to shape common Apple-platform workflows before selecting specific components. Source baseline reviewed against the official Apple Developer HIG on 2026-11-09.

Source: https://developer.apple.com/design/human-interface-guidelines/patterns

## Workflow

1. Classify the user job.
   - Acquisition and first use: launching, onboarding, help, ratings.
   - Data and control: entering data, searching, settings, undo and redo, file management.
   - System state: loading, notifications, feedback, full screen, multitasking, live-viewing apps.
   - Collaboration and transfer: sharing, collaboration, drag and drop, printing.
   - Media and sensory: audio, video, haptics, charts, workouts.
   - Identity and account: managing accounts.

2. Preserve task continuity.
   - Keep people oriented with clear source and destination states.
   - Make progress, cancellation, errors, and recovery visible.
   - Keep destructive or irreversible actions confirmable and reversible where possible.
   - Avoid teaching before value; introduce features when they become useful.

3. Use the platform's expected pattern first.
   - Prefer system search, share, notification, media, document, settings, and account conventions.
   - Do not make custom flows for standard tasks unless the product domain requires it.
   - Keep cross-platform behavior conceptually consistent while allowing platform-specific presentation.

4. Choose supporting skills.
   - Use `apple-hig-components` for exact control, menu, sheet, alert, navigation, and status choices.
   - Use `apple-hig-inputs` for drag, focus, keyboard, gestures, pointer, and remote behavior.
   - Use `apple-charts` for charting-data work.
   - Use `apple-sheets` for sheets, action sheets, popovers, and modal presentation details.

5. Refresh official HIG pages when exact current guidance matters.

## Pattern Rules

- Onboarding must earn its space. Prefer progressive disclosure over upfront tours.
- Loading states need truthful progress, useful placeholders, cancellation where appropriate, and no fake certainty.
- Search should support recognition, correction, recency, filtering, empty states, and fast result refinement.
- Settings should be rare, organized by user mental model, and not a dumping ground for design uncertainty.
- Notifications should be timely, actionable, respectful, and user-controlled.
- Feedback should connect cause and effect without becoming noise.
- Drag and drop should preview results, support cancellation, and preserve data integrity.
- Undo and redo should be predictable, scoped, and discoverable for risky edits.
- Media playback should respect context, interruptions, output routes, captions, controls, and background behavior.
- Accounts should minimize authentication burden while protecting sensitive data and account switching.

## Topic Map

Official HIG pages currently under Patterns:

- Charting data: https://developer.apple.com/design/human-interface-guidelines/charting-data
- Collaboration and sharing: https://developer.apple.com/design/human-interface-guidelines/collaboration-and-sharing
- Drag and drop: https://developer.apple.com/design/human-interface-guidelines/drag-and-drop
- Entering data: https://developer.apple.com/design/human-interface-guidelines/entering-data
- Feedback: https://developer.apple.com/design/human-interface-guidelines/feedback
- File management: https://developer.apple.com/design/human-interface-guidelines/file-management
- Going full screen: https://developer.apple.com/design/human-interface-guidelines/going-full-screen
- Launching: https://developer.apple.com/design/human-interface-guidelines/launching
- Live-viewing apps: https://developer.apple.com/design/human-interface-guidelines/live-viewing-apps
- Loading: https://developer.apple.com/design/human-interface-guidelines/loading
- Managing accounts: https://developer.apple.com/design/human-interface-guidelines/managing-accounts
- Managing notifications: https://developer.apple.com/design/human-interface-guidelines/managing-notifications
- Modality: https://developer.apple.com/design/human-interface-guidelines/modality
- Multitasking: https://developer.apple.com/design/human-interface-guidelines/multitasking
- Offering help: https://developer.apple.com/design/human-interface-guidelines/offering-help
- Onboarding: https://developer.apple.com/design/human-interface-guidelines/onboarding
- Playing audio: https://developer.apple.com/design/human-interface-guidelines/playing-audio
- Playing haptics: https://developer.apple.com/design/human-interface-guidelines/playing-haptics
- Playing video: https://developer.apple.com/design/human-interface-guidelines/playing-video
- Printing: https://developer.apple.com/design/human-interface-guidelines/printing
- Ratings and reviews: https://developer.apple.com/design/human-interface-guidelines/ratings-and-reviews
- Searching: https://developer.apple.com/design/human-interface-guidelines/searching
- Settings: https://developer.apple.com/design/human-interface-guidelines/settings
- Undo and redo: https://developer.apple.com/design/human-interface-guidelines/undo-and-redo
- Workouts: https://developer.apple.com/design/human-interface-guidelines/workouts

## Review Checklist

- The pattern matches the user's task and platform context.
- The flow has clear entry, progress, completion, cancellation, error, and recovery states.
- Standard platform affordances are used where they fit.
- Accessibility, privacy, localization, and multitasking interruptions are handled.
- The design explains what happened, what can happen next, and how to reverse or recover.

## Attribution

Apple and related platform names are trademarks of Apple Inc. This independently written skill is not affiliated with or endorsed by Apple.
