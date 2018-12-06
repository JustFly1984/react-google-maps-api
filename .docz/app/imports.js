export const imports = {
  'src/docs/GoogleMap.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-google-map" */ 'src/docs/GoogleMap.mdx'),
}
