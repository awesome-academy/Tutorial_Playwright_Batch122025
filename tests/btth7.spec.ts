import { test, expect } from "@playwright/test";
test.describe('Login Failure Tests', () => {

// Chạy trước mỗi test
test.beforeEach(async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.fill('#user-name', 'ABCDEF');
await page.fill('#password', 'ABCDEF');
await page.click('#login-button');
});

// Test 1: Kiểm tra Login khi không nhập username & password
test('Show error message after login without username & password', async ({ page }) => {
await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Username and password do not match any user in this service");
// Log url và message lỗi
const errorMessage = page.locator('[data-test="error-button"]');
const currentUrl = page.url();
console.log('Current URL:', currentUrl);
console.log('Error message:', errorMessage);
});

});