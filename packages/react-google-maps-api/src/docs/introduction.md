# Introduction

 *This library requires React v16.6 or later. If you need support for earlier versions of React, you should check out [react-google-maps](https://github.com/tomchentw/react-google-maps)*

This is complete re-write of the (sadly unmaintained) `react-google-maps` library. We thank [tomchentw](https://github.com/tomchentw/) for his great work that made possible.

[@react-google-maps/api][react-google-maps] provides very simple bindings to the [Google Maps JavaScript API v3][gmjsav3] and lets you use it in your app as React components.

It is written with Typescript and uses types defined in [this](https://www.npmjs.com/package/@types/googlemaps) project

## How to use this documentation

* Clicking on `PROPS & METHODS` will show you all available props & methods of a component.
* Clicking on `CODE` will show you the code behind the live demo. You can edit it right here in the docs!

In order to use the examples in these docs **you have to have an api key**. You can create one [here](https://console.cloud.google.com/apis/credentials/key).

Once you have a key (if it is url restricted, make sure it allows this url), add it in the input and click the Set Key button.

[react-google-maps]: https://github.com/JustFly1984/react-google-maps-api
[gmjsav3]: https://developers.google.com/maps/documentation/javascript/
[react-styleguidist]: https://react-styleguidist.js.org/

```jsx
const DocsApiKeyInput= require("./DocsApiKeyInput").default;

<DocsApiKeyInput/>
```
