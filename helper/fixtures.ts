import { test as base } from '@playwright/test';
import { setupContext } from './contextManager';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';

type pages = {
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<pages>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ browser }, use) => {
    const context = await setupContext(browser, 'user');
    const homePage = new HomePage(await context.newPage());
    await use(homePage);
    await context.close();
  },
});

export const expect = test.expect;
