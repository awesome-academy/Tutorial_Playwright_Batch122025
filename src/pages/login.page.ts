import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { selectors } from '../../locales/en/selectors';
import { ROUTES } from '../constants/routes';

/**
 * Login Page Object
 * Handles all interactions with the login functionality on the homepage
 */
export class LoginPage extends BasePage {
  private readonly loginSelectors = selectors.login;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get the login input field locator
   */
  private get loginInput(): Locator {
    return this.page.locator(this.loginSelectors.loginInput.loc);
  }

  /**
   * Get the password input field locator
   */
  private get passwordInput(): Locator {
    return this.page.locator(this.loginSelectors.passwordInput.loc);
  }

  /**
   * Get the login button locator
   */
  private get loginButton(): Locator {
    return this.page.getByRole('button', { name: this.loginSelectors.loginButton.name });
  }

  /**
   * Get the register link locator
   */
  private get registerLink(): Locator {
    return this.page.getByRole('link', { name: this.loginSelectors.registerLink.name });
  }

  /**
   * Get the error message locator
   */
  private get errorMessage(): Locator {
    return this.page.getByText(this.loginSelectors.errorMessage.text);
  }

  /**
   * Get the logout link locator (visible after login)
   */
  private get logoutLink(): Locator {
    return this.page.getByRole('link', { name: this.loginSelectors.logoutLink.name });
  }

  /**
   * Get the profile link locator (visible after login)
   */
  private get profileLink(): Locator {
    return this.page.getByRole('link', { name: this.loginSelectors.profileLink.name });
  }

  /**
   * Get the welcome message locator
   */
  private get welcomeMessage(): Locator {
    return this.page.locator(this.loginSelectors.welcomeMessage.loc).first();
  }

  /**
   * Navigate to the home/login page
   */
  async navigateToHomePage(): Promise<void> {
    await this.goto(ROUTES.HOME);
    await this.waitForPageLoad();
  }

  /**
   * Fill the login/username input field
   * @param username - Username to enter
   */
  async fillUsername(username: string): Promise<void> {
    await this.loginInput.fill(username);
  }

  /**
   * Fill the password input field
   * @param password - Password to enter
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Click the register link
   */
  async clickRegisterLink(): Promise<void> {
    await this.registerLink.click();
  }

  /**
   * Click the logout link (after successful login)
   */
  async clickLogout(): Promise<void> {
    await this.logoutLink.click();
  }

  /**
   * Complete login flow with username and password
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Check if login input field is visible
   */
  async isLoginInputVisible(): Promise<boolean> {
    return await this.loginInput.isVisible();
  }

  /**
   * Check if password input field is visible
   */
  async isPasswordInputVisible(): Promise<boolean> {
    return await this.passwordInput.isVisible();
  }

  /**
   * Check if login button is visible
   */
  async isLoginButtonVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  /**
   * Check if register link is visible
   */
  async isRegisterLinkVisible(): Promise<boolean> {
    return await this.registerLink.isVisible();
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Check if user is logged in (logout link is visible)
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.logoutLink.isVisible();
  }

  /**
   * Get the error message text
   */
  async getErrorMessageText(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Get the welcome message text
   */
  async getWelcomeMessageText(): Promise<string> {
    return await this.welcomeMessage.textContent() || '';
  }

  /**
   * Get the login input placeholder text
   */
  async getLoginInputPlaceholder(): Promise<string> {
    return await this.loginInput.getAttribute('placeholder') || '';
  }

  /**
   * Get the password input type attribute (should be 'password' for masking)
   */
  async getPasswordInputType(): Promise<string> {
    return await this.passwordInput.getAttribute('type') || '';
  }

  /**
   * Get the current value in the login input field
   */
  async getLoginInputValue(): Promise<string> {
    return await this.loginInput.inputValue();
  }

  /**
   * Get the current value in the password input field
   */
  async getPasswordInputValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Clear the login input field
   */
  async clearLoginInput(): Promise<void> {
    await this.loginInput.clear();
  }

  /**
   * Clear the password input field
   */
  async clearPasswordInput(): Promise<void> {
    await this.passwordInput.clear();
  }

  /**
   * Get all locators for verification (used in tests)
   */
  getLoginInputLocator(): Locator {
    return this.loginInput;
  }

  getPasswordInputLocator(): Locator {
    return this.passwordInput;
  }

  getLoginButtonLocator(): Locator {
    return this.loginButton;
  }

  getRegisterLinkLocator(): Locator {
    return this.registerLink;
  }

  getErrorMessageLocator(): Locator {
    return this.errorMessage;
  }

  getLogoutLinkLocator(): Locator {
    return this.logoutLink;
  }

  getProfileLinkLocator(): Locator {
    return this.profileLink;
  }

  getWelcomeMessageLocator(): Locator {
    return this.welcomeMessage;
  }
}
