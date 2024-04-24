import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
	await page.goto('https://account.tier4.jp/login');
})

test('test', async ({ page }) => {
  await page.getByPlaceholder('Enter your email').fill('');
  await page.getByPlaceholder('Enter your password').fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Enter your password').fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://portal.tier4.jp/');
  await expect(page).toHaveURL("https://portal.tier4.jp/")
});