import helpers from 'yeoman-test';
import path from 'path';
import { assertObjectContent } from '../../tools/assert-object-content';
import extendPkg from '../extend-pkg.json';
import extendEslintConfig from '../extend-config';

describe('test:eslint-prettier 之前没有eslint的配置文件存在', () => {
	it('it should has eslint-prettier property in package.json', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/eslint-prettier'))
			.then((dir: string) => {
				assertObjectContent('package.json', extendPkg);
				assertObjectContent('.eslintrc.js', extendEslintConfig);
			});
	});
});
