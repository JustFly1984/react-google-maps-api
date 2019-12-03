# DrawingManager example

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

const onLoad = drawingManager => {
  console.log(drawingManager)
}

const onPolygonComplete = polygon => {
  console.log(polygon)
}

<ScriptLoaded>
  <GoogleMap
    id="drawing-manager-example"
    mapContainerStyle={mapContainerStyle}
    zoom={2.5}
    center={center}
  >
    <DrawingManager
      onLoad={onLoad}
      onPolygonComplete={onPolygonComplete}
    />
  </GoogleMap>
</ScriptLoaded>
```
