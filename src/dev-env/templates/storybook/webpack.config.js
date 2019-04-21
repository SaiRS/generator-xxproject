const custom = require('../webpack.config.js');

module.exports = async ({ config, mode }) => {
  return {
    ...config,
    module: { ...config.module, rules: custom.module.rules },
    resolve: {
      extensions: [...config.resolve.extensions, ...custom.resolve.extensions],
    },
  };
};
