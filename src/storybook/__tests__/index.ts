import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import extendPkg from '../extend-pkg.json';
import { assertObjectContent } from '../..//tools/assert-object-content';

describe('test sass', () => {
	it('generator sass pkg econfig', () => {
		return helpers
			.run(path.join(__dirname, '../../../generators/storybook'))
			.then((dir: string) => {
				assertObjectContent('package.json', extendPkg);
				assert.file('stories/index.stories.tsx');
				assert.file('.storybook/addons.js');
				assert.file('.storybook/config.js');
				assert.file('.storybook/webpack.config.js');
			});
	});
});
