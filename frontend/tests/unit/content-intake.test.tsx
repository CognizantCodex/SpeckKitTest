import { describe, expect, it } from "vitest";
import { validateCandidateFile } from "../../src/features/content-intake/model/contentRules";

describe("content validation", () => {
  it("accepts supported files", () => {
    const result = validateCandidateFile("workspace-1", { name: "brief.pdf", size: 1024 }, new Set());

    expect(result.validationStatus).toBe("valid");
    expect(result.contentType).toBe("document");
  });

  it("rejects unsupported files", () => {
    const result = validateCandidateFile("workspace-1", { name: "tool.exe", size: 1024 }, new Set());

    expect(result.validationStatus).toBe("unsupported");
  });
});
