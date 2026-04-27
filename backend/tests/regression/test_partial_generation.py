from app.application.content_validation import validate_content_batch
from app.application.generation_service import generate_insight_set


def test_partial_failures_do_not_block_successful_content():
    items = validate_content_batch(
        "workspace-1",
        [
            {"display_name": "good.pdf", "file_path": "good.pdf", "file_size_bytes": 100, "checksum": "good"},
            {"display_name": "bad.exe", "file_path": "bad.exe", "file_size_bytes": 100, "checksum": "bad"},
        ],
    )

    insight_set = generate_insight_set("workspace-1", items)

    assert insight_set.status == "partial"
    assert insight_set.insights[0].evidence
