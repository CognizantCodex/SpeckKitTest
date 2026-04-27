from app.application.insight_query_service import filter_insights
from app.domain.insight import Insight


def test_filter_insights_by_review_and_search():
    approved = Insight("set-1", "Revenue signal", "high", "high", "document", 1, review_status="approved")
    other = Insight("set-1", "Noise", "low", "low", "audio", 2)

    result = filter_insights([approved, other], review_status="approved", search="revenue")

    assert result == [approved]
