"""Insight brief repository."""

from __future__ import annotations

from app.domain.brief import InsightBrief


class BriefRepository:
    def __init__(self) -> None:
        self._briefs: dict[str, InsightBrief] = {}

    def add(self, brief: InsightBrief) -> InsightBrief:
        self._briefs[brief.id] = brief
        return brief

    def update(self, brief: InsightBrief) -> InsightBrief:
        self._briefs[brief.id] = brief
        return brief

    def get(self, brief_id: str) -> InsightBrief:
        return self._briefs[brief_id]

    def list_for_workspace(self, workspace_id: str) -> list[InsightBrief]:
        return [brief for brief in self._briefs.values() if brief.workspace_id == workspace_id]
