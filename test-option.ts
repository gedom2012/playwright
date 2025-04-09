import { test as base } from '@playwright/test';
import { PageManager } from './page-objects/page-manager';

export type TestOptions = {
  inventoryURL: string;
  pageManager: PageManager;
};

export const test = base.extend<TestOptions>({
  inventoryURL: ['', { option: true }],
  pageManager: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});
