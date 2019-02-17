# HeatmapLayer example

```jsx
const { GoogleMap, LoadScript, HeatmapLayer } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const heatmapData = [
  new google.maps.LatLng(37.782, -122.447),
  new google.maps.LatLng(37.782, -122.445),
  new google.maps.LatLng(37.782, -122.443),
  new google.maps.LatLng(37.782, -122.441),
  new google.maps.LatLng(37.782, -122.439),
  new google.maps.LatLng(37.782, -122.437),
  new google.maps.LatLng(37.782, -122.435),
  new google.maps.LatLng(37.785, -122.447),
  new google.maps.LatLng(37.785, -122.445),
  new google.maps.LatLng(37.785, -122.443),
  new google.maps.LatLng(37.785, -122.441),
  new google.maps.LatLng(37.785, -122.439),
  new google.maps.LatLng(37.785, -122.437),
  new google.maps.LatLng(37.785, -122.435)
];

const sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);

<ScriptLoaded>
  <GoogleMap
    id="rectangle-example"
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={2.5}
    center={sanFrancisco}
  >
    <HeatmapLayer
      options={{
        data: heatmapData
      }}
    />
  </GoogleMap>
  </ScriptLoaded>
```
