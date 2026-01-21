import { Page, Locator } from '@playwright/test';
import { selectors } from '../../../locales/en/selectors';

/**
 * Footer Component - Reusable across all pages
 * Handles footer elements: social links, copyright
 */
export class FooterComponent {
  private readonly page: Page;
  private readonly footerSelectors = selectors.home.footer;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Get Facebook link element
   */
  get facebookLink(): Locator {
    return this.page.getByRole('link', { name: this.footerSelectors.facebookLink.name });
  }

  /**
   * Get Twitter link element
   */
  get twitterLink(): Locator {
    return this.page.getByRole('link', { name: this.footerSelectors.twitterLink.name });
  }

  /**
   * Get copyright text element
   */
  get copyrightText(): Locator {
    return this.page.getByText(this.footerSelectors.copyrightText.text);
  }

  /**
   * Scroll to footer section
   */
  async scrollToFooter(): Promise<void> {
    await this.copyrightText.scrollIntoViewIfNeeded();
  }
}
