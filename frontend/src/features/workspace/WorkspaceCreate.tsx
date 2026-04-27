import { FormEvent, useState } from "react";
import { Button } from "../../components/primitives/Button";
import { Panel } from "../../components/primitives/Panel";
import type { Workspace } from "../../services/contracts";
import { createWorkspace } from "./model/workspaceRules";

interface WorkspaceCreateProps {
  workspace: Workspace;
  onWorkspaceChange: (workspace: Workspace) => void;
}

export function WorkspaceCreate({ workspace, onWorkspaceChange }: WorkspaceCreateProps) {
  const [name, setName] = useState(workspace.name);
  const [description, setDescription] = useState(workspace.description);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onWorkspaceChange(createWorkspace(name, description));
  };

  return (
    <Panel title="Workspace setup" eyebrow="Step 1">
      <form className="form-grid" onSubmit={submit}>
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} />
        </label>
        <Button type="submit" variant="primary">
          Save workspace
        </Button>
      </form>
    </Panel>
  );
}
