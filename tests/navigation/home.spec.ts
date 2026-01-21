import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/home.page';
import testData from '../../locales/en/data/home.json';
import loginTestData from '../../locales/en/data/login.json';

/**
 * Test Suite: Home Page (Unauthenticated) for Buggy.justtestit.org
 * 
 * This test suite covers all home page scenarios including:
 * - Page load and access control
 * - Navigation elements (logo, register button, header)
 * - Login form components (UI only, not functionality)
 * - Content and branding
 * - Footer and social links
 * 
 * Test Specification: tests/specifications/home.spec.md
 * Target Application: https://buggy.justtestit.org
 * Note: Login functionality tests are in tests/authentication/login.spec.ts
 */

test.describe('Home Page (Unauthenticated) - Buggy.justtestit.org', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  /**
   * Category 1: Page Load and Access Control
   */
  test.describe('Category 1: Page Load and Access Control', () => {
    test('ID-0: Access Home Page as Unauthenticated User', async ({ page }) => {
      // Test Steps:
      // 1. Open web browser
      // 2. Navigate to URL https://buggy.justtestit.org/
      // 3. Wait for page to load completely
      // 4. Verify page loads successfully

      // Expected Results:
      // - Home page loads successfully without errors
      // - Page URL is exactly https://buggy.justtestit.org/
      // - Page title is "Buggy Cars Rating"
      // - No redirect to other pages occurs
      // - Page content is fully rendered
      // - Page load time is within acceptable limits (< 5 seconds)

      // Verify URL
      await expect(page).toHaveURL(testData.urls.home);

      // Verify page title
      await expect(page).toHaveTitle(testData.expectedText.pageTitle);

      // Verify page content is rendered
      await expect(homePage.getLogoElement()).toBeVisible();
      await expect(homePage.getMainHeadingElement()).toBeVisible();
      await expect(homePage.getUsernameInputElement()).toBeVisible();
      await expect(homePage.getPasswordInputElement()).toBeVisible();
      await expect(homePage.getLoginButtonElement()).toBeVisible();
      await expect(homePage.getRegisterLinkElement()).toBeVisible();
    });
  });

  /**
   * Category 2: Navigation Elements
   */
  test.describe('Category 2: Navigation Elements', () => {
    test('ID-1: Verify Logo and Branding Link', async ({ page }) => {
      // Test Steps:
      // 1. Locate the "Buggy Rating" logo/link in the navigation header
      // 2. Verify logo is visible and displays correct text
      // 3. Verify logo has appropriate styling and branding
      // 4. Click on the "Buggy Rating" logo/link
      // 5. Observe navigation behavior

      // Expected Results:
      // - "Buggy Rating" logo/link is visible in the header
      // - Logo text displays as "Buggy Rating"
      // - Logo has clickable/pointer cursor on hover
      // - Clicking logo refreshes the home page OR keeps user on home page
      // - URL remains https://buggy.justtestit.org/ after click

      const logo = homePage.getLogoElement();

      // Verify logo is visible
      await expect(logo).toBeVisible();

      // Verify logo text
      await expect(logo).toHaveText(testData.expectedText.logoText);

      // Verify logo has href attribute pointing to "/"
      await expect(logo).toHaveAttribute('href', '/');

      // Click logo
      await homePage.clickLogo();

      // Verify URL remains the same or refreshes to home
      await expect(page).toHaveURL(testData.urls.home);
    });

    test('ID-2: Verify Register Button Navigation', async ({ page }) => {
      // Test Steps:
      // 1. Locate the "Register" button/link in the navigation area
      // 2. Verify "Register" button is visible and properly styled
      // 3. Hover over the "Register" button
      // 4. Click the "Register" button
      // 5. Wait for page navigation
      // 6. Verify destination page

      // Expected Results:
      // - "Register" button/link is visible and accessible
      // - Button displays text "Register"
      // - Button has clickable/pointer cursor on hover
      // - Button may have visual feedback on hover (color change, underline, etc.)
      // - Clicking button navigates to registration page
      // - URL changes to https://buggy.justtestit.org/register
      // - Registration page loads successfully

      const registerLink = homePage.getRegisterLinkElement();

      // Verify register link is visible
      await expect(registerLink).toBeVisible();

      // Verify button text
      await expect(registerLink).toHaveText(testData.expectedText.registerLinkText);

      // Hover over register link
      await homePage.hoverRegisterLink();

      // Click register link
      await homePage.clickRegisterLink();

      // Wait for navigation and verify URL
      await expect(page).toHaveURL(testData.urls.register);
    });

    test('ID-3: Verify Navigation Header Visibility and Layout', async ({ page }) => {
      // Test Steps:
      // 1. Observe the navigation header section
      // 2. Verify "Buggy Rating" logo is in the header
      // 3. Verify login form fields are in the header
      // 4. Verify "Login" button is in the header
      // 5. Verify "Register" link is in the header
      // 6. Check header layout and alignment
      // 7. Verify header remains visible when scrolling (if applicable)

      // Expected Results:
      // - Navigation header is visible at the top of the page
      // - Logo "Buggy Rating" is positioned on the left side
      // - Login form (username + password fields) is positioned on the right side
      // - "Login" button is next to the password field
      // - "Register" link is visible and accessible

      const header = homePage.getNavigationHeaderElement();
      const logo = homePage.getLogoElement();
      const usernameInput = homePage.getUsernameInputElement();
      const passwordInput = homePage.getPasswordInputElement();
      const loginButton = homePage.getLoginButtonElement();
      const registerLink = homePage.getRegisterLinkElement();

      // Verify header is visible
      await expect(header).toBeVisible();

      // Verify all elements are visible in the header
      await expect(logo).toBeVisible();
      await expect(usernameInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(loginButton).toBeVisible();
      await expect(registerLink).toBeVisible();
    });
  });

  /**
   * Category 3: Login Form Components
   */
  test.describe('Category 3: Login Form Components', () => {
    test('ID-4: Verify Login Form Field Visibility', async ({ page }) => {
      // Test Steps:
      // 1. Locate the login form in the navigation header
      // 2. Identify the username/login input field
      // 3. Identify the password input field
      // 4. Verify both fields are visible
      // 5. Check for placeholder text or labels
      // 6. Verify field styling and appearance

      // Expected Results:
      // - Login form is visible in the navigation header
      // - Username/login input field is visible
      // - Password input field is visible
      // - Username field may have placeholder "Login" or similar
      // - Password field has type="password" (masked input)
      // - Both fields have appropriate size and styling
      // - Fields are properly aligned horizontally
      // - Fields are interactive and accept input

      const usernameInput = homePage.getUsernameInputElement();
      const passwordInput = homePage.getPasswordInputElement();

      // Verify username field is visible
      await expect(usernameInput).toBeVisible();

      // Verify password field is visible
      await expect(passwordInput).toBeVisible();

      // Verify password field has type="password" (masked input)
      await expect(passwordInput).toHaveAttribute('type', 'password');

      // Verify fields are interactive
      await expect(usernameInput).toBeEnabled();
      await expect(passwordInput).toBeEnabled();
    });

    test('ID-5: Verify Login Button Presence and State', async ({ page }) => {
      // Test Steps:
      // 1. Locate the "Login" button in the navigation header
      // 2. Verify button is visible and accessible
      // 3. Verify button displays text "Login"
      // 4. Check button state (enabled/disabled)
      // 5. Hover over the button
      // 6. Verify button styling and appearance

      // Expected Results:
      // - "Login" button is visible next to password field
      // - Button displays text "Login"
      // - Button is enabled by default (not disabled)
      // - Button has appropriate styling (color, size, border)
      // - Button shows visual feedback on hover (cursor: pointer)
      // - Button may change appearance on hover (color change)
      // - Button is clickable and interactive

      const loginButton = homePage.getLoginButtonElement();

      // Verify button is visible
      await expect(loginButton).toBeVisible();

      // Verify button text
      await expect(loginButton).toHaveText(testData.expectedText.loginButtonText);

      // Verify button is enabled
      await expect(loginButton).toBeEnabled();

      // Hover over button
      await loginButton.hover();

      // Verify button is clickable
      await expect(loginButton).toBeEnabled();
    });

    test('ID-6: Verify Login Form Input Interaction', async ({ page }) => {
      // Test Steps:
      // 1. Click in the username/login input field
      // 2. Verify field receives focus (focus indicator visible)
      // 3. Type test text "testuser" into username field
      // 4. Verify typed text appears in the field
      // 5. Click in the password input field
      // 6. Verify field receives focus
      // 7. Type test text "testpass" into password field
      // 8. Verify password text is masked (shows dots/asterisks)

      // Expected Results:
      // - Username field is focusable and shows focus indicator
      // - Username field accepts text input
      // - Typed username text is visible in the field
      // - Password field is focusable and shows focus indicator
      // - Password field accepts text input
      // - Password input is masked (not visible as plain text)
      // - Both fields maintain input until cleared or submitted
      // - Fields support standard keyboard interactions (Tab, Enter, etc.)

      const usernameInput = homePage.getUsernameInputElement();
      const passwordInput = homePage.getPasswordInputElement();

      // Click username field and verify focus - Reuse test data from login.json
      await homePage.fillUsername(loginTestData.validCredentials.username);
      
      // Verify username field has the typed text
      await expect(usernameInput).toHaveValue(loginTestData.validCredentials.username);

      // Click password field and verify focus
      await homePage.fillPassword(loginTestData.validCredentials.password);

      // Verify password field has value (but masked)
      await expect(passwordInput).toHaveValue(loginTestData.validCredentials.password);

      // Verify password is masked
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  /**
   * Category 4: Content and Branding
   */
  test.describe('Category 4: Content and Branding', () => {
    test('ID-7: Verify Main Heading Display', async ({ page }) => {
      // Test Steps:
      // 1. Locate the main heading on the page
      // 2. Verify heading displays text "Buggy Cars Rating"
      // 3. Check heading size and prominence (should be H1)
      // 4. Verify heading styling and appearance
      // 5. Check heading position on the page

      // Expected Results:
      // - Main heading is visible on the page
      // - Heading text is exactly "Buggy Cars Rating"
      // - Heading uses H1 tag (semantic HTML)
      // - Heading has prominent size and styling
      // - Heading is positioned prominently (likely center or top)
      // - Heading text is properly formatted with adequate spacing
      // - Heading is readable and clear

      const mainHeading = homePage.getMainHeadingElement();

      // Verify heading is visible
      await expect(mainHeading).toBeVisible();

      // Verify heading text (may have whitespace variations)
      const headingText = await mainHeading.textContent();
      expect(headingText?.replace(/\s+/g, '')).toBe(testData.expectedText.mainHeading.replace(/\s+/g, ''));

      // Verify it's an H1 tag
      const tagName = await mainHeading.evaluate((el) => el.tagName);
      expect(tagName).toBe('H1');
    });

    test('ID-8: Verify Main Image/Visual Content Display', async ({ page }) => {
      // Test Steps:
      // 1. Locate the main image/visual content area
      // 2. Verify image loads successfully
      // 3. Check image appears in the main content area
      // 4. Verify image has appropriate size and resolution
      // 5. Check image alt text (if applicable)

      // Expected Results:
      // - Main image/visual element is visible on the page
      // - Image loads without errors (no broken image icon)
      // - Image is appropriately sized and positioned
      // - Image is clear and not pixelated
      // - Image may have alt text for accessibility
      // - Image fits within the page layout without overflow
      // - Image loads in reasonable time

      const mainContent = homePage.getMainContentElement();

      // Verify main content area is visible (use first() for strict mode)
      await expect(mainContent.first()).toBeVisible();

      // Find images within main content
      const images = mainContent.first().locator('img');
      const imageCount = await images.count();

      // Verify at least one image exists
      expect(imageCount).toBeGreaterThan(0);

      // Check first image is visible and loaded
      if (imageCount > 0) {
        const firstImage = images.first();
        await expect(firstImage).toBeVisible();

        // Verify image is loaded (naturalWidth > 0)
        const isLoaded = await firstImage.evaluate((img: any) => img.naturalWidth > 0);
        expect(isLoaded).toBeTruthy();
      }
    });
  });

  /**
   * Category 5: Footer and Social Links
   */
  test.describe('Category 5: Footer and Social Links', () => {
    test('ID-9: Verify Social Media Links', async ({ page }) => {
      // Test Steps:
      // 1. Scroll to the footer section of the page
      // 2. Locate Facebook social media link/icon
      // 3. Verify Facebook link is visible
      // 4. Locate Twitter social media link/icon
      // 5. Verify Twitter link is visible
      // 6. Inspect Facebook link href attribute
      // 7. Inspect Twitter link href attribute
      // 8. Verify both links have appropriate visual indicators (icons)

      // Expected Results:
      // - Facebook link/icon is visible in the footer
      // - Twitter link/icon is visible in the footer
      // - Facebook link has href="https://www.facebook.com"
      // - Twitter link has href="https://www.twitter.com"
      // - Both links have recognizable social media icons
      // - Links have cursor:pointer on hover
      // - Links may open in new tab (target="_blank")
      // - Icons are properly styled and not broken

      // Scroll to footer
      await homePage.scrollToFooter();

      const facebookLink = homePage.getFacebookLinkElement();
      const twitterLink = homePage.getTwitterLinkElement();

      // Verify Facebook link is visible
      await expect(facebookLink).toBeVisible();

      // Verify Twitter link is visible
      await expect(twitterLink).toBeVisible();

      // Verify Facebook link href
      await expect(facebookLink).toHaveAttribute('href', testData.urls.facebook);

      // Verify Twitter link href
      await expect(twitterLink).toHaveAttribute('href', testData.urls.twitter);

      // Verify links have images (icons)
      const fbIcon = facebookLink.locator('img');
      const twIcon = twitterLink.locator('img');

      await expect(fbIcon).toBeVisible();
      await expect(twIcon).toBeVisible();
    });

    test('ID-10: Verify Footer Copyright Information', async ({ page }) => {
      // Test Steps:
      // 1. Scroll to the bottom of the page
      // 2. Locate the footer section
      // 3. Locate the copyright text/paragraph
      // 4. Read and verify copyright text content
      // 5. Verify copyright year and company name

      // Expected Results:
      // - Footer section is visible at the bottom of the page
      // - Copyright text is visible in the footer
      // - Copyright displays: "© 2016 Buggy Software, Inc."
      // - Copyright symbol (©) is properly rendered
      // - Year is displayed: "2016"
      // - Company name is: "Buggy Software, Inc."
      // - Text has appropriate styling (may be smaller, lighter color)
      // - Text is centered or aligned consistently with footer layout

      // Scroll to footer
      await homePage.scrollToFooter();

      const copyrightText = homePage.getCopyrightTextElement();

      // Verify copyright text is visible
      await expect(copyrightText).toBeVisible();

      // Verify copyright text content
      await expect(copyrightText).toHaveText(testData.expectedText.copyrightText);
    });
  });
});
