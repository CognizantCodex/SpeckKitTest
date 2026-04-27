import type { BriefWarning } from "../../services/contracts";

interface RestrictedSourceWarningProps {
  warnings: BriefWarning[];
}

export function RestrictedSourceWarning({ warnings }: RestrictedSourceWarningProps) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <div className="warning-box" role="alert">
      <strong>Source warning</strong>
      <ul>
        {warnings.map((warning) => (
          <li key={`${warning.sourceId}-${warning.message}`}>{warning.message}</li>
        ))}
      </ul>
    </div>
  );
}
