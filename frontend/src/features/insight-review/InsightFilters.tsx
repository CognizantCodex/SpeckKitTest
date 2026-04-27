import type { InsightFiltersState } from "./model/insightFilters";

interface InsightFiltersProps {
  filters: InsightFiltersState;
  isPending: boolean;
  onChange: (filters: Partial<InsightFiltersState>) => void;
}

export function InsightFilters({ filters, isPending, onChange }: InsightFiltersProps) {
  return (
    <div className="filter-row" aria-busy={isPending}>
      <label>
        Search
        <input value={filters.query} onChange={(event) => onChange({ query: event.target.value })} />
      </label>
      <label>
        Type
        <select value={filters.contentType} onChange={(event) => onChange({ contentType: event.target.value as InsightFiltersState["contentType"] })}>
          <option value="all">All</option>
          <option value="document">Document</option>
          <option value="image">Image</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
      </label>
      <label>
        Relevance
        <select value={filters.relevance} onChange={(event) => onChange({ relevance: event.target.value as InsightFiltersState["relevance"] })}>
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>
      <label>
        Review
        <select value={filters.reviewStatus} onChange={(event) => onChange({ reviewStatus: event.target.value as InsightFiltersState["reviewStatus"] })}>
          <option value="all">All</option>
          <option value="unreviewed">Unreviewed</option>
          <option value="approved">Approved</option>
          <option value="duplicative">Duplicative</option>
          <option value="irrelevant">Irrelevant</option>
          <option value="follow_up">Follow-up</option>
        </select>
      </label>
    </div>
  );
}
