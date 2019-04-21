import * as shell from "shelljs";

shell.mkdir('-p', 'generators/app/templates');
shell.mkdir('-p', 'generators/jest/templates');
shell.mkdir('-p', 'generators/editorconfig/templates');
shell.mkdir('-p', 'generators/prettier/templates');
shell.mkdir('-p', 'generators/typescript/templates');
shell.mkdir('-p', 'generators/next/templates');
shell.mkdir('-p', 'generators/tslint/templates');
shell.mkdir('-p', 'generators/dev-env/templates');

// editorconfig
shell.cp('-u', '.editorconfig', 'generators/editorconfig/templates/');

// copy prettier
shell.cp('-u', '.prettierrc', 'generators/prettier/templates/');
shell.cp('-u', '.prettierignore', 'generators/prettier/templates/');

shell.cp('-u', 'src/typescript/templates/**', 'generators/typescript/templates/');

// next
shell.cp('-u', 'src/next/templates/**', 'generators/next/templates/');

// tslint
shell.cp('-u', 'src/tslint/templates/**', 'generators/tslint/templates/');

// dev-env
shell.cp('-ur', 'src/dev-env/templates/', 'generators/dev-env');

// copy eslint
shell.cp('-ur', 'src/eslint/templates', 'generators/eslint/templates');

// generator templates
shell.cp('-u', 'src/app/templates/**', 'generators/app/templates/');

// jest config
shell.cp('-u', 'jest.config.js', 'generators/jest/templates/');
shell.cp('-ur', 'config/jest', 'generators/jest/templates/');


// webpack
shell.cp('-ur', 'src/webpack/templates', 'generators/webpack/templates/');
