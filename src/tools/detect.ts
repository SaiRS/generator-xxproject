import cosmiconfig from 'cosmiconfig';
import jsonfile from 'jsonfile';
/**
 * 是否启用了某个模块
 * @param {string} moduleName 模块名称
 * @returns {boolean} true表示启用了
 */
function isModuleEnable(moduleName: string): boolean {
	let explorer: cosmiconfig.Explorer = cosmiconfig(moduleName);
	let result: null | cosmiconfig.CosmiconfigResult = explorer.searchSync();
	if (result) {
		return true;
	} else {
		return false;
	}
}

/**
 * 是否启用了typescript
 * @export
 * @returns {boolean} true
 */
export function isTypeScriptEnable(): boolean {
	return true;
}

/**
 * 是否启用了sass
 * @export
 * @returns {boolean} true表示启用
 */
export function isSassEnable(): boolean {
	return true;
}

/**
 * 是否启用了lint staged
 * @export
 * @returns {boolean} true表示启用
 */
export function isLintStagedEnable(): boolean {
	return true;
}

/**
 * 是否启用了eslint
 * @export
 * @returns {boolean} true表示启用
 */
export function isEslintEnable(): boolean {
	return isModuleEnable('eslint');
}
/**
 * 是否启用了prettier
 * @export
 * @returns {boolean} true表示启用
 */
export function isPrettierEnable(): boolean {
	return isModuleEnable('prettier');
}

/**
 * 是否已经启用了stylelint
 * @export
 * @returns {boolean} true表示启用
 */
export function isStylelintEnable(): boolean {
	return isModuleEnable('stylelint');
}

/**
 * 是否启用了webpack
 * @export
 * @returns {boolean} true表示启用了webpack
 */
export function isWebpackEnable(): boolean {
	try {
		let result = jsonfile.readFileSync('package.json');
		if (result) {
			let { webpackDev = false } = result['devDependencies'] || {};
			let { webpack = false } = result['dependencies'] || {};
			return webpack || webpackDev;
		} else {
			return true;
		}
	} catch (error) {
		return false;
	}
}
