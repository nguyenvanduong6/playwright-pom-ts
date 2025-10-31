import { test } from '../helper/fixtures';
import { expect } from '../helper/fixtures';

test('Verify user logged in', async ({ homePage }) => {
  await test.step('Given User open Login screen', async () => {
    await homePage.goTo();
  });

  await test.step('Then User should be logged in', async () => {
    expect(homePage.isLoggedIn()).toBeTruthy();
  });
});

test('Verify test case failed', async ({ homePage }) => {
  await test.step('Given User open Login screen', async () => {
    await homePage.goTo();
  });

  await test.step('Then User should be wrong data logged in', async () => {
    expect(homePage.isInvalidLoggedIn()).toBeTruthy();
  });
});
