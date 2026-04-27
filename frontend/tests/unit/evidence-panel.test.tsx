import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EvidencePanel } from "../../src/features/insight-review/EvidencePanel";
import type { ContentItem, Insight } from "../../src/services/contracts";

const content: ContentItem = {
  id: "content-1",
  workspaceId: "workspace-1",
  displayName: "source.pdf",
  contentType: "document",
  mediaType: "application/pdf",
  filePath: "source.pdf",
  fileSizeBytes: 100,
  checksum: "source",
  validationStatus: "valid",
  processingStatus: "processed",
  restrictionStatus: "none"
};

const insight: Insight = {
  id: "insight-1",
  insightSetId: "set-1",
  statement: "Statement",
  relevance: "high",
  confidence: "high",
  originatingContentType: "document",
  reviewStatus: "approved",
  rank: 1,
  evidence: [
    {
      id: "evidence-1",
      insightId: "insight-1",
      contentItemId: "content-1",
      referenceType: "page",
      referenceLabel: "page 1",
      excerpt: "Excerpt",
      confidenceContext: "High confidence"
    }
  ]
};

describe("EvidencePanel", () => {
  it("renders source, reference, and confidence context", () => {
    render(<EvidencePanel insight={insight} contentItems={[content]} onClose={vi.fn()} />);

    expect(screen.getByText("source.pdf")).toBeTruthy();
    expect(screen.getByText("page 1")).toBeTruthy();
    expect(screen.getByText("High confidence")).toBeTruthy();
  });
});
