import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import { assertObjectContent } from '../../tools/assert-object-content';
import extendPkg from '../extend-pkg.json';

describe('test:stylelint-sass 之前没有stylelint的配置文件存在', () => {
	it('it should has stylelint-sass property in package.json', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/stylelint-sass'))
			.then((dir: string) => {
				assert.file('.stylelintrc.js');
				assertObjectContent('package.json', extendPkg);
			});
	});
});
