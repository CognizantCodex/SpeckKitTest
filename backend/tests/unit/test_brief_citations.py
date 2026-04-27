from app.domain.brief import format_citation
from app.domain.insight import EvidenceReference, Insight


def test_brief_citation_includes_reference_label():
    insight = Insight("set-1", "Important signal", "high", "high", "document", 1)
    insight.evidence.append(EvidenceReference(insight.id, "content-1", "page", "page 5"))

    assert "page 5" in format_citation(insight)
