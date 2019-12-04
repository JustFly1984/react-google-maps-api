# KML Layer example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const center = {
  lat: 41.876,
  lng: -87.624
};

<ScriptLoaded>
  <GoogleMap
    id="kml-layer-example"
    mapContainerStyle={mapContainerStyle}
    zoom={11}
    center={center}
  >
    <KmlLayer url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml" />
  </GoogleMap>
</ScriptLoaded>
```
