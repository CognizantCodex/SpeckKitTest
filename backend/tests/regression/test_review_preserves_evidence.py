from app.domain.insight import EvidenceReference, Insight


def test_review_update_preserves_evidence():
    insight = Insight("set-1", "Statement", "high", "high", "document", 1)
    evidence = EvidenceReference(insight.id, "content-1", "page", "page 1")
    insight.evidence.append(evidence)

    insight.update_review_status("approved")

    assert insight.evidence == [evidence]
