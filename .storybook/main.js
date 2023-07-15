const webpack = require('webpack')
const path = require('path')
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')
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
    [
      'babel-plugin-polyfill-corejs3',
      {
        method: 'usage-global',
        absoluteImports: 'core-js',
        version: '3.18.3',
      },
    ],
  ],
}


module.exports = {
  reactOptions: {
    fastRefresh: true,
  },
  "stories": [
    "../packages/react-google-maps-api/**/*.stories.mdx",
    "../packages/react-google-maps-api/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/react-google-maps-api-gatsby-example/**/*.stories.mdx",
    "../packages/react-google-maps-api-gatsby-example/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      flexbox: 'no-2009',
    }),
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: '../tsconfig.json',
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
      },
    },
  },
  webpackFinal: (config) => {
    config.resolve.alias['@react-google-maps/api'] = require.resolve('../packages/react-google-maps-api/src/index.ts');
    config.resolve.alias['@react-google-maps/infobox'] = require.resolve('../packages/react-google-maps-api-infobox/src/index.ts');
    config.resolve.alias['@react-google-maps/marker-clusterer'] = require.resolve('../packages/react-google-maps-api-marker-clusterer/src/index.ts');

    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
        baseUrl: path.resolve(__dirname, '..'),
      }),
    ]

    config.resolve.extensions = [
      '.mjs',
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.cssm',
      '.mdx',
    ]

    config.plugins.push(
      new webpack.EnvironmentPlugin({
        UNION_ASSETS_ENV: 'qa',
        UNION_DEPLOYMENT_ENV: 'qa',
        UNION_MEMBERSHIP_API_KEY: 'XoZzhopt2zto6auTSbIN9j2irh11mCv5',
        GDS_API_KEY:
          'a904707cc252249b61e393dcd5b5ea130f2f532c97f26f5ee4fa11026032556d',
        GUEST_ENV: 'qa',
        WEDDING_API_KEY: 'LStE27uk91EQW95k5arx1D7VG0IVm18T',
        BOOKINGS_API_SOURCE: 'guest-api',
        SEGMENT_WRITE_KEY: '5niwjgxx8r',
        SEGMENT_PRODUCT: 'Guest Shared Component',
        WWS_GRAPHQL_API_KEY: '9S0scH6dss5QOzcrFuAHw95VQBa1sgoC7xDGQnpn',
        WWS_GRAPHQL_ENDPOINT: 'https://qa-graphql.guests.theknot.com/graphql',
      })
    )

    // Remove css-loader rule from storybook so it doesn't conflict with a-css-loader
    config.module.rules = config.module.rules.filter(
      (rule) =>
        !(
          rule.use &&
          rule.use.find(({ loader }) => loader && loader.includes('css-loader'))
        )
    )

    // Temp fix for monorepo issue: https://github.com/storybooks/storybook/issues/3346
    config.module.rules = config.module.rules.filter(
      (rule) =>
        !(
          rule.use &&
          rule.use.length &&
          rule.use.find(({ loader }) => loader === 'babel-loader')
        )
    )

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: path.resolve('./'),
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions,
        },
      ],
      exclude: /(node_modules|dist)/,
    })

    config.module.rules.push({
      // 2a. Load `.stories.mdx` / `.story.mdx` files as CSF and generate
      //     the docs page from the markdown
      test: /\.(stories|story)\.mdx$/,
      use: [
        {
          // Need to add babel-loader as dependency: `yarn add -D babel-loader`
          loader: require.resolve('babel-loader'),
          // may or may not need this line depending on your app's setup
          options: babelOptions,
        },
        {
          loader: '@mdx-js/loader',
          options: {
            compilers: [createCompiler({})],
          },
        },
      ],
    })
    // 2b. Run `source-loader` on story files to show their source code
    //     automatically in `DocsPage` or the `Source` doc block.
    config.module.rules.push({
      test: /\.(stories|story)\.[tj]sx?$/,
      loader: require.resolve('@storybook/source-loader'),
      exclude: [/node_modules/],
      enforce: 'pre',
    })

    config.module.rules.push({
      test: /\.jsx?$/,
      include: path.resolve('./'),
      exclude: /(node_modules|dist)/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions,
        },
      ],
    })

    config.module.rules.push({
      test: /\.s?css$/,
      use: 'style-loader',
    })

    config.module.rules.push({
      test: /\.scss$/,
      use: 'sass-loader',
    })

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'sass-loader',
        },
      ],
    })

    // exclude svg from existing rule
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test.test('.svg')
    )

    fileLoaderRule.exclude = /\.svg$/

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    }) // necessary for storybook components to import other storybook components

    config.resolve.alias = {}

    return config;
  },

}
