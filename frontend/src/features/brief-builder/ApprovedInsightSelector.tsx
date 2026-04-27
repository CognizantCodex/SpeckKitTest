import { StatusBadge } from "../../components/primitives/StatusBadge";
import type { Insight } from "../../services/contracts";

interface ApprovedInsightSelectorProps {
  insights: Insight[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function ApprovedInsightSelector({ insights, selectedIds, onToggle }: ApprovedInsightSelectorProps) {
  return (
    <ul className="selector-list">
      {insights.map((insight) => (
        <li key={insight.id}>
          <label>
            <input
              type="checkbox"
              checked={selectedIds.includes(insight.id)}
              onChange={() => onToggle(insight.id)}
            />
            <span>{insight.statement}</span>
          </label>
          <StatusBadge tone="good">{insight.reviewStatus}</StatusBadge>
        </li>
      ))}
    </ul>
  );
}
