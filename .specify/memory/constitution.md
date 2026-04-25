<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template principle 1 -> I. Code Quality Is a Release Requirement
- Template principle 2 -> II. Tests Define Expected Behavior
- Template principle 3 -> III. User Experience Stays Consistent
- Template principle 4 -> IV. Performance Budgets Are Explicit
- Template principle 5 -> V. Maintainability Over Cleverness
Added sections:
- Engineering Standards
- Delivery Workflow
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
and hidden global state are not acceptable in releasable work.

Rationale: consistent, simple code keeps future feature work faster and safer than
short-term cleverness.

### II. Tests Define Expected Behavior
Every behavioral change MUST include automated tests that demonstrate the intended
outcome and protect against regression. Tests MUST be written at the lowest useful
level, with integration or end-to-end coverage for user-visible flows, service
contracts, persistence boundaries, and cross-module behavior. Bug fixes MUST include
a regression test that fails without the fix unless the team documents why such a
test is impractical.

Rationale: tests are the executable agreement between the specification, the plan,
and the code.

### III. User Experience Stays Consistent
User-facing changes MUST follow existing interaction, accessibility, copy, visual,
and navigation conventions. Each feature specification MUST define the primary user
journeys, success states, empty states, loading states, and error states affected by
the change. Interfaces MUST be usable with keyboard and assistive technologies
where the target platform supports them.

Rationale: users experience the product as one system, so every feature must feel
like it belongs to the same product.

### IV. Performance Budgets Are Explicit
Each plan MUST state measurable performance goals or explicitly mark performance as
not applicable with rationale. Features that affect request latency, startup time,
rendering, data processing, memory use, or bundle size MUST include a budget and a
verification method. Code that exceeds an agreed budget MUST not ship without a
documented tradeoff and follow-up plan.

Rationale: performance is a product requirement, not a late-stage cleanup task.

### V. Maintainability Over Cleverness
Solutions MUST favor clear control flow, small modules, typed or validated
interfaces where available, and explicit ownership of side effects. Plans MUST call
out complexity risks and choose the simplest design that satisfies the user
scenarios, quality gates, and performance budget. Documentation MUST be updated
when behavior, setup, contracts, or operational expectations change.

Rationale: maintainable systems preserve team speed while reducing avoidable
production risk.

## Engineering Standards

Code reviews MUST verify constitution compliance before approval. Reviewers MUST
check for clear structure, focused scope, tested behavior, UX consistency,
accessibility considerations, and performance impact. Any exception to a MUST rule
requires a written justification in the plan or pull request, including the reason,
risk, owner, and follow-up date.

Quality gates for each feature:

- Linting and formatting pass using the project's configured tools.
- Automated tests cover new or changed behavior.
- User-visible flows include success, loading, empty, and error states where
  applicable.
- Performance budgets are measured or explicitly marked not applicable.
- Documentation and contracts stay aligned with shipped behavior.

## Delivery Workflow

Specifications MUST describe independently testable user journeys and measurable
success criteria. Plans MUST record the technical approach, quality gates, test
strategy, UX impact, and performance budget before implementation starts. Tasks
MUST be grouped so each user story can be implemented, tested, and validated
independently.

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

**Version**: 1.0.0 | **Ratified**: 2026-04-25 | **Last Amended**: 2026-04-25
