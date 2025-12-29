import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('Login failed with wrong password', async ({ page }) => {
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('wrong_password');
  await page.locator('#login-button').click();

  const errorMsg = page.locator('[data-test="error"]');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

test('Login failed with empty username', async ({ page }) => {
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  const errorMsg = page.locator('[data-test="error"]');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toHaveText(
    'Epic sadface: Username is required'
  );
});

test('Login failed with locked_out_user', async ({ page }) => {
  await page.locator('#user-name').fill('locked_out_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  const errorMsg = page.locator('[data-test="error"]');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );
});