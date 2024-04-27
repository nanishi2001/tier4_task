import { randomBytes } from "crypto";

/**
 * ランダムな文字列を二種類生成し、架空ユーザーのログイン情報を作成する
 * @returns {object} 架空ユーザーのログイン情報
 */
export const makeFaultUser = () => {
	const base = 10;
	const identifier = randomBytes(base).toString("base64");
	const password = randomBytes(base).toString("base64");

	return {
		identifier: identifier,
		password: password
	}
} 
