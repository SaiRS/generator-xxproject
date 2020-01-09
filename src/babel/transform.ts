import { IBabelOptions } from './extend-pkg';
import {
	FileInfo,
	API,
	Options,
	AssignmentExpression,
	ASTPath,
	Property,
	ASTNode,
	MemberExpression,
	Identifier,
	ArrayExpression,
	Literal,
	ObjectExpression,
	Node,
	Program,
	File,
	VariableDeclarator
} from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';
import { NodePath } from 'ast-types/lib/node-path';

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

/**
 * 找到exports.xxxx 这种表达式
 * @param {Collection<any>} code 搜索的集合
 * @param {API} api api
 * @returns {Collection<AssignmentExpression>} 返回找到的集合，如果要判断是否找到，可以通过findExportsDotSomeProperty(code, api).length > 0 来判断
 */
function findExportsDotSomeProperty(
	code: Collection<any>,
	api: API
): Collection<AssignmentExpression> {
	return code.find(api.jscodeshift.AssignmentExpression, {
		left: {
			type: 'MemberExpression',
			object: {
				type: 'Identifier',
				name: 'exports'
			}
		}
	});
}

/**
 * 找到module.exports = {} 这种表达式
 * @param {Collection<any>} code 搜索的集合
 * @param {API} api api
 * @returns {Collection<AssignmentExpression>} 返回找到的集合，如果要判断是否找到，可以通过findModuleExport(code, api).length > 0 来判断
 */
function findModuleExport(
	code: Collection<any>,
	api: API
): Collection<AssignmentExpression> {
	return code.find(api.jscodeshift.AssignmentExpression, {
		left: {
			type: 'MemberExpression',
			object: {
				type: 'Identifier',
				name: 'module'
			},
			property: {
				type: 'Identifier',
				name: 'exports'
			}
		}
	});
}

/**
 * 找到exports key对应的value的节点
 * @param {string} key exports出去的接口名字,像plugins, presets等
 * @param {Collection<any>} code 搜索的根节点
 * @param {API} api api
 * @returns {ASTNode | null} result
 */
function findValueOfExportKey(
	key: string,
	code: Collection<any>,
	api: API
): ASTNode | null {
	// export.key = *** 这种
	let exportKeyExpressionCollection = findExportsDotSomeProperty(code, api);
	if (exportKeyExpressionCollection.length > 0) {
		// 寻找export[key]
		let filterCollection = exportKeyExpressionCollection.filter(
			(path: ASTPath<AssignmentExpression>) => {
				let left = path.node.left as MemberExpression;
				return (
					(left.object as Identifier).name === 'exports' &&
					(left.property as Identifier).name === key
				);
			}
		);

		//
		if (filterCollection.length > 0) {
			// 修改
			let right = (filterCollection.get(0) as NodePath<AssignmentExpression>)
				.node.right;
			return right;
		} else {
			return null; // 表示没有 exports.key
		}
	}

	let moduleExportsExpression = findModuleExport(code, api);
	if (moduleExportsExpression.length > 0) {
		let keyPropertyCollection = moduleExportsExpression.find(
			api.jscodeshift.Property,
			{
				key: {
					type: 'Identifier',
					name: key
				}
			}
		);

		if (keyPropertyCollection.length > 0) {
			return (keyPropertyCollection.get(0) as NodePath<Property>).node.value;
		} else {
			return null; // 有module.exports, 但是没有key对应的
		}
	} else {
		return null;
	}
}

