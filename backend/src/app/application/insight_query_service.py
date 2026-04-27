"""Insight filtering and review query helpers."""

from __future__ import annotations

from app.domain.insight import Insight


def filter_insights(
    insights: list[Insight],
    *,
    content_type: str | None = None,
    relevance: str | None = None,
    confidence: str | None = None,
    review_status: str | None = None,
    search: str = "",
) -> list[Insight]:
    query = search.strip().lower()
    result = insights
    if content_type:
        result = [item for item in result if item.originating_content_type == content_type]
    if relevance:
        result = [item for item in result if item.relevance == relevance]
    if confidence:
        result = [item for item in result if item.confidence == confidence]
    if review_status:
        result = [item for item in result if item.review_status == review_status]
    if query:
        result = [item for item in result if query in item.statement.lower()]
    return sorted(result, key=lambda item: item.rank)
