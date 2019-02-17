export default {
  title: 'React Google Maps API',
  description: 'Best option to embed Google Maps to your React app',
  protocol: 'https',
  hashRouter: true,
  theme: 'docz-theme-default',
  typescript: true,
  modifyBundlerConfig: config => ({
    ...config,
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js)$/,
          loader: 'awesome-typescript-loader'
        },
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    }
  })
}
