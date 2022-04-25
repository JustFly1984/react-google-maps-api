/* eslint-env node */

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'security-node',
    'promise',
    'import',
    'node',
    'n',
    'you-dont-need-lodash-underscore',
    'no-inferred-method-name',
    'json',
    'babel',
    'import',
    'filenames',
    'optimize-regex',
    'html',
    'ascii',
    'react',
    'jsx-a11y',
    'react-perf',
    'react-functional-set-state',
    'jest',
    'jest-dom',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'plugin:node/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:security-node/recommended',
    'plugin:jest-dom/recommended',
    'plugin:you-dont-need-lodash-underscore/compatible',
    // Always last
    'prettier',
  ],
  rules: {
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-useless-return': 'off',
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],
    'security-node/detect-crlf': 'off',
  },
  settings: {
    ecmascript: 6,
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // use <root>/path/to/folder/tsconfig.json
      typescript: {
        directory: './tsconfig.json',
      },
    },
    react: {
      version: 'detect',
    },
    jest: {
      version: 27,
    },
  },
  globals: {
    __DEV__: false,
    __PROD__: false,
    __PLAYER_DEBUG__: false,
    __BASENAME__: false,
    google: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  env: {
    "jest/globals": true,
    browser: true,
    es6: true,
  },
}
