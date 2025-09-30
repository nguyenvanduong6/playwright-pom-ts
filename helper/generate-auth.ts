import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

const createSection = async function (baseUrl: string, username: string, password: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(baseUrl + '/login');
  await page.locator('input[data-qa="login-email"]').fill(username);
  await page.locator('input[data-qa="login-password"]').fill(password);
  await Promise.all([
    page.waitForURL(baseUrl),
    await page.locator('button[data-qa="login-button"]').click(),
  ]);

  // await context.storageState({ path: `.auth/${user}.json` });
  await context.storageState({ path: '.auth/user.json' });

  await browser.close();
};

const generateAuth = async (env: string) => {
  dotenv.config({ path: `.env.${env}` });
  const userEmail = process.env.USER_EMAIL!;
  const userPassword = process.env.USER_PASSWORD!;
  const baseUrl = process.env.BASE_URL!;
  await createSection(baseUrl, userEmail, userPassword);

  // if (user) {
  //   await createSection(loginUrl, user, users[user], userPassword);
  // } else {
  //   for (let key in users) {
  //     await createSection(loginUrl, key, users[key], userPassword);
  //   }
  // }
};

const env = (process.argv[2] as 'ci' | 'example' | 'dev' | 'stg' | 'prod') || 'dev';
// const user = process.argv[3] || ''; // create all user context if ''

generateAuth(env).then(() => {});
