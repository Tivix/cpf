import { test as setup } from '@engine/test_runner';
import { faker } from '@faker-js/faker';
import { DashboardPage } from '@pageObjects/dashboard_page';
import { LoginPage } from '@pageObjects/login_page';

setup('create account and authenticate as an employee', async ({ initNew }, workerInfo) => {
  const testEmail = faker.internet.email();
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  await loginPage.open();
  await loginPage.loginInput.fill(testEmail);
  await loginPage.passwordInput.fill('password');
  await loginPage.signUpButton.click();
  await loginPage.loginInput.shouldBeValid();
  await loginPage.logInButton.click();

  await dashboardPage.shouldBeOpened();

  await dashboardPage
    .context()
    .storageState({ path: workerInfo.project.use.storageState as string });

  await dashboardPage.close();
});
