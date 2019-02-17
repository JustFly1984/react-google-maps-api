# Polygon example

```jsx
const { GoogleMap, LoadScript, Polygon } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const SYDNEY_COORDS = [
  { lat: -33.858, lng: 151.213 },
  { lat: -33.859, lng: 151.222 },
  { lat: -33.866, lng: 151.215 }
]

const sydneyPolygonOptions = {
  fillColor: 'lightblue',
  fillOpacity: 1,
  strokeColor: 'red',
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  paths: SYDNEY_COORDS,
  zIndex: 1
}

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
    <Polygon
      path={SYDNEY_COORDS}
      options={sydneyPolygonOptions}
    />
  </GoogleMap>
</ScriptLoaded>
```
