"""Policy checks for insight brief creation and sharing."""

from __future__ import annotations

from app.domain.brief import BriefWarning
from app.domain.content_item import ContentItem
from app.domain.insight import Insight


def restricted_source_warnings(
    insights: list[Insight],
    content_items: list[ContentItem],
) -> list[BriefWarning]:
    content_by_id = {item.id: item for item in content_items}
    warnings: list[BriefWarning] = []
    for insight in insights:
        for evidence in insight.evidence:
            item = content_by_id.get(evidence.content_item_id)
            if item is None:
                warnings.append(
                    BriefWarning(
                        source_id=evidence.content_item_id,
                        message="Source is unavailable and provenance must be reviewed before sharing.",
                    )
                )
                continue
            if item.restriction_status in {"restricted", "unavailable"}:
                warnings.append(
                    BriefWarning(
                        source_id=item.id,
                        message=f"{item.display_name} is {item.restriction_status} and requires warning.",
                    )
                )
            if item.validation_status in {"failed", "corrupted", "encrypted"}:
                warnings.append(
                    BriefWarning(
                        source_id=item.id,
                        message=f"{item.display_name} failed validation and requires warning.",
                    )
                )
    return warnings
