import {test, expect, Page} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe ('Check Product list', () => {

    test.beforeEach(async ({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
    });
    
    test('Check url after logged in', async ({page})=> {
        await expect(page).toHaveURL(/inventory/);
    });

    test('Check product list', async({page})=>{
        await expect(page.locator('.inventory_item')).toHaveCount(6);
    })
});

test.describe ('Check Product on Cart', () => {

    test.beforeEach(async ({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add product to cart
    const addCart = page.locator('.inventory_item').filter({
    has: page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Backpack' })});
    await addCart.locator('button').click();
    });
    
    test ("verify number of product on cart after add 1 product to cart", async ({page}) => {
        await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    });
    test ("verify product name on cart is added product", async ({page}) => {
        await page.goto('https://www.saucedemo.com/cart.html');
        await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");

    });
});