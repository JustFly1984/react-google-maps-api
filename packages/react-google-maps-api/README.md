# @react-google-maps/api

![logo](https://raw.githubusercontent.com/JustFly1984/react-google-maps-api/master/logo.png)

@react-google-maps/api

> This library requires React v16.6 or later. To use the latest features (including hooks) requires React v16.8+. If you need support for earlier versions of React, you should check out [react-google-maps](https://github.com/tomchentw/react-google-maps)

This is complete re-write of the (sadly unmaintained) `react-google-maps` library. We thank [tomchentw](https://github.com/tomchentw/) for his great work that made possible.

@react-google-maps/api provides very simple bindings to the google maps api and lets you use it in your app as React components.

Here are the main additions to react-google-maps that were the motivation behind this re-write

## Install @react-google-maps/api

with NPM

```#!/bin/bash
npm i -S @react-google-maps/api
```

or Yarn

```#!/bin/bash
yarn add @react-google-maps/api
```

## Migration from react-google-maps@9.4.5

if you need an access to map object, instead of `ref` prop, you need to use `onLoad` callback on `<GoogleMap />` component.

Before:

```jsx
// before
<GoogleMap
  ref={map => {
    const bounds = new window.google.maps.LatLngBounds();

    map.fitBounds(bounds);
  }}
/>
```

After:

```jsx
<GoogleMap
  onLoad={map => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }}
  onUnmount={map => {
    // do your stuff before map is unmounted
  }}
/>
```

## Main features

- Simplified API
- Uses the new Context API
- Supports async React (StrictMode complient)
- Removes lodash dependency =>
  smaller bundle size `12.4kb` gzip, tree-shakeable [https://bundlephobia.com/result?p=@react-google-maps/api](https://bundlephobia.com/result?p=@react-google-maps/api)
- forbids loading of Roboto fonts, if you set property preventGoogleFonts on `<LoadScript preventGoogleFonts />` component

## Examples

Examples can be found in two places:

1. [Official docs](https://react-google-maps-api-docs.netlify.com/) (powered by [react-styleguidist](https://github.com/styleguidist/react-styleguidist).
2. A Gatsby app including some examples. See the [examples](https://github.com/JustFly1984/react-google-maps-api/tree/master/packages/react-google-maps-api-gatsby-example/src/examples) folder
3. [Gatsby.js Demo](https://react-google-maps-api-gatsby-demo.netlify.com/)

## Advice

> Using the examples requires you to generate a google maps api key. For instructions on how to do that please see the following [guide](https://developers.google.com/maps/documentation/embed/get-api-key)

## Community Help Resource

You can join the community at https://spectrum.chat/react-google-maps to ask questions and help others with your experience.

## Contribute

Maintainers and contributors are very welcome! See [this issue](https://github.com/JustFly1984/react-google-maps-api/issues/18) to get started.

## How to test changes locally

When working on a feature/fix, you're probably gonna want to test your changes. This workflow is a work in progress. Please feel free to improve it!

1. In the file `packages/react-google-maps-api/package.json` change `main` to `"src/index.ts"`
2. In the same file, delete the `module` field
3. You can now use the package `react-google-maps-api-gatsby-example` to test your changes. Just make sure you change the import from `@react-google-maps/api` to `../../../react-google-maps-api`

Since 1.2.0 you can use onLoad and onMount props for each @react-google-maps/api component, ref does not contain API methods anymore.

Since version 1.2.2 We added useGoogleMap hook, which is working only with React@16.8.1 and later versions.

## Websites made with @react-google-maps-api

[DriveFromTo.com](https://www.drivefromto.com/en) Transfer Booking service PWA.

add your website by making PR!
