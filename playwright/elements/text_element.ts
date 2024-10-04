import { BaseElement } from './base_element';

export class TextElement extends BaseElement {
  constructor(
    testId: string,
    public text: string
  ) {
    super({ testId });
  }

  async validateText() {
    await this.toHaveText(this.text);
  }
}
