import { test, expect } from '@playwright/test';
test("Users can register an account after entering valid data in some fields", async ({page}) => {
    await page.goto ("https://material.playwrightvn.com/01-xpath-register-page.html");
    await page.locator("#username").fill("quyenlt");
    await page.locator("#email").fill ("quyenlt@example.com");
    await page.locator("#female").check();
    await page.locator("#traveling").check();
    await page.locator("#interests").selectOption(["Art","Music"]);
    await page.locator("#country").selectOption("Canada");
    await page.locator("#dob").fill("2001-01-01");

    await expect(page.locator("#female")).toBeChecked();
    await expect (page.locator("#traveling")).toBeChecked();

    await page.locator('button:has-text("Register")').click();

    await expect (page.locator("#userTable")).toContainText("quyenlt");
});