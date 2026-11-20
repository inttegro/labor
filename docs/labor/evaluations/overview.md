---
title: Test skill routing
sidebarTitle: Overview
description: Measure how reliably an agent selects the right Labor skills across 78 public cases.
---

Skill selection is the first decision an agent makes before following a Labor workflow. This suite measures that decision by giving a host a request and the public catalog, then checking the selected skills against a versioned expectation.

The score covers routing accuracy. Evaluate the quality of the completed work with a separate task-specific test.

## What the suite contains

| Case type | Expected behavior |
| --- | --- |
| Positive | Select the target skill. |
| Negative | Leave the target unselected when the request falls outside its scope. |
| Ambiguous | Select the plausible target or ask for clarification. |
| Overlap | Select the exact set required by a request that crosses skill boundaries. |

The current corpus gives every published skill one positive, one negative, and one ambiguous case. Twelve overlap cases test exact multi-skill selection.

## Choose the check you need

<CardGroup cols={2}>
  <Card title="Check the corpus" icon="check-double" href="/labor/evaluations/static-validation">
    Verify completeness, names, descriptions, duplicate prompts, and expectation structure locally.
  </Card>
  <Card title="Test an agent host" icon="play" href="/labor/evaluations/run-routing">
    Send the cases through your adapter and save the results as reviewable JSONL.
  </Card>
</CardGroup>

<Warning>
  Corpus validation confirms that the test data is complete and internally consistent. A host result comes from executing the suite through an adapter.
</Warning>
