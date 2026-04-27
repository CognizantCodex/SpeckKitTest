import { useMemo, useState } from "react";
import type { ContentItem, Insight, InsightBrief } from "../../../services/contracts";
import { briefSummaryFor, restrictedWarnings } from "../model/briefRules";

export function useBriefBuilder(workspaceId: string, approved: Insight[], contentItems: ContentItem[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>(approved.map((insight) => insight.id));
  const selectedInsights = useMemo(
    () => approved.filter((insight) => selectedIds.includes(insight.id)),
    [approved, selectedIds]
  );
  const warnings = useMemo(
    () => restrictedWarnings(selectedInsights, contentItems),
    [contentItems, selectedInsights]
  );

  const toggleInsight = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const createBrief = (title: string): InsightBrief => {
    const now = new Date().toISOString();
    return {
      id: `brief-${now}`,
      workspaceId,
      title,
      summary: briefSummaryFor(selectedInsights),
      insightIds: selectedIds,
      status: warnings.length > 0 ? "blocked" : "ready",
      warnings,
      createdAt: now
    };
  };

  return {
    selectedIds,
    selectedInsights,
    warnings,
    toggleInsight,
    createBrief
  };
}
