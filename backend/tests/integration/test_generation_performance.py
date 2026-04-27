import time

from app.application.content_validation import validate_content_batch
from app.application.generation_service import generate_insight_set


def test_generation_fixture_completes_quickly():
    items = validate_content_batch(
        "workspace-1",
        [
            {"display_name": "a.pdf", "file_path": "a.pdf", "file_size_bytes": 100, "checksum": "a"},
            {"display_name": "b.png", "file_path": "b.png", "file_size_bytes": 100, "checksum": "b"},
        ],
    )

    started = time.perf_counter()
    insight_set = generate_insight_set("workspace-1", items)
    elapsed = time.perf_counter() - started

    assert insight_set.status == "completed"
    assert elapsed < 2
