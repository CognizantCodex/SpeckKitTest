import { expect, test } from "@playwright/test";

test("workspace can navigate to content intake", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Insight workspace" })).toBeVisible();
  await page.getByRole("button", { name: "Content" }).click();
  await expect(page.getByRole("heading", { name: "Content intake" })).toBeVisible();
});
