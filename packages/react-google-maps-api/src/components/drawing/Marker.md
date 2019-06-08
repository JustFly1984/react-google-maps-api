# Marker example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id="marker-example"
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={2}
    center={{
      lat: 0,
      lng: -180
    }}
  >
    <Marker
      onLoad={marker => {
        console.log('marker: ', marker)
      }}
      position={{
        lat: 37.772,
        lng: -122.214
      }}
    />
  </GoogleMap>
</ScriptLoaded>
```
