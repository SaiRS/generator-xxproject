import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import jsonfile from 'jsonfile';
import extendPkg from '../extend-pkg.json';

describe('test sass', () => {
	it('generator sass pkg econfig', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/sass'))
			.then((dir: string) => {
				let pkg = jsonfile.readFileSync('package.json');
				assert.objectContent(pkg, extendPkg);
			});
	});
});
