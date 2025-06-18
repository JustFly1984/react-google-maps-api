const { basename } = require('node:path')
const { withCustomConfig } = require('react-docgen-typescript')
const path = require('path')
const webpack = require('webpack')

const ignore = ['**/*.stories.tsx', '**/*.test.ts', '**/*.test.tsx']

const propsParser = withCustomConfig('./tsconfig.json', {
  savePropValueAsString: true,
}).parse

function getComponentPathLine(componentPath) {
  const name = basename(componentPath, '.tsx')
  return `import { ${name} } from '@react-google-maps/api';`
}

const usageMode = 'expand'

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                ['@babel/preset-typescript', {
                  allowDeclareFields: true
                }]
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@react-google-maps/api': path.resolve(__dirname, 'src'),
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    },
    mainFields: ['module', 'main'],
    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js'],
      '.mjs': ['.mts', '.mjs']
    },
    fallback: {
      "process": require.resolve("process/browser")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        ...process.env,
        NODE_ENV: process.env.NODE_ENV || 'development'
      })
    })
  ]
}

const sections = [
  {
    name: 'Introduction',
    content: 'src/docs/introduction.md', // Path to the introduction documentation
  },
  {
    name: 'Getting Started',
    content: 'src/docs/getting-started.md', // Path to the getting-started documentation
  },
  {
    name: 'Components',
    // List of components and component files to document
    components: () => [
      'src/useJsApiLoader.tsx',
      'src/LoadScript.tsx',
      'src/LoadScriptNext.tsx',
      'src/useLoadScript.tsx',
      'src/GoogleMap.tsx',
      'src/components/**/*.tsx',
    ],
  },
]

module.exports = {
  title: 'React Google Maps API Documentation',
  ignore,
  propsParser,
  getComponentPathLine,
  usageMode,
  webpackConfig,
  sections,
  skipComponentsWithoutExample: false,
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  pagePerSection: true,
  exampleMode: 'expand',
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
        },
      ],
    },
  },
  require: [],
  updateExample: (props) => {
    if (!props || !props.settings) {
      return props;
    }
    const { settings, lang } = props;
    if (settings.file && typeof settings.file === 'string') {
      const filepath = settings.file;
      settings.static = true;
      delete settings.file;
    }
    return props;
  },
}
