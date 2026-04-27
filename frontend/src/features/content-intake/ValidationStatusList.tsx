import { StatusState } from "../../components/feedback/StatusState";
import { Button } from "../../components/primitives/Button";
import type { ContentItem } from "../../services/contracts";

interface ValidationStatusListProps {
  items: ContentItem[];
  onRemove: (id: string) => void;
}

export function ValidationStatusList({ items, onRemove }: ValidationStatusListProps) {
  return (
    <ul className="content-list">
      {items.map((item) => (
        <li key={item.id}>
          <div>
            <strong>{item.displayName}</strong>
            <StatusState
              label={item.validationStatus}
              detail={item.failureReason}
              tone={item.validationStatus === "valid" ? "good" : "warning"}
            />
          </div>
          <Button type="button" variant="quiet" onClick={() => onRemove(item.id)}>
            Remove
          </Button>
        </li>
      ))}
    </ul>
  );
}
