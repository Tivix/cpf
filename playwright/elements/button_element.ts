import { BaseElement } from './base_element';

export class ButtonElement extends BaseElement {
  constructor(testId: string) {
    super({ testId });
  }

  async click(options?: { force?: boolean; noWaitAfter?: boolean; timeout?: number }) {
    await this.element().click(options);
  }
}

export function getButtonElement(testId: string): ButtonElement {
  return new ButtonElement(testId);
}
