import helpers from 'yeoman-test';
import path from 'path';
import extendPkg from '../extend-pkg.json';
import { assertObjectContent } from '../../tools/assert-object-content';

describe('test jest config', () => {
	it('默认jest', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/jest-typescript'))
			.then((dir: string) => {
				assertObjectContent('package.json', extendPkg);
			});
	});
});
