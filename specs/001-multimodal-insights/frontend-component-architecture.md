# React Component Architecture: Multimodal Insight Generation

## Purpose

This document defines the React component architecture for the multimodal
insight generation application. It keeps the frontend implementation consistent
across workspace creation, content intake, generation progress, insight review,
evidence inspection, and brief creation.

## Architecture Principles

- Use feature-first folders for domain workflows and reserve shared components
  for reusable UI building blocks.
- Keep route orchestration in `frontend/src/app/`; keep domain behavior inside
  `frontend/src/features/`.
- Keep API calls in `frontend/src/services/` and feature hooks; do not call
  `fetch` directly from presentational components.
- Use direct imports from the source file that owns the component. Avoid broad
  barrel files so bundle splitting remains predictable.
- Co-locate feature-specific hooks, model helpers, and component tests with the
  feature they support.
- Keep components keyboard operable and screen-reader friendly by default,
  including upload progress, validation feedback, evidence panels, and sharing
  warnings.
- Use lazy loading for heavy or lower-priority UI surfaces such as evidence
  inspection, media previews, and brief preview.
- Use `startTransition` or `useDeferredValue` for non-urgent filtering and
  review-list updates so typing and selection remain responsive.

## Source Layout

```text
frontend/
|-- src/
|   |-- app/
|   |   |-- App.tsx
|   |   |-- routes.tsx
|   |   `-- providers.tsx
|   |-- components/
|   |   |-- a11y/
|   |   |   |-- FocusTrap.tsx
|   |   |   `-- LiveRegion.tsx
|   |   |-- feedback/
|   |   |   |-- EmptyState.tsx
|   |   |   |-- ErrorState.tsx
|   |   |   `-- StatusState.tsx
|   |   |-- layout/
|   |   |   |-- AppShell.tsx
|   |   |   `-- WorkspaceNavigation.tsx
|   |   `-- primitives/
|   |       |-- Button.tsx
|   |       |-- Panel.tsx
|   |       `-- StatusBadge.tsx
|   |-- features/
|   |   |-- workspace/
|   |   |   |-- components/
|   |   |   |-- hooks/
|   |   |   `-- model/
|   |   |-- content-intake/
|   |   |   |-- components/
|   |   |   |-- hooks/
|   |   |   `-- model/
|   |   |-- insight-review/
|   |   |   |-- components/
|   |   |   |-- hooks/
|   |   |   `-- model/
|   |   `-- brief-builder/
|   |       |-- components/
|   |       |-- hooks/
|   |       `-- model/
|   |-- services/
|   |   |-- apiClient.ts
|   |   |-- contracts.ts
|   |   `-- workspaceApi.ts
|   |-- state/
|   |   `-- sessionStore.ts
|   `-- styles/
|       |-- tokens.css
|       `-- app.css
|-- tests/
|   |-- unit/
|   |-- component/
|   `-- e2e/
`-- package.json
```

## Component Tree

```text
App
`-- AppProviders
    `-- AppShell
        |-- WorkspaceNavigation
        |-- WorkspaceRoutes
        |   |-- WorkspaceCreatePage
        |   |-- WorkspaceHistoryPage
        |   `-- ContentIntakePage
        |       |-- ContentDropzone
        |       |-- ValidationStatusList
        |       `-- GenerationProgress
        |-- InsightReviewPage
        |   |-- InsightFilters
        |   |-- InsightList
        |   |   `-- InsightCard
        |   `-- EvidencePanel
        `-- BriefBuilderPage
            |-- ApprovedInsightSelector
            |-- BriefPreview
            |-- RestrictedSourceWarning
            `-- BriefShareActions
```

## Layer Responsibilities

### App Layer

`frontend/src/app/` owns application bootstrapping, providers, route objects,
lazy route boundaries, and global layout composition. It does not own domain
business rules.

### Shared Components

`frontend/src/components/` contains UI that is reused by more than one feature.
Shared components must stay presentation-focused and receive data through typed
props. They should not import feature models or call APIs.

### Feature Components

`frontend/src/features/{feature}/components/` contains page and workflow UI for
one domain area. Feature components may compose shared components and feature
hooks, but should keep persistence and API details behind services or hooks.

### Feature Hooks

`frontend/src/features/{feature}/hooks/` contains stateful workflow logic, such
as content validation state, insight filtering, evidence selection, and brief
builder state. Split hooks by dependency and render behavior so changes in one
workflow do not force unrelated components to re-render.

### Feature Models

`frontend/src/features/{feature}/model/` contains frontend-only mappers, view
models, option lists, and derived-state helpers. These helpers should be pure
and easy to unit test.

### Services

`frontend/src/services/` owns the typed OpenAPI client, API DTO types, request
helpers, and endpoint-specific service modules. Service modules translate API
responses into frontend view models before data reaches components.

## Data Flow

1. A route renders a feature page through `frontend/src/app/routes.tsx`.
2. The feature page composes feature components and hooks.
3. Feature hooks call service modules for backend data.
4. Services call the OpenAPI-aligned backend API and normalize responses.
5. Components render normalized view models and emit user intent through props
   or feature hook actions.

Transient UI state, such as selected evidence, open panels, active filters, and
draft brief sections, should remain local to the nearest feature hook unless it
is needed across routes.

## Performance Rules

- Lazy load `EvidencePanel`, media preview components, and `BriefPreview`.
- Preload lazy components on hover or focus when a user is likely to open them.
- Use `useDeferredValue` for search/filter text that drives insight list
  rendering.
- Use `startTransition` for non-urgent review-list recalculation after filter,
  sort, or status changes.
- Keep list rendering bounded by the 25 visible insight performance goal.
- Build `Map` or `Set` indexes for repeated evidence, insight, and brief lookup
  operations.
- Avoid effects for state that can be derived during render from props, route
  params, or hook state.

## Accessibility Rules

- Preserve focus when opening and closing evidence panels, share dialogs, and
  restricted-source warnings.
- Announce upload validation, generation progress, failed content, and export
  status through live regions.
- Keep all review actions available by keyboard.
- Use semantic headings for workspace, insight review, and brief builder pages.
- Ensure warnings identify the affected sources and the action the user is
  about to take.

## Testing Ownership

- Unit tests cover pure model helpers, mappers, and hook state transitions.
- Component tests cover shared components and feature workflow components with
  mocked service boundaries.
- E2E tests cover full flows: content intake to insights, review to evidence,
  and approved insights to shared brief.
- Regression tests protect provenance, partial failure handling, restricted
  source warnings, and share/export citation preservation.

## Initial Component Ownership

| Area | Primary components | Owner path |
|------|--------------------|------------|
| App shell | `AppShell`, `WorkspaceNavigation` | `frontend/src/components/layout/` |
| Workspace | `WorkspaceCreatePage`, `WorkspaceHistoryPage` | `frontend/src/features/workspace/` |
| Content intake | `ContentDropzone`, `ValidationStatusList`, `GenerationProgress` | `frontend/src/features/content-intake/` |
| Insight review | `InsightReviewPage`, `InsightFilters`, `InsightList`, `InsightCard`, `EvidencePanel` | `frontend/src/features/insight-review/` |
| Brief builder | `BriefBuilderPage`, `ApprovedInsightSelector`, `BriefPreview`, `RestrictedSourceWarning`, `BriefShareActions` | `frontend/src/features/brief-builder/` |
| Shared UI | `Button`, `Panel`, `StatusBadge`, `StatusState`, `LiveRegion` | `frontend/src/components/` |
