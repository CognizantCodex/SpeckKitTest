from app.application.brief_export_service import export_brief, share_brief
from app.domain.brief import InsightBrief


def test_share_and_export_record_locations_without_losing_summary():
    brief = InsightBrief("workspace-1", "Brief", "Summary [page 1]", ["insight-1"], status="ready")

    shared = share_brief(brief, "stakeholder")
    exported = export_brief(shared, "data/previews/brief.md")

    assert "page 1" in exported.summary
    assert exported.share_location == "stakeholder"
    assert exported.export_location == "data/previews/brief.md"
