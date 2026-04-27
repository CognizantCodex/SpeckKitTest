import type { AppView } from "../../app/routes";
import type { Workspace } from "../../services/contracts";
import { Button } from "../primitives/Button";

interface WorkspaceNavigationProps {
  workspace: Workspace;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const navItems: Array<{ view: AppView; label: string }> = [
  { view: "workspace", label: "Workspace" },
  { view: "intake", label: "Content" },
  { view: "review", label: "Review" },
  { view: "brief", label: "Brief" }
];

export function WorkspaceNavigation({ workspace, activeView, onViewChange }: WorkspaceNavigationProps) {
  return (
    <nav className="workspace-nav" aria-label="Workspace sections">
      <div>
        <p className="eyebrow">Current workspace</p>
        <strong>{workspace.name}</strong>
      </div>
      <div className="nav-actions">
        {navItems.map((item) => (
          <Button
            key={item.view}
            variant={activeView === item.view ? "primary" : "quiet"}
            type="button"
            onClick={() => onViewChange(item.view)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  );
}
