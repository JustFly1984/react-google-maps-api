# StreetViewPanorama example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const center = {
  lat:  51.5320665,
  lng: -0.177203
};

<ScriptLoaded>
  <GoogleMap
    id="circle-example"
    mapContainerStyle={mapContainerStyle}
    zoom={7}
    center={center}
  >
    <StreetViewPanorama
      position={center}
      visible={true}
    />
  </GoogleMap>
</ScriptLoaded>
```
