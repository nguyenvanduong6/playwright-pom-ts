import { test as base } from '@playwright/test';
import LoginPage from '../pages/loginPage';

type pages = {
  loginPage: LoginPage;
};

export const test = base.extend<pages>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export const expect = test.expect;
