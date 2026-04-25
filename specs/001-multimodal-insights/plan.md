# Implementation Plan: Multimodal Insight Generation

**Branch**: `001-multimodal-insights` | **Date**: 2026-04-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-multimodal-insights/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a web application that lets users create a workspace, add unstructured
documents, images, audio, and video, generate ranked insights with source
provenance, review and classify those insights, then create a shareable insight
brief. The frontend will be a React application focused on upload, progress,
review, evidence inspection, and brief creation flows. The backend will be a
Python application exposing clear service contracts for content intake, analysis
orchestration, insight review, and brief generation, documented with
OpenAPI/Swagger files. SQLite stores local metadata, state, provenance, review
status, and brief records; large source files remain on local filesystem storage
referenced by metadata records.

## Technical Context

**Language/Version**: Python 3.12+ for backend; TypeScript 5.x with React for frontend
**Primary Dependencies**: React with Vite, FastAPI-style Python HTTP service, OpenAPI 3.1/Swagger documentation, SQLAlchemy-style SQLite repository layer, pytest, Vitest, React Testing Library, Playwright
**Storage**: Local SQLite database for metadata; local filesystem for uploaded source content and generated preview artifacts
**Testing**: pytest for backend unit/integration/regression tests; Vitest and React Testing Library for frontend unit/component tests; Playwright for browser E2E tests
**Target Platform**: Local-first desktop or workstation web app served through a
browser with local backend service
**Project Type**: Web application with separate frontend and backend packages
**Architecture Decision**: React frontend depends on backend HTTP contracts
documented in OpenAPI/Swagger files; backend separates API routes, application
services, domain models, analysis adapters, persistence repositories, and local
file storage. Domain services do not depend on transport, UI, or SQLite details.
**Performance Goals**: Show upload validation feedback within 2 seconds for
standard files; show generation progress within 5 seconds of starting analysis;
produce initial ranked insights within 5 minutes for 90% of standard test
collections; keep insight filtering and review interactions under 1 second for
25 visible insights.
**Constraints**: Preserve source provenance for every generated insight; tolerate
partial content failures; keep metadata local in SQLite; do not block the review
flow on failed or unsupported content; keep UI states accessible and keyboard
operable.
**Scale/Scope**: First release targets single-user local workspaces, common
business documents, common image formats, and standard audio/video recordings
with reasonable size limits. Multi-user collaboration and cloud storage are out
of scope for this plan.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Code Quality**: PASS. Plan uses clear frontend/backend boundaries, small
  service modules, and explicit ownership for intake, generation, review, and
  sharing.
- **Architecture Guidelines**: PASS. Dependency direction is React UI -> backend
  OpenAPI/Swagger contracts -> application services -> domain models ->
  repositories/adapters. Domain models do not depend on React, HTTP, SQLite, or
  file storage details.
- **Unit Testing Standards**: PASS. Unit tests cover validation, ranking,
  duplicate grouping, confidence labeling, provenance formatting, and brief
  inclusion rules.
- **End-to-End and Regression Testing**: PASS. E2E covers upload to brief
  creation. Regression tests cover partial failures, provenance retention, and
  brief citation preservation.
- **User Experience Consistency**: PASS. Plan includes upload, progress, empty,
  partial-success, error, review, evidence, and sharing states with accessibility
  requirements.
- **Performance Requirements**: PASS. Plan defines timing budgets for validation,
  generation progress, insight generation, and review interactions.
- **Maintainability**: PASS. Contracts, data model, quickstart, and operational
  expectations are generated with this plan.

## Project Structure

### Documentation (this feature)

```text
specs/001-multimodal-insights/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- openapi.yaml
|   |-- swagger.md
|   `-- ui-flows.md
|-- checklists/
|   `-- requirements.md
`-- tasks.md
```

### Source Code (repository root)

```text
backend/
|-- src/
|   |-- api/
|   |-- application/
|   |-- domain/
|   |-- analysis/
|   |-- repositories/
|   |-- storage/
|   `-- config/
|-- tests/
|   |-- unit/
|   |-- integration/
|   |-- contract/
|   `-- regression/
`-- pyproject.toml

frontend/
|-- src/
|   |-- app/
|   |-- components/
|   |-- features/
|   |   |-- workspace/
|   |   |-- content-intake/
|   |   |-- insight-review/
|   |   `-- brief-builder/
|   |-- services/
|   |-- state/
|   `-- styles/
|-- tests/
|   |-- unit/
|   |-- component/
|   `-- e2e/
`-- package.json

data/
|-- app.sqlite
|-- uploads/
`-- previews/
```

**Structure Decision**: Use a web application layout with separate `frontend/`
and `backend/` packages. Keep SQLite metadata and file artifacts under `data/`
for local development. Use `contracts/` to lock the OpenAPI/Swagger API
documentation and UI flow expectations before task generation.

## Complexity Tracking

No constitution violations are introduced by this plan.
