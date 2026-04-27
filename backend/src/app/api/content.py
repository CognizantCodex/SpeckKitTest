"""Content route helpers."""

from __future__ import annotations

from dataclasses import asdict

from app.domain.content_item import build_content_item


def add_content_item(workspace_id: str, payload: dict) -> dict:
    item = build_content_item(
        workspace_id=workspace_id,
        display_name=payload["display_name"],
        file_path=payload.get("file_path", ""),
        file_size_bytes=int(payload.get("file_size_bytes", 0)),
        checksum=payload.get("checksum", payload["display_name"].lower()),
        duration_seconds=payload.get("duration_seconds"),
        restriction_status=payload.get("restriction_status", "none"),
    )
    return asdict(item)
