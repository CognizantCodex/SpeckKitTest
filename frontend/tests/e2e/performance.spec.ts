import { expect, test } from "@playwright/test";

test("workspace navigation stays within interaction budget", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Insight workspace" })).toBeVisible();

  const started = Date.now();
  await page.getByRole("button", { name: "Content" }).click();
  await expect(page.getByRole("heading", { name: "Content intake" })).toBeVisible();

  expect(Date.now() - started).toBeLessThan(2000);
});
