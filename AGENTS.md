# spec-kit-test Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-25

## Active Technologies

- Python 3.12+ backend, TypeScript 5.x React frontend, Vite, FastAPI-style HTTP service, OpenAPI/Swagger API documentation, SQLite metadata storage, pytest, Vitest, React Testing Library, Playwright (001-multimodal-insights)

## Project Structure

```text
backend/
frontend/
data/
specs/
```

## Commands

cd backend && pytest
cd frontend && npm test && npm run test:e2e
cd specs/001-multimodal-insights && npx @redocly/cli lint contracts/openapi.yaml

## Code Style

Python backend: keep API routes, application services, domain models, repositories, and analysis adapters separate.
API contracts: keep OpenAPI/Swagger files source-controlled and synchronized with backend route behavior.
React frontend: keep upload, generation progress, insight review, evidence, and brief builder UI states independently testable.

## Recent Changes

- 001-multimodal-insights: Added React frontend, Python backend, local SQLite metadata storage, OpenAPI contracts, and E2E/regression quality gates.

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
