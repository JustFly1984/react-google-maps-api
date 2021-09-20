module.exports = {
  siteMetadata: {
    siteUrl: 'https://react-google-maps-api.netlify.app',
    title: 'React Google Maps API Gatsby Example',
  },
  plugins: [
    // {
    //   resolve: 'gatsby-plugin-webpack-bundle-analyzer',
    //   options: {
    //     analyzerPort: 3333,
    //     production: true,
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-purgecss',
    //   options: {
    //     printRejected: true,
    //     ignore: []
    //   }
    // },
    // {
    //   resolve: 'gatsby-plugin-eslint',
    //   options: {
    //     test: /\.js$/,
    //     exclude: /(node_modules|cache|public|static|.cache)/,
    //     options: {
    //       emitWarning: true,
    //       failOnError: true,
    //     },
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: './src/favicon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-typescript`,
  ],
}
