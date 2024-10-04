import playwrightObject from '@engine/playwright_object';
import { test } from '@engine/test_runner';
import { DashboardPage } from '@pageObjects/dashboard_page';
import { LoginPage } from '@pageObjects/login_page';

test.describe('user menu', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  test.afterEach(async () => {
    await playwrightObject.close();
  });

  test('should sign out', async ({ initNew }) => {
    await dashboardPage.open();
    await dashboardPage.shouldBeOpened();

    await dashboardPage.clickUserMenuOption('Sign out');

    await loginPage.shouldBeOpened();
  });
});
