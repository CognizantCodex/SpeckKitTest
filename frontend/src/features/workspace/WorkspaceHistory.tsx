import { EmptyState } from "../../components/feedback/EmptyState";
import { Panel } from "../../components/primitives/Panel";
import { StatusBadge } from "../../components/primitives/StatusBadge";
import type { InsightBrief, InsightSet } from "../../services/contracts";

interface WorkspaceHistoryProps {
  insightSets: InsightSet[];
  briefs: InsightBrief[];
}

export function WorkspaceHistory({ insightSets, briefs }: WorkspaceHistoryProps) {
  return (
    <div className="split-grid">
      <Panel title="Insight sets" eyebrow="History">
        {insightSets.length === 0 ? (
          <EmptyState title="No insight sets" detail="Generated sets will appear here." />
        ) : (
          <ul className="plain-list">
            {insightSets.map((set) => (
              <li key={set.id}>
                <span>{set.summary}</span>
                <StatusBadge tone={set.status === "completed" ? "good" : "warning"}>{set.status}</StatusBadge>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel title="Briefs" eyebrow="History">
        {briefs.length === 0 ? (
          <EmptyState title="No briefs" detail="Approved insight briefs will appear here." />
        ) : (
          <ul className="plain-list">
            {briefs.map((brief) => (
              <li key={brief.id}>
                <span>{brief.title}</span>
                <StatusBadge tone={brief.status === "blocked" ? "bad" : "good"}>{brief.status}</StatusBadge>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
