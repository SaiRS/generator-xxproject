import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import typescript from 'typescript';
import typescriptPlugin from 'rollup-plugin-typescript';

const input = './src/index.tsx';
export default [
  {
    input: input,
    output: {
      file: 'dist/name',
      format: 'umd',
      sourcemap: true,
      name: 'Name',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
    external: ['react', 'react-dom'],
    plugins: [
      nodeResolve(),
			commonjs({ include: 'node_modules/**' }),
			typescriptPlugin({
        // The current rollup-plugin-typescript includes an old version of typescript, so we import and pass our own version
        typescript,
        // rollup-plugin-typescript will inject some typescript helpers to your files (normally tsc will
        // do this). They however have some ES6 keywords like const so they break older browsers.
        // This instructs rollup-plugin-typescript to import tslib instead, which includes the same helpers
        // in proper format.
        importHelpers: true,
    	}),
      babel({ exclude: 'node_modules/**', plugins: ['external-helpers'] }),
      replace({
        'process.env.DRAGGABLE_DEBUG': 'false',
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      sizeSnapshot()
    ]
  },

  {
    input,
    output: {
      file: 'dist/react-draggable.min.js',
      format: 'umd',
      sourcemap: true,
      name: 'ReactDraggable',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
    external: ['react', 'react-dom'],
    plugins: [
      nodeResolve(),
			commonjs({ include: 'node_modules/**' }),
			typescriptPlugin({
        // The current rollup-plugin-typescript includes an old version of typescript, so we import and pass our own version
        typescript,
        // rollup-plugin-typescript will inject some typescript helpers to your files (normally tsc will
        // do this). They however have some ES6 keywords like const so they break older browsers.
        // This instructs rollup-plugin-typescript to import tslib instead, which includes the same helpers
        // in proper format.
        importHelpers: true,
    	}),
      babel({ exclude: 'node_modules/**', plugins: ['external-helpers'] }),
      replace({
        'process.env.DRAGGABLE_DEBUG': 'false',
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      sizeSnapshot(),
      uglify()
    ]
  }
];
