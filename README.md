# react-google-maps-api
React Google Maps API

This is complete rewrite based on new Google Maps API version. Sadly previos library served our needs currently unmaintained about a year, and has a lot of unmerged PR's and unsolved issues.
I've encountered whole wopping lodash as dependency while debugging my webpack build, and while trying to fork it, found out, that build had a step which involved parsing google's map api reference url, which in turn had a redesign and broke a build.

## Main features:

- Simplified API
- Based on new React.createContext API
- Supports async React
- Does not requires extra dependencies (no lodash), smalles bundle size
- Cleanup on unMount

We have examples in gatsby and docz.

Maintainers and contributors are welcome!
