from app.domain.content_item import MAX_AV_DURATION_SECONDS, MAX_FILE_SIZE_BYTES, validate_content_metadata


def test_first_release_content_limits_are_enforced():
    too_large = validate_content_metadata("large.pdf", MAX_FILE_SIZE_BYTES + 1)
    too_long = validate_content_metadata("long.mov", 1024, duration_seconds=MAX_AV_DURATION_SECONDS + 1)

    assert too_large.status == "failed"
    assert too_long.status == "failed"
