import { test, expect } from "@playwright/test";

test("shows cats", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("cats").waitFor();
  const cats = await page.getByTestId("cat").all();
  expect(cats.length).toEqual(10);
});
