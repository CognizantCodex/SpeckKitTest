"""Application service for content validation."""

from __future__ import annotations

from app.domain.content_item import ContentItem, build_content_item


def validate_content_batch(workspace_id: str, candidates: list[dict]) -> list[ContentItem]:
    seen: set[str] = set()
    items: list[ContentItem] = []
    for candidate in candidates:
        checksum = candidate.get("checksum") or candidate["display_name"].lower()
        item = build_content_item(
            workspace_id=workspace_id,
            display_name=candidate["display_name"],
            file_path=candidate.get("file_path", ""),
            file_size_bytes=int(candidate.get("file_size_bytes", 0)),
            checksum=checksum,
            duration_seconds=candidate.get("duration_seconds"),
            seen_checksums=seen,
            restriction_status=candidate.get("restriction_status", "none"),
        )
        if item.validation_status == "valid":
            seen.add(checksum)
        items.append(item)
    return items
