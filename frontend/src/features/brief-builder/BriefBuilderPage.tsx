import { Suspense, lazy, useMemo, useState } from "react";
import { EmptyState } from "../../components/feedback/EmptyState";
import { Button } from "../../components/primitives/Button";
import { Panel } from "../../components/primitives/Panel";
import type { ContentItem, Insight, InsightBrief } from "../../services/contracts";
import { markBriefExported, markBriefShared } from "../../state/sessionStore";
import { approvedInsights } from "./model/briefRules";
import { useBriefBuilder } from "./hooks/useBriefBuilder";
import { ApprovedInsightSelector } from "./ApprovedInsightSelector";
import { BriefShareActions } from "./BriefShareActions";
import { RestrictedSourceWarning } from "./RestrictedSourceWarning";

const BriefPreview = lazy(() => import("./BriefPreview"));

interface BriefBuilderPageProps {
  workspaceId: string;
  insights: Insight[];
  contentItems: ContentItem[];
  onBriefCreated: (brief: InsightBrief) => void;
}

export function BriefBuilderPage({ workspaceId, insights, contentItems, onBriefCreated }: BriefBuilderPageProps) {
  const approved = useMemo(() => approvedInsights(insights), [insights]);
  const { selectedIds, warnings, toggleInsight, createBrief } = useBriefBuilder(workspaceId, approved, contentItems);
  const [brief, setBrief] = useState<InsightBrief | undefined>();
  const [title, setTitle] = useState("Insight brief");

  const create = () => {
    const next = createBrief(title);
    setBrief(next);
    onBriefCreated(next);
  };

  const share = () => {
    if (!brief) return;
    const next = markBriefShared(brief);
    setBrief(next);
    onBriefCreated(next);
  };

  const exportBrief = () => {
    if (!brief) return;
    const next = markBriefExported(brief);
    setBrief(next);
    onBriefCreated(next);
  };

  if (approved.length === 0) {
    return (
      <Panel title="Brief builder" eyebrow="Step 4">
        <EmptyState title="No approved insights" detail="Approved insights are required before creating a brief." />
      </Panel>
    );
  }

  return (
    <div className="brief-layout">
      <Panel
        title="Brief builder"
        eyebrow="Step 4"
        actions={
          <Button type="button" variant="primary" onClick={create} disabled={selectedIds.length === 0}>
            Create brief
          </Button>
        }
      >
        <label>
          Title
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <ApprovedInsightSelector insights={approved} selectedIds={selectedIds} onToggle={toggleInsight} />
        <RestrictedSourceWarning warnings={warnings} />
        <BriefShareActions brief={brief} onShare={share} onExport={exportBrief} />
      </Panel>
      <Suspense fallback={<Panel title="Brief preview">Loading preview...</Panel>}>
        <BriefPreview brief={brief} />
      </Suspense>
    </div>
  );
}
