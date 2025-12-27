import { test,expect } from "@playwright/test";

test('user can input the search value',async({page}) => {
    //1. Mở page w3shool
    await page.goto ('https://www.w3schools.com/');

    //2. Input giá trị search
    await page.fill('#search2','TypeScript');

    //3. Click button search
    await page.click('#learntocode_searchbtn');

    //4. Check kết quả trả về
    await expect(page).toHaveURL(/typescript/);

});