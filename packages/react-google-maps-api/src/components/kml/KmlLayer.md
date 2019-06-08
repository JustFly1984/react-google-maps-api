# KML Layer example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id="kml-layer-example"
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={11}
    center={{lat: 41.876, lng: -87.624}}
    
  >
    <KmlLayer url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml" />
  </GoogleMap>
</ScriptLoaded>
```
