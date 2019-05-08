import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import { assertObjectContent } from '../../tools/assert-object-content';
import extendPkg from '../extend-pkg.json';

describe('test:stylelint-prettier 之前没有stylelint的配置文件存在', () => {
	it('it should has stylelint-prettier property in package.json', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/stylelint-prettier'))
			.then((dir: string) => {
				assertObjectContent('package.json', extendPkg);
				assert.fileContent('.stylelintrc.js', 'stylelint-prettier/recommended');
			});
	});
});
