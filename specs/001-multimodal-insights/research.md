# Research: Multimodal Insight Generation

## Decision: Use React for the frontend application

**Rationale**: The product needs a responsive browser UI for upload progress,
review filtering, evidence inspection, and brief composition. React supports a
component model that fits independently testable UI states and makes it practical
to isolate upload controls, insight cards, evidence panels, and brief builder
flows. Vite keeps the frontend package lightweight for local development, while
TypeScript protects API contract usage and UI state transitions.

**Alternatives considered**:

- Server-rendered pages: simpler initial setup, but less ergonomic for rich
  progress, filtering, evidence inspection, and review interactions.
- Desktop-only UI: useful for local files, but narrower reach and less aligned
  with the requested application flow.

## Decision: Use Python for the backend service

**Rationale**: Python is well suited for content processing orchestration,
metadata handling, background-style analysis tasks, and integration with future
document, image, audio, and video analysis adapters. Keeping analysis behind
application services allows tests to replace expensive or non-deterministic
analysis with fixtures. A FastAPI-style HTTP service fits the OpenAPI contract
and keeps request validation, status responses, and local service orchestration
explicit.

**Alternatives considered**:

- JavaScript-only backend: reduces language count but is less natural for
  multimodal processing workflows.
- Local scripts without a service layer: fast for prototypes but too weak for
  contracts, progress tracking, review state, and E2E testing.

## Decision: Store metadata in local SQLite

**Rationale**: SQLite satisfies the local-first scope and is enough for workspace
metadata, content item status, insight records, evidence references, review
state, and brief history. Source files and generated previews stay on the local
filesystem and are referenced by SQLite metadata. A repository layer with
SQLAlchemy-style models keeps domain services independent from raw SQL and
supports migration planning when contracts change.

**Alternatives considered**:

- Flat JSON files: simple but fragile for querying, state transitions, and
  relational provenance.
- Hosted database: better for collaboration, but outside the first-release
  single-user local scope.

## Decision: Separate source files from metadata

**Rationale**: Documents, images, audio, and video can be large. Keeping binary
content on disk avoids bloating SQLite while preserving metadata records for
validation status, processing status, evidence references, and access controls.

**Alternatives considered**:

- Store binaries in SQLite: simpler backup story but poor fit for large media and
  generated previews.
- Require users to manage external paths only: avoids copying files but makes
  provenance and repeatable review less reliable.

## Decision: Use explicit OpenAPI/Swagger backend contracts for workspaces, content, insights, and briefs

**Rationale**: OpenAPI 3.1 contracts allow React UI development, backend
services, API documentation, contract tests, and stakeholder review to align
before implementation. Keeping the contract in `contracts/openapi.yaml` makes the
Swagger documentation source-controlled and protects the constitution requirement
that changed insight, source, or brief contracts include migration expectations.

**Alternatives considered**:

- Ad hoc frontend/backend calls: faster initially but creates drift, weakens
  contract testing, and leaves API documentation informal.
- UI-only mock data: useful for prototypes but insufficient for persistence,
  provenance, and regression coverage.

## Decision: Publish Swagger-readable API documentation from the OpenAPI contract

**Rationale**: The backend API needs browsable documentation for workspace,
content, generation, insight review, evidence, and brief operations. A
Swagger-readable OpenAPI file lets developers validate request/response shapes,
review examples, and keep implementation and documentation synchronized.

**Alternatives considered**:

- Markdown-only API docs: easier to read casually, but more likely to drift from
  implementation and less useful for contract tests.
- Generated docs without source-controlled OpenAPI: convenient locally, but weak
  for review and task generation.

## Decision: Use pytest, Vitest, React Testing Library, and Playwright for the quality gates

**Rationale**: The backend needs fast unit tests for validation, ranking,
duplicate grouping, and provenance formatting, plus integration tests for
repository and contract behavior. The frontend needs component-level confidence
for review and brief builder states, while browser E2E tests prove upload,
generation, review, evidence inspection, and brief creation flows.

**Alternatives considered**:

- Manual-only validation: too risky for the constitution's regression and E2E
  standards.
- Browser-only tests: valuable, but too slow and brittle to cover all local
  behavior.

## Decision: Treat multimodal analysis as replaceable adapters

**Rationale**: The feature requires documents, images, audio, and video, but the
first plan should not bind domain behavior to any one analysis provider. Adapter
interfaces allow unit tests to use deterministic fixtures and future tasks to add
specific extraction or analysis engines without changing review and brief logic.

**Alternatives considered**:

- Hard-code a single analysis engine: fastest path for one demo, but risky for
  testing, provenance, and future modality support.
- Manual-only insight entry: simpler, but misses the core requirement to
  streamline insight generation.

## Decision: Define performance around user-observable milestones

**Rationale**: Users care about validation feedback, visible generation progress,
time to first ranked insights, and responsive review. These metrics can be tested
without exposing implementation internals.

**Alternatives considered**:

- Backend-only timing metrics: useful operationally, but less aligned with the
  success criteria in the feature specification.
- No explicit budgets: violates the constitution and makes large file handling
  riskier.
