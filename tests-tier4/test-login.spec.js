import { test, expect } from '@playwright/test';
import { readJSON } from "../src/readJSON/readJSON.js";

const loginSettingPath = "./src/JSON/login_setting.json";
const loginValue = readJSON(loginSettingPath);

const testURLsPath = "./src/JSON/test_URL.json";
const testURLs = readJSON(testURLsPath);

test.beforeEach(async ({page}) => {
	await page.goto(testURLs.tier4LoginURL);
});

test('login', async ({ page }) => {
	// expect時にTime outによる失敗が目立つため暫定処置
	test.slow();

	await page.locator('//*[@id="identifier"]').fill(loginValue.identifier);
	await page.locator('//*[@id="password"]').fill(loginValue.password);
	await page.getByRole('button', { name: 'Login' }).click();

	await page.locator('//*[@id="password"]').fill(loginValue.password);
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page).toHaveURL(testURLs.tier4URL);
});

test.describe('Not entered validation', () => {
	const validateMessages = {
		identifier: 'identifier is missing.',
		password: 'password is missing.',
	};

	test('Not entered identifier', async ({ page }) => {
		await page.locator('//*[@id="password"]').fill(loginValue.password);
		await page.getByRole('button', { name: 'Login' }).click();
	
		await expect(
			page.locator('//*[@id="root"]/section/main/section/form/div[1]/label/span')
		).toContainText(validateMessages.identifier);
	});
	
	test('Not entered password', async({ page }) => {
		await page.locator('//*[@id="identifier"]').fill(loginValue.identifier);
		await page.getByRole('button', { name: 'Login' }).click();
	
		await expect(
			page.locator('//*[@id="root"]/section/main/section/form/div[2]/label/span')
		).toContainText(validateMessages.password);
	});

	test('Not entered both', async ({ page }) => {
		await page.getByRole('button', { name: 'Login' }).click();

		await expect.soft(
			page.locator('//*[@id="root"]/section/main/section/form/div[1]/label/span')
		).toContainText(validateMessages.identifier);

		await expect.soft(
			page.locator('//*[@id="root"]/section/main/section/form/div[2]/label/span')
		).toContainText(validateMessages.password);
	});
});

test.describe('Fault entered validation', () => {
	const faultEntered = {
		identifier: 'aaaaaaa11111@gggmail.com',
		password: 'aaaaaaaaa1111111',
		validateMessage: 'The provided credentials are invalid, check for spelling mistakes in your password or username, email address, or phone number.',
	};

	test('Fault entered identifier', async ({ page }) => {
		await page.locator('//*[@id="identifier"]').fill(loginValue.identifier);
		await page.locator('//*[@id="password"]').fill(faultEntered.password);
		await page.getByRole('button', { name: 'Login' }).click();
	
		await expect(
			page.locator('//*[@id="root"]/section/main/section/form/div[1]/div')
		).toContainText(faultEntered.validateMessage);
	});

	test('Fault entered password', async({ page }) => {
		await page.locator('//*[@id="identifier"]').fill(faultEntered.identifier);
		await page.locator('//*[@id="password"]').fill(loginValue.password);
		await page.getByRole('button', { name: 'Login' }).click();
	
		await expect(
			page.locator('//*[@id="root"]/section/main/section/form/div[1]/div')
		).toContainText(faultEntered.validateMessage);
	});

	test('Fault entered both', async ({ page }) => {
		await page.locator('//*[@id="identifier"]').fill(faultEntered.identifier);
		await page.locator('//*[@id="password"]').fill(faultEntered.password);
		await page.getByRole('button', { name: 'Login' }).click();
	
		await expect(
			page.locator('//*[@id="root"]/section/main/section/form/div[1]/div')
		).toContainText(faultEntered.validateMessage);
	});
	
});

test('Sign up', async ({ page }) => {
	await page.locator('//*[@id="root"]/section/main/section/div[2]/div/a').click();

	await expect(page).toHaveURL(testURLs.signUpURL);
});

test('Forgot password', async ({ page }) => {
	await page.locator('//*[@id="root"]/section/main/section/p/a').click();

	await expect(page).toHaveURL(testURLs.forgotPasswordURL);
});
