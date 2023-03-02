<div align="center">

![logo](https://raw.githubusercontent.com/JustFly1984/react-google-maps-api/master/logo.png)

# @react-google-maps organization root

You can donate or became a sponsor [https://opencollective.com/react-google-maps-api#category-CONTRIBUTE](https://opencollective.com/react-google-maps-api#category-CONTRIBUTE)

[![npm package](https://img.shields.io/npm/v/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![npm downloads](https://img.shields.io/npm/dt/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/react-google-maps)

</div>

## README

For API README please navigate to [https://github.com/JustFly1984/react-google-maps-api/tree/master/packages/react-google-maps-api](https://github.com/JustFly1984/react-google-maps-api/tree/master/packages/react-google-maps-api)

or [https://react-google-maps-api-docs.netlify.app](https://react-google-maps-api-docs.netlify.app)

## For Maintainers

Join our [Slack channel](https://join.slack.com/t/react-google-maps-api/shared_invite/enQtODc5ODU1NTY5MzQ4LTBiNTYzZmY1YmVjYzJhZThkMGU0YzUwZjJkNGJmYjk4YjQyYjZhMDk2YThlZGEzNDc0M2RhNjBmMWE4ZTJiMjQ)

## For Developers and Contributors

### Requirements

- basic git, JavaScript, React knowledge
- Google Maps API Key from [Google Cloud Console](https://console.cloud.google.com)
- git
- node
- yarn

### To develop locally

Fork original repo at <https://github.com/JustFly1984/react-google-maps-api>. Clone your fork to local directory of your choice, install dependencies, set up your API Key, and start storybook server. Following commands should do the job:

- `git clone https://github.com/YOUR_USER_NAME/react-google-maps-api.git` - clone your fork
`
- `cd react-google-maps-api` - move to newly created folder
- `cp .storybook/example.maps.config.ts .storybook/maps.config.ts` - create file with API Key
- `yarn install` - install dependencies
- `yarn bootstrap` - setup workspace
- `yarn storybook` - run storybook server

Any changes you make to src folders of contained packages should reflect on the storybook server.

### To contribute

Create a feature/fix branch on your own fork and make pull request towards develop branch of the original repo.

You can donate or became a sponsor [https://opencollective.com/react-google-maps-api#category-CONTRIBUTE](https://opencollective.com/react-google-maps-api#category-CONTRIBUTE)
