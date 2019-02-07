# generator-xxproject
create new project or attach some config to exist project.
such as `typescript`, `editorconfig`, `eslint`, `express`, `faker`, `jest`, `mongodb`, `prettier`.

## install
`npm install -g yeoman generator-xxproject`

## usage
### create new project
`yo xxproject projectName`

### attach to exist project
> need run `npm init` before, that means you shuold have a `package.json` file in current working directory.

add editorconfig: `yo xxproject:editorconfig`

add prettier: `yo xxproject:prettier`

add faker: `yo xxproject:faker`

add express: `yo xxproject:express`

add typescript: `yo xxproject:typescript`

add mongodb: `yo xxproject:mongodb`

add jest: `yo xxproject:jest`

add eslint: `yo xxproject:eslint  [--typescript | --prettier]`
