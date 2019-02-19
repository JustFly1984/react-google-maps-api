module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:you-dont-need-lodash-underscore/compatible',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-perf/recommended',
    'standard',
    'standard-react',
    'plugin:jsx-a11y/recommended',
    //'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "prettier/react",
    "prettier/standard"
  ],
  plugins: [
    'you-dont-need-lodash-underscore',
    'json',
    'dependencies',
    'babel',
    'import',
    'filenames',
    'jsx-a11y',
    'html',
    'ascii',
    'promise',
    'promiseparams',
    'react',
    'optimize-regex',
    'react-perf',
    'standard',
    'no-inferred-method-name',
    'react-functional-set-state',
    '@typescript-eslint',
    'prettier'
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
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
     // use <root>/path/to/folder/tsconfig.json
     "typescript": {
      "directory": "./tsconfig.json"
    }
    },
    react: {
      version: 'detect'
    }
  },
  rules: {
    'ascii/valid-name': 2,
    'optimize-regex/optimize-regex': 'warn',
    'promiseparams/promiseparams': 2,
    'filenames/no-index': 0,
    'filenames/match-regex': [2, '^[a-z0-9-.]+$', true],
    'filenames/match-exported': [2, ['camel', 'kebab', null]],
    'template-curly-spacing': ['error', 'never'],
    indent: ['error', 2],
    'dependencies/case-sensitive': 1,
    'dependencies/no-cycles': 1,
    'dependencies/no-unresolved': 0,
    'dependencies/require-json-ext': 1,
    'react-functional-set-state/no-this-state-props': 2,
    'no-void': 2,
    'no-restricted-globals': 2,
    'no-use-before-define': 2,
    'func-names': 1,
    'no-unused-vars': 2,
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
    'import/named': 2,
    'import/namespace': 2,
    'import/export': 2,
    'import/no-duplicates': 0,
    'import/imports-first': 2,
    "prettier/prettier": ["error", {trailingComma: "none", semi: false, singleQoute: true, printWidth: 80, tabWidth: 2}],
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    useJSXTextNode: true,
    project: './tsconfig.json',
    tsconfigRootDir: "./"
  }
}
