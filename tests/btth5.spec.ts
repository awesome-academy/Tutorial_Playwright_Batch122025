import { test, Page, expect } from "@playwright/test";

// Access page https://demo.playwright.dev/todomvc
test ("User can access page demo", async({page}) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await expect(page).toHaveURL("https://demo.playwright.dev/todomvc/#/");
    await expect(page.getByRole("heading", {name:"todos"})).toBeVisible()
});
//Function Add task A, task B, task C
async function AddTask (
    page:Page,
    taskName: string) {
    await page.goto("https://demo.playwright.dev/todomvc");
    await page.goto("https://demo.playwright.dev/todomvc");
    await page.locator(".new-todo").fill(taskName);
    await page.locator(".new-todo").press("Enter")
};
// Add task successful
test ("User can add task successful", async ({page}) => {
    await AddTask(page, "Task A");
    await AddTask(page, "Task B");
    await AddTask(page, "Task C");
    await expect(page.getByTestId("todo-title").first()).toHaveText("Task A");
    await expect(page.getByTestId("todo-title").nth(1)).toHaveText("Task B");
    await expect(page.getByTestId("todo-title").nth(2)).toHaveText("Task C")
});
// Choose task B
test ("User can select task", async ({page}) => {
    await AddTask(page, "Task A");
    await AddTask(page, "Task B");
    await AddTask(page, "Task C");
    await page.getByRole("checkbox", {name:"Toggle Todo"}).nth(1).check();
    await expect(page.getByRole("checkbox", {name:"Toggle Todo"}).nth(1)).toBeChecked()
});

// Find task C and delete it
test ("User can delete task", async ({page}) => {
    await AddTask(page, "Task A");
    await AddTask(page, "Task B");
    await AddTask(page, "Task C");
    await page.locator(".view").filter({hasText:"Task C"}).hover();
    await page.locator(".view").filter({hasText:"Task C"}).locator('.destroy').click();
   /* const deleteButton = page
        .locator('[data-testid="todo-title"]', { hasText: 'Task C' })
        .locator('..')
    await deleteButton.hover();
    await deleteButton.locator('.destroy').click();   */
    await expect(page.locator('[data-testid="todo-title"]').filter({hasText:"Task C"})).not.toBeVisible()
});