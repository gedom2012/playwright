import { test as setup } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

const authFile = './auth/user.json';

setup('authentication', async ({ page }) => {
  await page.goto('/v1/index.html');
  const pm = new PageManager(page);
  await pm
    .onLoginPage()
    .loginAsStandardUser(process.env.USERNAME as string, process.env.PASSWORD as string);

  await page.context().storageState({ path: authFile });
});
