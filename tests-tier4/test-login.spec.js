import { test, expect } from '@playwright/test';
import { readJSON } from "../src/readJSON/readJSON.js";
import { LoginPage } from '../src/POM/loginpage.js';

const loginSettingPath = "./src/JSON/login_setting.json";
const loginValue = readJSON(loginSettingPath);

const testURLsPath = "./src/JSON/test_URL.json";
const testURLs = readJSON(testURLsPath);

test.beforeEach(async ({page}) => {
	await page.goto(testURLs.tier4LoginURL);
});

test('login', async ({ page }) => {
	const loginPage = new LoginPage(page);

	await loginPage.pushLoginButton(loginValue.identifier, loginValue.password);
	await loginPage.pushComfirmButton(testURLs.comfirmURL, loginValue.password);
	await expect(page).toHaveURL(testURLs.tier4URL);
});

test.describe('Input miss validation', () => {

	test('Input miss identifier', async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.pushLoginButton(undefined, loginValue.password);
	});
	
	test('Input Miss password', async({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.pushLoginButton(loginValue.identifier);
	});

	test('Input miss both', async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.pushLoginButton();
	});
});

test.describe('Fault entered validation', () => {
	const faultEntered = {
		identifier: 'aaaaaaa11111@gggmail.com',
		password: 'aaaaaaaaa1111111',
	};

	test('Fault entered identifier', async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.expectFaultLogin(faultEntered.identifier, loginValue.password);
	});

	test('Fault entered password', async({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.expectFaultLogin(loginValue.identifier, faultEntered.password);
	});

	test('Fault entered both', async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.expectFaultLogin(faultEntered.identifier, faultEntered.password);
	});
	
});

test('Sign up', async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.pushSignUpButton(testURLs.signUpURL);
});

test('Forgot password', async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.pushForgotPasswordButton(testURLs.forgotPasswordURL);
});
