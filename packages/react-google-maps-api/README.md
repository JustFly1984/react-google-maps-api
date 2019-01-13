# react-google-maps-api

React Google Maps API 1.0.6

> This library requires React v16.6 or later. If you need support for earlier versions of React, you should check out [react-google-maps](https://github.com/tomchentw/react-google-maps)

This is complete re-write of the (sadly unmaintained) ```react-google-maps``` library. We thank [tomchentw](https://github.com/tomchentw/) for his great work that made possible.

react-google-maps-api provides very simple bindings to the google maps api and lets you use it in your app as React components.

Here are the main additions to react-google-maps that were the motivation behind this re-write

## Main features

- Simplified API
- Uses the new Context API
- Supports async React (StrictMode complient)
- Removes lodash dependency =>
  smaller bundle size `12.4kb`, tree-shakeable [https://bundlephobia.com/result?p=react-google-maps-api@1.0.0](https://bundlephobia.com/result?p=react-google-maps-api@1.0.0)
- forbids loading of Roboto fonts, if you set property preventGoogleFonts on `<LoadScript preventGoogleFonts />` component

## Examples

Examples can be found in two places:

1. [Official docs](https://react-google-maps-api.netlify.com) (powered by [docz](https://github.com/pedronauck/docz)). See the [docs](https://github.com/JustFly1984/react-google-maps-api/tree/master/src/docs) folder
2. A Gatsby app including some examples. See the [examples](https://github.com/JustFly1984/react-google-maps-api/tree/master/examples/react-google-maps-api-gatsby/src/examples) folder
3. [Gatsby.js Demo](https://react-google-maps-api-gatsby-demo.netlify.com/)

## Advise

You can save on bundle size if you import only components, which you use from `react-google-maps-api/lib/...`, although whole library is tree-shakable.

> Using the examples requires you to generate a google maps api key. For instructions on how to do that please see the following [guide](https://developers.google.com/maps/documentation/embed/get-api-key)

## Contribute

Maintainers and contributors are very welcome! See [this issue](https://github.com/JustFly1984/react-google-maps-api/issues/18) to get started.
