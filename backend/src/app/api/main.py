"""API application shell."""

from __future__ import annotations

from dataclasses import asdict
from typing import Any

from app.application.content_validation import validate_content_batch
from app.application.generation_service import generate_insight_set
from app.domain.workspace import Workspace


class LocalApi:
    """Tiny route registry used when FastAPI is not installed."""

    def __init__(self) -> None:
        self.routes: dict[str, Any] = {}

    def add_api_route(self, path: str, endpoint: Any, methods: list[str]) -> None:
        self.routes[f"{methods[0]} {path}"] = endpoint


def create_app() -> Any:
    """Create a FastAPI app when available, otherwise return a local registry."""

    try:
        from fastapi import FastAPI
    except ModuleNotFoundError:
        app = LocalApi()
    else:
        app = FastAPI(title="Multimodal Insight Generation API", version="0.1.0")

    workspace = Workspace(name="Sample workspace", description="Local deterministic demo")
    content_items = validate_content_batch(
        workspace.id,
        [
            {
                "display_name": "strategy.pdf",
                "file_path": "data/uploads/strategy.pdf",
                "file_size_bytes": 2048,
                "checksum": "strategy",
            }
        ],
    )
    insight_set = generate_insight_set(workspace.id, content_items)

    def list_workspaces() -> list[dict[str, Any]]:
        return [asdict(workspace)]

    def get_demo_insight_set() -> dict[str, Any]:
        return asdict(insight_set)

    app.add_api_route("/workspaces", list_workspaces, methods=["GET"])
    app.add_api_route("/demo/insight-set", get_demo_insight_set, methods=["GET"])
    return app


app = create_app()
