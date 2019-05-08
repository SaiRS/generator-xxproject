import helpers from 'yeoman-test';
import path from 'path';
import extendPkg from '../extend-pkg.json';
import fakerTypeScriptPkg from '../../faker-typescript/extend-pkg.json';
import { assertObjectContent } from '../../tools/assert-object-content';

describe('test faker config', () => {
	it('默认faker', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/faker'))
			.then((dir: string) => {
				assertObjectContent('package.json', extendPkg);
			});
	});

	it('faker --typescript', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/faker'))
			.withOptions({
				typescript: true
			})
			.then((dir: string) => {
				assertObjectContent('package.json', extendPkg);
				assertObjectContent('package.json', fakerTypeScriptPkg);
			});
	});
});
