import { useCallback, useMemo, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { BriefBuilderPage } from "../features/brief-builder/BriefBuilderPage";
import { ContentIntake } from "../features/content-intake/ContentIntake";
import { InsightReviewPage } from "../features/insight-review/InsightReviewPage";
import { WorkspaceCreate } from "../features/workspace/WorkspaceCreate";
import { WorkspaceHistory } from "../features/workspace/WorkspaceHistory";
import type { ContentItem, Insight, InsightBrief, InsightSet, ReviewStatus, Workspace } from "../services/contracts";
import { generateLocalInsightSet, updateInsightStatus } from "../state/sessionStore";
import type { AppView } from "./routes";

const initialWorkspace: Workspace = {
  id: "workspace-local",
  name: "Insight workspace",
  description: "Local multimodal synthesis",
  status: "draft",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export function App() {
  const [activeView, setActiveView] = useState<AppView>("workspace");
  const [workspace, setWorkspace] = useState<Workspace>(initialWorkspace);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [insightSets, setInsightSets] = useState<InsightSet[]>([]);
  const [briefs, setBriefs] = useState<InsightBrief[]>([]);

  const currentInsightSet = insightSets.at(-1);
  const insights = currentInsightSet?.insights ?? [];

  const updateWorkspace = (next: Workspace) => {
    setWorkspace(next);
    setActiveView("intake");
  };

  const generate = useCallback(
    (validItems: ContentItem[]) => {
      const nextWorkspace = { ...workspace, status: "reviewing" as const, updatedAt: new Date().toISOString() };
      const nextInsightSet = generateLocalInsightSet(nextWorkspace, validItems);
      setWorkspace(nextWorkspace);
      setInsightSets((current) => [...current, nextInsightSet]);
      setActiveView("review");
    },
    [workspace]
  );

  const updateReviewStatus = useCallback(
    (insightId: string, status: ReviewStatus) => {
      setInsightSets((current) =>
        current.map((set) =>
          set.id === currentInsightSet?.id
            ? { ...set, insights: updateInsightStatus(set.insights, insightId, status) }
            : set
        )
      );
    },
    [currentInsightSet?.id]
  );

  const addOrUpdateBrief = useCallback((brief: InsightBrief) => {
    setBriefs((current) => {
      const exists = current.some((item) => item.id === brief.id);
      return exists ? current.map((item) => (item.id === brief.id ? brief : item)) : [...current, brief];
    });
    setWorkspace((current) => ({ ...current, status: "brief_ready", updatedAt: new Date().toISOString() }));
  }, []);

  const view = useMemo(() => {
    if (activeView === "workspace") {
      return (
        <div className="stack">
          <WorkspaceCreate workspace={workspace} onWorkspaceChange={updateWorkspace} />
          <WorkspaceHistory insightSets={insightSets} briefs={briefs} />
        </div>
      );
    }
    if (activeView === "intake") {
      return (
        <ContentIntake
          workspaceId={workspace.id}
          contentItems={contentItems}
          insightSet={currentInsightSet}
          onContentItemsChange={setContentItems}
          onGenerate={generate}
        />
      );
    }
    if (activeView === "review") {
      return (
        <InsightReviewPage
          insights={insights as Insight[]}
          contentItems={contentItems}
          onReviewStatusChange={updateReviewStatus}
        />
      );
    }
    return (
      <BriefBuilderPage
        workspaceId={workspace.id}
        insights={insights as Insight[]}
        contentItems={contentItems}
        onBriefCreated={addOrUpdateBrief}
      />
    );
  }, [
    activeView,
    addOrUpdateBrief,
    briefs,
    contentItems,
    currentInsightSet,
    generate,
    insightSets,
    insights,
    updateReviewStatus,
    workspace
  ]);

  return (
    <AppShell workspace={workspace} activeView={activeView} onViewChange={setActiveView}>
      {view}
    </AppShell>
  );
}
