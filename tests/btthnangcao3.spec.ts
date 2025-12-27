import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
test.beforeAll(async( )=> {
    console.log('--- Bắt đầu chạy nhóm test ---');
});

test.describe('Nhóm A - Check list product', ()=>{
    let loginPage: LoginPage;

    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page)
        await loginPage.gotoLoginPage();
        await loginPage.loginValid('standard_user','secret_sauce');
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test ('the number product on the list is displayed correctly', async({page})=>{
        const itemCount = page.locator('.inventory_item');
        await expect(itemCount).toHaveCount(6);
    });
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

test.afterAll(async()=>{
    console.log('--- Kết thúc nhóm test ---');
})