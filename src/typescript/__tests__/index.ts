import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import jsonfile from 'jsonfile';
import extendPkg from '../extend-pkg.json';

describe('test typecript', () => {
	it('generator typescript config file exist', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/typescript'))
			.then((dir: string) => {
				assert.file('babel.config.js');
				assert.file('tsconfig.json');
			});
	});

	it('generator typescript pkg econfig', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/typescript'))
			.then((dir: string) => {
				let pkg = jsonfile.readFileSync('package.json');
				assert.objectContent(pkg, extendPkg);
			});
	});
});
