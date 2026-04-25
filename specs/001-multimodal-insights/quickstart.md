# Quickstart: Multimodal Insight Generation

This quickstart describes the expected local development workflow for the React
frontend, Python backend, and SQLite metadata store.

## Prerequisites

- Python 3.12 or newer available locally.
- Node.js and package manager available locally.
- SQLite command-line tools recommended for inspecting local metadata.
- Browser available for end-to-end validation.

## Local Setup

1. Create backend environment and install backend dependencies.

   ```bash
   cd backend
   python -m venv .venv
   . .venv/bin/activate
   pip install -e ".[dev]"
   ```

2. Install frontend dependencies.

   ```bash
   cd ../frontend
   npm install
   ```

3. Initialize local data directories.

   ```bash
   mkdir -p ../data/uploads ../data/previews
   ```

4. Start the backend service.

   ```bash
   cd ../backend
   . .venv/bin/activate
   python -m app
   ```

5. Start the frontend dev server.

   ```bash
   cd ../frontend
   npm run dev
   ```

## Validation Flow

1. Open the frontend in a browser.
2. Create a workspace named `Multimodal Test Workspace`.
3. Add one sample document, image, audio file, and video file using supported
   formats: PDF, DOCX, TXT, CSV, PNG, JPG, TIFF, MP3, WAV, M4A, MP4, or MOV.
4. Confirm validation feedback appears within 2 seconds for each standard file.
5. Start insight generation.
6. Confirm progress appears within 5 seconds.
7. Confirm the generated insight list includes statements, relevance,
   confidence, content type, and source references.
8. Open the Swagger API documentation and confirm workspace, content,
   generation, insight review, and brief operations are visible.
9. Open evidence for one document insight and one audio or video insight.
10. Mark at least three insights approved and one insight duplicative or
   irrelevant.
11. Create an insight brief from approved insights.
12. Share or export the insight brief.
13. Confirm the brief includes summary, selected insights, citations,
    provenance, generation date, and review status.
14. Return to the workspace history and confirm prior insight sets and briefs
    are visible.

## Test Commands

Run backend checks:

```bash
cd backend
pytest
```

Validate the OpenAPI/Swagger contract:

```bash
cd specs/001-multimodal-insights
npx @redocly/cli lint contracts/openapi.yaml
```

Run frontend checks:

```bash
cd frontend
npm test
npm run test:e2e
```

Run full local quality gate:

```bash
cd backend && pytest
cd ../frontend && npm test && npm run test:e2e
cd ../specs/001-multimodal-insights && npx @redocly/cli lint contracts/openapi.yaml
```

## Regression Coverage

Regression tests must cover:

- Partial analysis failure still returns successful insights from valid content.
- Every approved insight keeps at least one source reference.
- Brief creation preserves citations and provenance.
- Brief share/export preserves citations and provenance.
- Restricted, failed, or unavailable sources trigger warnings before sharing or
  exporting.

## Performance Checks

Use the standard test collection to verify:

- Upload validation feedback within 2 seconds.
- Generation progress visible within 5 seconds.
- Initial ranked insights within 5 minutes for 90% of runs.
- Filtering and review interactions under 1 second for 25 visible insights.
