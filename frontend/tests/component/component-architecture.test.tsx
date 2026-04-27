import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";

const expectedFiles = [
  "src/app/App.tsx",
  "src/app/routes.tsx",
  "src/components/layout/AppShell.tsx",
  "src/components/layout/WorkspaceNavigation.tsx",
  "src/components/primitives/Button.tsx",
  "src/components/primitives/Panel.tsx",
  "src/components/primitives/StatusBadge.tsx",
  "src/features/content-intake/hooks/useContentValidation.ts",
  "src/features/insight-review/hooks/useInsightFilters.ts",
  "src/features/brief-builder/hooks/useBriefBuilder.ts"
];

describe("React component architecture", () => {
  it("keeps required files in documented ownership folders", () => {
    for (const file of expectedFiles) {
      expect(existsSync(file), file).toBe(true);
    }
  });
});
