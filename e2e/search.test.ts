import { test, expect } from "@playwright/test";

test("do search", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("cats").waitFor();
  const search = page.getByTestId("search");
  await search.click();
  await search.type("s", { delay: 100 });
  await page.waitForRequest("https://api.thecatapi.com/v1/images/*");
  await page.getByTestId("cats").waitFor();
  const cats = await page.getByTestId("cat").all();
  expect(cats.length).toEqual(1);
});
