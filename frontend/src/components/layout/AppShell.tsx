import type { ReactNode } from "react";
import type { AppView } from "../../app/routes";
import type { Workspace } from "../../services/contracts";
import { WorkspaceNavigation } from "./WorkspaceNavigation";

interface AppShellProps {
  workspace: Workspace;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
  children: ReactNode;
}

export function AppShell({ workspace, activeView, onViewChange, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Multimodal insights</p>
          <h1>{workspace.name}</h1>
        </div>
        <span className="topbar-status">{workspace.status.replace("_", " ")}</span>
      </header>
      <WorkspaceNavigation workspace={workspace} activeView={activeView} onViewChange={onViewChange} />
      <main className="main-surface">{children}</main>
    </div>
  );
}
