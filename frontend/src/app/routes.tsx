import { lazy } from "react";

export type AppView = "workspace" | "intake" | "review" | "brief";

export const appRoutes: Array<{ view: AppView; label: string }> = [
  { view: "workspace", label: "Workspace" },
  { view: "intake", label: "Content intake" },
  { view: "review", label: "Insight review" },
  { view: "brief", label: "Brief builder" }
];

export const LazyEvidencePanel = lazy(() => import("../features/insight-review/EvidencePanel"));
export const LazyBriefPreview = lazy(() => import("../features/brief-builder/BriefPreview"));
