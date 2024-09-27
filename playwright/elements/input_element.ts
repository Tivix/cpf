import { expect } from '@playwright/test';
import { BaseElement } from './base_element';

export class InputElement extends BaseElement {
  constructor(label: string) {
    super({ label });
  }

  async fill(
    value: string,
    options?: { force?: boolean; noWaitAfter?: boolean; timeout?: number }
  ) {
    await this.element().fill(value, options);
  }

  async checkValue(value: string) {
    await expect(this.element()).toHaveValue(value);
  }

  async shouldBeValid() {
    await expect(this.element()).toHaveJSProperty('validationMessage', '');
  }
}

export function getInputElement(label: string): InputElement {
  return new InputElement(label);
}
