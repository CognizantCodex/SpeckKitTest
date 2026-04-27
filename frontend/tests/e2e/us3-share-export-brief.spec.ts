import { expect, test } from "@playwright/test";

test("brief share and export controls are disabled until a brief exists", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Brief" }).click();
  await expect(page.getByText("No approved insights")).toBeVisible();
});
