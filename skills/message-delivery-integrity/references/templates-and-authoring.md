# Templates and authoring

## Variable metadata

A variable contract should carry enough information to render and validate a field without guessing. Use the existing service schema where present; when evolving it, account for:

- stable key or path;
- explicit label, with acronym casing such as `Receipt URL`;
- semantic type, such as text, URL, email, phone, number, money, date, or date-time;
- required state;
- placeholder appropriate to the type;
- optional description, default, or recognized contextual source.

Backward-compatible label generation can be a fallback for older records, but it must not remain the canonical authoring model. Validate metadata at the service boundary and preserve it through API clients and UI types.

## Contextual values

- Prepopulate recognized customer or account values only when they are actually available.
- Keep user-entered values when changing templates if the same variable key and type remain valid.
- Make missing required values editable and obvious. Do not silently render unresolved tokens into the final message.
- Distinguish generated previews from persisted template data; preview interpolation must not mutate the published template.

## Email authoring

- Reuse the product's established rich-text or structured email editor instead of building a second editor for one workflow.
- Keep subject and body as distinct values.
- Preserve authored HTML structure and inline styling required by email clients.
- When source editing is supported, sanitize and validate at the established message boundary rather than applying an unrelated page-content sanitizer.

## SMS authoring

- Use a plain, vertically resizable text area unless the product has a stronger established editor.
- Reuse one encoding-aware segmentation implementation. Do not duplicate GSM-7 and Unicode rules in individual components.
- Tell the user how many delivered SMS segments the content represents; do not imply that text beyond one segment will be discarded.
- Recalculate after variable interpolation because rendered values can change encoding and length.

## Channel and purpose

Choose the recipient channel before authoring when it changes the available address, editor, validation, or preview. Purpose is semantic message metadata, not a substitute for a template. Keep purpose and channel distinct when the workflow needs both.
