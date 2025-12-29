import { expect, Page } from '@playwright/test';
import { test } from './fixtures/login.fixture';

test('Access Cart', async ({ loggedInPage }) => {
await loggedInPage.goto('https://www.saucedemo.com/cart.html');
await expect(loggedInPage.getByText('Your Cart')).toBeVisible();
});

test('Cart info', async ({ loggedInPage }) => {
await loggedInPage.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await loggedInPage.goto('https://www.saucedemo.com/cart.html');
await expect(loggedInPage.getByText('Sauce Labs Backpack')).toBeVisible();
});