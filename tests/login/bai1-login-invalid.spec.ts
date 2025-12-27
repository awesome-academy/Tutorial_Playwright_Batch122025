import { expect, test } from "@playwright/test";

test ('the user logins unsuccess with wrong password', async({page})=>{
    //1. Access page
    await page.goto ('https://www.saucedemo.com/');
    
    //2. Input valid account
    await page.fill('//input[@name="user-name"]','standard_user');
    await page.fill('//input[@name="password"]','secret_sauce1');

    //3. Click button Login
    await page.click('#login-button');

    //4. Kiểm tra error message hiển thị
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test ('the user logins unsuccess with blank username', async({page})=>{
    //1. Access page
    await page.goto ('https://www.saucedemo.com/');
    
    //2. Input valid account
    await page.fill('//input[@name="user-name"]','');
    await page.fill('//input[@name="password"]','secret_sauce');

    //3. Click button Login
    await page.click('#login-button');

    //4. Kiểm tra error message hiển thị
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
})

test ('the user logins unsuccess with the blocked user', async({page})=>{
    //1. Access page
    await page.goto ('https://www.saucedemo.com/');
    
    //2. Input valid account
    await page.fill('//input[@name="user-name"]','locked_out_user');
    await page.fill('//input[@name="password"]','secret_sauce');

    //3. Click button Login
    await page.click('#login-button');

    //4. Kiểm tra error message hiển thị
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
})