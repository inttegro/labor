# Labor evaluations

Labor publishes evaluation inputs and deterministic scoring contracts that can
be used without Inttegro products or infrastructure. The first suite tests
whether a host routes realistic requests to the appropriate public skills.
It does not claim to measure overall model quality or the quality of a skill's
final work product.

## Static validation

Run the versioned corpus checks without a model or provider credential:

```bash
npm run validate:routing
```

The validator requires every published skill to have positive, negative, and
ambiguous prompts. It also verifies exact overlap cases for requests that need
multiple skills, rejects unknown or duplicate skills and prompts, and loads the
candidate names and descriptions from the current `SKILL.md` files.

`npm run check` includes this static gate. A valid corpus is an executable
contract, not evidence that any model or host passed it.

## Execute the model evaluation

The runner sends one protocol-versioned JSON request per case to an adapter
process and records a consistent JSONL artifact:

```bash
npm run eval:routing -- \
  --adapter node \
  --adapter-arg /absolute/path/to/your-host-adapter.mjs \
  --provider your-provider \
  --model your-model \
  --host your-host \
  --host-version your-host-version \
  --catalog-revision "$(git rev-parse HEAD)" \
  --execution-region not_recorded \
  --output /tmp/labor-routing-eval.jsonl
```

Use `--case-type`, `--skill`, or `--limit` for a focused run. Use
`--repetitions` to observe variance. The default minimum score is `1`; lower it
explicitly when collecting a baseline instead of enforcing a release gate.

Provider credentials remain inside the adapter process. Labor does not ship a
provider-specific adapter or require live model calls in public CI.

## Adapter request

The adapter reads one JSON object from standard input:

```json
{
  "protocol_version": 1,
  "run_id": "3d83f98c-90b7-44ca-92ab-a5537a2d2cd5",
  "case": {
    "id": "skill:animation-vocabulary:positive:1",
    "case_type": "positive",
    "target": "animation-vocabulary",
    "prompt": "What is the animation called when a menu briefly scales past its final size and settles back?",
    "expectation": {
      "mode": "include",
      "skills": ["animation-vocabulary"]
    }
  },
  "repetition": 1,
  "candidate_catalog": [
    {
      "name": "animation-vocabulary",
      "description": "Reverse-lookup glossary that turns a vague description of a web animation or motion effect into its exact term...",
      "source": "skills/animation-vocabulary/SKILL.md"
    }
  ],
  "metadata": {
    "provider": "your-provider",
    "model": "your-model",
    "host": "your-host",
    "host_version": "your-host-version",
    "catalog_revision": "your-git-sha",
    "locale": "en-US",
    "execution_region": "not_recorded"
  }
}
```

An adapter may exercise a host's native skill router or make an isolated
classification call using the supplied catalog. It must not return hidden
reasoning. Diagnostic logs belong on standard error; standard output is
reserved for exactly one result object.

## Adapter result

Return:

```json
{
  "protocol_version": 1,
  "outcome": "selected",
  "selected_skills": ["animation-vocabulary"],
  "usage": {
    "source": "provider",
    "input_tokens": 1220,
    "output_tokens": 48,
    "total_tokens": 1268
  },
  "model_latency_ms": 842.4,
  "semantic_outcome": "not_applicable",
  "tool_calls": [],
  "trace_id": "optional-provider-or-host-trace-id"
}
```

`outcome` is `selected`, `clarified`, `refused`, or `error`.
`semantic_outcome` is `success`, `partial`, `failure`, or `not_applicable`.
Each tool call has `name`, `latency_ms`, and an outcome of `success`, `error`,
`cancelled`, or `unknown`.

Do not invent measurements. When token usage is unavailable, return:

```json
{
  "source": "unavailable",
  "input_tokens": null,
  "output_tokens": null,
  "total_tokens": null
}
```

Use `null` for unavailable model or tool latency. The runner records its own
wall time separately.

## Scoring

- Positive cases pass when the selected skills include the target.
- Negative cases pass when the target is not selected.
- Ambiguous cases pass when the host selects the plausible target or asks for
  clarification.
- Overlap cases require the exact expected skill set, preventing both missed
  collaboration and gratuitous routing.

The JSONL artifact starts with a run record, contains one record per case and
repetition, and ends with a summary. It records the provider, model, host and
catalog revisions, locale, region, timing, token-usage provenance, selected
skills, tool calls, and semantic outcome. Output files are created with
owner-only permissions.

## Safety and publication

- Keep provider keys in the adapter environment, never in arguments, prompts,
  corpus files, or result artifacts.
- Do not store hidden reasoning, credentials, customer data, private source,
  production exports, or raw production tool payloads.
- Use public or synthetic prompts. Product-specific Inttegro integrations and
  their routing cases belong in [`inttegro/ai`](https://github.com/inttegro/ai).
- Treat `not_recorded`, `unavailable`, static validation, and live model results
  as different evidence states.
- Do not commit host-executed result artifacts unless their contents and
  publication purpose have been explicitly reviewed.
