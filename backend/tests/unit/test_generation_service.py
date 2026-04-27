from app.application.content_validation import validate_content_batch
from app.application.generation_service import generate_insight_set


def test_generation_returns_partial_results_for_failed_content():
    items = validate_content_batch(
        "workspace-1",
        [
            {"display_name": "summary.pdf", "file_path": "summary.pdf", "file_size_bytes": 100, "checksum": "a"},
            {"display_name": "tool.exe", "file_path": "tool.exe", "file_size_bytes": 100, "checksum": "b"},
        ],
    )

    insight_set = generate_insight_set("workspace-1", items)

    assert insight_set.status == "partial"
    assert len(insight_set.insights) == 1
    assert "Skipped" in insight_set.failure_summary
