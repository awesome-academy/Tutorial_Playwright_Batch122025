import {test, expect, Page} from "@playwright/test";
// Verify page title is Register
test ("Verify page title is Register", async ({page}) => {
    await page.goto ("https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register");
    await expect(page.getByRole("heading",{name:"Register",level:2})).toBeVisible();
});
// Verify that all fields are displayed as in the design
test ("Verify that all fields are displayed as in the design", async ({page}) => {
    await page.goto ("https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register");
    await expect(page.getByLabel("First name")).toBeVisible();
        await expect(page.getByRole("textbox",{name:"First name"})).toBeVisible();
    await expect(page.getByLabel("Last name")).toBeVisible();
        await expect(page.getByRole("textbox",{name:"Last name"})).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
        await expect(page.getByRole("textbox",{name:"Username"})).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
        await expect(page.getByRole("textbox",{name:"Password"})).toBeVisible();
});

// Function: Fill in all fields in the registration form
async function inputAllFieldsInRegisterForm(
    page: Page,
    firstName: string,
    lastName: string,
    username: string,
    password: string) {
        await page.goto ("https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register");
        await page.locator("#firstName").fill(firstName);
        await page.locator("#Text1").fill(lastName);
        await page.getByRole("textbox",{name:"Username"}).fill(username);
        await page.getByRole("textbox",{name:"Password"}).fill(password);
};

// Verify Register successful after inputting all valid fields
test ("Verify Register successful after inputting all valid fields", async ({page}) => {
        await inputAllFieldsInRegisterForm(page,"Annie", "Lee", "annie_lee", "Aa@123456");
        await expect(page.getByRole( "button", {name:"Register"})).toBeEnabled();
        await page.getByRole( "button", {name:"Register"}).click();
        await expect(page.locator('text=Registration successful')).toBeVisible();
});

