# Rectangle example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id="rectangle-example"
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
    <Rectangle
      onLoad={rectangle => {
        console.log('rectangle: ', rectangle)
      }}
      bounds={{
        north: 38.685,
        south: 33.671,
        east: -115.234,
        west: -118.251
      }}
    />
  </GoogleMap>
  </ScriptLoaded>
```
