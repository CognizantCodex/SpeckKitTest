import { useDeferredValue, useMemo, useState, useTransition } from "react";
import type { Insight } from "../../../services/contracts";
import {
  applyInsightFilters,
  defaultInsightFilters,
  type InsightFiltersState
} from "../model/insightFilters";

export function useInsightFilters(insights: Insight[]) {
  const [filters, setFilters] = useState<InsightFiltersState>(defaultInsightFilters);
  const [isPending, startTransition] = useTransition();
  const deferredFilters = useDeferredValue(filters);

  const updateFilters = (next: Partial<InsightFiltersState>) => {
    startTransition(() => {
      setFilters((current) => ({ ...current, ...next }));
    });
  };

  const visibleInsights = useMemo(
    () => applyInsightFilters(insights, deferredFilters),
    [insights, deferredFilters]
  );

  return {
    filters,
    isPending,
    visibleInsights,
    updateFilters
  };
}
