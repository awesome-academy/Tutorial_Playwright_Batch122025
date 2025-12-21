import { expect, test } from "@playwright/test";

test.describe('Login flow tests', ()=>{
    test.beforeEach(async ({page})=>{
        await page.goto ('https://www.saucedemo.com/');
        await page.fill('//input[@name="user-name"]','standard_user');
        await page.fill('//input[@name="password"]','secret_sauce');
        await page.click('#login-button');
    });

    test.afterEach (async ({page})=>{
        await page.screenshot({path:'screenshots/${testInfo.title}.png', fullPage: true });
    });
        
    test ('the user can login successfully with valid account', async({page})=>{
        await expect(page).toHaveURL(/inventory/);
    });

    test ('the user logout successfully', async({page})=>{
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    })

})