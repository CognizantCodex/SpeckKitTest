import { expect, test } from "@playwright/test";

test("review surface is reachable", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Review" }).click();
  await expect(page.getByRole("heading", { name: "Insight review" })).toBeVisible();
});
