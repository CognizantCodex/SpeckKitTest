import { Panel } from "../../components/primitives/Panel";
import type { InsightBrief } from "../../services/contracts";

interface BriefPreviewProps {
  brief?: InsightBrief;
}

export function BriefPreview({ brief }: BriefPreviewProps) {
  return (
    <Panel title="Brief preview" eyebrow={brief?.status ?? "draft"}>
      {brief ? (
        <div className="brief-preview">
          <h3>{brief.title}</h3>
          <p>{brief.summary}</p>
        </div>
      ) : (
        <p>Approved insights selected for the brief will appear here.</p>
      )}
    </Panel>
  );
}

export default BriefPreview;
