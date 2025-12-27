import { expect, test } from "@playwright/test";
test.use({ video: 'on' });

test ('the user logins unsuccess with wrong password', async({page})=>{
    
    //1. Access page
    await page.goto ('https://www.saucedemo.com/');
    
    //2. Input valid account
    await page.fill('//input[@name="user-name"]','standard_user');
    await page.fill('//input[@name="password"]','secret_sauce1');

    //3. Click button Login
    await page.click('#login-button');

    //4. Kiểm tra error message hiển thị
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');

    //5. Chụp screenshot sau khi kết thúc
    await page.screenshot({path:'screenshots/${testInfo.title}.png', fullPage: true });

    //6. Ghi log URL và nội dung báo lỗi ra console
    console.log(`URL lúc bị lỗi: ${page.url()}`);

});

