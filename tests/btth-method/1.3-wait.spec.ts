import test, { expect } from "@playwright/test";

test('check wait method', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    // 1.Click nút Start
    await page.getByRole('button',{name: 'Start'}).click();
    
    //2. Chờ loading hoàn tất (dòng chữ "Hello World!" xuất hiện)
    const textResult = page.getByText('Hello World!');
    await textResult.waitFor({state: 'visible'});

    //3. Kiểm tra dòng chữ hiển thị chính xác
    expect(textResult).toBeVisible();

    //5. Chụp screenshot kết quả
    await page.screenshot({path: 'dynamic-loaded.png'});

})