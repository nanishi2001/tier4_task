import { readFileSync } from 'fs';

/**
 * JSONファイルを読みだして返す
 * 
 * @param {String} path - 読みだしたいJSONファイルのパス
 * @return {JSON} value - JSONファイルの中身
 */
export const readJSON = (path) => {
	const bufferData = readFileSync(path);
	const dataJSON = bufferData.toString();
	const Value = JSON.parse(dataJSON);
	return Value;
}
