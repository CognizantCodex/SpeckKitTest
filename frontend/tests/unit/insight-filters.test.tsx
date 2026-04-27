import { describe, expect, it } from "vitest";
import { applyInsightFilters, defaultInsightFilters } from "../../src/features/insight-review/model/insightFilters";
import type { Insight } from "../../src/services/contracts";

const insights: Insight[] = [
  {
    id: "one",
    insightSetId: "set",
    statement: "Document signal",
    relevance: "high",
    confidence: "high",
    originatingContentType: "document",
    reviewStatus: "approved",
    rank: 1,
    evidence: []
  },
  {
    id: "two",
    insightSetId: "set",
    statement: "Audio signal",
    relevance: "medium",
    confidence: "medium",
    originatingContentType: "audio",
    reviewStatus: "unreviewed",
    rank: 2,
    evidence: []
  }
];

describe("applyInsightFilters", () => {
  it("filters by content type and review status", () => {
    const result = applyInsightFilters(insights, {
      ...defaultInsightFilters,
      contentType: "document",
      reviewStatus: "approved"
    });

    expect(result.map((item) => item.id)).toEqual(["one"]);
  });
});
