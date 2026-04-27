import { apiRequest } from "./apiClient";
import type { InsightSet, Workspace } from "./contracts";

export function listWorkspaces(): Promise<Workspace[]> {
  return apiRequest<Workspace[]>("/workspaces");
}

export function getDemoInsightSet(): Promise<InsightSet> {
  return apiRequest<InsightSet>("/demo/insight-set");
}
