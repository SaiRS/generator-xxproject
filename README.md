# generator-xxproject
create new project or attach some config to exist project.
such as `editorconfig`, `eslint`, `express`, `faker`, `jest`, `mongodb`, `prettier`, `next`, `react`, `stylelint`, `sass`.

> we're enable typescript by default, that means every frame like `faker`, `jest` or package tool like `webpack` is support typescript.

## install
`npm install -g yo generator-xxproject`

## usage

> new command(recommanded)
> 
> yo xxproject:dev-env
> 
> contain the most features I used in my work day.
> 
> and it is updating
>
> for example:
> ```
> cd folder
> npm init --y
> yo xxproject:dev-env
> ```
> it's all done.
> and now you can use `typescript`, `react`, `jest`, `faker`, `storybook`. and the config of the `eslint`, `prettier`, `editorconfig`, `stylelint` are all setted, pretty easy.
> 
> we are supported a lot of scripts which can make our life easier. the most wonderful experience is that you can use is to build `commonjs`, `amd`, `umd` modules from typescript, just use `npm run build:commonjs`, `npm run build:amd`, `npm run build:umd`.
>
> there is some error with the `npm run build:umd:min`, so don't use it;
> TODO:
> - [] full test
> - [] support more features
> - [] and so on. 

### create new project
`yo xxproject projectName`

### attach to exist project
> need run `npm init` before, that means you shuold have a `package.json` file in current working directory.

add editorconfig(default): `yo xxproject:editorconfig`

add prettier(default): `yo xxproject:prettier`

add faker(default): `yo xxproject:faker`

add express(default): `yo xxproject:express`

add typescript(default): `yo xxproject:typescript`

add mongodb(default): `yo xxproject:mongodb`

add jest(default): `yo xxproject:jest`

add eslint(default): `yo xxproject:eslint  [--typescript | --prettier]`

add webpack : `yo xxproject:webpack`

add next : `yo xxproject:next`


## editorconfig
when run `yo xxproject:editorconfig`,you'll get `.editorconfig` in the current path. The content is list below.
```
# http://editorconfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
max_line_length = 80
trim_trailing_whitespace = true

[*.md]
max_line_length = 0
trim_trailing_whitespace = false

[COMMIT_EDITMSG]
max_line_length = 0
```

## prettier
this command will generate two files under the current path. `.prettierrc.js` and `.prettierignore`
here is the prettierrc config
```
module.exports = {
	"printWidth": 80,
	"tabWidth": 2,
	"useTabs": false,
	"semi": true,
	"singleQuote": true,
	"trailingComma": "all"
};
```
and in the package.json `script`, we generate two command for prettier
```
	'prettier:lint': 'prettier --config .prettierrc.js --check src/**/*',
	'prettier:lint-fix': 'npm run prettier:lint -- --write'
```

## TODO
* add `lerna`
* 
