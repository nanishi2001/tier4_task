import { fstatSync, readFileSync } from 'fs';

/**
 * JSONファイルを読みだして返す
 * 
 * @param {String} path - 読みだしたいJSONファイルのパス
 * @returns {JSON} parsedData - JSONファイルの中身
 */
export const readJSON = (path) => {
	let bufferData 
	try{
		bufferData = readFileSync(path);
	} catch(error) {
		console.log(error);
		throw error;
	}
	const dataJSON = bufferData.toString();
	const parsedData = JSON.parse(dataJSON);
	return parsedData;
}
