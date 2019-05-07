import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import fs from 'fs-extra';
import pkg from '../pkg.json';
import localPkg from './package.json';

describe('generate browserlist', () => {
	test('package.json did not exist before', async () => {
		// NOTE: return can not be missed, or it will make mistake.
		return helpers
			.run(path.join(__dirname, '../../../generators/browserlist'))
			.then(() => {
				assert.file('package.json');
				// HACK: format here is important, but I don't know why 2 is worked
				assert.fileContent('package.json', JSON.stringify(pkg, undefined, 2));
			});
	});
});

describe('generate browserlist', () => {
	beforeEach((done) => {
		helpers
			.run(path.join(__dirname, '../../../generators/browserlist'))
			.withLocalConfig(localPkg)
			.inTmpDir(function(dir: string) {
				fs.writeFileSync(
					path.join(dir, 'package.json'),
					JSON.stringify(localPkg)
				);
			})
			.then(() => {
				done();
			});
	});

	test('package.json exist before', () => {
		// HACK: format here is important
		assert.fileContent(
			'package.json',
			JSON.stringify(Object.assign({}, localPkg, pkg), undefined, 2)
		);
	});
});
