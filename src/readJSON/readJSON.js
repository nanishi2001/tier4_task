import { readFileSync } from 'fs';

/**
 * JSONファイルを読みだして返す
 * 
 * @param {String} path - 読みだしたいJSONファイルのパス
 * @returns {JSON} parsedData - JSONファイルの中身
 */
export const readJSON = (path) => {
	let parsedData = "";
	try{
		const bufferData = readFileSync(path);
		const dataJSON = bufferData.toString();
		parsedData = JSON.parse(dataJSON);
	} catch(error) {
		throw error;
	}

	return parsedData;
}
