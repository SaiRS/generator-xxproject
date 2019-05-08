import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import generateExtendedPkg from '../extend-pkg';
import { isLintStagedEnable } from '../../tools/detect';
import extendStylePrettierPkg from '../../stylelint-prettier/extend-pkg.json';
import extendStyleSassPkg from '../../stylelint-sass/extend-pkg.json';
import { assertObjectContent } from '../../tools/assert-object-content';

describe('test:stylelint 之前没有stylelint的配置文件存在', () => {
	it('sass=false, prettier=false, 应该生成stylelint的配置文件', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/stylelint'))
			.then((dir: string) => {
				assert.file('.stylelintignore');
				assert.file('.stylelintrc.js');
				assert.fileContent(
					'package.json',
					JSON.stringify(
						generateExtendedPkg(isLintStagedEnable()),
						undefined,
						2
					)
				);
			});
	});

	it('sass=true, prettier=false', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/stylelint'))
			.withOptions({
				sass: true
			})
			.then((dir: string) => {
				let config: { [key: string]: any } = generateExtendedPkg(
					isLintStagedEnable()
				);
				// style配置
				assertObjectContent('package.json', config);
				// style sass配置
				assertObjectContent('package.json', extendStyleSassPkg);
				// stylelintrc
				assert.fileContent('.stylelintrc.js', 'stylelint-scss');
			});
	});

	it('sass=false prettier=true', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/stylelint'))
			.withOptions({
				prettier: true
			})
			.then((dir: string) => {
				let config: { [key: string]: any } = generateExtendedPkg(
					isLintStagedEnable()
				);
				// style配置
				assertObjectContent('package.json', config);
				// style sass配置
				assertObjectContent('package.json', extendStylePrettierPkg);
				// stylelintrc
				assert.fileContent('.stylelintrc.js', 'stylelint-prettier/recommended');
			});
	});

	it('sass=true prettier=true', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/stylelint'))
			.withOptions({
				prettier: true,
				sass: true
			})
			.then((dir: string) => {
				let config: { [key: string]: any } = generateExtendedPkg(
					isLintStagedEnable()
				);
				// style配置
				assertObjectContent('package.json', config);
				// style sass配置
				assertObjectContent('package.json', extendStylePrettierPkg);
				assertObjectContent('package.json', extendStyleSassPkg);
				// stylelintrc
				assert.fileContent('.stylelintrc.js', 'stylelint-prettier/recommended');
				assert.fileContent('.stylelintrc.js', 'stylelint-scss');
			});
	});
});
