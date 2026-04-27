import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ApprovedInsightSelector } from "../../src/features/brief-builder/ApprovedInsightSelector";
import type { Insight } from "../../src/services/contracts";

describe("ApprovedInsightSelector", () => {
  it("renders approved insight choices", () => {
    const insight: Insight = {
      id: "insight-1",
      insightSetId: "set-1",
      statement: "Approved insight",
      relevance: "high",
      confidence: "high",
      originatingContentType: "document",
      reviewStatus: "approved",
      rank: 1,
      evidence: []
    };

    render(<ApprovedInsightSelector insights={[insight]} selectedIds={["insight-1"]} onToggle={vi.fn()} />);

    expect(screen.getByText("Approved insight")).toBeTruthy();
  });
});
