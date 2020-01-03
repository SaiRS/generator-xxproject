import { IBabelOptions } from './extend-pkg';
import jscodeshift, { FileInfo, API, Options } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

const Plugins = [
	'@babel/proposal-class-properties',
	'@babel/proposal-object-rest-spread'
];

const Presets = function(
	opts: IBabelOptions = { typescript: true, react: true }
): any[] {
	let result: any[] = [
		[
			'@babel/env',
			{
				useBuiltIns: 'usage',
				corejs: 2
			}
		]
	];

	if (opts.typescript) {
		result.push('@babel/typescript');
	}

	if (opts.react) {
		result.push('@babel/react');
	}

	return result;
};

function findModuleExports(code: Collection<any>, api: API) {}

/**
 * 找到keyName对应的变量名
 * @param {string} keyName key
 * @param {Collectionn} code ast node
 * @param {API} api api
 * @returns {string | null} 查询结果
 */
function findPropertyVariabledName(
	keyName: string,
	code: Collection<any>,
	api: API
) {
	let collection = code.find(
		api.jscodeshift.Property,
		(node: jscodeshift.Property) => {
			// @ts-ignore
			return node.key.name === keyName;
		}
	);

	if (collection.length > 0) {
		return collection.get(0).node.value.name;
	} else {
		return null;
	}
}

function findInitVariableDeclaration(
	name: string,
	type: string,
	code: Collection<any>,
	api: API
): Collection<jscodeshift.VariableDeclarator> {
	let declaration = code.find(api.jscodeshift.VariableDeclarator, {
		id: {
			type: 'Identifier',
			name: name
		},
		init: {
			// 找到声明时就初始化的plugins
			type: type
		}
	});

	return declaration;
}

export default function transform(
	fileInfo: FileInfo,
	api: API,
	options: Options
) {
	let jscodeshift = api.jscodeshift;
	let code = api.jscodeshift(fileInfo.source);

	let pluginsName = findPropertyVariabledName('plugins', code, api);
	if (pluginsName) {
		// 存在则修改
		let pluginDeclaration = findInitVariableDeclaration(
			pluginsName,
			'ArrayExpression',
			code,
			api
		);

		if (pluginDeclaration.length) {
			pluginDeclaration.forEach((path) => {
				// 修改plugins
				for (let plugin of Plugins) {
					// ArrayExpression
					// @ts-ignore
					path.node.init.elements.push(api.jscodeshift.literal(plugin));
				}
			});
		} else {
			// 没有
		}
	} else {
		// 不存在，则添加
	}

	if (pluginDeclaratorCollection.length > 0) {
		// 直接修改声明时的赋值
		pluginDeclaratorCollection.forEach((path) => {
			// 修改plugins
			for (let plugin of Plugins) {
				// ArrayExpression
				// @ts-ignore
				path.node.init.elements.push(api.jscodeshift.literal(plugin));
			}

			// 修改presets
			for (let preset of Presets()) {
				api.jscodeshift.expressionStatement(
					api.jscodeshift.arrayExpression([
						api.jscodeshift.literal('222'),
						api.jscodeshift.objectExpression([
							api.jscodeshift.property(
								'init',
								api.jscodeshift.identifier('key1'),
								api.jscodeshift.literal('value1')
							)
						])
					])
				);
			}
		});
	} else {
		// 查找变量赋值
	}

	return code.toSource();
}
