"""Workspace repository."""

from __future__ import annotations

from app.domain.workspace import Workspace


class WorkspaceRepository:
    def __init__(self) -> None:
        self._workspaces: dict[str, Workspace] = {}

    def add(self, workspace: Workspace) -> Workspace:
        if any(item.name == workspace.name for item in self._workspaces.values()):
            raise ValueError("Workspace name must be unique.")
        self._workspaces[workspace.id] = workspace
        return workspace

    def get(self, workspace_id: str) -> Workspace:
        return self._workspaces[workspace_id]

    def list(self) -> list[Workspace]:
        return sorted(self._workspaces.values(), key=lambda item: item.created_at)
