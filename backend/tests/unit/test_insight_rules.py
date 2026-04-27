import pytest

from app.domain.insight import EvidenceReference, Insight, assign_duplicate_groups, rank_insights


def test_rank_insights_orders_by_relevance_and_confidence():
    low = Insight("set-1", "Low value", "low", "high", "document", 1)
    high = Insight("set-1", "High value", "high", "medium", "document", 2)

    ranked = rank_insights([low, high])

    assert ranked[0].statement == "High value"
    assert ranked[0].rank == 1


def test_duplicate_grouping_uses_normalized_statement():
    first = Insight("set-1", "The same idea", "high", "high", "document", 1)
    second = Insight("set-1", "same idea", "high", "high", "document", 2)

    grouped = assign_duplicate_groups([first, second])

    assert grouped[0].duplicate_group_id == grouped[1].duplicate_group_id


def test_approved_insights_require_evidence():
    insight = Insight("set-1", "Needs evidence", "high", "high", "document", 1)

    with pytest.raises(ValueError):
        insight.update_review_status("approved")

    insight.evidence.append(EvidenceReference(insight.id, "content-1", "page", "page 1"))
    insight.update_review_status("approved")

    assert insight.review_status == "approved"
