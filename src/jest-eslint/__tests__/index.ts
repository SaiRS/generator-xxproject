import helpers from 'yeoman-test';
import path from 'path';
import extendPkg from '../extend-pkg.json';
import { assertObjectContent } from '../../tools/assert-object-content';

describe('test jest-eslint config', () => {
	it('jest eslint', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/jest-eslint'))
			.then((dir: string) => {
				assertObjectContent('package.json', extendPkg);
			});
	});
});
