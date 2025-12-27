import test, { expect } from "@playwright/test";

test('check direction', async ({page})=>{
    //1. Access page
    await page.goto ('https://www.saucedemo.com/');
    
    //2. Input valid account
    await page.fill('//input[@name="user-name"]','standard_user');
    await page.fill('//input[@name="password"]','secret_sauce');

    //3. Click button Login
    await page.click('#login-button');

    //4. Chờ điều hướng đế top page
    await page.waitForURL('https://www.saucedemo.com/inventory.html');

    //5. Kiểm tra page hiện tại
    console.log("Page hiện tại đang là",page.url());

    //6. Reload page
    await page.reload();

    //7. Kiểm tra URL sau khi reload
    await expect(page).toHaveURL(/inventory.html/);
});
