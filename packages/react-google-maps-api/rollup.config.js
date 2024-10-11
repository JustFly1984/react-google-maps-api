import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import { babel } from '@rollup/plugin-babel'

const output = (format) => {
  const base = {
    file: `dist/${format}.js`,
    format,
    sourcemap: true,
    name: 'reactGoogleMapsApi', // Only needed for UMD, but doesn't hurt the other outputs, so leaving it here for simplicity.
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react/jsx-runtime': 'ReactJSXRuntime',
    },
  }

  return [
    // We need the base output
    base,

    // And also a minified version
    { ...base, file: `dist/${format}.min.js`, plugins: [terser()] },
  ]
}

export default [
  {
    plugins: [
      typescript({
        exclude: ['**/*.test.ts', '**/*.stories.tsx'],
      }),
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions: [
          '.js',
          '.jsx',
          '.es6',
          '.es',
          '.mjs',
          '.ts',
          '.tsx',
          '.mts',
        ],
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                esmodules: true,
              },
            },
          ],
          '@babel/preset-typescript',
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              absoluteRuntime: false,
              corejs: false,
              helpers: true,
              regenerator: true,
            },
          ],
        ],
      }),
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],

    input: 'src/index.ts',
    output: [...output('cjs'), ...output('umd'), ...output('esm')],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]
