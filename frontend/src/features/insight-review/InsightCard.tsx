import { Button } from "../../components/primitives/Button";
import { StatusBadge } from "../../components/primitives/StatusBadge";
import type { Insight, ReviewStatus } from "../../services/contracts";

interface InsightCardProps {
  insight: Insight;
  onEvidence: (insight: Insight) => void;
  onReviewStatusChange: (insightId: string, status: ReviewStatus) => void;
}

const statuses: ReviewStatus[] = ["approved", "duplicative", "irrelevant", "follow_up"];

export function InsightCard({ insight, onEvidence, onReviewStatusChange }: InsightCardProps) {
  return (
    <article className="insight-card">
      <div className="insight-card-main">
        <span className="rank">#{insight.rank}</span>
        <div>
          <h3>{insight.statement}</h3>
          <div className="badge-row">
            <StatusBadge tone="neutral">{insight.originatingContentType}</StatusBadge>
            <StatusBadge tone={insight.relevance === "high" ? "good" : "neutral"}>{insight.relevance}</StatusBadge>
            <StatusBadge tone={insight.confidence === "low" ? "warning" : "neutral"}>{insight.confidence}</StatusBadge>
            <StatusBadge tone={insight.reviewStatus === "approved" ? "good" : "neutral"}>{insight.reviewStatus}</StatusBadge>
          </div>
        </div>
      </div>
      <div className="card-actions">
        <Button type="button" variant="secondary" onClick={() => onEvidence(insight)}>
          Evidence
        </Button>
        {statuses.map((status) => (
          <Button key={status} type="button" variant="quiet" onClick={() => onReviewStatusChange(insight.id, status)}>
            {status.replace("_", " ")}
          </Button>
        ))}
      </div>
    </article>
  );
}
