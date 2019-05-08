/**
 * 生成扩展的pkg对象
 * @export
 * @param {boolean} [isLintStagedEnable=true] 是否启用了lint-staged
 * @returns {Object} 配置对象
 */
export default function generateExtendedPkg(
	isLintStagedEnable: boolean = true
): Object {
	let linter: { [key: string]: any } = {};
	if (isLintStagedEnable) {
		linter['**/*.{css,scss}'] = ['npm run stylelint:lint-fix', 'git add'];
	}
	return {
		devDependencies: {
			stylelint: '^10.0.1',
			'stylelint-config-recommended': '^2.2.0'
		},
		scripts: {
			'stylelint-check': 'stylelint --print-config .',
			'stylelint:lint': 'stylelint ./src/**/*.{css,scss,js,jsx,ts,tsx}; exit 0',
			'stylelint:lint-fix': 'stylelint ./src/**/*.{css,scss} --fix'
		},
		'lint-staged': {
			linters: linter
		}
	};
}
