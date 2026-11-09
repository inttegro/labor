---
name: message-delivery-integrity
description: Use for product work involving message templates, email, SMS, recipient resolution, composer or preview interfaces, message logs, provider delivery, or delivery evidence. Preserve semantic template metadata, channel-aware authoring, faithful previews, explicit send confirmation, and honest delivery state; do not use merely to rewrite ordinary prose.
---

# Message Delivery Integrity

Treat authored content, rendered content, transport state, and provider evidence as separate layers. A polished composer is not sufficient when variables, recipient resolution, preview fidelity, or delivery status are wrong.

## Start with the contract

1. Identify the source of truth for the template, recipient, channel, and delivery state.
2. Trace the request through the authoring client, message service, queue or worker, and provider boundary as applicable.
3. Determine whether the route is live or test mode and whether any action would contact a real recipient.
4. Preserve existing service ownership instead of creating a second template or delivery model in the UI.

Read [references/templates-and-authoring.md](references/templates-and-authoring.md) for template variables, contextual values, email editors, or SMS composition. Read [references/preview-and-delivery.md](references/preview-and-delivery.md) for previews, sends, message logs, provider state, or test-mode behavior.

## Non-negotiable decisions

- Template variables need explicit user-facing metadata. Do not derive canonical labels, acronym casing, or field behavior solely from raw identifiers.
- Auto-fill values only from recognized context and preserve their provenance. Missing required values remain visible fields and block final sending.
- Email and SMS are different authoring modes. Reuse established channel-specific editors, validation, and segmentation logic.
- A preview renders the actual output. Do not inject alignment, padding, foreground color, or body background that was not authored.
- Show one primary rendition of the message. Do not render plain content and HTML as competing duplicate bodies.
- The recipient should identify the customer or contact when known while retaining the actual address or formatted phone number required for delivery.
- Keep the final send action in the preview or confirmation state. Do not send merely because the user advanced from the composer.
- Never send a real message, retry a provider delivery, or mutate suppression or provider state without explicit authorization.

## Completion standard

Verify with representative complex email and long SMS content, not only one-line fixtures. Report separately what was authored, previewed, persisted, queued, submitted, accepted by a provider, and confirmed delivered.
