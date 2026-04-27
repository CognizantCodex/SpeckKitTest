"""Insight and evidence domain rules."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Iterable, Literal
from uuid import uuid4

from app.domain.workspace import utc_now

Relevance = Literal["high", "medium", "low"]
Confidence = Literal["high", "medium", "low", "unknown"]
ReviewStatus = Literal["unreviewed", "approved", "duplicative", "irrelevant", "follow_up"]
InsightSetStatus = Literal["queued", "generating", "completed", "partial", "failed", "cancelled"]
ReferenceType = Literal["page", "region", "timestamp", "segment", "file", "unknown"]

REVIEW_TRANSITIONS: dict[ReviewStatus, set[ReviewStatus]] = {
    "unreviewed": {"approved", "duplicative", "irrelevant", "follow_up"},
    "approved": {"follow_up"},
    "duplicative": {"approved", "irrelevant", "follow_up"},
    "irrelevant": {"approved", "duplicative", "follow_up"},
    "follow_up": {"approved", "duplicative", "irrelevant"},
}

RELEVANCE_SCORE = {"high": 3, "medium": 2, "low": 1}
CONFIDENCE_SCORE = {"high": 3, "medium": 2, "low": 1, "unknown": 0}


@dataclass(slots=True)
class EvidenceReference:
    insight_id: str
    content_item_id: str
    reference_type: ReferenceType
    reference_label: str
    excerpt: str = ""
    confidence_context: str = ""
    id: str = field(default_factory=lambda: f"evidence_{uuid4().hex[:12]}")
    created_at: str = field(default_factory=utc_now)


@dataclass(slots=True)
class Insight:
    insight_set_id: str
    statement: str
    relevance: Relevance
    confidence: Confidence
    originating_content_type: str
    rank: int
    review_status: ReviewStatus = "unreviewed"
    duplicate_group_id: str | None = None
    evidence: list[EvidenceReference] = field(default_factory=list)
    id: str = field(default_factory=lambda: f"insight_{uuid4().hex[:12]}")
    created_at: str = field(default_factory=utc_now)
    updated_at: str = field(default_factory=utc_now)

    def update_review_status(self, next_status: ReviewStatus) -> None:
        if next_status == self.review_status:
            return
        allowed = REVIEW_TRANSITIONS.get(self.review_status, set())
        if next_status not in allowed:
            raise ValueError(f"Cannot move insight from {self.review_status} to {next_status}.")
        if next_status == "approved" and not self.evidence:
            raise ValueError("Approved insights require at least one evidence reference.")
        self.review_status = next_status
        self.updated_at = utc_now()


@dataclass(slots=True)
class InsightSet:
    workspace_id: str
    status: InsightSetStatus
    summary: str = ""
    failure_summary: str = ""
    insights: list[Insight] = field(default_factory=list)
    id: str = field(default_factory=lambda: f"iset_{uuid4().hex[:12]}")
    started_at: str | None = None
    completed_at: str | None = None


def rank_insights(insights: Iterable[Insight]) -> list[Insight]:
    ordered = sorted(
        insights,
        key=lambda item: (
            -RELEVANCE_SCORE[item.relevance],
            -CONFIDENCE_SCORE[item.confidence],
            item.statement.lower(),
        ),
    )
    for index, insight in enumerate(ordered, start=1):
        insight.rank = index
    return ordered


def duplicate_key(statement: str) -> str:
    words = [word.strip(".,:;!?").lower() for word in statement.split()]
    return " ".join(word for word in words if word and word not in {"the", "a", "an", "and"})


def assign_duplicate_groups(insights: Iterable[Insight]) -> list[Insight]:
    seen: dict[str, str] = {}
    grouped: list[Insight] = []
    for insight in insights:
        key = duplicate_key(insight.statement)
        if key in seen:
            insight.duplicate_group_id = seen[key]
        else:
            seen[key] = f"dup_{uuid4().hex[:8]}"
            insight.duplicate_group_id = seen[key]
        grouped.append(insight)
    return grouped
