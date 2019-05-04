import * as is from 'is_js';

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
		return [...objValue, ...srcValue];
	}

	if (is.object(objValue) && is.object(srcValue)) {
		return {
			...objValue,
			...srcValue
		};
	}

	return srcValue;
}
