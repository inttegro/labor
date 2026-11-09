# Evidence model

A useful finding contains claim and evidence class, URL/date/viewport/state, readable capture, relevant measurements or code, causal explanation, an original implementation recipe and material uncertainty.

Example: “Measured 64/64px heading at 1440 and 38/41.8px at 390. Public CSS constrains mobile width. Observed line count changes. Recipe: tune width and leading with the selected face, not a scale transform.” Bad: “Premium typography and smooth Framer animations.”

Keep a human dossier beside structured evidence. Include capture metadata, headings, media, matched CSS and state samples. An index explains which file answers which question. Competitor imagery stays private research material, not production assets. Use [the compact templates](templates.md) where they remove ambiguity; omit irrelevant fields rather than manufacturing evidence.

Known traps from the 2026-10-11 study:
- Retool full-page capture omitted content visible in ordinary scrolling.
- Figma used vimeo-video, missed by native-video inventory.
- Linear registered offscreen animations under reduced motion; count alone wasn't a visible-impact result.
- Mollie showed different customer counts across contexts.
- Hidden/overlapping text polluted textContent and heading counts.
- A saved “keyboard” filename did not establish successful keyboard activation.
- Consent and campaign changes altered heights between visits.

Do not serialize infinite duration as indistinguishable null when the distinction matters. Keep raw sampled performance times alongside filenames.

Recipes need hierarchy, layers, responsive rules, states and fallback. A heuristic conversion hypothesis is not measured uplift. One-engine testing is not cross-browser verification.

Origin: original guidance derived from live Linear/Figma/Mollie/Retool inspection and existing Playwright and skill-creator workflows. Refresh concrete values before reuse.
