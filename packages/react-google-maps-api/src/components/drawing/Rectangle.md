# Rectangle example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: 38.685,
  lng: -115.234
}

const bounds = {
  north: 38.685,
  south: 33.671,
  east: -115.234,
  west: -118.251
}

const onLoad = rectangle => {
  console.log('rectangle: ', rectangle)
}

<ScriptLoaded>
  <GoogleMap
    id="rectangle-example"
    mapContainerStyle={mapContainerStyle}
    zoom={2.5}
    center={center}
  >
    <Rectangle
      onLoad={onLoad}
      bounds={bounds}
    />
  </GoogleMap>
  </ScriptLoaded>
```
