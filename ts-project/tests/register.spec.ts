import { test, expect } from '@playwright/test';

test('Register user successfully', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

  // ===== Input basic info =====
  await page.locator('//input[@id="username"]').fill('Le Thi Ha');
  await page.locator('//input[@id="email"]').fill('le.thi.ha@sun-asterisk.com');

  // ===== Gender (Radio) =====
  const maleRadio = page.locator('//input[@id="male"]');
  await maleRadio.check();
  await expect(maleRadio).toBeChecked();

  // ===== Hobbies (Checkbox) =====
  const readingCheckbox = page.locator('//input[@id="reading"]');
  const travelingCheckbox = page.locator('//input[@id="traveling"]');

  await readingCheckbox.check();
  await travelingCheckbox.check();

  await expect(readingCheckbox).toBeChecked();
  await expect(travelingCheckbox).toBeChecked();

  // ===== Interests (Multiple select) =====
  await page
    .locator('//select[@id="interests"]')
    .selectOption(['technology', 'music']);

  // ===== Country =====
  await page.locator('//select[@id="country"]').selectOption('canada');

  // ===== Date of Birth =====
  await page.locator('//input[@id="dob"]').fill('1994-08-20');

  // ===== Submit form =====
  await page.locator('//button[@type="submit"]').click();

  // ===== Verify user added into table =====
  const userRow = page.locator(
    '//table[@id="userTable"]//td[text()="Le Thi Ha"]',
  );

  await expect(userRow).toBeVisible();
});
