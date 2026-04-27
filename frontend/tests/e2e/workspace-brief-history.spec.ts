import { expect, test } from "@playwright/test";

test("brief history is present in workspace view", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Briefs", exact: true })).toBeVisible();
});
