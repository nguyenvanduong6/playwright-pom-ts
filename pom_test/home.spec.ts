import { test } from '../helper/fixtures';
import { expect } from '@playwright/test';

test('Verify user login successfully', async ({ homePage }) => {
  await homePage.goTo();
  expect(homePage.isLoggedIn()).toBeTruthy();
});
