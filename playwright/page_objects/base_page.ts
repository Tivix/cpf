import { expect } from '@playwright/test';
import playwrightObject from '@engine/playwright_object';

export abstract class BasePage {
  protected constructor(
    protected partialUrl?: string,
    protected tabName?: string,
    public pageSelector?: string
  ) {}

  context() {
    return playwrightObject.page().context();
  }

  async close() {
    await playwrightObject.close();
  }

  async open() {
    await playwrightObject.open(this.partialUrl as string);
  }

  async shouldBeOpened() {
    await this.waitForLoadState('domcontentloaded');
    if (this.pageSelector) {
      await this.waitForPageSelector();
    }
    if (this.partialUrl) {
      await this.validateUrl();
    }
    if (this.tabName) {
      await this.validatePageTitle();
    }
  }

  async waitForUrl(url: string) {
    await playwrightObject.page().waitForURL(url);
  }

  async waitForLoadState(
    state?: 'load' | 'domcontentloaded' | 'networkidle',
    options?: { timeout: number }
  ) {
    await playwrightObject.page().waitForLoadState(state, options);
  }

  async waitForPageSelector() {
    if (!this.pageSelector) {
      throw new Error('You need to specify page selector to be a');
    }
    await playwrightObject.page().locator(this.pageSelector).waitFor();
  }

  async validateUrl() {
    if (!this.partialUrl) {
      throw new Error("Can't checkUrl because uri is not specified");
    }
    await playwrightObject.page().waitForURL(this.partialUrl);
  }

  async validatePageTitle() {
    if (!this.tabName) {
      throw new Error("Can't checkTitle because title is not specified");
    }
    const actualTitle = await playwrightObject.page().title();
    expect(actualTitle).toEqual(this.tabName);
  }
}
