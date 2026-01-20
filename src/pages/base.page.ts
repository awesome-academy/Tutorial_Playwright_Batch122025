import { Page, Locator } from '@playwright/test';

/**
 * Base Page class providing common page functionality
 * All page objects should extend this class
 */
export abstract class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigate to a specific path
   * @param path - Relative path to navigate to
   */
  async goto(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Wait for page to finish loading
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get a locator for the specified selector
   * @param selector - CSS selector or other locator string
   */
  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Get the current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for a specific URL pattern
   * @param urlPattern - URL pattern to wait for (can be string or regex)
   */
  async waitForUrl(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlPattern);
  }
}
