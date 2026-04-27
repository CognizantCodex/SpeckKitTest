"""Insight brief assembly service."""

from __future__ import annotations

from app.application.brief_policy import restricted_source_warnings
from app.domain.brief import InsightBrief, format_citation, validate_brief_insights
from app.domain.content_item import ContentItem
from app.domain.insight import Insight


def create_brief(
    workspace_id: str,
    title: str,
    insights: list[Insight],
    content_items: list[ContentItem],
    *,
    allow_warnings: bool = False,
) -> InsightBrief:
    validate_brief_insights(insights)
    warnings = restricted_source_warnings(insights, content_items)
    status = "ready"
    if warnings and not allow_warnings:
        status = "blocked"
    summary = " ".join(format_citation(insight) for insight in insights)
    return InsightBrief(
        workspace_id=workspace_id,
        title=title,
        summary=summary,
        insight_ids=[insight.id for insight in insights],
        status=status,
        warnings=warnings,
    )
