"""SQLite migration runner."""

from __future__ import annotations

import sqlite3
from pathlib import Path

from app.config.settings import Settings, ensure_data_directories, load_settings


def run_migrations(settings: Settings | None = None) -> None:
    resolved = ensure_data_directories(settings or load_settings())
    migration_dir = Path(__file__).resolve().parent / "migrations"
    with sqlite3.connect(resolved.sqlite_path) as connection:
        connection.execute(
            "CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY)"
        )
        applied = {
            row[0] for row in connection.execute("SELECT version FROM schema_migrations").fetchall()
        }
        for migration in sorted(migration_dir.glob("*.sql")):
            if migration.name in applied:
                continue
            connection.executescript(migration.read_text(encoding="utf-8"))
            connection.execute("INSERT INTO schema_migrations (version) VALUES (?)", (migration.name,))
        connection.commit()
