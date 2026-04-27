import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GenerationProgress } from "../../src/features/content-intake/GenerationProgress";

describe("GenerationProgress", () => {
  it("announces ready item counts", () => {
    render(<GenerationProgress validCount={2} />);

    expect(screen.getByText("2 valid item(s)")).toBeTruthy();
  });
});
