"""Insight set route helpers."""

from __future__ import annotations

from dataclasses import asdict

from app.domain.insight import InsightSet


def list_insight_sets(workspace_id: str, insight_sets: list[InsightSet]) -> list[dict]:
    return [asdict(item) for item in insight_sets if item.workspace_id == workspace_id]
