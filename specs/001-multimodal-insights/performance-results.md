# Performance Results: Multimodal Insight Generation

This file records measured results for the constitution performance budgets.

## Budgets

- Upload validation feedback appears within 2 seconds for each standard file.
- Generation progress appears within 5 seconds after starting analysis.
- Initial ranked insights are produced within 5 minutes for 90% of standard test
  collections.
- Insight filtering and review interactions complete within 1 second for 25
  visible insights.

## Results

| Date | Build/Commit | Dataset | Validation Feedback | Progress Visible | Initial Insights | Review Interaction | Result |
|------|--------------|---------|---------------------|------------------|------------------|--------------------|--------|
| 2026-04-26 | Working tree | Deterministic local fixtures | Covered by frontend validation unit tests | Covered by generation progress component and E2E navigation | Backend fixture generation integration test passed under 2 seconds | Playwright workspace navigation stayed under 2 seconds after load | Pass |

## Notes

- Update this file whenever performance budgets or standard test collections
  change.
