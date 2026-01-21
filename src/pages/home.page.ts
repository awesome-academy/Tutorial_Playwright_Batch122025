import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { selectors } from '../../locales/en/selectors';
import { ROUTES } from '../constants/routes';
import { FooterComponent } from './components/footer.component';

/**
 * Home Page Object (Unauthenticated)
 * Handles all interactions with the home page elements and navigation
 */
export class HomePage extends BasePage {
  private readonly homeSelectors = selectors.home;
  private readonly loginSelectors = selectors.login;
  private readonly footer: FooterComponent;

  constructor(page: Page) {
    super(page);
    this.footer = new FooterComponent(page);
  }

  // ========================================
  // LOCATORS
  // ========================================

  // Logo
  private get logo(): Locator {
    return this.page.getByRole('link', { name: this.homeSelectors.logo.name });
  }

  // Login Form Elements
  private get usernameInput(): Locator {
    return this.page.getByRole('textbox', { name: this.loginSelectors.loginInput.name });
  }

  private get passwordInput(): Locator {
    return this.page.locator(this.loginSelectors.passwordInput.selector);
  }

  private get loginButton(): Locator {
    return this.page.getByRole('button', { name: this.loginSelectors.loginButton.name });
  }

  // Navigation Elements
  private get registerLink(): Locator {
    return this.page.getByRole('link', { name: this.loginSelectors.registerLink.name });
  }

  private get navigationHeader(): Locator {
    return this.page.getByRole('banner');
  }

  private get navigationBar(): Locator {
    return this.page.getByRole('navigation');
  }

  // Content Elements
  private get mainHeading(): Locator {
    return this.page.getByRole('heading', { 
      name: this.homeSelectors.mainHeading.name, 
      level: this.homeSelectors.mainHeading.level 
    });
  }

  private get mainContent(): Locator {
    return this.page.getByRole('main');
  }

  // ========================================
  // GETTER METHODS (for assertions)
  // ========================================

  /**
   * Get the logo element for assertions
   */
  getLogoElement(): Locator {
    return this.logo;
  }

  /**
   * Get username input field for assertions
   */
  getUsernameInputElement(): Locator {
    return this.usernameInput;
  }

  /**
   * Get password input field for assertions
   */
  getPasswordInputElement(): Locator {
    return this.passwordInput;
  }

  /**
   * Get login button for assertions
   */
  getLoginButtonElement(): Locator {
    return this.loginButton;
  }

  /**
   * Get register link element for assertions
   */
  getRegisterLinkElement(): Locator {
    return this.registerLink;
  }

  /**
   * Get navigation header element for assertions
   */
  getNavigationHeaderElement(): Locator {
    return this.navigationHeader;
  }

  /**
   * Get main heading element for assertions
   */
  getMainHeadingElement(): Locator {
    return this.mainHeading;
  }

  /**
   * Get main content area for assertions
   */
  getMainContentElement(): Locator {
    return this.mainContent;
  }

  /**
   * Get Facebook link element for assertions
   */
  getFacebookLinkElement(): Locator {
    return this.footer.facebookLink;
  }

  /**
   * Get Twitter link element for assertions
   */
  getTwitterLinkElement(): Locator {
    return this.footer.twitterLink;
  }

  /**
   * Get copyright text element for assertions
   */
  getCopyrightTextElement(): Locator {
    return this.footer.copyrightText;
  }

  // ========================================
  // INTERACTION METHODS
  // ========================================

  /**
   * Navigate to the home page
   */
  async navigateToHomePage(): Promise<void> {
    await this.goto(ROUTES.HOME);
    await this.waitForPageLoad();
  }

  /**
   * Click on the logo
   */
  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  /**
   * Fill username field
   * @param username - Username to enter
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill password field
   * @param password - Password to enter
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click register link
   */
  async clickRegisterLink(): Promise<void> {
    await this.registerLink.click();
  }

  /**
   * Hover over register link
   */
  async hoverRegisterLink(): Promise<void> {
    await this.registerLink.hover();
  }

  /**
   * Scroll to footer section
   */
  async scrollToFooter(): Promise<void> {
    await this.footer.scrollToFooter();
  }

  /**
   * Check if username input has focus
   */
  async isUsernameInputFocused(): Promise<boolean> {
    return await this.usernameInput.evaluate((el: any) => el === (el.ownerDocument as any).activeElement);
  }

  /**
   * Check if password input has focus
   */
  async isPasswordInputFocused(): Promise<boolean> {
    return await this.passwordInput.evaluate((el: any) => el === (el.ownerDocument as any).activeElement);
  }
}
