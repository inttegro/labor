# Provider operations

## Inspect before drafting

- Review relevant provider documentation, integration code, prior support correspondence, transaction evidence, and current account state.
- Distinguish documented optionality from observed runtime validation. A field labeled optional can still be rejected by an implementation.
- Ask questions that resolve operational ambiguity: canonical field source, matching and normalization, retry safety, terminal versus pending results, debit and reversal behavior, webhook semantics, and provider-specific variation.

## Correspondence

- Draft concise, evidence-based messages with readable sections and real lists.
- Include stable references and timestamps, but omit secrets and unnecessary customer data.
- Save the draft for review. Do not send representational correspondence without explicit user authorization.
- Drafting is not sending, and a saved draft is not provider acknowledgement.

## Monitoring

- Monitor only when requested. Prefer a bounded or heartbeat workflow that stays quiet while nothing material changes.
- Notify on a substantive reply, confirmed rollout, failure, or required user action rather than repeating unchanged status.
- Do not treat `deployed`, `testing pending`, an accepted support case, or an elapsed deadline as go-live confirmation.
- Keep unresolved result definitions, rollout state, and retry guidance open until the provider confirms them or live evidence resolves them.

## Provider mutations

Changing account settings, retrying money movement, clearing suppressions, submitting production-access requests, or rotating credentials requires explicit authorization immediately before the action. After an authorized mutation, verify the resulting provider state independently.
