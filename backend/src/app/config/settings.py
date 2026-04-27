"""Application settings for local development."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    """Resolved local filesystem settings."""

    project_root: Path
    data_dir: Path
    sqlite_path: Path
    uploads_dir: Path
    previews_dir: Path


def load_settings(project_root: Path | None = None) -> Settings:
    """Load local settings using the repository layout."""

    root = project_root or Path(__file__).resolve().parents[5]
    data_dir = root / "data"
    return Settings(
        project_root=root,
        data_dir=data_dir,
        sqlite_path=data_dir / "app.sqlite",
        uploads_dir=data_dir / "uploads",
        previews_dir=data_dir / "previews",
    )


def ensure_data_directories(settings: Settings | None = None) -> Settings:
    """Create local data directories and return the resolved settings."""

    resolved = settings or load_settings()
    resolved.data_dir.mkdir(parents=True, exist_ok=True)
    resolved.uploads_dir.mkdir(parents=True, exist_ok=True)
    resolved.previews_dir.mkdir(parents=True, exist_ok=True)
    return resolved
