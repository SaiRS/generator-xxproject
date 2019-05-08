import assert from 'yeoman-assert';
import is from 'is_js';
import path from 'path';

type AnyObj = { [key: string]: any };

/**
 * assert文件内容有Object里边的所有元素
 * 迭代的对Obj里边的每一个key: value(类型不是Object和Array)进行判断
 * 如果value是Array或者Object,则展开遍历子元素
 * @export
 * @param {string} fileName 文件名字（带扩展名)
 * @param {AnyObj} Obj 对象
 * @returns {void} void
 */
export function assertObjectContent(fileName: string, Obj: AnyObj) {
	for (let key of Object.keys(Obj)) {
		if (is.array(Obj[key])) {
			assertArrayContent(fileName, Obj[key]);
		} else if (is.object(Obj[key])) {
			assertObjectContent(fileName, Obj[key]);
		} else {
			// 这儿的单引号，双引号好烦
			assert.fileContent(fileName, `${Obj[key]}`);
			assert.fileContent(fileName, `${key}`);
		}
	}
}

/**
 * assert文件内容有arr里边的所有元素
 * 遍历数组的每个元素，遇到数组和对象则继续展开，直到基本的number, string, boolean类型
 * 对这些值进行判断
 * @export
 * @param {string} fileName 文件名字（带扩展名）
 * @param {any[]} arr 数组对象
 * @returns {void} void
 */
export function assertArrayContent(fileName: string, arr: any[]) {
	for (let item of arr) {
		if (is.array(item)) {
			assertArrayContent(fileName, item);
		} else if (is.object(item)) {
			assertObjectContent(fileName, item);
		} else {
			assert.fileContent(fileName, `${item}`);
		}
	}
}
