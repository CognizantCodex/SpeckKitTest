# Tasks: Multimodal Insight Generation

**Input**: Design documents from `/specs/001-multimodal-insights/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml, contracts/swagger.md, contracts/ui-flows.md, quickstart.md

**Tests**: Required by specification and constitution. Tasks are ordered per user request: spec-driven setup, wireframes, UI, database/schema, API, unit tests, end-to-end tests, then regression tests.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other tasks in the same phase when files do not overlap
- **[Story]**: User story label for story phases only
- Every task includes an exact file path

## Phase 1: Spec-Driven Setup

**Purpose**: Lock the feature intent, contracts, and workspace structure before implementation.

- [ ] T001 Create backend project scaffold in backend/pyproject.toml
- [ ] T002 Create backend source package structure in backend/src/app/__init__.py
- [ ] T003 Create frontend project scaffold in frontend/package.json
- [ ] T004 Create frontend source entry point in frontend/src/app/App.tsx
- [ ] T005 Create shared data directories note in data/README.md
- [ ] T006 [P] Create API contract validation script in backend/scripts/validate_openapi.py
- [ ] T007 [P] Create OpenAPI lint command wrapper in specs/001-multimodal-insights/contracts/README.md
- [ ] T008 [P] Create traceability map from requirements to tasks in specs/001-multimodal-insights/traceability.md
- [ ] T009 [P] Create frontend route map from UI flow contract in frontend/src/app/routes.tsx

## Phase 2: Foundational Architecture

**Purpose**: Build shared boundaries required before user-story work begins.

- [ ] T010 Create backend configuration module for data paths and SQLite location in backend/src/app/config/settings.py
- [ ] T011 Create backend API application shell in backend/src/app/api/main.py
- [ ] T012 Create backend domain package exports in backend/src/app/domain/__init__.py
- [ ] T013 Create backend application service package exports in backend/src/app/application/__init__.py
- [ ] T014 Create backend repository package exports in backend/src/app/repositories/__init__.py
- [ ] T015 Create frontend API client base in frontend/src/services/apiClient.ts
- [ ] T016 Create frontend shared UI state components in frontend/src/components/StatusState.tsx
- [ ] T017 Create frontend accessibility helpers in frontend/src/components/a11y.ts
- [ ] T018 Create SQLite migration runner in backend/src/app/repositories/migrations.py
- [ ] T019 Create initial SQLite schema migration file in backend/src/app/repositories/migrations/001_initial.sql
- [ ] T020 Create test fixtures for sample multimodal content metadata in backend/tests/fixtures/content_items.json

## Phase 3: User Story 1 - Generate Insights From Mixed Content (Priority: P1)

**Goal**: Users can create a workspace, add mixed content, start generation, and receive ranked insights with provenance.

**Independent Test**: Provide a mixed-content collection and confirm ranked insights, source references, partial failure handling, and progress feedback.

### Wireframes for User Story 1

- [ ] T021 [P] [US1] Generate workspace and content intake wireframe in specs/001-multimodal-insights/wireframes/us1-content-intake.svg
- [ ] T022 [P] [US1] Generate generation progress wireframe in specs/001-multimodal-insights/wireframes/us1-generation-progress.svg
- [ ] T023 [US1] Document US1 wireframe decisions in specs/001-multimodal-insights/wireframes/us1-notes.md

### UI for User Story 1

- [ ] T024 [P] [US1] Create workspace creation UI in frontend/src/features/workspace/WorkspaceCreate.tsx
- [ ] T025 [P] [US1] Create content intake UI in frontend/src/features/content-intake/ContentIntake.tsx
- [ ] T026 [P] [US1] Create validation status list UI in frontend/src/features/content-intake/ValidationStatusList.tsx
- [ ] T027 [P] [US1] Create generation progress UI in frontend/src/features/content-intake/GenerationProgress.tsx
- [ ] T028 [US1] Wire US1 frontend flow into app routes in frontend/src/app/routes.tsx

### Database and Schema for User Story 1

- [ ] T029 [US1] Add workspace table schema in backend/src/app/repositories/migrations/001_initial.sql
- [ ] T030 [US1] Add content item table schema in backend/src/app/repositories/migrations/001_initial.sql
- [ ] T031 [US1] Add insight set table schema in backend/src/app/repositories/migrations/001_initial.sql
- [ ] T032 [US1] Add insight and evidence reference table schema in backend/src/app/repositories/migrations/001_initial.sql
- [ ] T033 [P] [US1] Create Workspace domain model in backend/src/app/domain/workspace.py
- [ ] T034 [P] [US1] Create ContentItem domain model in backend/src/app/domain/content_item.py
- [ ] T035 [P] [US1] Create InsightSet, Insight, and EvidenceReference domain models in backend/src/app/domain/insight.py
- [ ] T036 [US1] Create workspace repository in backend/src/app/repositories/workspace_repository.py
- [ ] T037 [US1] Create content repository in backend/src/app/repositories/content_repository.py
- [ ] T038 [US1] Create insight repository in backend/src/app/repositories/insight_repository.py

### API for User Story 1

- [ ] T039 [US1] Implement workspace create/list API routes in backend/src/app/api/workspaces.py
- [ ] T040 [US1] Implement content item registration API route in backend/src/app/api/content.py
- [ ] T041 [US1] Implement generation start API route in backend/src/app/api/generation.py
- [ ] T042 [US1] Implement insight set retrieval API route in backend/src/app/api/insights.py
- [ ] T043 [US1] Implement content validation service in backend/src/app/application/content_validation.py
- [ ] T044 [US1] Implement generation orchestration service with adapter interface in backend/src/app/application/generation_service.py
- [ ] T045 [US1] Implement deterministic analysis fixture adapter in backend/src/app/analysis/fixture_adapter.py
- [ ] T046 [US1] Keep OpenAPI workspace, content, generation, and insight operations synchronized in specs/001-multimodal-insights/contracts/openapi.yaml

### Unit Tests for User Story 1

- [ ] T047 [P] [US1] Unit test content validation rules in backend/tests/unit/test_content_validation.py
- [ ] T048 [P] [US1] Unit test generation orchestration partial failure behavior in backend/tests/unit/test_generation_service.py
- [ ] T049 [P] [US1] Unit test insight ranking and duplicate grouping in backend/tests/unit/test_insight_rules.py
- [ ] T050 [P] [US1] Unit test frontend content intake states in frontend/tests/unit/content-intake.test.tsx
- [ ] T051 [P] [US1] Unit test frontend generation progress states in frontend/tests/unit/generation-progress.test.tsx

### End-to-End Tests for User Story 1

- [ ] T052 [US1] Add E2E test for workspace creation, content intake, generation, and insight list in frontend/tests/e2e/us1-generate-insights.spec.ts
- [ ] T053 [US1] Add contract test for workspace, content, generation, and insight routes in backend/tests/contract/test_us1_openapi_contract.py

### Regression Tests for User Story 1

- [ ] T054 [US1] Add regression test that partial content failures still return successful insights in backend/tests/regression/test_partial_generation.py
- [ ] T055 [US1] Add regression test that generated insights keep source references in backend/tests/regression/test_provenance_retention.py

**Checkpoint**: US1 can generate ranked insights from mixed content and show provenance independently.

## Phase 4: User Story 2 - Review and Refine Generated Insights (Priority: P2)

**Goal**: Users can filter insights, inspect evidence, and classify insights as approved, duplicative, irrelevant, or follow-up.

**Independent Test**: Load a completed insight set and confirm filtering, evidence inspection, and review status updates.

### Wireframes for User Story 2

- [ ] T056 [P] [US2] Generate insight review list wireframe in specs/001-multimodal-insights/wireframes/us2-review-list.svg
- [ ] T057 [P] [US2] Generate evidence panel wireframe in specs/001-multimodal-insights/wireframes/us2-evidence-panel.svg
- [ ] T058 [US2] Document US2 wireframe decisions in specs/001-multimodal-insights/wireframes/us2-notes.md

### UI for User Story 2

- [ ] T059 [P] [US2] Create insight review page in frontend/src/features/insight-review/InsightReviewPage.tsx
- [ ] T060 [P] [US2] Create insight filter controls in frontend/src/features/insight-review/InsightFilters.tsx
- [ ] T061 [P] [US2] Create insight card with review actions in frontend/src/features/insight-review/InsightCard.tsx
- [ ] T062 [P] [US2] Create evidence panel UI in frontend/src/features/insight-review/EvidencePanel.tsx
- [ ] T063 [US2] Wire US2 frontend flow into app routes in frontend/src/app/routes.tsx

### Database and Schema for User Story 2

- [ ] T064 [US2] Add review status indexes for insights in backend/src/app/repositories/migrations/001_initial.sql
- [ ] T065 [US2] Add evidence lookup indexes in backend/src/app/repositories/migrations/001_initial.sql
- [ ] T066 [US2] Extend insight repository review methods in backend/src/app/repositories/insight_repository.py
- [ ] T067 [US2] Add review status transition rules in backend/src/app/domain/insight.py

### API for User Story 2

- [ ] T068 [US2] Implement insight review update API route in backend/src/app/api/insights.py
- [ ] T069 [US2] Implement insight filtering query support in backend/src/app/application/insight_query_service.py
- [ ] T070 [US2] Implement evidence retrieval service in backend/src/app/application/evidence_service.py
- [ ] T071 [US2] Keep OpenAPI insight review and evidence schemas synchronized in specs/001-multimodal-insights/contracts/openapi.yaml

### Unit Tests for User Story 2

- [ ] T072 [P] [US2] Unit test insight filter combinations in backend/tests/unit/test_insight_query_service.py
- [ ] T073 [P] [US2] Unit test review status transitions in backend/tests/unit/test_insight_review.py
- [ ] T074 [P] [US2] Unit test evidence reference formatting in backend/tests/unit/test_evidence_reference.py
- [ ] T075 [P] [US2] Unit test insight review UI filters in frontend/tests/unit/insight-filters.test.tsx
- [ ] T076 [P] [US2] Unit test evidence panel accessibility states in frontend/tests/unit/evidence-panel.test.tsx

### End-to-End Tests for User Story 2

- [ ] T077 [US2] Add E2E test for filtering, evidence inspection, and review classification in frontend/tests/e2e/us2-review-insights.spec.ts
- [ ] T078 [US2] Add contract test for insight review route in backend/tests/contract/test_us2_openapi_contract.py

### Regression Tests for User Story 2

- [ ] T079 [US2] Add regression test that evidence remains attached after status updates in backend/tests/regression/test_review_preserves_evidence.py
- [ ] T080 [US2] Add regression test that duplicate groups survive filtering in backend/tests/regression/test_duplicate_filtering.py

**Checkpoint**: US2 can review, filter, inspect, and classify insights without requiring brief generation.

## Phase 5: User Story 3 - Share an Insight Brief (Priority: P3)

**Goal**: Users can select approved insights, create a brief, and preserve citations and provenance.

**Independent Test**: Create a brief from approved insights and confirm summary, citations, provenance, generation date, and review status.

### Wireframes for User Story 3

- [ ] T081 [P] [US3] Generate brief builder wireframe in specs/001-multimodal-insights/wireframes/us3-brief-builder.svg
- [ ] T082 [P] [US3] Generate brief sharing warning wireframe in specs/001-multimodal-insights/wireframes/us3-share-warning.svg
- [ ] T083 [US3] Document US3 wireframe decisions in specs/001-multimodal-insights/wireframes/us3-notes.md

### UI for User Story 3

- [ ] T084 [P] [US3] Create brief builder page in frontend/src/features/brief-builder/BriefBuilderPage.tsx
- [ ] T085 [P] [US3] Create approved insight selector in frontend/src/features/brief-builder/ApprovedInsightSelector.tsx
- [ ] T086 [P] [US3] Create brief preview component in frontend/src/features/brief-builder/BriefPreview.tsx
- [ ] T087 [P] [US3] Create restricted source warning UI in frontend/src/features/brief-builder/RestrictedSourceWarning.tsx
- [ ] T088 [US3] Wire US3 frontend flow into app routes in frontend/src/app/routes.tsx

### Database and Schema for User Story 3

- [ ] T089 [US3] Add insight brief table schema in backend/src/app/repositories/migrations/001_initial.sql
- [ ] T090 [US3] Add brief insight join table schema in backend/src/app/repositories/migrations/001_initial.sql
- [ ] T091 [P] [US3] Create InsightBrief domain model in backend/src/app/domain/brief.py
- [ ] T092 [US3] Create brief repository in backend/src/app/repositories/brief_repository.py
- [ ] T093 [US3] Add brief inclusion validation rules in backend/src/app/domain/brief.py

### API for User Story 3

- [ ] T094 [US3] Implement brief creation API route in backend/src/app/api/briefs.py
- [ ] T095 [US3] Implement brief assembly service in backend/src/app/application/brief_service.py
- [ ] T096 [US3] Implement restricted source warning logic in backend/src/app/application/brief_policy.py
- [ ] T097 [US3] Keep OpenAPI brief schemas and Swagger documentation synchronized in specs/001-multimodal-insights/contracts/openapi.yaml

### Unit Tests for User Story 3

- [ ] T098 [P] [US3] Unit test brief inclusion rules in backend/tests/unit/test_brief_rules.py
- [ ] T099 [P] [US3] Unit test restricted source warning policy in backend/tests/unit/test_brief_policy.py
- [ ] T100 [P] [US3] Unit test brief citation formatting in backend/tests/unit/test_brief_citations.py
- [ ] T101 [P] [US3] Unit test approved insight selector UI in frontend/tests/unit/approved-insight-selector.test.tsx
- [ ] T102 [P] [US3] Unit test brief preview provenance display in frontend/tests/unit/brief-preview.test.tsx

### End-to-End Tests for User Story 3

- [ ] T103 [US3] Add E2E test for selecting approved insights and creating a brief in frontend/tests/e2e/us3-create-brief.spec.ts
- [ ] T104 [US3] Add contract test for brief creation route in backend/tests/contract/test_us3_openapi_contract.py

### Regression Tests for User Story 3

- [ ] T105 [US3] Add regression test that brief creation preserves citations and provenance in backend/tests/regression/test_brief_provenance.py
- [ ] T106 [US3] Add regression test that restricted or unavailable sources trigger sharing warnings in backend/tests/regression/test_restricted_source_warning.py

**Checkpoint**: US3 can create a shareable brief from approved insights with citations and provenance preserved.

## Phase 6: Cross-Story Quality Gates

**Purpose**: Run final checks that span all stories and documentation.

- [ ] T107 Validate Swagger/OpenAPI contract with lint command in specs/001-multimodal-insights/contracts/openapi.yaml
- [ ] T108 Update Swagger documentation notes in specs/001-multimodal-insights/contracts/swagger.md
- [ ] T109 Run backend unit, integration, contract, and regression suite from backend/tests/
- [ ] T110 Run frontend unit, component, and E2E suite from frontend/tests/
- [ ] T111 Run quickstart validation flow and record results in specs/001-multimodal-insights/quickstart.md
- [ ] T112 Update traceability map with completed task references in specs/001-multimodal-insights/traceability.md

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 Setup must complete before foundational architecture work.
- Phase 2 Foundational architecture blocks all user stories.
- User Story 1 is the MVP and should complete before User Story 2 or User Story 3 integration.
- User Story 2 depends on generated insights from User Story 1.
- User Story 3 depends on approved insights from User Story 2.
- Phase 6 runs after all desired user stories are complete.

### User Story Dependencies

- **US1 Generate insights from mixed content**: No story dependency after foundational work.
- **US2 Review and refine generated insights**: Requires US1 insight list and evidence references.
- **US3 Share an insight brief**: Requires US2 approved insight state.

### Requested Work Order Within Each Story

1. Spec-driven traceability and contract alignment.
2. Wireframes.
3. UI.
4. Database/schema work.
5. API.
6. Unit tests.
7. End-to-end tests.
8. Regression tests.

## Parallel Opportunities

- T006-T009 can run in parallel after project scaffolds exist.
- T010-T020 can run in parallel by backend/frontend ownership where files differ.
- US1 wireframes T021-T022 can run in parallel.
- US1 UI components T024-T027 can run in parallel.
- US1 domain models T033-T035 can run in parallel.
- US1 unit tests T047-T051 can run in parallel.
- US2 wireframes T056-T057 and UI components T059-T062 can run in parallel.
- US2 unit tests T072-T076 can run in parallel.
- US3 wireframes T081-T082 and UI components T084-T087 can run in parallel.
- US3 unit tests T098-T102 can run in parallel.

## Parallel Example: User Story 1

```bash
Task: "Generate workspace and content intake wireframe in specs/001-multimodal-insights/wireframes/us1-content-intake.svg"
Task: "Generate generation progress wireframe in specs/001-multimodal-insights/wireframes/us1-generation-progress.svg"
Task: "Create Workspace domain model in backend/src/app/domain/workspace.py"
Task: "Create ContentItem domain model in backend/src/app/domain/content_item.py"
Task: "Create InsightSet, Insight, and EvidenceReference domain models in backend/src/app/domain/insight.py"
Task: "Unit test content validation rules in backend/tests/unit/test_content_validation.py"
Task: "Unit test frontend content intake states in frontend/tests/unit/content-intake.test.tsx"
```

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete all US1 tasks T021-T055.
3. Validate US1 with E2E and regression tasks T052-T055.
4. Stop and demo insight generation with provenance before adding review and brief workflows.

### Incremental Delivery

1. US1 delivers content intake and generated insights.
2. US2 adds review, filtering, evidence inspection, and status classification.
3. US3 adds approved insight brief creation and sharing safeguards.
4. Phase 6 verifies cross-story contracts, Swagger docs, tests, and quickstart.

### Format Validation

All executable tasks above use markdown checkbox format, sequential task IDs,
story labels for user-story phases, and concrete file paths.
