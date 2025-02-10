import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
   await page.goto('http://localhost:5173/login');
});

test.describe('login page test', () => {
   test('checking heading', async ({ page }) => {
      await expect(page.getByTitle('heading-title')).toHaveText(
         'Please Log Into your account!',
      );
   });
});
