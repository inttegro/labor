# Preview and delivery

## Faithful preview

- Render the interpolated subject and body that will be sent.
- Let the authored document own its body background, alignment, spacing, and colors. The surrounding preview shell may adapt to the app theme, but it must not restyle the message.
- Use the established safe email preview and preserve a restrictive iframe sandbox unless the product explicitly requires and secures additional capabilities.
- Use complex fixtures containing headings, links, lists, tables, images, or branded sections when verifying email rendering.
- Long content must remain fully inspectable without hiding the final action or trapping the page in competing scroll regions.

For plain messages, preserve authored line breaks and alignment. Do not center or pad the body merely to make the preview look designed.

## Recipient presentation

- Prefer the customer or contact name as the primary recipient label when resolved.
- Retain the actual email address or phone number as secondary delivery information.
- Format phone numbers for humans and include useful country context when known.
- Selecting a customer and selecting the applicable contact method should form one coherent recipient flow.

## Send boundary

- Preview is the final checkpoint before an external send.
- The send action must identify the channel and consequence clearly.
- Disable sending when required variables, subject, body, recipient, or channel data is invalid.
- Protect retries with the established idempotency mechanism. Do not add an ad hoc client retry that can duplicate delivery.

## Message log and evidence

Keep these states distinct:

1. authored or previewed;
2. persisted;
3. queued or accepted internally;
4. submitted to the provider;
5. accepted by the provider;
6. delivered, failed, bounced, complained, or suppressed based on provider evidence.

Display stable message identifiers where useful for support, but do not let technical identifiers dominate the interface. Show only actions that remain applicable to the recorded message.

## Test mode

- Clearly mark test data and prevent accidental real-provider side effects.
- Keep realistic recipients, HTML, templates, and delivery states so the complete UI can be verified.
- Test-mode logs should still resolve names and channel details rather than degrading to anonymous addresses.
- Do not report a fixture's `sent` or `delivered` state as provider evidence.
