import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BriefPreview } from "../../src/features/brief-builder/BriefPreview";

describe("BriefPreview", () => {
  it("renders brief provenance summary", () => {
    render(
      <BriefPreview
        brief={{
          id: "brief-1",
          workspaceId: "workspace-1",
          title: "Brief",
          summary: "Insight [page 1]",
          insightIds: ["insight-1"],
          status: "ready",
          warnings: [],
          createdAt: "2026-04-26T00:00:00Z"
        }}
      />
    );

    expect(screen.getByText("Insight [page 1]")).toBeTruthy();
  });
});
