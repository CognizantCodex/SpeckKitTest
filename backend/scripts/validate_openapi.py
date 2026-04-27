"""Lightweight OpenAPI contract validation."""

from __future__ import annotations

from pathlib import Path

REQUIRED_MARKERS = [
    "openapi: 3.1.0",
    "operationId: createWorkspace",
    "operationId: startInsightGeneration",
    "operationId: updateInsightReview",
    "operationId: createBrief",
    "operationId: shareBrief",
    "operationId: exportBrief",
]


def validate(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    return [marker for marker in REQUIRED_MARKERS if marker not in text]


if __name__ == "__main__":
    contract = Path(__file__).resolve().parents[2] / "specs/001-multimodal-insights/contracts/openapi.yaml"
    missing = validate(contract)
    if missing:
        raise SystemExit(f"Missing OpenAPI markers: {', '.join(missing)}")
    print(f"OpenAPI contract markers validated: {contract}")
