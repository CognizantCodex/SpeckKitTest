from app.domain.content_item import MAX_AV_DURATION_SECONDS, MAX_FILE_SIZE_BYTES, validate_content_metadata


def test_supported_file_extensions_are_valid():
    result = validate_content_metadata("summary.pdf", 1024)

    assert result.status == "valid"
    assert result.content_type == "document"


def test_unsupported_extension_is_rejected():
    result = validate_content_metadata("program.exe", 1024)

    assert result.status == "unsupported"


def test_size_and_duration_limits_are_enforced():
    large = validate_content_metadata("video.mp4", MAX_FILE_SIZE_BYTES + 1, duration_seconds=60)
    long = validate_content_metadata("audio.mp3", 1024, duration_seconds=MAX_AV_DURATION_SECONDS + 1)

    assert large.status == "failed"
    assert long.status == "failed"
