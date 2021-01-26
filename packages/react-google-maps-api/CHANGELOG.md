# Changelog

## 2.1.1 Updated types @types/googlemaps@3.43.2

## 2.1.0 Updated dependencies, types @types/googlemaps@3.43.0, merged fix for correct marker removal

## 2.0.1 React 17 support, Typescript 4.1.2

## 1.14.0 update webpack to 5.2.0, React 17 support, @types/googlemaps@3.40.1, typescript@4.1.0-beta

## 1.13.0 update webpack@5.0.0

## 1.12.0 added useJsApiLoader hook, based on @googlemaps/js-api-loader. New official way of loading googlemaps script

## 1.11.0 updated  @types/googlemaps@3.40.0

## 1.10.0 updated typescript@4.0.2, merged fixes for OverlayView

## 1.9.9 updated @types/googlemaps@3.39.10

## 1.9.8 merger PR to fix issues #1090 , improve accessibility, updated @types/googlemaps to latest, updated lodash security patch

## 1.9.7 nonce prop for injectScript

## 1.9.6 updated @types/googlemaps@3.39.7

## 1.9.5 Compare between LatLng and LatLngLiteral with proper way in OverlayView

## 1.9.3 fix Marker re-rendering in Cluster, fix MarkerClusterer performance

## 1.9.2 fix typescript 3.9.3 errors in @react-google-maps/infobox Cluster and @react-google-maps/api HeatmapLayer components, fix docs

## 1,9.1 export MapContext

## 1.9.0 remove appendChild in OverlayView

## 1.8.2 update dependencies

## 1.8.1 cleanup

## 1.8.0 cleanup, fix typos

## 1.7.13 fixed umd build

## 1.7.10 fixed InfoBox options bug

## 1.7.9 fixed types for OverlayView props

## 1.7.8 added panTo prop on `<GoogleMap />` component

## 1.7.7 fix bug in Autocomplete

## 1.7.6 fix types for Data component

## 1.7.1 Added Transport Layer

## 1.7.0 Added Infobox

## 1.6.0 Update dependencies

## 1.5.4 fix tsdx build issues

## 1.5.3 fix umd build

## 1.5.2 refactor script loading algorithm

## 1.5.1 fix import for distance matrix

## 1.5.0 Changes to loading script algorithm

## 1.4.2 Fix onOverlayComplete

## 1.4.0 Added DistanceMatrixService, fixed invariant errors, fixed getPixelPositionOffset in OverlayView, updated @react-google-maps/marker-clusterer@1.4.0

## 1.2.4 Fixed builds with TSDX

## 1.2.3 Added MarkerClusterer refactored to typescript

- Removed instance persistance feature due to bugs with google-maps-api.

- UMD and ESM builds

- Added new onMouseUp and onMouseDown props for `<GoogleMap />` component

## 1.2.2 fix draggable type on Marker, export Types alongside with Components, useGoogleMap hook

## 1.2.1 fix InfoBox rendering issue

## 1.2.0 Typescript refactoring

- BREAKING: LoadScript wrapping div was changed to a sibling div [https://github.com/JustFly1984/react-google-maps-api/commit/3f52446b756ce7dc47b5886f1a07071f6a2643ec](https://github.com/JustFly1984/react-google-maps-api/commit/3f52446b756ce7dc47b5886f1a07071f6a2643ec)
- Full embrace of strongly typed functionality. Autocomplete in your typescript projects out of the box.
- Added onLoad and onUnmount callback props for each component.
- added addon MarkerClusterer

## 1.1.1-alpha Additional component support

- StreetViewPanorama
- StreetViewService
- MarkerClusterer

## 1.1.0

- Re-write in Typescript
- DEPRECATED: FuctionTablesLayer (was deprecated by google and support will be cut completely on December 3, 2019)

## 1.0.10 Fix cleanup in `<LoadScript />`

## 1.0.9 Fix hanging jest-worker child processes on `setInterval`

## 1.0.8 Added StandaloneSearchBox component, update docs and examples

## 1.0.3 Moved to organization @react-google-maps

## Archive

## 1.0.5

Fixed a bug with `<LoadScript language />` prop update and cleanup after unmount

## 1.0.6

added `onUnmount` func prop to `<LoadScript />`

## 1.0.7

fix memory leak of google-maps-api-v3

## 1.0.8

added property `options` to `<GoogleMap options={}>`

options are consistent with [MapOptions Interface](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)
