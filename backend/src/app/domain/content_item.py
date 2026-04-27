"""Content item domain model and validation rules."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Literal
from uuid import uuid4

from app.domain.workspace import utc_now

ContentType = Literal["document", "image", "audio", "video"]
ValidationStatus = Literal[
    "pending",
    "valid",
    "unsupported",
    "corrupted",
    "encrypted",
    "empty",
    "duplicate",
    "failed",
]
ProcessingStatus = Literal[
    "not_started",
    "queued",
    "processing",
    "processed",
    "partial",
    "failed",
    "skipped",
]
RestrictionStatus = Literal["none", "restricted", "unavailable"]

MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024
MAX_AV_DURATION_SECONDS = 2 * 60 * 60

SUPPORTED_MEDIA_TYPES: dict[str, tuple[ContentType, str]] = {
    ".pdf": ("document", "application/pdf"),
    ".docx": (
        "document",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ),
    ".txt": ("document", "text/plain"),
    ".csv": ("document", "text/csv"),
    ".png": ("image", "image/png"),
    ".jpg": ("image", "image/jpeg"),
    ".jpeg": ("image", "image/jpeg"),
    ".tif": ("image", "image/tiff"),
    ".tiff": ("image", "image/tiff"),
    ".mp3": ("audio", "audio/mpeg"),
    ".wav": ("audio", "audio/wav"),
    ".m4a": ("audio", "audio/mp4"),
    ".mp4": ("video", "video/mp4"),
    ".mov": ("video", "video/quicktime"),
}


@dataclass(frozen=True, slots=True)
class ValidationResult:
    status: ValidationStatus
    content_type: ContentType | None
    media_type: str | None
    failure_reason: str = ""

    @property
    def is_valid(self) -> bool:
        return self.status == "valid"


@dataclass(slots=True)
class ContentItem:
    workspace_id: str
    display_name: str
    file_path: str
    file_size_bytes: int
    checksum: str
    content_type: ContentType
    media_type: str
    duration_seconds: int | None = None
    validation_status: ValidationStatus = "pending"
    processing_status: ProcessingStatus = "not_started"
    restriction_status: RestrictionStatus = "none"
    failure_reason: str = ""
    id: str = field(default_factory=lambda: f"content_{uuid4().hex[:12]}")
    created_at: str = field(default_factory=utc_now)
    updated_at: str = field(default_factory=utc_now)

    @property
    def can_analyze(self) -> bool:
        return self.validation_status == "valid" and self.restriction_status != "unavailable"


def classify_media(display_name: str) -> tuple[ContentType | None, str | None]:
    extension = Path(display_name).suffix.lower()
    return SUPPORTED_MEDIA_TYPES.get(extension, (None, None))


def validate_content_metadata(
    display_name: str,
    file_size_bytes: int,
    duration_seconds: int | None = None,
    checksum: str | None = None,
    seen_checksums: set[str] | None = None,
) -> ValidationResult:
    """Validate metadata before analysis."""

    content_type, media_type = classify_media(display_name)
    if content_type is None or media_type is None:
        return ValidationResult("unsupported", None, None, "Unsupported file type.")
    if file_size_bytes <= 0:
        return ValidationResult("empty", content_type, media_type, "File is empty.")
    if file_size_bytes > MAX_FILE_SIZE_BYTES:
        return ValidationResult(
            "failed",
            content_type,
            media_type,
            "File exceeds the 500 MB first-release limit.",
        )
    if content_type in {"audio", "video"} and duration_seconds is not None:
        if duration_seconds > MAX_AV_DURATION_SECONDS:
            return ValidationResult(
                "failed",
                content_type,
                media_type,
                "Audio or video exceeds the 2 hour first-release limit.",
            )
    if checksum and seen_checksums and checksum in seen_checksums:
        return ValidationResult("duplicate", content_type, media_type, "Duplicate content item.")
    return ValidationResult("valid", content_type, media_type)


def build_content_item(
    workspace_id: str,
    display_name: str,
    file_path: str,
    file_size_bytes: int,
    checksum: str,
    duration_seconds: int | None = None,
    seen_checksums: set[str] | None = None,
    restriction_status: RestrictionStatus = "none",
) -> ContentItem:
    result = validate_content_metadata(
        display_name=display_name,
        file_size_bytes=file_size_bytes,
        duration_seconds=duration_seconds,
        checksum=checksum,
        seen_checksums=seen_checksums,
    )
    if result.content_type is None or result.media_type is None:
        content_type: ContentType = "document"
        media_type = "application/octet-stream"
    else:
        content_type = result.content_type
        media_type = result.media_type
    return ContentItem(
        workspace_id=workspace_id,
        display_name=display_name,
        file_path=file_path,
        file_size_bytes=file_size_bytes,
        checksum=checksum,
        content_type=content_type,
        media_type=media_type,
        duration_seconds=duration_seconds,
        validation_status=result.status,
        restriction_status=restriction_status,
        failure_reason=result.failure_reason,
    )
