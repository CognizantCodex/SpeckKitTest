import { FocusTrap } from "../../components/a11y/FocusTrap";
import { Button } from "../../components/primitives/Button";
import { Panel } from "../../components/primitives/Panel";
import type { ContentItem, Insight } from "../../services/contracts";

interface EvidencePanelProps {
  insight: Insight;
  contentItems: ContentItem[];
  onClose: () => void;
}

export function EvidencePanel({ insight, contentItems, onClose }: EvidencePanelProps) {
  const contentById = new Map(contentItems.map((item) => [item.id, item]));

  return (
    <FocusTrap>
      <Panel
        title="Evidence"
        eyebrow={insight.originatingContentType}
        actions={
          <Button type="button" variant="quiet" onClick={onClose}>
            Close
          </Button>
        }
      >
        <ul className="evidence-list">
          {insight.evidence.map((evidence) => {
            const source = contentById.get(evidence.contentItemId);
            return (
              <li key={evidence.id}>
                <strong>{source?.displayName ?? "Unavailable source"}</strong>
                <span>{evidence.referenceLabel}</span>
                <p>{evidence.excerpt}</p>
                <small>{evidence.confidenceContext}</small>
              </li>
            );
          })}
        </ul>
      </Panel>
    </FocusTrap>
  );
}

export default EvidencePanel;
