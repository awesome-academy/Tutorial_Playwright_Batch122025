import { expect, test } from "@playwright/test";

test ('the user can add products into the cart', async({page})=>{
    //1. Access page
    await page.goto ('https://www.saucedemo.com/');
    
    //2. Input valid account
    await page.fill('//input[@name="user-name"]','standard_user');
    await page.fill('//input[@name="password"]','secret_sauce');

    //3. Click button Login
    await page.click('#login-button');

    //4. Add products into the cart
    await page.click('#add-to-cart-sauce-labs-bike-light');

    const cartBage = page.locator('.shopping_cart_badge');
    await expect(cartBage).toHaveText('1');

    await page.click('#add-to-cart-sauce-labs-backpack');
    await expect(cartBage).toHaveText('2');
})