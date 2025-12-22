import { test, expect } from '@playwright/test';

test('User can search and open TypeScript page on W3Schools', async ({ page }) => {
  await page.goto('https://www.w3schools.com/');

  const searchInput = page.locator('#tnb-google-search-input');
  await searchInput.fill('TypeScript');

  // Click kết quả gợi ý
  await page.getByRole('link', { name: /^TypeScript$/i }).first().click();

  // Verify URL tương đối
  await expect(page).toHaveURL(/typescript/i);

  // Verify heading chính
  await expect(page.locator('h1')).toHaveText('TypeScript Tutorial');
});