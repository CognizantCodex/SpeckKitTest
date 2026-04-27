import { expect, test } from "@playwright/test";

test("workspace history panels render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Insight sets", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Briefs", exact: true })).toBeVisible();
});
