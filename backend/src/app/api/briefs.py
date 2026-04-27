"""Brief route helpers."""

from __future__ import annotations

from dataclasses import asdict

from app.application.brief_export_service import export_brief, share_brief
from app.application.brief_service import create_brief
from app.domain.brief import InsightBrief
from app.domain.content_item import ContentItem
from app.domain.insight import Insight


def create_insight_brief(
    workspace_id: str,
    payload: dict,
    insights: list[Insight],
    content_items: list[ContentItem],
) -> dict:
    selected = [item for item in insights if item.id in set(payload["insight_ids"])]
    brief = create_brief(
        workspace_id=workspace_id,
        title=payload["title"],
        insights=selected,
        content_items=content_items,
        allow_warnings=payload.get("allow_warnings", False),
    )
    return asdict(brief)


def list_briefs(workspace_id: str, briefs: list[InsightBrief]) -> list[dict]:
    return [asdict(item) for item in briefs if item.workspace_id == workspace_id]


def share_insight_brief(brief: InsightBrief, target: str = "local-share") -> dict:
    return asdict(share_brief(brief, target))


def export_insight_brief(brief: InsightBrief, location: str) -> dict:
    return asdict(export_brief(brief, location))
