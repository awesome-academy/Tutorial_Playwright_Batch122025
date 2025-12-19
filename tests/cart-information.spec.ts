import { test, expect, Page } from '@playwright/test';
//login
export async function login (
    page:Page,
    username: string = "standard_user",
    password: string = "secret_sauce")
    {
    await page.goto ("https://www.saucedemo.com/");
    await page.getByRole ('textbox', {name: "username"}).fill(username);
    await page.getByRole ('textbox', {name: "password"}).fill(password);
    await page.getByRole ('button', {name: "Login"}).click();
    }
// Add product to cart
async function addToCart (
    page:Page,
    productIndex: number = 0){
    await page.goto("https://www.saucedemo.com/inventory.html");
    await page.getByRole('button', { name: 'Add to cart' }).nth(productIndex).click();
    }
// Remove all product from cart
async function RemoveAllFromCart (page:Page) {
      await page.goto("https://www.saucedemo.com/cart.html");
      while (await page.getByRole('button', { name: 'Remove' }).count() > 0) {
      await page.getByRole('button', { name: 'Remove' }).nth(0).click();
    } }
//Add a product to card and check quanity on cart is 1
test ("verify number of product on cart after add 1 product to cart", async ({page}) => {
      await login(page);
      await RemoveAllFromCart(page);
      await addToCart(page);
      await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});
//Add n product to card and check quanity on cart is n
test ("verify number of product on cart after add n=5 product to cart", async ({page}) => {
      await login(page);
      await RemoveAllFromCart(page);
      for(let i=0;i<5;i++){
        await addToCart(page);
      }
      await expect(page.locator(".shopping_cart_badge")).toHaveText("5");
});