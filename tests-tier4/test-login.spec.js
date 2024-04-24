import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

const path = "./src/setting.json"
const bufferData = readFileSync(path);
const dataJSON = bufferData.toString();
const loginValue = JSON.parse(dataJSON);

test.beforeEach(async ({page}) => {
	await page.goto('https://account.tier4.jp/login');
})

test('test', async ({ page }) => {
  await page.getByPlaceholder('Enter your email').fill(loginValue.email);
  await page.getByPlaceholder('Enter your password').fill(loginValue.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Enter your password').fill(loginValue.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL("https://portal.tier4.jp/")
});