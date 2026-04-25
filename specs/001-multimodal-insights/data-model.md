# Data Model: Multimodal Insight Generation

## Workspace

Represents a local analysis area owned by a user.

**Fields**

- `id`: Stable workspace identifier.
- `name`: User-visible workspace name.
- `description`: Optional topic or business context.
- `status`: `draft`, `ready`, `generating`, `reviewing`, `brief_ready`,
  `archived`.
- `created_at`: Creation timestamp.
- `updated_at`: Last update timestamp.

**Relationships**

- Has many `ContentItem` records.
- Has many `InsightSet` records.
- Has many `InsightBrief` records.

**Validation rules**

- Name is required and unique among active local workspaces.
- Archived workspaces are read-only except for restore or delete actions.

## ContentItem

Represents a document, image, audio file, or video file selected for analysis.

**Fields**

- `id`: Stable content identifier.
- `workspace_id`: Parent workspace identifier.
- `display_name`: User-visible source name.
- `content_type`: `document`, `image`, `audio`, or `video`.
- `media_type`: Detected file media type.
- `file_path`: Local stored file path.
- `file_size_bytes`: Source size in bytes.
- `checksum`: Duplicate detection checksum.
- `validation_status`: `pending`, `valid`, `unsupported`, `corrupted`,
  `encrypted`, `empty`, `duplicate`, `failed`.
- `processing_status`: `not_started`, `queued`, `processing`, `processed`,
  `partial`, `failed`, `skipped`.
- `restriction_status`: `none`, `restricted`, `unavailable`.
- `failure_reason`: Optional user-safe explanation.
- `created_at`: Creation timestamp.
- `updated_at`: Last update timestamp.

**Relationships**

- Belongs to one `Workspace`.
- Has many `EvidenceReference` records.

**Validation rules**

- File path must point to a local file managed by the application.
- Content type must be derived from supported media categories.
- Duplicate items must retain a reference to the original checksum match.

## InsightSet

Represents one generation run for a workspace.

**Fields**

- `id`: Stable generation run identifier.
- `workspace_id`: Parent workspace identifier.
- `status`: `queued`, `generating`, `completed`, `partial`, `failed`,
  `cancelled`.
- `started_at`: Optional generation start timestamp.
- `completed_at`: Optional generation completion timestamp.
- `summary`: Optional generated overview of the insight set.
- `failure_summary`: Optional user-safe failure summary.

**Relationships**

- Belongs to one `Workspace`.
- Has many `Insight` records.
- References many `ContentItem` records through generated evidence.

**Validation rules**

- Completed and partial insight sets must include completion timestamps.
- Partial insight sets must include skipped or failed content details.

## Insight

Represents one generated observation.

**Fields**

- `id`: Stable insight identifier.
- `insight_set_id`: Parent insight set identifier.
- `statement`: Concise user-visible insight text.
- `relevance`: `high`, `medium`, or `low`.
- `confidence`: `high`, `medium`, `low`, or `unknown`.
- `originating_content_type`: Primary source modality.
- `review_status`: `unreviewed`, `approved`, `duplicative`, `irrelevant`,
  `follow_up`.
- `duplicate_group_id`: Optional grouping identifier.
- `rank`: Display order within the insight set.
- `created_at`: Creation timestamp.
- `updated_at`: Last update timestamp.

**Relationships**

- Belongs to one `InsightSet`.
- Has many `EvidenceReference` records.
- May belong to one duplicate group.
- May be included in many `InsightBrief` records.

**Validation rules**

- Statement is required.
- Rank must be unique within an insight set.
- Approved insights must have at least one evidence reference unless explicitly
  marked as follow-up.

## EvidenceReference

Connects an insight to a supporting source item and source location.

**Fields**

- `id`: Stable evidence identifier.
- `insight_id`: Parent insight identifier.
- `content_item_id`: Source content item identifier.
- `reference_type`: `page`, `region`, `timestamp`, `segment`, `file`, or
  `unknown`.
- `reference_label`: Human-readable page, timestamp, region, or segment label.
- `excerpt`: Optional short supporting text or description.
- `confidence_context`: Optional explanation of confidence.
- `created_at`: Creation timestamp.

**Relationships**

- Belongs to one `Insight`.
- Belongs to one `ContentItem`.

**Validation rules**

- Evidence must reference an existing content item in the same workspace.
- Timestamp references are only valid for audio or video content.
- Page references are only valid for document content.

## InsightBrief

Represents a shareable package of approved insights.

**Fields**

- `id`: Stable brief identifier.
- `workspace_id`: Parent workspace identifier.
- `title`: User-visible brief title.
- `summary`: Brief summary.
- `status`: `draft`, `ready`, `shared`, `exported`, `blocked`.
- `created_at`: Creation timestamp.
- `updated_at`: Last update timestamp.
- `shared_at`: Optional sharing timestamp.

**Relationships**

- Belongs to one `Workspace`.
- Includes many `Insight` records through `BriefInsight`.

**Validation rules**

- Briefs must contain at least one approved insight before becoming ready.
- Briefs must not include restricted, failed, or unavailable source items without
  a user warning.
- Ready, shared, and exported briefs must preserve citations and provenance.

## BriefInsight

Join entity that records insight inclusion and ordering inside a brief.

**Fields**

- `brief_id`: Parent brief identifier.
- `insight_id`: Included insight identifier.
- `display_order`: Order within the brief.
- `note`: Optional user note.

**Validation rules**

- Display order must be unique within a brief.
- Included insights must belong to the same workspace as the brief.

## State Transitions

### ContentItem processing status

```text
not_started -> queued -> processing -> processed
not_started -> skipped
processing -> partial
processing -> failed
queued -> skipped
```

### Insight review status

```text
unreviewed -> approved
unreviewed -> duplicative
unreviewed -> irrelevant
unreviewed -> follow_up
approved -> follow_up
follow_up -> approved
```

### InsightBrief status

```text
draft -> ready -> shared
draft -> ready -> exported
draft -> blocked
blocked -> draft
ready -> draft
```
