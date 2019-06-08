# Ground Overlay example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id="circle-example"
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={13}
    center={{
      lat: 40.740,
      lng: -74.18
    }}
  >
    <GroundOverlay
      key={'url'}
      url='https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg'
      bounds={{
        north: 40.773941,
        south: 40.712216,
        east: -74.12544,
        west: -74.22655
      }}
    />
  </GoogleMap>
</ScriptLoaded>
```
