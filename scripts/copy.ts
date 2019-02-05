import * as shell from "shelljs";

shell.mkdir('-p', 'generators/app/templates');
shell.mkdir('-p', 'generators/jest/templates');
shell.mkdir('-p', 'generators/editorconfig/templates');

// editorconfig
shell.cp('-u', '.editorconfig', 'generators/editorconfig/templates/');

// copy prettier
shell.cp('-u', '.prettierrc', 'generators/app/templates/');
shell.cp('-u', '.prettierignore', 'generators/app/templates/');

// copy eslint
shell.cp('-u', '.eslintrc', 'generators/app/templates/');
shell.cp('-u', '.eslintignore', 'generators/app/templates/');

// generator templates
shell.cp('-u', 'src/app/templates/**', 'generators/app/templates/');

// jest config
shell.cp('-u', 'jest.config.js', 'generators/jest/templates/');
