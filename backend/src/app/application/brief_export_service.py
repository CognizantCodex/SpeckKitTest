"""Brief share/export helpers."""

from __future__ import annotations

from app.domain.brief import InsightBrief
from app.domain.workspace import utc_now


def share_brief(brief: InsightBrief, target: str = "local-share") -> InsightBrief:
    if brief.status == "blocked":
        raise ValueError("Blocked briefs cannot be shared without resolving warnings.")
    brief.status = "shared"
    brief.shared_at = utc_now()
    brief.share_location = target
    brief.updated_at = brief.shared_at
    return brief


def export_brief(brief: InsightBrief, location: str) -> InsightBrief:
    if brief.status == "blocked":
        raise ValueError("Blocked briefs cannot be exported without resolving warnings.")
    brief.status = "exported"
    brief.exported_at = utc_now()
    brief.export_location = location
    brief.updated_at = brief.exported_at
    return brief
