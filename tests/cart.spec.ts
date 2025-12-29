import { test, expect } from '@playwright/test';
test.use({ storageState: 'auth.json' });
test('Access Cart', async ({ page }) => {
await page.goto('https://www.saucedemo.com/cart.html');
await expect(page.getByText('Your Cart')).toBeVisible();
});