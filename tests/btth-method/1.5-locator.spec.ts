import test, { expect } from "@playwright/test";

test('check wait method', async({page})=>{
    await page.goto('https://demo.playwright.dev/todomvc');

    // Thêm 3 công việc: Task A, Task B, Task C
    await page.locator('.new-todo').fill('Task A');
    await page.keyboard.press('Enter');

    await page.locator('.new-todo').fill('Task B');
    await page.keyboard.press('Enter');

    await page.locator('.new-todo').fill('Task C');
    await page.keyboard.press('Enter');

    // Tick chọn công việc thứ 2 (dùng .nth(1))
    const todoItem = page.getByTestId('todo-item');
    await todoItem.nth(1).getByRole('checkbox').check()
    await page.locator('.todo-list').nth(1).check();

    // Kiểm tra task đầu tiên là Task A (dùng .first())
    const firstTask = todoItem.first().getByTestId('todo-title');
    await expect(firstTask).toHaveText('Task A');

    // Dùng .filter() để chọn task có nội dung "Task C" và xóa nó
    const taskC= todoItem.filter( {hasText: 'Task C' });
    const deleteButton = todoItem.getByRole('button',{name:'Delete'});
    await taskC.hover();
    await deleteButton.click();
    await expect(taskC).toBeHidden();

})