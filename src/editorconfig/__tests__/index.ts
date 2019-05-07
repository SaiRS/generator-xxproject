import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';

describe('test editor config', () => {
	it('generator editor config file', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/editorconfig'))
			.then((dir: string) => {
				assert.file('.editorconfig');
			});
	});
});
