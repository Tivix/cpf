import { BaseElement } from './base_element';

export class SelectElement extends BaseElement {
  constructor(testId: string) {
    super({ testId });
  }

  async select(option: string) {
    await this.element().getByText(option).click();
  }
}
