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

### Attach to exist project
> need run `npm init` before, that means you shuold have a `package.json` file in current working directory.

Command: `yo xxproject:projectName`

#### projectName

| projectName       | example                          | Options               | Note                                         |
| ----------------- | -------------------------------- | --------------------- | -------------------------------------------- |
| editorconfig      | `yo  xxproject:editorconfg`      | None                  | generate`.editorconfig`file                  |
| typescript        | `yo xxproject:typescript`        | None                  | Add `typescript` to project                  |
| sass              | `yo xxproject:sass`              | None                  | Add `sass` to project                        |
| eslint            | `yo xxproject:eslint`            | —typescript —prettier | add `eslint` to project                      |
| stylelint         | `yo xxproject:stylelint`         | —sass —prettier       | add `stylelint` to project                   |
| lint-staged       | `yo xxproject:lint-staged`       | None                  | add `lint-staged` to project                 |
| prettier          | `yo xxproject:prettier`          | None                  | add `prettier` to project                    |
| faker             | `yo xxproject:faker`             | None                  | add `faker` to project                       |
| Storybook         | `yo xxproject:storybook`         | None                  | add `storybook` to project                   |
| jest              | `yo xxproject:jest`              | None                  | add `jest` to project                        |
| eslint-prettier   | `yo xxproject:eslint-prettier`   | None                  | Add `eslint-prettier` to project             |
| eslint-typescript | `yo xxproject:eslint-typescript` | None                  | Add `eslint-typescript` to project           |
| stylelint-sass    | `yo xxproject:stylelint-sass`    | None                  | Add `stylelint-sass`to project               |
| stylint-prettier  | `yo xxproject:styline-prettier`  | None                  | Add `stylelint-prettier` to project          |
| rollup-react-lib  | `yo xxproject:rollup-react-lib`  | None                  | You can use it to create `React UI Library`  |
| `webpack-lib`     | `yo xxproject:webpck-lib`        | None                  | You can use it to create `React UI Library`  |
| `dev-env`         | `yo xxproject:dev-env`           | None                  | the most common environment I'd like to use. |

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

* complete this document
* Full test


## NOTE
> To make things more clearly, I drawed a picture.

![structure in think](https://github.com/SaiRS/generator-xxproject/blob/develop/docs/images/structure.png?raw=true)

The items I drawed in the picture like `eslint`, `typescript`, `jest` are the  basic unit module, the line between them is the link, we use  `-` in our project to relflect it, as `eslint-prettier`, `eslint-typescript`。 All of them can be installed separately, or  combined with other unit module to build a `develop environment `。 

