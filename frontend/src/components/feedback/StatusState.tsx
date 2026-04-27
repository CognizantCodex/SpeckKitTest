import { StatusBadge } from "../primitives/StatusBadge";

interface StatusStateProps {
  label: string;
  detail?: string;
  tone?: "neutral" | "good" | "warning" | "bad";
}

export function StatusState({ label, detail, tone = "neutral" }: StatusStateProps) {
  return (
    <div className="status-state">
      <StatusBadge tone={tone}>{label}</StatusBadge>
      {detail && <span>{detail}</span>}
    </div>
  );
}
