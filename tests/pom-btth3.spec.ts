import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/loginPage"

test.describe ('Practice Hook', () => {

test.beforeAll(async () => {
    console.log('Start test');
});
test.beforeEach(async ({page}) =>{
    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('standard_user', 'secret_sauce');
});
test('login with valid info', async ({page}) => {
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
});
test('login with invalid info', async ({page}) => {
    await expect(page.locator('[data-test="error-button"]')).toHaveText('Login failed');
});
test.afterEach(async ({page}, testInfo) => {
await page.screenshot({ path: `screenshots/${testInfo.title}.png`, fullPage: true });
});

test.afterAll(async () => {
    console.log('Stop testing')
});

});