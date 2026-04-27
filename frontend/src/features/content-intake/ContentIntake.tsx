import { ChangeEvent, useEffect } from "react";
import { Button } from "../../components/primitives/Button";
import { Panel } from "../../components/primitives/Panel";
import type { ContentItem, InsightSet } from "../../services/contracts";
import { useContentValidation } from "./hooks/useContentValidation";
import { GenerationProgress } from "./GenerationProgress";
import { ValidationStatusList } from "./ValidationStatusList";

interface ContentIntakeProps {
  workspaceId: string;
  contentItems: ContentItem[];
  insightSet?: InsightSet;
  onContentItemsChange: (items: ContentItem[]) => void;
  onGenerate: (items: ContentItem[]) => void;
}

export function ContentIntake({
  workspaceId,
  contentItems,
  insightSet,
  onContentItemsChange,
  onGenerate
}: ContentIntakeProps) {
  const { items, validItems, addCandidates, removeItem } = useContentValidation(workspaceId, contentItems);

  useEffect(() => {
    onContentItemsChange(items);
  }, [items, onContentItemsChange]);

  const onFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).map((file) => ({
      name: file.name,
      size: file.size
    }));
    addCandidates(files);
    event.target.value = "";
  };

  return (
    <Panel
      title="Content intake"
      eyebrow="Step 2"
      actions={
        <Button type="button" variant="primary" onClick={() => onGenerate(validItems)} disabled={validItems.length === 0}>
          Start generation
        </Button>
      }
    >
      <div className="upload-zone">
        <input id="content-files" type="file" multiple onChange={onFilesSelected} />
        <label htmlFor="content-files">Add documents, images, audio, or video</label>
      </div>
      <GenerationProgress insightSet={insightSet} validCount={validItems.length} />
      <ValidationStatusList items={items} onRemove={removeItem} />
    </Panel>
  );
}
