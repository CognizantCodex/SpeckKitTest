import type { Workspace } from "../../../services/contracts";

export function createWorkspace(name: string, description: string): Workspace {
  const now = new Date().toISOString();
  return {
    id: `workspace-${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "local"}`,
    name: name.trim() || "Untitled workspace",
    description: description.trim(),
    status: "draft",
    createdAt: now,
    updatedAt: now
  };
}
