"""Generation route helpers."""

from __future__ import annotations

from dataclasses import asdict

from app.application.generation_service import generate_insight_set
from app.domain.content_item import ContentItem


def start_generation(workspace_id: str, content_items: list[ContentItem]) -> dict:
    return asdict(generate_insight_set(workspace_id, content_items))
