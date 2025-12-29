import { test, expect } from '@playwright/test';

test('User can login and logout successfully', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // Verify login thành công
  await expect(page).toHaveURL(/inventory.html/);

  // Mở menu bên trái
  await page.click('#react-burger-menu-btn');

  // Chờ menu hiển thị
  await expect(page.locator('.bm-menu')).toBeVisible();

  // Click nút Logout
  await page.click('#logout_sidebar_link');

   // Verify back về trang login
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('#login-button')).toBeVisible();
});