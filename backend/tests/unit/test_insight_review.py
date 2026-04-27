from app.domain.insight import EvidenceReference, Insight


def test_review_status_transition_to_follow_up_and_approved():
    insight = Insight("set-1", "Statement", "high", "high", "document", 1)
    insight.evidence.append(EvidenceReference(insight.id, "content-1", "page", "page 1"))

    insight.update_review_status("follow_up")
    insight.update_review_status("approved")

    assert insight.review_status == "approved"
