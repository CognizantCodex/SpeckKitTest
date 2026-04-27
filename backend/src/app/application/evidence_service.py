"""Evidence retrieval service."""

from __future__ import annotations

from app.domain.insight import EvidenceReference, Insight


def list_evidence_for_insight(insights: list[Insight], insight_id: str) -> list[EvidenceReference]:
    for insight in insights:
        if insight.id == insight_id:
            return insight.evidence
    raise KeyError(f"Insight not found: {insight_id}")
