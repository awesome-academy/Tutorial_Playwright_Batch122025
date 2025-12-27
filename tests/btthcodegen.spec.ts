import { test, expect } from '@playwright/test';
    test('test', async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/');
        //1. Add thêm 1 task
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task A');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
        //2. Kiếm tra task được add
        await expect(page.locator('.todo-list li')).toHaveCount(1);
        //3. Check complete
        await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
        //5. Xóa task
        await page.getByRole('button', { name: 'Delete' }).click();
        //6. Kiểm tra task được xóa
        await expect(page.locator('.todo-list li')).toHaveCount(0);

        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task A');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter'); 
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task B');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
        await page.getByRole('listitem').filter({ hasText: 'Task B '}).getByLabel('Toggle Todo').check();
        await page.getByRole('link', { name: 'Active' }).click();
        await expect(page.locator('.todo-list li')).toHaveCount(1);

        await page.getByRole('link', { name: 'Completed' }).click();
        await expect(page.locator('.todo-list li')).toHaveCount(1);
});