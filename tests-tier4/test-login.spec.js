import { test, expect } from '@playwright/test';
import { readJSON } from "../src/readJSON/readJSON.js";

const path = "./src/JSON/setting.json"
const loginValue = readJSON(path);

test.beforeEach(async ({page}) => {
	await page.goto('https://account.tier4.jp/login');
})

test('login', async ({ page }) => {
	// 一番初めに読み込んでいるページ
	await page.locator('//*[@id="identifier"]').fill(loginValue.email);
	await page.locator('//*[@id="password"]').fill(loginValue.password);
	await page.getByRole('button', { name: 'Login' }).click();

	// 途中に挟まる
	//if()
	await page.locator('//*[@id="password"]').fill(loginValue.password);
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page).toHaveURL("https://portal.tier4.jp/")
});