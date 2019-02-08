module.exports = {
  ignore: ['**/*.js', '**/*.ts'],
  propsParser: require('react-docgen-typescript').withDefaultConfig().parse,
  usageMode: 'expand',
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
  },
  sections: [
    {
      name: 'Introduction',
      content: 'src/docs/introduction.md',
    },
    {
      name: 'Documentation',
      sections: [
        {
          name: 'Installation',
          content: 'src/docs/installation.md',
        },
        {
          name: 'Getting Started',
          content: 'src/docs/getting-started.md',
        },
      ],
    },
    {
      name: 'Components',
      components: 'src/components/**/*.tsx',
    },
  ],
}
