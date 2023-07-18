import { expect, test } from "@playwright/test";

test("select page", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("cats").waitFor();
  const pages = await page.getByTestId("pagination-page").all();
  pages[2].click();
  await page.waitForRequest("https://api.thecatapi.com/v1/images/*");
  await page.getByTestId("cats").waitFor();
  const cats = await page.getByTestId("cat").all();
  expect(cats.length).toBe(10);
  expect(page.url()).toContain("page=3");
});
