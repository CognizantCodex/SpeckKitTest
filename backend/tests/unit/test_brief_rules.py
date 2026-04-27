import pytest

from app.domain.brief import validate_brief_insights
from app.domain.insight import EvidenceReference, Insight


def test_brief_requires_approved_insights():
    insight = Insight("set-1", "Statement", "high", "high", "document", 1)
    insight.evidence.append(EvidenceReference(insight.id, "content-1", "page", "page 1"))

    with pytest.raises(ValueError):
        validate_brief_insights([insight])

    insight.update_review_status("approved")
    validate_brief_insights([insight])
