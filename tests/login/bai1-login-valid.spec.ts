import { expect, test } from "@playwright/test";

test ('the user can login success with valid account', async({page})=>{
    //1. Access page
    await page.goto ('https://www.saucedemo.com/');
    
    //2. Input valid account
    await page.fill('//input[@name="user-name"]','standard_user');
    await page.fill('//input[@name="password"]','secret_sauce');

    //3. Click button Login
    await page.click('#login-button');

    //4. Kiểm tra login thành công không
    // await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    // await expect(page).toHaveURL(/inventory/);
    await expect(page).toHaveTitle('Swag Labs');

})