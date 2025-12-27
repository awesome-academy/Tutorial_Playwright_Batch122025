import test, { expect } from "@playwright/test";

test('user can register account successfully with valid data into all fields', async({page})=>{
    await page.goto('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register');

    //1. Kiểm tra tiêu đề page hiển thị đúng là "Register"
    const header = page.getByRole('heading', { name: 'Register' });
    await expect(header).toBeVisible();

    //2. Kiểm tra các ô input có hiển thị
    const textFirstname = page.locator('input[name="firstName"]');
    const textLastname = page.locator('input[name="lastName"]');
    const textUsername = page.locator('input[name="username"]');
    const textPassword = page.locator('input[name="password"]');

    await textFirstname.waitFor({ state: 'visible' });
    await textLastname.waitFor({ state: 'visible' });
    await textUsername.waitFor({ state: 'visible' });
    await textPassword.waitFor({ state: 'visible' });

    //3.Điền thông tin vào các ô và nhấn nút "Register"
    await textFirstname.fill('Nguyen Thi Truc');
    await textLastname.fill('Na');
    await textUsername.fill('trucna');
    await textPassword.fill('Na123456');

    //4. Click button Register
    await page.getByRole('button', { name: 'Register' }).click();

    //5. Check đăng kí thành công
    await expect(page.getByText('Registration successful')).toBeVisible();
})