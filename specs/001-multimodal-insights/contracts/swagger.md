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
- Generation: start insight generation and inspect generation status.
- Insights: retrieve generated insights and update review status.
- Evidence: expose source references through insight response payloads.
- Briefs: create and inspect insight briefs.

## Documentation Quality Rules

- Every operation MUST include a summary and stable operation id.
- Every path parameter MUST be documented.
- Every request body MUST reference a reusable schema.
- Every successful response MUST reference a reusable schema.
- Error responses MUST use the shared `Error` schema.
- Review, status, confidence, relevance, modality, and restriction fields MUST
  enumerate allowed values.

## Local Validation

Validate the contract before implementation tasks are considered complete:

```bash
npx @redocly/cli lint specs/001-multimodal-insights/contracts/openapi.yaml
```

The backend implementation MUST serve Swagger-readable documentation generated
from the same OpenAPI contract or from route metadata that is verified against
this contract.
