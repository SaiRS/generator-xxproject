import * as is from 'is_js';
import _ from 'lodash';

/**
 * 合并两个值
 * @export
 * @param {*} objValue 第一个值
 * @param {*} srcValue 第二个值
 * @returns {*} 合并后的值
 */
export function mergeConfigValue(objValue: any, srcValue: any): any {
	if (!objValue) {
		return srcValue;
	}

	if (!srcValue) {
		return objValue;
	}

	if (!is.sameType(objValue, srcValue)) {
		return srcValue;
	}

	if (is.array(objValue) && is.array(srcValue)) {
		// 去重
		return _.uniq([...objValue, ...srcValue]);
	}

	if (is.object(objValue) && is.object(srcValue)) {
		// 遍历子属性
		let result: { [key: string]: any } = {};
		for (let key of Object.keys(objValue)) {
			result[key] = mergeConfigValue(objValue[key], srcValue[key]);
		}
		for (let key of Object.keys(srcValue)) {
			result[key] = mergeConfigValue(objValue[key], srcValue[key]);
		}

		return result;
	}

	if (is.string(objValue) && is.string(srcValue)) {
		return [objValue, srcValue];
	}

	return srcValue;
}
