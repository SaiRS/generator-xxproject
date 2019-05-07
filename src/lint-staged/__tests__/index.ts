import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';

describe('test lint-staaged', () => {
	it('generator lint stage config', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/lint-staged'))
			.then((dir: string) => {
				assert.fileContent('package.json', '"lint-staged": "lint-staged"');
				assert.fileContent('package.json', '"pre-commit": "lint-staged"');
				assert.fileContent('package.json', '"lint-staged": {');
			});
	});
});
