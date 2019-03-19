const path = require('path');

const config = {
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'umd'),
    library: 'react-google-maps-api',
    libraryTarget: 'umd',
    filename: 'index.js',
  },
  externals: {
	'react': 'React',  
	'react-dom': 'ReactDOM',  
	'marker-clusterer-plus': 'MarkerClusterer',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node-modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', 'jsx'],
  },
  devtool: 'source-map',
};

module.exports = config;