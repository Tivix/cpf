import { ButtonElement } from '@elements/button_element';
import { BasePage } from './base_page';
import { InputElement } from '@elements/input_element';

export class LoginPage extends BasePage {
  readonly loginInput: InputElement;
  readonly passwordInput: InputElement;
  readonly logInButton: ButtonElement;
  readonly signUpButton: ButtonElement;

  constructor(
    private url = '/cpf/auth',
    private title = 'CPF - Career Progression Framework',
    pageSelector = 'main'
  ) {
    super(url, title, pageSelector);
    this.loginInput = new InputElement('Email');
    this.passwordInput = new InputElement('Password');
    this.logInButton = new ButtonElement('button-log-in');
    this.signUpButton = new ButtonElement('button-sign-up');
  }
}
