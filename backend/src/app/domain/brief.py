"""Insight brief domain rules."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Literal
from uuid import uuid4

from app.domain.insight import Insight
from app.domain.workspace import utc_now

BriefStatus = Literal["draft", "ready", "shared", "exported", "blocked"]


@dataclass(slots=True)
class BriefWarning:
    source_id: str
    message: str


@dataclass(slots=True)
class InsightBrief:
    workspace_id: str
    title: str
    summary: str
    insight_ids: list[str]
    status: BriefStatus = "draft"
    warnings: list[BriefWarning] = field(default_factory=list)
    id: str = field(default_factory=lambda: f"brief_{uuid4().hex[:12]}")
    created_at: str = field(default_factory=utc_now)
    updated_at: str = field(default_factory=utc_now)
    shared_at: str | None = None
    exported_at: str | None = None
    share_location: str | None = None
    export_location: str | None = None


def validate_brief_insights(insights: list[Insight]) -> None:
    if not insights:
        raise ValueError("Briefs require at least one insight.")
    not_approved = [insight.id for insight in insights if insight.review_status != "approved"]
    if not_approved:
        raise ValueError("Briefs can only include approved insights.")


def format_citation(insight: Insight) -> str:
    if not insight.evidence:
        return f"{insight.statement} [source unavailable]"
    labels = ", ".join(e.reference_label for e in insight.evidence)
    return f"{insight.statement} [{labels}]"