function add(key: string, value: string, root: Program, api: API) {
	// 查找key存不存在

	// 确定是key没有呢，还是module.exports, exports都不存在

	let code = api.jscodeshift(root);

	// 查找module.exports存不存在
	let moduleExportsExpression = findModuleExport(code, api);
	if (moduleExportsExpression.length > 0) {
		// 因为我们调用了find，所以这儿能够判断是key不存在, 直接添加key, value

		let moduleExportsAssignmentExpressionNodePath: NodePath<AssignmentExpression> = moduleExportsExpression.get(
			0
		) as NodePath<AssignmentExpression>;

		let rightObjectExpression: ObjectExpression = moduleExportsAssignmentExpressionNodePath
			.node.right as ObjectExpression;

		rightObjectExpression.properties.push(
			api.jscodeshift.property(
				'init',
				api.jscodeshift.identifier(key),
				api.jscodeshift.literal(value)
			)
		);

		return;
	} else {
		// 查找exports
		let exportKeyExpressionCollection = findExportsDotSomeProperty(code, api);
		if (exportKeyExpressionCollection.length > 0) {
			// 添加key, value

			// 添加一行
			root.body.push(
				api.jscodeshift.expressionStatement(
					api.jscodeshift.assignmentExpression(
						'=',
						api.jscodeshift.memberExpression(
							api.jscodeshift.identifier('exports'),
							api.jscodeshift.identifier(key),
							false
						),
						api.jscodeshift.arrayExpression([api.jscodeshift.literal(value)])
					)
				)
			);

			return;
		}
	}

	// 添加module.exports = {key: value};
	root.body.push(
		api.jscodeshift.expressionStatement(
			api.jscodeshift.assignmentExpression(
				'=',
				api.jscodeshift.memberExpression(
					api.jscodeshift.identifier('module'),
					api.jscodeshift.identifier('exports'),
					false
				),
				api.jscodeshift.objectExpression([
					api.jscodeshift.property(
						'init',
						api.jscodeshift.identifier(key),
						api.jscodeshift.literal(value)
					)
				])
			)
		)
	);
}

function modify(
	value: string,
	optValues: string[],
	node: ASTNode,
	code: Collection<any>,
	api: API
) {
	// 检查code的类型
	if (api.jscodeshift.ArrayExpression.check(node)) {
		// 查找是否已经存在对应的配置
		let existBeforeCollection = api
			.jscodeshift(node)
			.find(api.jscodeshift.Literal, (node: Literal) => {
				return optValues.includes(node.value as string);
			});

		if (existBeforeCollection.length > 0) {
			return;
		} else {
			// 添加
			let arrayValue = node as ArrayExpression;

			let valueLiteral = api.jscodeshift.literal(value);
			// @ts-ignore
			arrayValue.elements.push(valueLiteral);
		}

		return;
	}

	if (api.jscodeshift.Identifier.check(node)) {
		// 找到对应的变量
		let name = (node as Identifier).name;

		// 找到变量初始声明的地方
		let initCollection = code.find(api.jscodeshift.VariableDeclarator, {
			id: {
				type: 'Identifier',
				name: name
			},
			init: {
				type: 'ArrayExpression'
			}
		});

		if (initCollection.length > 0) {
			// 有这种类型的变量初始化声明

			let existBeforeCollection = api
				.jscodeshift(initCollection.get(0))
				.find(api.jscodeshift.Literal, (node: Literal) => {
					return optValues.includes(node.value as string);
				});

			if (existBeforeCollection.length > 0) {
				return;
			} else {
				let arrayValue = (initCollection.get(0) as NodePath<VariableDeclarator>)
					.node.init as ArrayExpression;

				let valueLiteral = api.jscodeshift.literal(value);
				// @ts-ignore
				arrayValue.elements.push(valueLiteral);

				return;
			}
		}

		// 找到变量赋值的地方
		let assignCollection = code.find(api.jscodeshift.AssignmentExpression, {
			left: {
				type: 'Identifier',
				name: name
			}
		});

		if (assignCollection.length > 0) {
			let existBeforeCollection = api
				.jscodeshift(assignCollection.get(0))
				.find(api.jscodeshift.Literal, (node: Literal) => {
					return optValues.includes(node.value as string);
				});

			if (existBeforeCollection.length > 0) {
				return;
			} else {
				let arrayValue = (assignCollection.get(0) as NodePath<
					AssignmentExpression
				>).node.right as ArrayExpression;

				let valueLiteral = api.jscodeshift.literal(value);
				// @ts-ignore
				arrayValue.elements.push(valueLiteral);

				return;
			}
		}

		return;
	}

	return;
}

export default function transform(
	fileInfo: FileInfo,
	api: API,
	options: Options
) {
	let code = api.jscodeshift(fileInfo.source);

	let value: ASTNode | null = findValueOfExportKey('plugins', code, api);
	if (value) {
		modify(
			'@babel/proposal-class-properties',
			['@babel/proposal-class-properties'],
			value,
			code,
			api
		);
	} else {
		/// 找到program
		let program: Program = (code.get(0) as NodePath<File>).node.program;
		add('plugins', '@babel/proposal-class-properties', program, api);
	}

	return code.toSource({ quote: 'single' });
}
