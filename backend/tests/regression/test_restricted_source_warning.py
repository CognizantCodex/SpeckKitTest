from app.application.brief_service import create_brief
from app.domain.content_item import build_content_item
from app.domain.insight import EvidenceReference, Insight


def test_restricted_sources_block_brief_until_warning_allowed():
    item = build_content_item(
        "workspace-1",
        "restricted.pdf",
        "restricted.pdf",
        100,
        "restricted",
        restriction_status="restricted",
    )
    insight = Insight("set-1", "Statement", "high", "high", "document", 1)
    insight.evidence.append(EvidenceReference(insight.id, item.id, "page", "page 1"))
    insight.update_review_status("approved")

    brief = create_brief("workspace-1", "Brief", [insight], [item])

    assert brief.status == "blocked"
    assert brief.warnings
