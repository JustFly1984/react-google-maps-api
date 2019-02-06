module.exports = {
  ignore: ['**/*.js', '**/*.ts'],
  propsParser: require('react-docgen-typescript').withDefaultConfig().parse,
  // getExampleFilename (componentPath) {
  //   console.log(componentPath, '*********************')
  //   const fileName = componentPath.match(/([\s\w()\-.:\\])+(.tsx)$/i)[0].replace('.tsx', '')
  //   console.log(fileName, '&&&&&&&&&&&&&&&&&&')

  //   return `/docs/${fileName}.md`
  // },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.ts|\.tsx$/,
          loader: 'awesome-typescript-loader'
        },
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    }
  }
}
