# generator-xxproject
create new project or attach some config to exist project.
such as `typescript`, `editorconfig`, `eslint`, `express`, `faker`, `jest`, `mongodb`, `prettier`.

## install
`npm install -g yo generator-xxproject`

## usage
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
