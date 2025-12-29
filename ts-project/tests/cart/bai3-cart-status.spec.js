import { test, expect } from '@playwright/test';

test('Verify that user can add products into the cart', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory.html/);
  
  // Locator giỏ hàng
  const cartBadge = page.locator('.shopping_cart_badge');

  // Step 2: Add first product into the cart
  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await expect(cartBadge).toHaveText('1');

  // Step 3: Add second product into the cart
  await page.locator('#add-to-cart-sauce-labs-bike-light').click();
  await expect(cartBadge).toHaveText('2');
});
