# @react-google-maps organisation root

![logo](https://raw.githubusercontent.com/JustFly1984/react-google-maps-api/master/logo.png)

## ReadMe

for API README please navigate to [https://github.com/JustFly1984/react-google-maps-api/tree/master/packages/react-google-maps-api](https://github.com/JustFly1984/react-google-maps-api/tree/master/packages/react-google-maps-api)

or [https://react-google-maps-api-docs.netlify.com](https://react-google-maps-api-docs.netlify.com)

## For Maintainers

Repo is based on lerna

Before starting to work on project, instead of `yarn` or `npm i` in each package directory, you need to run `yarn && lerna bootstrap` in the root directory

Note: Lerna do not builds before publishing. To properly publish, run `yarn run publish` in root directory


* "yarn bootstrap" to init monorepo.
* "yarn storybook" to run storybook.
