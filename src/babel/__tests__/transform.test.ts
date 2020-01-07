jest.autoMockOff();

// @ts-ignore
import { defineTest } from 'jscodeshift/dist/testUtils';
// import transfrom from '../transform';

// defineTest()

/*
// 第二个参数: transform 为 describe的第一个参数，同时也通过这个名字require(path.join(dirName, '..', transformName))来找到对应的transform文件
// 第四个参数：demo为测试文件的前缀，文件路径在 path.resolve(dirName, .., __testfixtures__)，所以在这个例子中，会使用__testfixtures__/demo.input.ts, __testfixtures__/demo.output.ts,
							同时也会根据这个参数生成test的第一个参数
// 第五个参数: 选项，用来指定扩展名
*/
defineTest(
	__dirname,
	'transform',
	null,
	'/exports/MemberExpression/test.input.js' /* { parser: 'ts' } */
);
