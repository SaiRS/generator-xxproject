import { getBabelPackageConfig } from '../extend-pkg';
import _ from 'lodash';

const AllConfig = {
	devDependencies: {
		'ts-node': '^8.1.0',
		'cross-env': '^5.2.0',
		'core-js': '^2.6.11',
		'@babel/cli': '^7.4.3',
		'@babel/core': '^7.4.3',
		'@babel/plugin-proposal-class-properties': '^7.4.0',
		'@babel/plugin-proposal-object-rest-spread': '^7.4.3',
		'@babel/preset-env': '^7.4.3',
		'@babel/preset-react': '^7.0.0',
		'@babel/preset-typescript': '^7.3.3'
	}
};

describe('babel:测试extend-pkg', () => {
	test('不传任何参数', () => {
		let config = getBabelPackageConfig();
		expect(config).toEqual(AllConfig);
	});

	test('只启用typescript', () => {
		expect(getBabelPackageConfig({ typescript: true, react: false })).toEqual({
			devDependencies: _.omitBy(
				AllConfig.devDependencies,
				(value: string, key: string) => {
					return key === '@babel/preset-react';
				}
			)
		});
	});

	test('只启用react', () => {
		expect(getBabelPackageConfig({ typescript: false, react: true })).toEqual({
			devDependencies: _.omitBy(
				AllConfig.devDependencies,
				(value: string, key: string) => {
					return key === '@babel/preset-typescript';
				}
			)
		});
	});

	test('启用typescript和react', () => {
		let config = getBabelPackageConfig();
		expect(config).toEqual(AllConfig);
	});
});
