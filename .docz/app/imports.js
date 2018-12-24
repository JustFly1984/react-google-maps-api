export const imports = {
  'src/docs/BicyclingLayer.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-bicycling-layer" */ 'src/docs/BicyclingLayer.mdx'),
  'src/docs/Circle.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-circle" */ 'src/docs/Circle.mdx'),
  'src/docs/GoogleMap.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-google-map" */ 'src/docs/GoogleMap.mdx'),
  'src/docs/GroundOverlay.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-ground-overlay" */ 'src/docs/GroundOverlay.mdx'),
  'src/docs/Polygon.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-polygon" */ 'src/docs/Polygon.mdx'),
  'src/docs/Marker.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-marker" */ 'src/docs/Marker.mdx'),
  'src/docs/Polyline.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-polyline" */ 'src/docs/Polyline.mdx'),
  'src/docs/Rectangle.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-rectangle" */ 'src/docs/Rectangle.mdx'),
  'src/docs/Shapes.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-shapes" */ 'src/docs/Shapes.mdx'),
}
