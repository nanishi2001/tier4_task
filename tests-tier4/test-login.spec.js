import { test, expect } from '@playwright/test';
import { readJSON } from "../src/readJSON/readJSON.js";

const path = "./src/JSON/setting.json"
const loginValue = readJSON(path);

test.beforeEach(async ({page}) => {
	await page.goto('https://account.tier4.jp/login');
});

test('login', async ({ page }) => {
	await page.locator('//*[@id="identifier"]').fill(loginValue.email);
	await page.locator('//*[@id="password"]').fill(loginValue.password);
	await page.getByRole('button', { name: 'Login' }).click();

	await page.locator('//*[@id="password"]').fill(loginValue.password);
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page).toHaveURL("https://portal.tier4.jp/");
});

test('Not entered identifier', async ({ page }) => {
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(
		page.locator('//*[@id="root"]/section/main/section/form/div[1]/label/span')
	).toContainText('identifier is missing.')
})

test('Not entered password', async({ page }) => {
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(
		page.locator('//*[@id="root"]/section/main/section/form/div[2]/label/span')
	).toContainText('password is missing.')
})