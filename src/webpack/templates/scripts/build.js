let webpack = require('webpack');
let webpackConfig = require('../config/webpack.config'); // webpack打包配置
let ora = require('ora'); // 终端环境loading效果控件
let chalk = require('chalk');

let spinner = ora(
	chalk.red('编译开始')
); // 菊花loading开始，打包开始
spinner.start();
try {
	webpack(webpackConfig, function (err, stats) {
		// 调用webpack打包脚本，开始打包，用的是在上面导入的webpackConfig配置

		spinner.stop(); // 打包完成，菊花loading停止

		if (err) {
			console.error(err);
			throw err; // webpack打包出错
		}
		process.stdout.write(
			stats.toString({
				// 打印打包结果
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false
			}) + '\n\n'
		);
	});
} catch (error) {
	process.stdout.write(error);
}
