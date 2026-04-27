from app.application.brief_policy import restricted_source_warnings
from app.domain.content_item import build_content_item
from app.domain.insight import EvidenceReference, Insight


def test_restricted_sources_emit_warnings():
    item = build_content_item(
        "workspace-1",
        "source.pdf",
        "source.pdf",
        100,
        "source",
        restriction_status="restricted",
    )
    insight = Insight("set-1", "Statement", "high", "high", "document", 1)
    insight.evidence.append(EvidenceReference(insight.id, item.id, "page", "page 1"))

    warnings = restricted_source_warnings([insight], [item])

    assert len(warnings) == 1
    assert "restricted" in warnings[0].message
