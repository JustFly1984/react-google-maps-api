module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:you-dont-need-lodash-underscore/compatible',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-perf/recommended',
    'standard-react',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
// 'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/react',
    'prettier/standard',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: [
    '@getify/proper-arrows',
    'you-dont-need-lodash-underscore',
    'json',
    'babel',
    'import',
    'filenames',
    'jsx-a11y',
    'html',
    'ascii',
    'promise',
    'react',
    'optimize-regex',
    'react-perf',
    'standard',
    'no-inferred-method-name',
    'react-functional-set-state',
    '@typescript-eslint'
    // 'prettier'
  ],
  env: {
    browser: true,
    es6: true
  },
  globals: {
    __DEV__: false,
    __PROD__: false,
    __PLAYER_DEBUG__: false,
    __BASENAME__: false,
    google: true
  },
  settings: {
    ecmascript: 6,
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
     // use <root>/path/to/folder/tsconfig.json
     'typescript': {
        'directory': './tsconfig.json'
      }
    },
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@getify/proper-arrows/params': [
      'error', {
        'unused': 'trailing'
      }
    ],
    '@getify/proper-arrows/name': [
      'error', { 'trivial': false }
    ],
    '@getify/proper-arrows/where': [
      'error', { 'global': true }
    ],
    '@getify/proper-arrows/return': [
      'error', { 'object': true }
    ],
    '@getify/proper-arrows/this': [
      'error',
      'never', {
        'no-global': true
      }
    ],

    'ascii/valid-name': 2,
    'optimize-regex/optimize-regex': 'warn',
    'filenames/no-index': 0,
    'filenames/match-regex': [2, '^[a-z0-9-.]+$', true],
    'filenames/match-exported': [2, ['camel', 'kebab', null]],
    'template-curly-spacing': ['error', 'never'],
    indent: ['error', 2],
    'react-functional-set-state/no-this-state-props': 2,
    'no-void': 2,
    'no-restricted-globals': 2,
    'no-use-before-define': 2,
    'func-names': 1,
    'guard-for-in': 2,
    'no-restricted-syntax': 2,

    'jsx-a11y/label-has-for': 'off',
    'no-console': 'off',
    // 'react/no-typos': 'off',
    'max-len': 'off',
    'no-nested-ternary': 'off',
    camelcase: [
      2,
      {
        properties: 'never'
      }
    ],
    'react-redux/prefer-separate-component-file': 'off',
    'react/destructuring-assignment': 'off',
    'babel/no-invalid-this': 1,
    'babel/semi': 0,
    'spaced-comment': 0,
    'brace-style': 0,
    'no-trailing-spaces': 0,
    'import/default': 2,
    'import/no-unresolved': [
      2,
      {
        commonjs: true,
        amd: true
      }
    ],
    'import/named': 'off',
    'import/namespace': 2,
    'import/export': 2,
    'import/no-duplicates': 0,
    'import/imports-first': 2,
    'semi': ['error', 'never'],
    // 'prettier/prettier': ['error', {trailingComma: 'none', semi: false, singleQoute: true, printWidth: 80, tabWidth: 2, parser: 'typescript'}],
    // @typescript-eslint rule overrides
    "indent": "off",
    '@typescript-eslint/indent': ["error", 2],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-explicit-any': 0
  },
  parserOptions: {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'ecmaFeatures': {
      jsx: true
    },
    'useJSXTextNode': true,
    'project': './tsconfig.json',
    'tsconfigRootDir': './'
  }
}
