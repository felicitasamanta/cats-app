import { test } from "@playwright/test";

test("shows cat", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("cats").waitFor();
  const cats = await page.getByTestId("cat").all();
  await cats[4].click();
  await page.getByTestId("catItem").waitFor();
});
