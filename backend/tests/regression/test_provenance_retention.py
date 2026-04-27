from app.application.content_validation import validate_content_batch
from app.application.generation_service import generate_insight_set


def test_generated_insights_keep_source_references():
    items = validate_content_batch(
        "workspace-1",
        [{"display_name": "source.pdf", "file_path": "source.pdf", "file_size_bytes": 100, "checksum": "source"}],
    )

    insight_set = generate_insight_set("workspace-1", items)

    assert insight_set.insights[0].evidence[0].content_item_id == items[0].id
