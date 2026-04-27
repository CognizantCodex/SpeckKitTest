import { useCallback, useMemo, useState } from "react";
import type { ContentItem } from "../../../services/contracts";
import { validateCandidateFile, type CandidateFile } from "../model/contentRules";

export function useContentValidation(workspaceId: string, initialItems: ContentItem[] = []) {
  const [items, setItems] = useState<ContentItem[]>(initialItems);

  const addCandidates = useCallback(
    (candidates: CandidateFile[]) => {
      setItems((current) => {
        const seen = new Set(current.map((item) => item.checksum));
        const next = candidates.map((candidate) => validateCandidateFile(workspaceId, candidate, seen));
        return [...current, ...next];
      });
    },
    [workspaceId]
  );

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const validItems = useMemo(
    () => items.filter((item) => item.validationStatus === "valid"),
    [items]
  );

  return {
    items,
    validItems,
    addCandidates,
    removeItem,
    setItems
  };
}
