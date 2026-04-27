"""Deterministic analysis adapter used for local development and tests."""

from __future__ import annotations

from app.domain.content_item import ContentItem
from app.domain.insight import EvidenceReference, Insight, assign_duplicate_groups, rank_insights


def analyze_content_items(insight_set_id: str, items: list[ContentItem]) -> list[Insight]:
    insights: list[Insight] = []
    for item in items:
        if not item.can_analyze:
            continue
        statement, relevance, confidence = _statement_for_item(item)
        insight = Insight(
            insight_set_id=insight_set_id,
            statement=statement,
            relevance=relevance,
            confidence=confidence,
            originating_content_type=item.content_type,
            rank=len(insights) + 1,
        )
        insight.evidence.append(
            EvidenceReference(
                insight_id=insight.id,
                content_item_id=item.id,
                reference_type=_reference_type_for_item(item),
                reference_label=_reference_label_for_item(item),
                excerpt=f"Deterministic evidence extracted from {item.display_name}.",
                confidence_context=f"{confidence.title()} confidence based on supported {item.content_type} metadata.",
            )
        )
        insights.append(insight)
    return rank_insights(assign_duplicate_groups(insights))


def _statement_for_item(item: ContentItem) -> tuple[str, str, str]:
    if item.content_type == "document":
        return (
            f"{item.display_name} contains themes that can seed an insight brief.",
            "high",
            "high",
        )
    if item.content_type == "image":
        return (
            f"{item.display_name} includes visual evidence that should be reviewed with context.",
            "medium",
            "medium",
        )
    if item.content_type == "audio":
        return (
            f"{item.display_name} may contain spoken signals that complement written sources.",
            "medium",
            "medium",
        )
    return (
        f"{item.display_name} provides time-based evidence for the workspace topic.",
        "medium",
        "low",
    )


def _reference_type_for_item(item: ContentItem) -> str:
    return {
        "document": "page",
        "image": "region",
        "audio": "timestamp",
        "video": "timestamp",
    }.get(item.content_type, "file")


def _reference_label_for_item(item: ContentItem) -> str:
    return {
        "document": "page 1",
        "image": "primary region",
        "audio": "00:00-00:30",
        "video": "00:00-00:30",
    }.get(item.content_type, "source file")
