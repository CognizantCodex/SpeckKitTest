import type { Confidence, ContentType, Insight, Relevance, ReviewStatus } from "../../../services/contracts";

export interface InsightFiltersState {
  query: string;
  contentType: ContentType | "all";
  relevance: Relevance | "all";
  confidence: Confidence | "all";
  reviewStatus: ReviewStatus | "all";
}

export const defaultInsightFilters: InsightFiltersState = {
  query: "",
  contentType: "all",
  relevance: "all",
  confidence: "all",
  reviewStatus: "all"
};

export function applyInsightFilters(insights: Insight[], filters: InsightFiltersState): Insight[] {
  const query = filters.query.trim().toLowerCase();
  return insights
    .filter((insight) => filters.contentType === "all" || insight.originatingContentType === filters.contentType)
    .filter((insight) => filters.relevance === "all" || insight.relevance === filters.relevance)
    .filter((insight) => filters.confidence === "all" || insight.confidence === filters.confidence)
    .filter((insight) => filters.reviewStatus === "all" || insight.reviewStatus === filters.reviewStatus)
    .filter((insight) => query.length === 0 || insight.statement.toLowerCase().includes(query))
    .sort((left, right) => left.rank - right.rank)
    .slice(0, 25);
}
