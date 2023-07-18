import { expect, test } from "@playwright/test";

test("select order", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("cats").waitFor();
  const orderPicker = page.getByText("Random");
  await orderPicker.click();
  const order = page.getByText("Ascending");
  await order.click();
  await page.getByTestId("loader").waitFor();
  await page.getByTestId("cats").waitFor();
  expect(page.getByText("Ascending")).toBeDefined();
  const cats = await page.getByTestId("cat").all();
  expect(cats.length).toBeTruthy();
  expect(page.url()).toContain("order=ASC");
});
