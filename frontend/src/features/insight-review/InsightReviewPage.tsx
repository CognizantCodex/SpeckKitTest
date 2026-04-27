import { Suspense, lazy, useState } from "react";
import { EmptyState } from "../../components/feedback/EmptyState";
import { Panel } from "../../components/primitives/Panel";
import type { ContentItem, Insight, ReviewStatus } from "../../services/contracts";
import { useInsightFilters } from "./hooks/useInsightFilters";
import { InsightCard } from "./InsightCard";
import { InsightFilters } from "./InsightFilters";

const EvidencePanel = lazy(() => import("./EvidencePanel"));

interface InsightReviewPageProps {
  insights: Insight[];
  contentItems: ContentItem[];
  onReviewStatusChange: (insightId: string, status: ReviewStatus) => void;
}

export function InsightReviewPage({ insights, contentItems, onReviewStatusChange }: InsightReviewPageProps) {
  const { filters, isPending, visibleInsights, updateFilters } = useInsightFilters(insights);
  const [selectedInsight, setSelectedInsight] = useState<Insight | undefined>();

  return (
    <div className="review-layout">
      <Panel title="Insight review" eyebrow="Step 3">
        <InsightFilters filters={filters} isPending={isPending} onChange={updateFilters} />
        {visibleInsights.length === 0 ? (
          <EmptyState title="No matching insights" detail="Generated insights that match the current filters will appear here." />
        ) : (
          <div className="insight-list">
            {visibleInsights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                onEvidence={setSelectedInsight}
                onReviewStatusChange={onReviewStatusChange}
              />
            ))}
          </div>
        )}
      </Panel>
      {selectedInsight && (
        <Suspense fallback={<Panel title="Evidence">Loading evidence...</Panel>}>
          <EvidencePanel insight={selectedInsight} contentItems={contentItems} onClose={() => setSelectedInsight(undefined)} />
        </Suspense>
      )}
    </div>
  );
}
