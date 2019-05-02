const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
  '@babel/typescript',
  '@babel/react',
];
const plugins = [
  '@babel/proposal-class-properties',
  '@babel/proposal-object-rest-spread',
  'macros',
  // 'babel-plugin-styled-components',
];

module.exports = {
  presets,
  plugins,
  env: {
    commonjs: {
      plugins: [['transform-es2015-modules-commonjs']],
    },
    umd: {
      plugins: [['transform-es2015-modules-umd']],
    },
    amd: {
      plugins: [['transform-es2015-modules-amd']],
    },
  },
};
