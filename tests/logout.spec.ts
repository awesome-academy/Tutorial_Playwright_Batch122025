import { test, expect, Page } from '@playwright/test';
//login
async function login (
    page:Page,
    username: string = "standard_user",
    password: string = "secret_sauce")
    {
    await page.goto ("https://www.saucedemo.com/");
    await page.getByRole ('textbox', {name: "username"}).fill(username);
    await page.getByRole ('textbox', {name: "password"}).fill(password);
    await page.getByRole ('button', {name: "Login"}).click();
    };

    // logout
    test ("logout", async ({page})=> {
        await login(page);
        await page.getByRole("button", {name: "Open Menu"}).click();
        await page.getByRole("link", {name:"Logout"}).click();
        await expect(page).toHaveURL("https://www.saucedemo.com");
    })