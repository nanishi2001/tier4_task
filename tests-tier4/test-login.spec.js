import { test as base, expect } from '@playwright/test';
import { readJSON } from "../src/readJSON/readJSON.js";
import { LoginPage } from '../src/POM/loginpage.js';
import { makeFaultUser } from '../src/makeFaultUser/makeFaultUser.js';

const LOGIN_SETTING_PATH = "./src/JSON/login_setting.json";
const loginValue = readJSON(LOGIN_SETTING_PATH);

const TEST_URL_PATH = "./src/JSON/test_URL.json";
const testURLs = readJSON(TEST_URL_PATH);

const faultEntered = makeFaultUser();

const test = base.extend({
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page);
		await use(loginPage);
	},
});

test.beforeEach(async ({page}) => {
	await page.goto(testURLs.tier4LoginURL);
});

test('Login', async ({ page, loginPage }) => {
	try {
		await loginPage.pushLoginButton(loginValue.identifier, loginValue.password);
		await loginPage.pushConfirmButton(testURLs.comfirmURL, loginValue.password);
		await expect(page).toHaveURL(testURLs.tier4URL);
	} catch(error) {
		console.error('Error occured Login test: ', error);
	}
});

test('Fault confirm password', async({ loginPage }) => {
	try {
		await loginPage.pushLoginButton(loginValue.identifier, loginValue.password);
		await loginPage.expectFaultConfirm(testURLs.comfirmURL, faultEntered.password);
	} catch(error) {
		console.error('Error occured fault confirm test: ', error);
	}

})

test.describe('Input miss validation', () => {

	test('Input miss identifier', async ({ loginPage }) => {
		try {
			await loginPage.pushLoginButton(undefined, loginValue.password);
		} catch(error) {
			console.error('Error occured miss identifier tset: ', error);
		}
	});
	
	test('Input miss password', async({ loginPage }) => {
		try {
			await loginPage.pushLoginButton(loginValue.identifier);
		} catch(error) {
			console.error('Error occured miss password test: ', error)
		}
	});

	test('Input miss both', async ({ loginPage }) => {
		try {
			await loginPage.pushLoginButton();
		} catch(error) {
			console.error('Error occured miss both test: ', error);
		}
	});
});

test.describe('Fault entered validation', () => {

	test('Fault entered identifier', async ({ loginPage }) => {
		try {
			await loginPage.expectFaultLogin(faultEntered.identifier, loginValue.password);
		} catch(error) {
			console.error('Error occured fault identifier test: ', error);
		}
	});

	test('Fault entered password', async({ loginPage }) => {
		try {
			await loginPage.expectFaultLogin(loginValue.identifier, faultEntered.password);
		} catch(error) {
			console.error('Error occured fault password test: ', error);
		}
	});

	test('Fault entered both', async ({ loginPage }) => {
		try{
			await loginPage.expectFaultLogin(faultEntered.identifier, faultEntered.password);
		} catch(error) {
			console.error('Error occured fault both test: ', error);
		}
	});
	
});

test('Sign up', async ({ loginPage }) => {
	try {
		await loginPage.pushSignUpButton(testURLs.signUpURL);
	} catch(error) {
		console.error('Error occured sign up test: ', error);
	}
});

test('Forgot password', async ({ loginPage }) => {
	try {
		await loginPage.pushForgotPasswordButton(testURLs.forgotPasswordURL);
	} catch(error) {
		console.error('Error occured fogotpassword test: ', error);
	}
});
