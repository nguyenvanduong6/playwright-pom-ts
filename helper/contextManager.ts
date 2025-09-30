import { Browser, BrowserContext } from '@playwright/test';

export const setupContext = async (browser: Browser, role: string): Promise<BrowserContext> => {
  if (role === 'user') {
    return await browser.newContext({
      storageState: '.auth/user.json',
    });
  } else {
    return await browser.newContext();
  }
};
