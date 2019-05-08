import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import extendPkg from '../extend-pkg.json';
import extendEslintPrettierPkg from '../../eslint-prettier/extend-pkg.json';
import extendEslintPrettierConfig from '../../eslint-prettier/extend-config';
import extendEslintTypescriptPkg from '../../eslint-typescript/extend-pkg.json';
import extendEslintTypescriptConfig from '../../eslint-typescript/extend-config';
import { assertObjectContent } from '../../tools/assert-object-content';

describe('test:eslint 之前没有stylelint的配置文件存在', () => {
	it('typescript=false, prettier=false, 应该生成stylelint的配置文件', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/eslint'))
			.then((dir: string) => {
				assert.file('.eslintignore');
				assert.file('.eslintrc.js');
				assert.fileContent(
					'package.json',
					JSON.stringify(extendPkg, undefined, 2)
				);
			});
	});

	it('typescript=true, prettier=false', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/eslint'))
			.withOptions({
				typescript: true
			})
			.then((dir: string) => {
				// style配置
				assertObjectContent('package.json', extendPkg);
				// eslint typescript 配置
				assertObjectContent('package.json', extendEslintTypescriptPkg);
				assertObjectContent('.eslintrc.js', extendEslintTypescriptConfig);
			});
	});

	it('typescript=false prettier=true', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/eslint'))
			.withOptions({
				prettier: true
			})
			.then((dir: string) => {
				// style配置
				assertObjectContent('package.json', extendPkg);
				// eslint prettier配置
				assertObjectContent('package.json', extendEslintPrettierPkg);
				assertObjectContent('.eslintrc.js', extendEslintPrettierConfig);
			});
	});

	it('sass=true prettier=true', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/eslint'))
			.withOptions({
				prettier: true,
				typescript: true
			})
			.then((dir: string) => {
				// style配置
				assertObjectContent('package.json', extendPkg);
				// eslint配置
				assertObjectContent('package.json', extendEslintPrettierPkg);
				assertObjectContent('package.json', extendEslintTypescriptPkg);
				assertObjectContent('.eslintrc.js', extendEslintTypescriptConfig);
				assertObjectContent('.eslintrc.js', extendEslintPrettierConfig);
			});
	});
});
