"""Content item repository."""

from __future__ import annotations

from app.domain.content_item import ContentItem


class ContentRepository:
    def __init__(self) -> None:
        self._items: dict[str, ContentItem] = {}

    def add(self, item: ContentItem) -> ContentItem:
        self._items[item.id] = item
        return item

    def list_for_workspace(self, workspace_id: str) -> list[ContentItem]:
        return [item for item in self._items.values() if item.workspace_id == workspace_id]

    def checksums_for_workspace(self, workspace_id: str) -> set[str]:
        return {item.checksum for item in self.list_for_workspace(workspace_id)}
