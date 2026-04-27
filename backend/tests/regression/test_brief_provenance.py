from app.application.brief_service import create_brief
from app.domain.content_item import build_content_item
from app.domain.insight import EvidenceReference, Insight


def test_brief_creation_preserves_citations_and_provenance():
    item = build_content_item("workspace-1", "source.pdf", "source.pdf", 100, "source")
    insight = Insight("set-1", "Statement", "high", "high", "document", 1)
    insight.evidence.append(EvidenceReference(insight.id, item.id, "page", "page 1"))
    insight.update_review_status("approved")

    brief = create_brief("workspace-1", "Brief", [insight], [item])

    assert "page 1" in brief.summary
    assert brief.insight_ids == [insight.id]
