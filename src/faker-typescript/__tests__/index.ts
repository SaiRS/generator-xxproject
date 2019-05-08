import helpers from 'yeoman-test';
import path from 'path';
import extendPkg from '../extend-pkg.json';
import { assertObjectContent } from '../../tools/assert-object-content';

describe('test faker-typescript config', () => {
	it('faker typescript', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/faker-typescript'))
			.then((dir: string) => {
				assertObjectContent('package.json', extendPkg);
			});
	});
});
