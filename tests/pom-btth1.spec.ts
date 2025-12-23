import {test, expect, Page} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Logout } from '../pages/logout';
import { url } from 'inspector';

test.describe ('Login flow', () => {

    test.beforeEach(async ({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
    });

    test.afterEach(async ({page}) => {
    const logout = new Logout(page);
    await logout.logout();
    });
    
    test('Check url after logged in', async ({page})=> {
        await expect(page).toHaveURL(/inventory/);
    });

    test('Check product name of the first product', async({page})=>{
        await page.locator('[data-test ="product-sort-container"]').selectOption("az");
        await expect(page.locator('[data-test="inventory-item-name"]').nth(0)).toHaveText("Sauce Labs Backpack");
    })
});