import { expect } from '@playwright/test';
import { readJSON } from '../readJSON/readJSON';

const MISS_MESSAGE_PATH = "./src/JSON/miss_message.json";
const missValidateMessages = readJSON(MISS_MESSAGE_PATH);

const FAULT_MESSAGE_PATH = "./src/JSON/fault_message.json";
const faultValidateMessage = readJSON(FAULT_MESSAGE_PATH);

export class LoginPage{
	constructor(page) {
		this.page = page;
		this.loginIendifier = page.getByPlaceholder('Enter your email');
		this.loginPassword = page.getByPlaceholder('Enter your password');
		this.loginButton = page.getByRole('button', { name: 'Login' });
		this.missIdentifierMessage = page.locator('label').filter({ hasText: missValidateMessages.identifier });
		this.missPasswordMessage = page.locator('label').filter({ hasText: missValidateMessages.password });
		this.faultMessage = page.locator('div').filter({ hasText: faultValidateMessage.validateMessage }).nth(2);
		this.signUpButton = page.getByRole('link', { name: 'SIGN UP' });
		this.forgotPasswordButton = page.getByRole('link', { name: 'Forgot password?' });
	};

	/**
	 * ログイン処理
	 * 
	 * @param {string} identifier - ログイン時に使用するID
	 * @param {string} password - ログイン時に使用するパスワード
	 */
	async pushLoginButton(identifier = "", password = "") {
		await this.loginIendifier.fill(identifier);
		await this.loginPassword.fill(password);
		await this.loginButton.click();

		if(!identifier) await expect.soft(this.missIdentifierMessage).toContainText(missValidateMessages.identifier);
		if(!password) await expect.soft(this.missPasswordMessage).toContainText(missValidateMessages.password);
	};

	/**
	 * ログイン処理が成功時に出るコンフォーム処理
	 * 
	 * @param {string} URL - コンフォームのURL
	 * @param {string} password - ログイン時に使用するパスワード
	 */
	async pushConfirmButton(URL, password = "") {
		await this.page.waitForURL(URL);
		await this.loginPassword.fill(password);
		await this.loginButton.click();

		await expect.soft(this.faultMessage).toContainText(faultValidateMessage.validateMessage);
	};

	/**
	 * Login時に誤った入力を実施した場合の処理
	 */
	async expectFaultLogin(identifier, password) {
		await this.pushLoginButton(identifier, password);
		await expect(this.faultMessage).toContainText(faultValidateMessage.validateMessage);
	}

	/**
	 * 新規登録画面に遷移する処理
	 * 
	 * @param {string} URL - 新規登録画面のURL
	 */
	async pushSignUpButton(URL) {
		await this.signUpButton.click();
		await expect(this.page).toHaveURL(URL);
	};

	/**
	 * パスワード再設定画面に遷移する処理
	 * 
	 * @param {string} URL - パスワード再設定画面のURL
	 */
	async pushForgotPasswordButton(URL) {
		await this.forgotPasswordButton.click();
		await expect(this.page).toHaveURL(URL);
	};
}
