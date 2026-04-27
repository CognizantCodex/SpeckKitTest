import { expect, test } from "@playwright/test";

test("brief builder surface is reachable", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Brief" }).click();
  await expect(page.getByRole("heading", { name: "Brief builder" })).toBeVisible();
});
