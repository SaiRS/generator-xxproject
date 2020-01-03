- 测试：

  1. 测试时需要运行 generator，yeoman 规范约定的脚手架都位于 generators 里边，所以我们需要先经过编译，将 src 中的 ts 写成的 generator 编译到 generator 中
     然后就在 src 中编写测试文件
  2. ts 编译出来的文件，import 的路径不会被转换，如之前是 import \* from 'src/**_/_**', 编译后还是一样的，现在的问题是，我在 src 书写，编译到 generator 中，不希望最终的代码还引用 src 的东西。
     _ 使用相对路径，避免使用 path alias
     _ 使用 babel 编译，新增插件 babel-plugin-module-resolver，修改 babel 的配置文件
     `[ 'module-resolver', { root: ['./generators'], alias: { '@src': './' } } ]` - 使用 ts 编译，同时新增 module-alias 库，用于将编译后的 js 文件中路径转换。不过这种方案没有尝试成功。 - 最终方案：

     ```
     const path = require('path');
     const tsConfigPath = require('tsconfig-paths');
     ```

     ````

     let config = tsConfigPath.loadConfig();
     );

     {
     return nodePath.match(/^\.?\.\//);
     }

     ',
     {
     resolvePath(sourcePath, currentFile, opts) {

     	// sourcePath是import之后的路径
     // currentFile是当前文件的路径

     if (isRelativePath(sourcePath)) {
     		return sourcePath;
     }

     let matchPath = match(sourcePath, undefined, undefined, [
     '.js',
     '.json',
     '.node',
     '.mjs',
     '.ts',
     		'.tsx'
     ]);

     if (matchPath) {
     // 匹配了alias
     let result = path.relative(path.dirname(currentFile), matchPath);
     return result;
     } else {
     return sourcePath;
     }
     }
     }]
     ```
     ````

1. ww
