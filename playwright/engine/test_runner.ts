import { test as base } from '@playwright/test';
import playwrightObject from '@engine/playwright_object';

export const test = base.extend<{ initNew: void }>({
  initNew: async ({ browser, browserName }, testFunction) => {
    await playwrightObject.initNew({
      playwrightBrowser: browser,
      browserName: browserName,
    });
    await testFunction();
  },
});
