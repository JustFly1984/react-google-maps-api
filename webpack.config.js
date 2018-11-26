const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const pkg = require('./package.json')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    library: pkg.name
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: 'babel-loader'
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      }
    ]
  },
  optimization: {
    // minimizer: [new UglifyJsPlugin({
    //   test: /\.js(\?.*)?$/i
    // })],
    minimizer: [new TerserPlugin({
      sourceMap: true
    })]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['./node_modules']
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerPort: 3333,
    //   defaultSizes: 'gzip',
    //   openAnalyzer: true
    // })
  ],
  externals: {
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'PropTypes',
      root: 'PropTypes'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  }
}
