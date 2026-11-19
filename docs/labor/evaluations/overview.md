---
title: Routing evaluations
sidebarTitle: Overview
description: Test whether an agent host selects the right Labor skills for realistic requests.
---

Labor's first public evaluation suite measures skill routing. It asks a narrow question: given a request and the public catalog, did the host select the appropriate skill or skills?

It does not measure overall model quality or the quality of the final work product.

## What the suite contains

| Case type | Expected behavior |
| --- | --- |
| Positive | Select the target skill. |
| Negative | Do not select the tempting but irrelevant target. |
| Ambiguous | Select the plausible target or ask for clarification. |
| Overlap | Select the exact set of skills required by a cross-boundary request. |

The current corpus contains one positive, negative, and ambiguous case for every published skill, plus 12 exact overlap cases.

## Two different proofs

<CardGroup cols={2}>
  <Card title="Validate the contract" icon="check-double" href="/labor/evaluations/static-validation">
    Check corpus completeness, names, descriptions, duplicates, and expected case structure without calling a model.
  </Card>
  <Card title="Run a host evaluation" icon="play" href="/labor/evaluations/run-routing">
    Send each case through your adapter and record a provenance-rich JSONL result artifact.
  </Card>
</CardGroup>

<Warning>
  A valid corpus proves that the evaluation contract is internally consistent. It does not prove that any model or agent host passed it.
</Warning>
