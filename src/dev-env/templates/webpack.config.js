// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  // Change to your "entry-point".
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre',
        include: /src/,
        use: {
          loader: require.resolve('eslint-loader'),
          options: {
            // eslint-disable-next-line global-require
            formatter: require('eslint-friendly-formatter'),
            eslintPath: require.resolve('eslint'),
            emitError: true,
            emitWarning: true,
            failOnWarning: true,
            failOnError: true,
          },
        },
      },
    ],
  },
};
