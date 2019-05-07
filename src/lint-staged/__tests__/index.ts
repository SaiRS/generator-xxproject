import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import jsonfile from 'jsonfile';
import extendPkg from '../extend-pkg.json';

describe('test lint-staaged', () => {
	it('generator lint stage config', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/lint-staged'))
			.then((dir: string) => {
				let pkg = jsonfile.readFileSync('package.json');
				assert.objectContent(pkg, extendPkg);
			});
	});
});
