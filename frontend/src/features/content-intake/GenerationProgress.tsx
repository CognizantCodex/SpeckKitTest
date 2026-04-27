import { LiveRegion } from "../../components/a11y/LiveRegion";
import { StatusState } from "../../components/feedback/StatusState";
import type { InsightSet } from "../../services/contracts";

interface GenerationProgressProps {
  insightSet?: InsightSet;
  validCount: number;
}

export function GenerationProgress({ insightSet, validCount }: GenerationProgressProps) {
  const message = insightSet
    ? `${insightSet.status}: ${insightSet.summary}`
    : `${validCount} valid content item(s) ready for generation.`;

  return (
    <div className="progress-strip">
      <LiveRegion message={message} />
      <StatusState
        label={insightSet?.status ?? "ready"}
        detail={insightSet?.summary ?? `${validCount} valid item(s)`}
        tone={insightSet?.status === "failed" ? "bad" : insightSet?.status === "partial" ? "warning" : "good"}
      />
    </div>
  );
}
