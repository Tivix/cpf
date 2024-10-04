import _ from 'lodash';
import playwrightObject from '@engine/playwright_object';
import { test } from '@engine/test_runner';
import { DashboardPage } from '@pageObjects/dashboard_page';
import { LoginPage } from '@pageObjects/login_page';

test.describe('login page', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  test.afterEach(async () => {
    await playwrightObject.page().close();
  });

  test.use({ storageState: { cookies: [], origins: [] } });

  test('should have page title', async ({ initNew }) => {
    await loginPage.open();
    await loginPage.validatePageTitle();
  });

  test('should log in', async ({ initNew }) => {
    const testEmail = `${_.random()}@email.com`;

    await loginPage.open();
    await loginPage.loginInput.fill(testEmail);
    await loginPage.passwordInput.fill('password');
    await loginPage.signUpButton.click();
    await loginPage.loginInput.shouldBeValid();
    await loginPage.logInButton.click();

    await dashboardPage.shouldBeOpened();
  });
});
