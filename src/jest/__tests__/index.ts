import helpers from 'yeoman-test';
import path from 'path';
import extendPkg from '../extend-pkg.json';
import jestTypeScriptPkg from '../../jest-typescript/extend-pkg.json';
import { assertObjectContent } from '../../tools/assert-object-content';

describe('test jest config', () => {
	it('默认jest', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/jest'))
			.then((dir: string) => {
				assertObjectContent('package.json', extendPkg);
			});
	});

	it('jest --typescript', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/jest'))
			.withOptions({
				typescript: true
			})
			.then((dir: string) => {
				assertObjectContent('package.json', extendPkg);
				assertObjectContent('package.json', jestTypeScriptPkg);
			});
	});
});
