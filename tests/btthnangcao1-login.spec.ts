import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

test.describe('Login flow tests', ()=>{
    let loginPage: LoginPage;

    test.beforeEach(async ({page})=>{
       loginPage = new LoginPage(page)
       await loginPage.gotoLoginPage();
    });

    test.afterEach (async ({page}, testInfo)=>{
        if (testInfo.status !== testInfo.expectedStatus) {
            await page.screenshot({path:'screenshots/${testInfo.title}.png', fullPage: true });
        }
        const menuButton = page.locator('#react-burger-menu-btn');
        if (await menuButton.isVisible()){
            await menuButton.click();
            await page.click('#logout_sidebar_link');
        }
    });
        
    test ('the user can login successfully with valid account', async({page})=>{
        await loginPage.loginValid('standard_user','secret_sauce');
        await expect(page).toHaveURL(/inventory/);
    });

    test ('the user can not login  with invalid account', async({page})=>{
        await loginPage.loginValid('locked_out_user','secret_sauce');
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test ('the first product is displayed correctly', async({page})=>{
        await loginPage.loginValid('standard_user','secret_sauce');
        await expect(page.locator('#item_4_title_link')).toHaveText('Sauce Labs Backpack');
    });
})