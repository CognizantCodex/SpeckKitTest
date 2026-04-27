"""Insight route helpers."""

from __future__ import annotations

from dataclasses import asdict

from app.application.insight_query_service import filter_insights
from app.domain.insight import Insight


def list_filtered_insights(insights: list[Insight], filters: dict) -> list[dict]:
    return [asdict(item) for item in filter_insights(insights, **filters)]


def update_insight_review(insights: list[Insight], insight_id: str, status: str) -> dict:
    for insight in insights:
        if insight.id == insight_id:
            insight.update_review_status(status)
            return asdict(insight)
    raise KeyError(f"Insight not found: {insight_id}")
