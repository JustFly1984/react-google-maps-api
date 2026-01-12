const webpack = require('webpack')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const babelOptions = {
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        loose: true,
      },
    ],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
        onlyRemoveTypeImports: false,
        optimizeConstEnums: true,
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    'react-require',
    [
      '@babel/plugin-transform-typescript',
      {
        allowDeclareFields: true,
      }
    ],
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-transform-shorthand-properties',
    '@babel/plugin-transform-block-scoping',
    '@babel/plugin-syntax-typescript',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        loose: true,
        useBuiltIns: true,
      },
    ],
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-transform-classes',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-parameters',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-spread',
    '@babel/plugin-transform-for-of',
    'babel-plugin-macros',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
}

module.exports = {
  stories: [
    "../packages/react-google-maps-api/src/**/*.stories.mdx",
    "../packages/react-google-maps-api/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/react-google-maps-api-gatsby-example/src/**/*.stories.mdx",
    "../packages/react-google-maps-api-gatsby-example/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
      },
    },
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-google-maps/api': path.resolve(__dirname, '../packages/react-google-maps-api/src/index.ts'),
      '@react-google-maps/infobox': path.resolve(__dirname, '../packages/react-google-maps-api-infobox/src/index.ts'),
      '@react-google-maps/marker-clusterer': path.resolve(__dirname, '../packages/react-google-maps-api-marker-clusterer/src/index.ts'),
    };

    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
        baseUrl: path.resolve(__dirname, '..'),
      }),
    ];

    return config;
  },
  babel: async (options) => ({
    ...options,
    ...babelOptions
  }),
};
