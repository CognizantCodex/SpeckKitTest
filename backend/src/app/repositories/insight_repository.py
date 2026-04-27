"""Insight set and evidence repository."""

from __future__ import annotations

from app.domain.insight import EvidenceReference, Insight, InsightSet


class InsightRepository:
    def __init__(self) -> None:
        self._sets: dict[str, InsightSet] = {}

    def add_set(self, insight_set: InsightSet) -> InsightSet:
        self._sets[insight_set.id] = insight_set
        return insight_set

    def list_sets_for_workspace(self, workspace_id: str) -> list[InsightSet]:
        return [item for item in self._sets.values() if item.workspace_id == workspace_id]

    def get_set(self, insight_set_id: str) -> InsightSet:
        return self._sets[insight_set_id]

    def list_insights(self, insight_set_id: str) -> list[Insight]:
        return self._sets[insight_set_id].insights

    def update_review_status(self, insight_id: str, status: str) -> Insight:
        for insight_set in self._sets.values():
            for insight in insight_set.insights:
                if insight.id == insight_id:
                    insight.update_review_status(status)
                    return insight
        raise KeyError(f"Insight not found: {insight_id}")

    def list_evidence(self, insight_id: str) -> list[EvidenceReference]:
        for insight_set in self._sets.values():
            for insight in insight_set.insights:
                if insight.id == insight_id:
                    return insight.evidence
        raise KeyError(f"Insight not found: {insight_id}")
