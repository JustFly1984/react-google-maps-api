module.exports = {
  siteMetadata: {
    siteUrl: 'https://react-google-maps-api.netlify.com',
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
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        printRejected: true,
        ignore: []
      }
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$/,
        exclude: /(node_modules|cache|public|static|.cache)/,
        options: {
          emitWarning: true,
          failOnError: true
        }
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        // exclude: ["/category/*", `/path/to/page`],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`
      }
    },
    'gatsby-plugin-react-helmet'
  ],
}
