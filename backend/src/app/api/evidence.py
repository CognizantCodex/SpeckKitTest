"""Evidence route helpers."""

from __future__ import annotations

from dataclasses import asdict

from app.application.evidence_service import list_evidence_for_insight
from app.domain.insight import Insight


def list_evidence(insights: list[Insight], insight_id: str) -> list[dict]:
    return [asdict(item) for item in list_evidence_for_insight(insights, insight_id)]
