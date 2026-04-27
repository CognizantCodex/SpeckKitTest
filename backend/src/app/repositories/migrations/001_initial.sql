CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS content_items (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  display_name TEXT NOT NULL,
  content_type TEXT NOT NULL,
  media_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size_bytes INTEGER NOT NULL,
  duration_seconds INTEGER,
  checksum TEXT NOT NULL,
  validation_status TEXT NOT NULL,
  processing_status TEXT NOT NULL,
  restriction_status TEXT NOT NULL,
  failure_reason TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_content_items_workspace ON content_items(workspace_id);
CREATE INDEX IF NOT EXISTS idx_content_items_checksum ON content_items(checksum);

CREATE TABLE IF NOT EXISTS insight_sets (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  status TEXT NOT NULL,
  started_at TEXT,
  completed_at TEXT,
  summary TEXT NOT NULL DEFAULT '',
  failure_summary TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_insight_sets_workspace ON insight_sets(workspace_id);

CREATE TABLE IF NOT EXISTS insights (
  id TEXT PRIMARY KEY,
  insight_set_id TEXT NOT NULL REFERENCES insight_sets(id),
  statement TEXT NOT NULL,
  relevance TEXT NOT NULL,
  confidence TEXT NOT NULL,
  originating_content_type TEXT NOT NULL,
  review_status TEXT NOT NULL,
  duplicate_group_id TEXT,
  rank INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(insight_set_id, rank)
);

CREATE INDEX IF NOT EXISTS idx_insights_review_status ON insights(review_status);
CREATE INDEX IF NOT EXISTS idx_insights_duplicate_group ON insights(duplicate_group_id);

CREATE TABLE IF NOT EXISTS evidence_references (
  id TEXT PRIMARY KEY,
  insight_id TEXT NOT NULL REFERENCES insights(id),
  content_item_id TEXT NOT NULL REFERENCES content_items(id),
  reference_type TEXT NOT NULL,
  reference_label TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  confidence_context TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_evidence_insight ON evidence_references(insight_id);
CREATE INDEX IF NOT EXISTS idx_evidence_content ON evidence_references(content_item_id);

CREATE TABLE IF NOT EXISTS insight_briefs (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  shared_at TEXT,
  exported_at TEXT,
  share_location TEXT,
  export_location TEXT
);

CREATE INDEX IF NOT EXISTS idx_insight_briefs_workspace ON insight_briefs(workspace_id);

CREATE TABLE IF NOT EXISTS brief_insights (
  brief_id TEXT NOT NULL REFERENCES insight_briefs(id),
  insight_id TEXT NOT NULL REFERENCES insights(id),
  display_order INTEGER NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (brief_id, insight_id),
  UNIQUE(brief_id, display_order)
);
