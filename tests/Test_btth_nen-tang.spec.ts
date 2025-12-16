import { test, expect } from '@playwright/test';
test("user can search by any text", async ({page}) => {
    await page.goto ("https://www.w3schools.com/");
    await page.locator("#tnb-google-search-input").fill ("TypeScript");
    await page.locator("#tnb-google-search-submit-btn").click();
    await expect (page.locator('.gsc-results-wrapper-visible')).toContainText("TypeScript");
});