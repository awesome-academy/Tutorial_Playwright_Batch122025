import test, { expect } from "@playwright/test";

test('user can input data into all fields and submit the form', async ({ page }) => {
    // 1. Mở page form mẫu
    await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

    // 2. Input giá trị vào tất cả các field
    await page.fill('//input[@name="username"]', 'Nguyen Thi Truc Na');
    await page.fill('//input[@name="email"]', 'nguyen.thi.truc.na@sun-asterisk.com');
    await page.locator('input[type="radio"][value="female"]').check();
    await page.locator('input[type="checkbox"][value="traveling"]').check();
    await page.locator('input[type="checkbox"][value="cooking"]').check();
    await page.selectOption('#interests','music');
    await page.selectOption('#country','canada');  
    await page.fill('#dob', '20/12/1992');      

    //3. Check giá trị của radio và checkbox đã được chọn
    await expect (page.locator('input[type="radio"][value="female"]')).toBeChecked();
    await expect (page.locator('input[type="checkbox"][value="traveling"]')).toBeChecked();
    await expect (page.locator('input[type="checkbox"][value="cooking"]')).toBeChecked();

    // 4. Click button Submit 
    await page.click('//button[text()="Register"]');

    //5. Kiểm tra thông tin đăng kí thành công
    await page.waitForSelector('#userTable tbody tr');
    const emailCell = page.locator('td', {hasText: 'nguyen.thi.truc.na@sun-asterisk.com'});
    await expect(emailCell).toBeVisible;
});