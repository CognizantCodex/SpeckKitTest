"""Workspace route helpers."""

from __future__ import annotations

from dataclasses import asdict

from app.domain.workspace import Workspace


def create_workspace(payload: dict) -> dict:
    workspace = Workspace(
        name=payload["name"],
        description=payload.get("description", ""),
    )
    workspace.validate()
    return asdict(workspace)


def list_workspaces(workspaces: list[Workspace]) -> list[dict]:
    return [asdict(workspace) for workspace in workspaces]
