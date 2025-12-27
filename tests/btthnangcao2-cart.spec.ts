import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

test.describe('Nhóm A - Check list product', ()=>{
    let loginPage: LoginPage;

    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page)
        await loginPage.gotoLoginPage();
        await loginPage.loginValid('standard_user','secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test ('the first product is displayed correctly', async({page})=>{

        await expect(page.locator('#item_4_title_link')).toHaveText('Sauce Labs Backpack');
    });

    test ('the number product on the list is displayed correctly', async({page})=>{
        const itemCount = page.locator('.inventory_item');
        await expect(itemCount).toHaveCount(6);
    });
})

test.describe('Nhóm B - Check add cart function', ()=>{
    let loginPage: LoginPage;

    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page)
        await loginPage.gotoLoginPage();
        await loginPage.loginValid('standard_user','secret_sauce');
        await expect(page).toHaveURL(/inventory/);
        await page.click('#add-to-cart-sauce-labs-backpack');
    });
        
    test ('the product in the cart list is displayed correctly', async({page})=>{
        const cartBage = page.locator('.shopping_cart_badge');
        await expect(cartBage).toHaveText('1');
    });

    test ('the user can add product successfully correctly', async({page})=>{
        await page.click('.shopping_cart_link');
        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    });
})