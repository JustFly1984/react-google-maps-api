export const imports = {
  'src/BicyclingLayer.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-bicycling-layer" */ 'src/BicyclingLayer.mdx'),
  'src/Circle.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-circle" */ 'src/Circle.mdx'),
  'src/Changelog.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-changelog" */ 'src/Changelog.mdx'),
  'src/GoogleMap.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-google-map" */ 'src/GoogleMap.mdx'),
  'src/GroundOverlay.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-ground-overlay" */ 'src/GroundOverlay.mdx'),
  'src/Install.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-install" */ 'src/Install.mdx'),
  'src/Marker.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-marker" */ 'src/Marker.mdx'),
  'src/Polygon.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-polygon" */ 'src/Polygon.mdx'),
  'src/Polyline.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-polyline" */ 'src/Polyline.mdx'),
  'src/Rectangle.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-rectangle" */ 'src/Rectangle.mdx'),
  'src/Shapes.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-shapes" */ 'src/Shapes.mdx'),
}
