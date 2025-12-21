import test, { expect } from "@playwright/test";

test('check interaction', async ({page})=>{
    //1. Access page
    await page.goto ('https://demoqa.com/automation-practice-form');
    
    //2. Input valid account
    await page.fill('#firstName','Nguyen Thi Truc');
    await page.fill('#lastName','Na');
    await page.fill('#userEmail','nguyen.thi.truc.na@sun-asterisk.com');
    //await page.locator('input[name="gender"][value="Female"]').check();
    //await page.getByLabel('Female').check();
    await page.fill('#userNumber','1234567890');

    await page.click('#dateOfBirthInput');
    await page.click('.react-datepicker__month-select');
    await page.getByText('1').click();
    await page.click('.react-datepicker__year-select');
    await page.getByText('1900').click();
    await page.getByText('1').click();

    await page.locator('input[type="checkbox"][text="Reading"]').check();
    await page.locator('input[type="checkbox"][text="Sports"]').check();
    await page.selectOption('#css-1uccc91-singleValue','Uttar Pradesh');

    //3. Click button Login
    await page.click('#submit');

    //4. Hover title page
    await page.hover('#');

    //5. Check popup hiển thị
    await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
});