import type { ContentItem, Insight, InsightBrief, InsightSet, Workspace } from "../services/contracts";

export function generateLocalInsightSet(workspace: Workspace, items: ContentItem[]): InsightSet {
  const validItems = items.filter((item) => item.validationStatus === "valid");
  const skipped = items.filter((item) => item.validationStatus !== "valid");
  const insightSetId = `insight-set-${Date.now()}`;
  const insights: Insight[] = validItems.map((item, index) => {
    const insightId = `insight-${item.id}`;
    return {
      id: insightId,
      insightSetId,
      statement: statementFor(item),
      relevance: index === 0 ? "high" : "medium",
      confidence: item.contentType === "video" ? "low" : "medium",
      originatingContentType: item.contentType,
      reviewStatus: "unreviewed",
      duplicateGroupId: `dup-${item.contentType}`,
      rank: index + 1,
      evidence: [
        {
          id: `evidence-${item.id}`,
          insightId,
          contentItemId: item.id,
          referenceType: referenceTypeFor(item.contentType),
          referenceLabel: referenceLabelFor(item.contentType),
          excerpt: `Evidence identified from ${item.displayName}.`,
          confidenceContext: `Confidence reflects supported ${item.contentType} metadata and deterministic analysis.`
        }
      ]
    };
  });

  return {
    id: insightSetId,
    workspaceId: workspace.id,
    status: skipped.length > 0 && insights.length > 0 ? "partial" : insights.length > 0 ? "completed" : "failed",
    summary: `Generated ${insights.length} ranked insights from ${validItems.length} valid item(s).`,
    failureSummary: skipped.length > 0 ? `Skipped ${skipped.length} item(s) that did not pass validation.` : "",
    insights
  };
}

export function updateInsightStatus(insights: Insight[], id: string, status: Insight["reviewStatus"]) {
  return insights.map((insight) => (insight.id === id ? { ...insight, reviewStatus: status } : insight));
}

export function markBriefShared(brief: InsightBrief): InsightBrief {
  return {
    ...brief,
    status: "shared",
    sharedAt: new Date().toISOString()
  };
}

export function markBriefExported(brief: InsightBrief): InsightBrief {
  return {
    ...brief,
    status: "exported",
    exportedAt: new Date().toISOString()
  };
}

function statementFor(item: ContentItem) {
  const map = {
    document: `${item.displayName} contains themes ready for synthesis.`,
    image: `${item.displayName} provides visual evidence to inspect.`,
    audio: `${item.displayName} may contain spoken signals for review.`,
    video: `${item.displayName} provides time-based source context.`
  };
  return map[item.contentType];
}

function referenceTypeFor(contentType: ContentItem["contentType"]) {
  const map = {
    document: "page",
    image: "region",
    audio: "timestamp",
    video: "timestamp"
  } as const;
  return map[contentType];
}

function referenceLabelFor(contentType: ContentItem["contentType"]) {
  const map = {
    document: "page 1",
    image: "primary region",
    audio: "00:00-00:30",
    video: "00:00-00:30"
  };
  return map[contentType];
}
