import * as shell from "shelljs";

shell.mkdir('-p', 'generators/app/templates');

// editorconfig
shell.cp('-u', '.editorconfig', 'generators/app/templates/');

// copy prettier
shell.cp('-u', '.prettierrc', 'generators/app/templates/');
shell.cp('-u', '.prettierignore', 'generators/app/templates/');

// copy eslint
shell.cp('-u', '.eslintrc', 'generators/app/templates/');
shell.cp('-u', '.eslintignore', 'generators/app/templates/');

// generator templates
shell.cp('-u', 'src/app/templates/**', 'generators/app/templates/');
