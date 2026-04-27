import { Button } from "../../components/primitives/Button";
import type { InsightBrief } from "../../services/contracts";

interface BriefShareActionsProps {
  brief?: InsightBrief;
  onShare: () => void;
  onExport: () => void;
}

export function BriefShareActions({ brief, onShare, onExport }: BriefShareActionsProps) {
  return (
    <div className="share-actions">
      <Button type="button" variant="secondary" onClick={onShare} disabled={!brief || brief.status === "blocked"}>
        Share
      </Button>
      <Button type="button" variant="secondary" onClick={onExport} disabled={!brief || brief.status === "blocked"}>
        Export
      </Button>
    </div>
  );
}
