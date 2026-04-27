import type { ContentItem, Insight } from "../../../services/contracts";

export function approvedInsights(insights: Insight[]) {
  return insights.filter((insight) => insight.reviewStatus === "approved");
}

export function restrictedWarnings(insights: Insight[], contentItems: ContentItem[]) {
  const contentById = new Map(contentItems.map((item) => [item.id, item]));
  return insights.flatMap((insight) =>
    insight.evidence.flatMap((evidence) => {
      const item = contentById.get(evidence.contentItemId);
      if (!item) {
        return [{ sourceId: evidence.contentItemId, message: "Source is unavailable." }];
      }
      if (item.restrictionStatus === "restricted" || item.restrictionStatus === "unavailable") {
        return [{ sourceId: item.id, message: `${item.displayName} is ${item.restrictionStatus}.` }];
      }
      return [];
    })
  );
}

export function briefSummaryFor(insights: Insight[]) {
  return insights
    .map((insight) => {
      const citations = insight.evidence.map((evidence) => evidence.referenceLabel).join(", ");
      return `${insight.statement} [${citations}]`;
    })
    .join(" ");
}
