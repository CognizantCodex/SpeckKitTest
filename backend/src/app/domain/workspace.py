"""Workspace domain model."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import UTC, datetime
from typing import Literal
from uuid import uuid4

WorkspaceStatus = Literal["draft", "ready", "generating", "reviewing", "brief_ready", "archived"]


def utc_now() -> str:
    return datetime.now(UTC).isoformat()


@dataclass(slots=True)
class Workspace:
    name: str
    description: str = ""
    status: WorkspaceStatus = "draft"
    id: str = field(default_factory=lambda: f"ws_{uuid4().hex[:12]}")
    created_at: str = field(default_factory=utc_now)
    updated_at: str = field(default_factory=utc_now)

    def validate(self) -> None:
        if not self.name.strip():
            raise ValueError("Workspace name is required.")
        if self.status == "archived":
            raise ValueError("Archived workspaces are read-only.")

    def mark_ready(self) -> None:
        self.status = "ready"
        self.updated_at = utc_now()

    def mark_generating(self) -> None:
        self.status = "generating"
        self.updated_at = utc_now()

    def mark_reviewing(self) -> None:
        self.status = "reviewing"
        self.updated_at = utc_now()

    def mark_brief_ready(self) -> None:
        self.status = "brief_ready"
        self.updated_at = utc_now()
