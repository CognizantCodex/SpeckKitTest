# UI Flow Contract: Multimodal Insight Generation

## Flow 1: Workspace and Content Intake

**Entry state**: User opens the application with zero or more existing
workspaces.

**Required states**

- Empty workspace list.
- Workspace created.
- Content selection empty.
- Content validating.
- Content valid.
- Content partially valid.
- Content validation failed.

**Required interactions**

- Create workspace.
- Add content items.
- Remove content item before generation.
- View validation status and failure reason.
- Start generation only when at least one valid content item exists.

## Flow 2: Generation Progress

**Entry state**: Workspace has at least one valid content item.

**Required states**

- Queued.
- Generating.
- Completed.
- Partial completion.
- Failed.
- Cancelled.

**Required interactions**

- Start generation.
- View progress and current stage.
- View skipped or failed content items.
- Continue to review when status is completed or partial.

## Flow 3: Insight Review

**Entry state**: Workspace has a completed or partial insight set.

**Required states**

- Insight list loading.
- Insight list empty.
- Insight list populated.
- Evidence panel open.
- Filtered results.
- Review status updated.

**Required interactions**

- Filter by content type, relevance, confidence, source, and review status.
- Search insight statements.
- Open evidence for an insight.
- Mark insight approved, duplicative, irrelevant, or follow-up.
- Preserve visible feedback after review status changes.

## Flow 4: Brief Builder

**Entry state**: At least one insight is approved.

**Required states**

- No approved insights.
- Brief draft.
- Brief ready.
- Brief blocked by restricted or unavailable source.
- Brief shared or exported.

**Required interactions**

- Select approved insights.
- Reorder selected insights.
- Create brief summary.
- Show citations and provenance.
- Warn before including restricted, failed, or unavailable sources.
- Share or export the brief.

## Accessibility Contract

- All interactive controls must be keyboard reachable.
- Focus order must follow the visible workflow.
- Progress and generation status changes must be announced to assistive
  technologies.
- Confidence and relevance indicators must not rely on color alone.
- Evidence and brief panels must have descriptive labels and close behavior.
