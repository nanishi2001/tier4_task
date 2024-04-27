import { test as base, expect } from '@playwright/test';
import { readJSON } from "../src/readJSON/readJSON.js";
import { LoginPage } from '../src/POM/loginpage.js';
import { makeFaultUser } from '../src/makeFaultUser/makeFaultUser.js';

const LOGIN_SETTING_PATH = "./src/JSON/login_setting.json";
const loginValue = readJSON(LOGIN_SETTING_PATH);

const TEST_URL_PATH = "./src/JSON/test_URL.json";
const testURLs = readJSON(TEST_URL_PATH);

const test = base.extend({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await use(loginPage);
	},
});

test.beforeEach(async ({page}) => {
	await page.goto(testURLs.tier4LoginURL);
});

test('login', async ({ page, loginPage }) => {
	await loginPage.pushLoginButton(loginValue.identifier, loginValue.password);
	await loginPage.pushConfirmButton(testURLs.comfirmURL, loginValue.password);
	await expect(page).toHaveURL(testURLs.tier4URL);
});

test.describe('Input miss validation', () => {

	test('Input miss identifier', async ({ loginPage }) => {
		await loginPage.pushLoginButton(undefined, loginValue.password);
	});
	
	test('Input Miss password', async({ loginPage }) => {
		await loginPage.pushLoginButton(loginValue.identifier);
	});

	test('Input miss both', async ({ loginPage }) => {
		await loginPage.pushLoginButton();
	});
});

test.describe('Fault entered validation', () => {
	const faultEntered = makeFaultUser();

	test('Fault entered identifier', async ({ loginPage }) => {
		await loginPage.expectFaultLogin(faultEntered.identifier, loginValue.password);
	});

	test('Fault entered password', async({ loginPage }) => {
		await loginPage.expectFaultLogin(loginValue.identifier, faultEntered.password);
	});

	test('Fault entered both', async ({ loginPage }) => {
		await loginPage.expectFaultLogin(faultEntered.identifier, faultEntered.password);
	});
	
});

test('Sign up', async ({ loginPage }) => {
	await loginPage.pushSignUpButton(testURLs.signUpURL);
});

test('Forgot password', async ({ loginPage }) => {
	await loginPage.pushForgotPasswordButton(testURLs.forgotPasswordURL);
});
