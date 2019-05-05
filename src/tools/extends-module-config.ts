import { extendsModuleConfig, ExtendsOptions } from './extends-config';
import Generator from 'yeoman-generator';

type AnyObject = { [key: string]: any };

/**
 * 扩展eslint的配置
 * @export
 * @param {AnyObject} newConfig 新的配置
 * @param {Generator} generator yeoman genrator实例
 * @param {ExtendsOptions} options 配置项
 * @returns {boolean} true表示成功
 */
export function extendEslintConfig(
	newConfig: AnyObject,
	generator: Generator,
	options: ExtendsOptions
): boolean {
	return extendsModuleConfig(
		'eslint',
		newConfig,
		generator,
		'eslintConfig',
		options
	);
}

/**
 * 扩展stylelint的配置
 * @export
 * @param {AnyObject} newConfig 新的配置
 * @param {Generator} generator yeoman genrator实例
 * @param {ExtendsOptions} options 配置项
 * @returns {boolean} true表示成功
 */
export function extendsStylelintConfig(
	newConfig: AnyObject,
	generator: Generator,
	options: ExtendsOptions
): boolean {
	return extendsModuleConfig(
		'stylelint',
		newConfig,
		generator,
		'stylelint',
		options
	);
}
