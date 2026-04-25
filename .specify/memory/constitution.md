<!--
Sync Impact Report
Version change: 1.0.0 -> 1.1.0
Modified principles:
- I. Code Quality Is a Release Requirement -> I. Code Quality Is a Release Requirement
- II. Tests Define Expected Behavior -> III. Unit Tests Define Local Behavior
- III. User Experience Stays Consistent -> V. User Experience Stays Consistent
- IV. Performance Budgets Are Explicit -> VI. Performance Budgets Are Explicit
- V. Maintainability Over Cleverness -> II. Architecture Has Explicit Boundaries
Added principles:
- IV. End-to-End and Regression Tests Protect User Journeys
Added sections:
- Testing Standards
Removed sections:
- None
Templates requiring updates:
- .specify/templates/plan-template.md: updated
- .specify/templates/spec-template.md: updated
- .specify/templates/tasks-template.md: updated
- .specify/templates/commands/*.md: not present
Follow-up TODOs:
- None
-->
# Spec Kit Test Constitution

## Core Principles

### I. Code Quality Is a Release Requirement
All production code MUST be readable, cohesive, and easy to change. Each change
MUST use the project's established patterns for structure, naming, error handling,
and dependency boundaries. New abstractions MUST be justified by repeated behavior
or meaningful complexity reduction. Dead code, broad rewrites, unchecked errors,
unchecked warnings, and hidden global state are not acceptable in releasable work.

Rationale: consistent, simple code keeps future feature work faster and safer than
short-term cleverness.

### II. Architecture Has Explicit Boundaries
Each plan MUST state the chosen architecture, the affected layers or modules, and
the dependency direction. Business rules MUST stay separate from transport,
framework, persistence, and presentation details unless the plan documents why that
separation is not practical. Shared contracts, data models, and public interfaces
MUST be versioned or migrated deliberately when they change.

Rationale: explicit architecture prevents accidental coupling and makes each
feature easier to test, review, and evolve.

### III. Unit Tests Define Local Behavior
Every behavioral change MUST include unit tests for deterministic business logic,
validation rules, mapping, formatting, calculations, reducers, utilities, and
boundary conditions. Unit tests MUST be fast, isolated from external services, and
clear about the behavior being protected. Bug fixes MUST include a regression unit
test when the failure can be reproduced below the integration or end-to-end layer.

Rationale: unit tests give immediate feedback and make local behavior safe to
change.

### IV. End-to-End and Regression Tests Protect User Journeys
User-visible workflows, service contracts, persistence boundaries, authentication
paths, and integrations MUST have integration, contract, or end-to-end coverage at
the lowest level that proves the behavior. Each feature MUST identify regression
risks and add regression tests for previously broken or high-risk flows. End-to-end
tests MUST cover at least the primary success path and critical failure path when a
feature changes a user journey.

Rationale: users experience complete workflows, so test coverage must protect more
than isolated functions.

### V. User Experience Stays Consistent
User-facing changes MUST follow existing interaction, accessibility, copy, visual,
and navigation conventions. Each feature specification MUST define the primary user
journeys, success states, empty states, loading states, and error states affected by
the change. Interfaces MUST be usable with keyboard and assistive technologies
where the target platform supports them.

Rationale: users experience the product as one system, so every feature must feel
like it belongs to the same product.

### VI. Performance Budgets Are Explicit
Each plan MUST state measurable performance goals or explicitly mark performance as
not applicable with rationale. Features that affect request latency, startup time,
rendering, data processing, memory use, database query count, or bundle size MUST
include a budget and a verification method. Code that exceeds an agreed budget MUST
not ship without a documented tradeoff and follow-up plan.

Rationale: performance is a product requirement, not a late-stage cleanup task.

## Engineering Standards

Code reviews MUST verify constitution compliance before approval. Reviewers MUST
check for clear structure, focused scope, tested behavior, architecture boundaries,
UX consistency, accessibility considerations, regression risk, and performance
impact. Any exception to a MUST rule requires a written justification in the plan
or pull request, including the reason, risk, owner, and follow-up date.

Quality gates for each feature:

- Linting and formatting pass using the project's configured tools.
- Unit tests cover new or changed local behavior.
- Integration, contract, end-to-end, or regression tests cover cross-boundary and
  user-visible behavior.
- Architecture boundaries and dependency direction are documented in the plan.
- User-visible flows include success, loading, empty, and error states where
  applicable.
- Performance budgets are measured or explicitly marked not applicable.
- Documentation and contracts stay aligned with shipped behavior.

## Testing Standards

Unit tests MUST be deterministic, isolated, and runnable without network services
unless the project provides an explicit local test fixture. Integration tests MUST
exercise real module boundaries or service contracts without duplicating unit test
assertions. End-to-end tests MUST focus on critical user journeys and avoid brittle
implementation details. Regression tests MUST name the broken behavior or issue
they protect and MUST remain in the suite after the fix ships.

Test data MUST be explicit, minimal, and safe to run repeatedly. Flaky tests MUST
be fixed, quarantined with an owner and deadline, or removed with documented
replacement coverage. A feature is not complete until its required tests pass in
the documented local or CI command.

## Delivery Workflow

Specifications MUST describe independently testable user journeys and measurable
success criteria. Plans MUST record the technical approach, architecture decision,
quality gates, unit test strategy, integration or end-to-end strategy, regression
risk, UX impact, and performance budget before implementation starts. Tasks MUST be
grouped so each user story can be implemented, tested, and validated independently.

Implementation proceeds in small, reviewable changes. Teams SHOULD deliver the
highest-priority user journey first, validate it independently, and then add
subsequent journeys without breaking previous behavior. Any discovered ambiguity
MUST be resolved in the specification or plan before dependent implementation
continues.

## Governance

This constitution supersedes conflicting local practices for all work in this
project. Amendments require an updated constitution, a Sync Impact Report, and
updates to affected templates or workflow documents in the same change.

Versioning follows semantic versioning:

- MAJOR for removed or redefined principles that change governance expectations.
- MINOR for new principles, new required sections, or materially expanded rules.
- PATCH for clarifications that do not change required behavior.

Compliance is reviewed during planning, task generation, implementation, and code
review. A plan or pull request that violates the constitution MUST document the
violation in Complexity Tracking or equivalent review notes before work proceeds.

**Version**: 1.1.0 | **Ratified**: 2026-04-25 | **Last Amended**: 2026-04-25
