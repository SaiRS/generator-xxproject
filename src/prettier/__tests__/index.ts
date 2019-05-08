import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import jsonfile from 'jsonfile';
import extendPkg from '../extend-pkg.json';

describe('test prettier', () => {
	it('generator prettier config file exist', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/prettier'))
			.then((dir: string) => {
				assert.file('.prettierignore');
				assert.file('.prettierrc.js');
			});
	});

	it('generator prettier pkg econfig', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/prettier'))
			.then((dir: string) => {
				let pkg = jsonfile.readFileSync('package.json');
				assert.objectContent(pkg, extendPkg);
			});
	});
});
