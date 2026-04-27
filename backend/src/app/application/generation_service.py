"""Insight generation orchestration service."""

from __future__ import annotations

from app.analysis.fixture_adapter import analyze_content_items
from app.domain.content_item import ContentItem
from app.domain.insight import InsightSet
from app.domain.workspace import utc_now


def generate_insight_set(workspace_id: str, content_items: list[ContentItem]) -> InsightSet:
    insight_set = InsightSet(workspace_id=workspace_id, status="generating", started_at=utc_now())
    valid_items = [item for item in content_items if item.can_analyze]
    skipped = [item for item in content_items if not item.can_analyze]

    insights = analyze_content_items(insight_set.id, valid_items)
    insight_set.insights = insights
    insight_set.completed_at = utc_now()

    if insights and skipped:
        insight_set.status = "partial"
        insight_set.failure_summary = _failure_summary(skipped)
    elif insights:
        insight_set.status = "completed"
    else:
        insight_set.status = "failed"
        insight_set.failure_summary = "No analyzable content was available."

    insight_set.summary = f"Generated {len(insights)} ranked insights from {len(valid_items)} content items."
    return insight_set


def _failure_summary(items: list[ContentItem]) -> str:
    names = ", ".join(item.display_name for item in items)
    return f"Skipped {len(items)} content item(s): {names}."
