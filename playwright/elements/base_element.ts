import { Locator, expect } from '@playwright/test';
import playwrightObject from '../engine/playwright_object';

export interface Selector {
  cssSelector?: string;
  label?: string;
  testId?: string;
}

export abstract class BaseElement {
  constructor(public selector: Selector) {}

  element(): Locator {
    switch (true) {
      case !!this.selector.cssSelector:
        return playwrightObject.page().locator(this.selector.cssSelector);
      case !!this.selector.label:
        return playwrightObject.page().getByLabel(this.selector.label);
      case !!this.selector.testId:
        return playwrightObject.page().getByTestId(this.selector.testId);
      default:
        throw new Error('You need to specify some selector');
    }
  }

  public async toBeVisible() {
    await this.element().waitFor({ state: 'visible' });
  }

  public async toHaveText(text: string) {
    await expect(this.element()).toHaveText(text);
  }
}
