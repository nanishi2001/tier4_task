import { expect } from '@playwright/test';
import { readJSON } from '../readJSON/readJSON';

const missMessagePath = "./src/JSON/miss_message.json";
const missValidateMessages = readJSON(missMessagePath);

const faultMessagePath = "./src/JSON/fault_message.json";
const faultValidateMessage = readJSON(faultMessagePath);

export class LoginPage{
	constructor(page) {
		this.page = page;
		this.loginIendifier = page.locator('//*[@id="identifier"]');
		this.loginPassword = page.locator('//*[@id="password"]');
		this.loginButton = page.getByRole('button', { name: 'Login' });
		this.missIdentifierMessage = page.locator('//*[@id="root"]/section/main/section/form/div[1]/label/span');
		this.missPasswordMessage = page.locator('//*[@id="root"]/section/main/section/form/div[2]/label/span');
		this.faultMessage = page.locator('//*[@id="root"]/section/main/section/form/div[1]/div');
		this.signUpButton = page.locator('//*[@id="root"]/section/main/section/div[2]/div/a');
		this.forgotPasswordButton = page.locator('//*[@id="root"]/section/main/section/p/a');
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
	async pushComfirmButton(URL, password = "") {
		await this.page.waitForURL(URL);
		await this.loginPassword.fill(password);
		await this.loginButton.click();
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
