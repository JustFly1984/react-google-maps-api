export const imports = {
  'src/docs/BicyclingLayer.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-bicycling-layer" */ 'src/docs/BicyclingLayer.mdx'),
  'src/docs/GoogleMap.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-google-map" */ 'src/docs/GoogleMap.mdx'),
  'src/docs/GroundOverlay.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-ground-overlay" */ 'src/docs/GroundOverlay.mdx'),
  'src/docs/Shapes.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-shapes" */ 'src/docs/Shapes.mdx'),
}
