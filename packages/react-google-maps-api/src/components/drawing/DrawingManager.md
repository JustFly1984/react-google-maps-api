# DrawingManager example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id="drawing-manager-example"
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={2.5}
    center={{
      lat: 38.685,
      lng: -115.234
    }}
  >
    <DrawingManager
      onLoad={drawingManager => {
        console.log(drawingManager)
      }}
      onPolygonComplete={(polygon) => console.log({polygon})}
    />
  </GoogleMap>
</ScriptLoaded>
```
