import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import testData from '../../locales/en/data/login.json';
import { ROUTES } from '../../src/constants/routes';
import { url } from 'node:inspector';

/**
 * Test Suite: Login Functionality for Buggy.justtestit.org
 * 
 * This test suite covers all login scenarios including:
 * - Access control and security
 * - User interface and layout validation
 * - Valid login scenarios
 * - Invalid login scenarios
 * - Empty field validation
 * - Security and edge cases
 * 
 * Test Specification: tests/specifications/login.spec.md
 * Target Application: https://buggy.justtestit.org
 */

test.describe('Login Functionality - Buggy.justtestit.org', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage();
  });

  /**
   * Category 1: Access Control and Security
   */
  test.describe('Access Control and Security', () => {
    test('ID-0: Open Login Page (Unauthenticated User)', async ({ page }) => {
      // Test Steps:
      // 1. Navigate to URL https://buggy.justtestit.org/
      // 2. Wait for page to load completely
      // 3. Verify page URL matches expected value

      // Expected Results:
      // - The Login page loads successfully
      // - All page components are displayed correctly
      // - URL is https://buggy.justtestit.org/
      // - Username input field is visible
      // - Password input field is visible
      // - Login button is displayed
      // - Register button is displayed
      // - No authentication errors or redirects occur

      // Wait for page to load completely
      await loginPage.waitForPageLoad();

      // Verify URL and page title
      await expect(page).toHaveURL(ROUTES.HOME);
      await expect(page).toHaveTitle('Buggy Cars Rating');

      // Verify all login components are visible
      await expect(loginPage.getLoginInputLocator()).toBeVisible();
      await expect(loginPage.getPasswordInputLocator()).toBeVisible();
      await expect(loginPage.getLoginButtonLocator()).toBeVisible();
      await expect(loginPage.getRegisterLinkLocator()).toBeVisible();
    });
  });

  /**
   * Category 2: User Interface and Layout
   */
  test.describe('User Interface and Layout', () => {
    test('ID-1: Verify Login Page Layout and Element Visibility', async () => {
      // Test Steps:
      // 1. Observe the Login page layout and structure
      // 2. Locate and inspect the Username input field
      // 3. Verify Username field has placeholder or label
      // 4. Locate and inspect the Password input field
      // 5. Verify Password field has placeholder or label
      // 6. Locate and verify "Login" button visibility
      // 7. Locate and verify "Register" button visibility

      // Expected Results:
      // - Username field is visible and properly labeled
      // - Username field displays appropriate placeholder text
      // - Password field is visible and properly labeled
      // - "Login" button is visible and clickable
      // - "Register" button is visible and clickable
      // - All UI elements are properly aligned and accessible

      // Wait for page to load completely
      await loginPage.waitForPageLoad();

      // Verify username field
      await expect(loginPage.getLoginInputLocator()).toBeVisible();
      const loginPlaceholder = await loginPage.getLoginInputPlaceholder();
      expect(loginPlaceholder).toBe('Login');

      // Verify password field
      await expect(loginPage.getPasswordInputLocator()).toBeVisible();

      // Verify buttons
      await expect(loginPage.getLoginButtonLocator()).toBeVisible();
      await expect(loginPage.getLoginButtonLocator()).toBeEnabled();
      await expect(loginPage.getRegisterLinkLocator()).toBeVisible();
    });

    test('ID-2: Verify Password Field Input Masking', async () => {
      // Wait for page to load completely
      await loginPage.waitForPageLoad();
      // Test Steps:
      // 1. Click in the Password input field to focus
      // 2. Type the test string into the Password field
      // 3. Observe the displayed characters while typing
      // 4. Verify masking remains after typing completes
      // 5. Verify masking remains after field loses focus

      // Expected Results:
      // - All characters entered into the Password field are masked
      // - No plain text is visible at any point during input
      // - Password remains masked after completing input
      // - Password remains masked after clicking outside the field

      // Verify password field type is 'password' for masking
      const passwordType = await loginPage.getPasswordInputType();
      const expectedType = 'password';
      expect(passwordType).toBe(expectedType);

      // Type test string and verify it's masked
      await loginPage.fillPassword(testData.testStrings.passwordMaskTest);

      // Verify the input has value but type is still 'password'
      const passwordValue = await loginPage.getPasswordInputValue();
      expect(passwordValue).toBe(testData.testStrings.passwordMaskTest);
      expect(await loginPage.getPasswordInputType()).toBe(expectedType);

      // Click outside to lose focus
      await loginPage.getLoginInputLocator().click();

      // Verify masking still active after losing focus
      expect(await loginPage.getPasswordInputType()).toBe(expectedType);
    });
  });

  /**
   * Category 3: Valid Login Scenarios
   */
  test.describe('Valid Login Scenarios', () => {
    test('ID-3: Login with Valid Credentials (Happy Path)', async ({ page }) => {
      // Test Steps:
      // 1. Navigate to https://buggy.justtestit.org/
      // 2. Click in the Username input field
      // 3. Enter valid Username: "quyenlt"
      // 4. Click in the Password input field
      // 5. Enter valid Password: "Aa@123456"
      // 6. Click the "Login" button
      // 7. Wait for page to redirect

      // Expected Results:
      // - Login is successful without errors
      // - User is redirected or stays on home page with logged-in state
      // - Welcome message is displayed: "Hi, Quyen"
      // - Logout option becomes available
      // - No error messages are displayed

      await loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      );

      // Wait for page to load completely
      await loginPage.waitForPageLoad();

      // Verify successful login
      await expect(page).toHaveURL(ROUTES.HOME);
      await expect(loginPage.getLogoutLinkLocator()).toBeVisible();
      await expect(loginPage.getProfileLinkLocator()).toBeVisible();

      // Verify welcome message
      const welcomeText = await loginPage.getWelcomeMessageText();
      expect(welcomeText).toContain('Quyen');

      // Verify no error message
      await expect(loginPage.getErrorMessageLocator()).not.toBeVisible();
    });
  });

  /**
   * Category 4: Invalid Login Scenarios
   */
  test.describe('Invalid Login Scenarios', () => {
    test('ID-4: Login with Valid Username and Invalid Password', async ({ page }) => {
      // Test Steps:
      // 1. Navigate to https://buggy.justtestit.org/
      // 2. Enter valid Username: "quyenlt"
      // 3. Enter INVALID Password: "WrongPassword"
      // 4. Click the "Login" button

      // Expected Results:
      // - Login fails
      // - Appropriate error message is displayed
      // - Error message content: "Invalid username/password"
      // - User remains on the Login page

      await loginPage.login(
        testData.invalidCredentials.invalidPassword.username,
        testData.invalidCredentials.invalidPassword.password
      );

      // Wait for page to load completely
      await loginPage.waitForPageLoad();

      // Verify error message is displayed
      await expect(loginPage.getErrorMessageLocator()).toBeVisible();
      const errorText = await loginPage.getErrorMessageText();
      expect(errorText).toContain(testData.errorMessages.invalidCredentials);

      // Verify user is not logged in
      await expect(loginPage.getLogoutLinkLocator()).not.toBeVisible();

      // Verify still on login page
      await expect(loginPage.getLoginButtonLocator()).toBeVisible();
      await expect(page).toHaveURL(ROUTES.LOGIN);
    });

    test('ID-5: Login with Invalid Username and Valid Password', async ({ page }) => {
      // Test Steps:
      // 1. Navigate to https://buggy.justtestit.org/
      // 2. Enter INVALID Username: "WrongUsername"
      // 3. Enter valid Password: "Aa@123456"
      // 4. Click the "Login" button

      // Expected Results:
      // - Login fails
      // - Appropriate error message is displayed
      // - Error message content: "Invalid username/password"
      // - User remains on the Login page
      // - No authentication is granted
      // - No redirect occurs

      await loginPage.login(
        testData.invalidCredentials.invalidUsername.username,
        testData.invalidCredentials.invalidUsername.password
      );

      // Wait for page to load completely
      await loginPage.waitForPageLoad();

      // Verify error message is displayed
      await expect(loginPage.getErrorMessageLocator()).toBeVisible();
      const errorText = await loginPage.getErrorMessageText();
      expect(errorText).toContain(testData.errorMessages.invalidCredentials);

      // Verify user is not logged in
      await expect(loginPage.getLogoutLinkLocator()).not.toBeVisible();

      // Verify still on login page
      await expect(loginPage.getLoginButtonLocator()).toBeVisible();
      await expect(page).toHaveURL(ROUTES.LOGIN);

    });
  });

  /**
   * Category 5: Empty Field Validation
   */
  test.describe('Empty Field Validation', () => {
    test('ID-6: Login with Empty Username Field', async ({ page }) => {
      // Test Steps:
      // 1. Navigate to https://buggy.justtestit.org/
      // 2. Leave Username field empty (do not enter any value)
      // 3. Enter valid Password: "Aa@123456"
      // 4. Click the "Login" button
      // 5. Observe validation behavior

      // Expected Results:
      // - Login fails
      // - Error message or validation is displayed
      // - User remains on the Login page
      // - No authentication attempt is made

      // Leave username empty, fill password
      await loginPage.fillPassword(testData.emptyFields.emptyUsername.password);
      await loginPage.clickLoginButton();

      // Wait for page to load completely
      await loginPage.waitForPageLoad();

      // Verify browser validation tooltip for empty username
      const usernameValidationMsg = await page.locator('input[name="login"]').evaluate(el => el.validationMessage);
      expect(usernameValidationMsg).toBe(testData.errorMessages.usernameRequired);
    });

    test('ID-7: Login with Empty Password Field', async ({ page }) => {
      // Test Steps:
      // 1. Navigate to https://buggy.justtestit.org/
      // 2. Enter valid Username: "quyenlt"
      // 3. Leave Password field empty (do not enter any value)
      // 4. Click the "Login" button
      // 5. Observe validation behavior

      // Expected Results:
      // - Login fails
      // - Error message or validation is displayed
      // - User remains on the Login page
      // - Username field value is retained
      // - No authentication attempt is made

      // Fill username, leave password empty
      await loginPage.fillUsername(testData.emptyFields.emptyPassword.username);
      await loginPage.clickLoginButton();

      // Wait for page to load completely
      await loginPage.waitForPageLoad();

      // Verify browser validation tooltip for empty password
      const passwordValidationMsg = await page.locator('input[name="password"]').evaluate(el => el.validationMessage);
      expect(passwordValidationMsg).toBe(testData.errorMessages.passwordRequired);
    });
  });

  /**
   * Category 6: Security and Edge Cases
   */
  test.describe('Security and Edge Cases', () => {
    test('ID-8: Login with Mixed Case Username (Case Sensitivity Check)', async ({ page }) => {
      // Test Steps:
      // 1. Navigate to https://buggy.justtestit.org/
      // 2. Enter Username with mixed case: "QuyenLt"
      // 3. Enter valid Password: "Aa@123456"
      // 4. Click the "Login" button
      // 5. Observe authentication result

      // Expected Results:
      // - Login fails (case-sensitive)
      // - Error message is displayed: "Invalid username/password"
      // - User remains on the Login page
      // - No authentication is granted

      await loginPage.login(
        testData.edgeCases.mixedCaseUsername.username,
        testData.edgeCases.mixedCaseUsername.password
      );

      // Wait for page to load completely
      await loginPage.waitForPageLoad();

      // Always expect login to fail
      await expect(loginPage.getErrorMessageLocator()).toBeVisible();
      await expect(loginPage.getLogoutLinkLocator()).not.toBeVisible();
      await expect (page).toHaveURL(ROUTES.LOGIN);
    });

    test('ID-9: Login with 256-Character Input (Boundary Condition Test)', async ({ page }) => {
      // Test Steps:
      // 1. Navigate to https://buggy.justtestit.org/
      // 2. Generate a 256-character string
      // 3. Enter the 256-character string into the Username field
      // 4. Generate another 256-character string
      // 5. Enter the 256-character string into the Password field
      // 6. Click the "Login" button
      // 7. Observe system behavior and response

      // Expected Results:
      // - System handles the extreme input without crashing
      // - No HTTP 500 Internal Server Error occurs
      // - Application remains stable and functional
      // - System may enforce character limit or display validation error
      // - Page remains responsive

      const longUsername = 'a'.repeat(256);
      const longPassword = 'b'.repeat(256);

      await loginPage.fillUsername(longUsername);
      await loginPage.fillPassword(longPassword);
      await loginPage.clickLoginButton();

      // Wait for page to load completely
      await loginPage.waitForPageLoad();

      // Verify application didn't crash
      await expect(page).toHaveURL(ROUTES.HOME);
      await expect(loginPage.getLoginButtonLocator()).toBeVisible();

      // Verify no 500 error occurred (page still functional)
      await expect(loginPage.getLoginInputLocator()).toBeVisible();
      await expect(loginPage.getPasswordInputLocator()).toBeVisible();

      // Login should fail but application should remain stable
      // Error message may or may not appear depending on validation
      const isLoggedIn = await loginPage.isLoggedIn();
      expect(isLoggedIn).toBe(false);

      console.log('Boundary test passed: Application handled 256-character input without crashing');
    });
  });

  /**
   * Additional Test: Logout Functionality (Supporting Test)
   */
  test.describe('Logout Functionality', () => {
    test('Verify user can logout after successful login', async ({ page }) => {
      // Login first
      await loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      );

      // Verify logged in
      await expect(loginPage.getLogoutLinkLocator()).toBeVisible();

      // Logout
      await loginPage.clickLogout();

      // Wait for page to load completely
      await loginPage.waitForPageLoad();

      // Verify logged out (login form visible again)
      await expect(loginPage.getLoginInputLocator()).toBeVisible();
      await expect(loginPage.getLoginButtonLocator()).toBeVisible();
      await expect(loginPage.getLogoutLinkLocator()).not.toBeVisible();
    });
  });
});
