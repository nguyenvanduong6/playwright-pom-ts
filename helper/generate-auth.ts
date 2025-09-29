import { chromium } from '@playwright/test';

const createSection = async function (username: string, password: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('login');
  await page.locator('input[data-qa="login-email"]').fill(username);
  await page.locator('input[data-qa="login-password"]').fill(password);
  await Promise.all([
    page.waitForURL('/'),
    await page.locator('button[data-qa="login-button"]').click(),
  ]);

  // await context.storageState({ path: `.auth/${user}.json` });
  await context.storageState({ path: '.auth/user.json' });

  await browser.close();
};

const generateAuth = async (env: string, user: string) => {
  const userEmail = process.env.USER_EMAIL!;
  const userPassword = process.env.USER_PASSWORD!;
  await createSection(userEmail, userPassword);

  // if (user) {
  //   await createSection(loginUrl, user, users[user], userPassword);
  // } else {
  //   for (let key in users) {
  //     await createSection(loginUrl, key, users[key], userPassword);
  //   }
  // }
};

const env = (process.argv[2] as 'ci' | 'dev' | 'stg' | 'prod') || 'dev';
// const user = process.argv[3] || ''; // create all user context if ''
const user = process.argv[3] as 'user';

generateAuth(env, user).then(() => {});
