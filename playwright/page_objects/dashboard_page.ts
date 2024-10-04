import { ButtonElement } from '@elements/button_element';
import { BasePage } from './base_page';
import { SelectElement } from '@elements/select_element';

export class DashboardPage extends BasePage {
  private readonly userMenuButton: ButtonElement;
  private readonly userMenuOption: SelectElement;

  constructor(private url = '/cpf/my-space') {
    super(url);
    this.userMenuButton = new ButtonElement('button-user-menu');
    this.userMenuOption = new SelectElement('user-menu-items');
  }

  async clickUserMenuOption(option: 'Profile settings' | 'Sign out') {
    this.userMenuButton.click();
    this.userMenuOption.select(option);
  }
}
