module.exports = {
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
  webpackFinal: (config) => {
    config.resolve.alias['@react-google-maps/api'] = require.resolve('../packages/react-google-maps-api/src/index.ts');
    config.resolve.alias['@react-google-maps/infobox'] = require.resolve('../packages/react-google-maps-api-infobox/src/index.ts');
    config.resolve.alias['@react-google-maps/marker-clusterer'] = require.resolve('../packages/react-google-maps-api-marker-clusterer/src/index.ts');
    return config;
  },
}