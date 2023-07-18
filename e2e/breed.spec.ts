import { expect, test } from "@playwright/test";

test("select breed", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByTestId("cats").waitFor();
  const breedPicker = page.getByText("All");
  await breedPicker.click();
  const breed = page.getByText("American Bobtail");
  await breed.click();
  await page.getByTestId("loader").waitFor();
  await page.getByTestId("cats").waitFor();
  expect(page.getByText("American Bobtail")).toBeDefined();
  const cats = await page.getByTestId("cat").all();
  expect(cats.length).toBeTruthy();
  expect(page.url()).toContain("breed_ids=abob");
});
