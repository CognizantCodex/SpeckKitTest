# Swagger API Documentation Contract

## Source Of Truth

The source-controlled OpenAPI contract is:

```text
specs/001-multimodal-insights/contracts/openapi.yaml
```

This file MUST remain the source of truth for generated or served Swagger API
documentation.

## Required Swagger Coverage

Swagger documentation MUST expose these operation groups:

- Workspaces: list, create, and inspect workspace details.
- Content: register uploaded content metadata and validation status.
- Generation: start insight generation, inspect generation status, and list
  prior insight sets for workspace history.
- Insights: retrieve generated insights, update review status, and expose a
  dedicated evidence retrieval route.
- Evidence: expose source references through insight response payloads and
  dedicated evidence operations.
- Briefs: create, inspect, list, share, and export insight briefs.

## Documentation Quality Rules

- Every operation MUST include a summary and stable operation id.
- Every path parameter MUST be documented.
- Every request body MUST reference a reusable schema.
- Every successful response MUST reference a reusable schema.
- Error responses MUST use the shared `Error` schema.
- Review, status, confidence, relevance, modality, and restriction fields MUST
  enumerate allowed values.
- Share/export operations MUST document whether provenance was preserved and any
  warnings caused by restricted or unavailable sources.

## Local Validation

Validate the contract before implementation tasks are considered complete:

```bash
python backend/scripts/validate_openapi.py
```

The backend implementation MUST serve Swagger-readable documentation generated
from the same OpenAPI contract or from route metadata that is verified against
this contract.

## Implementation Notes

- The backend exposes a FastAPI-compatible app factory at
  `backend/src/app/api/main.py`.
- The lightweight marker validation passed locally on 2026-04-26.
- Redocly lint remains recommended when `@redocly/cli` is available.
