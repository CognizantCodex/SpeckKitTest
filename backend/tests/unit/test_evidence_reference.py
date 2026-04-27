from app.application.evidence_service import list_evidence_for_insight
from app.domain.insight import EvidenceReference, Insight


def test_evidence_lookup_returns_attached_references():
    insight = Insight("set-1", "Statement", "high", "high", "document", 1)
    evidence = EvidenceReference(insight.id, "content-1", "page", "page 2")
    insight.evidence.append(evidence)

    assert list_evidence_for_insight([insight], insight.id) == [evidence]
