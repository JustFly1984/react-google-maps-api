# Polygon example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = { lat: 24.886, lng: -70.268 }

const paths = [
  { lat: 25.774, lng: -80.19 },
  { lat: 18.466, lng: -66.118 },
  { lat: 32.321, lng: -64.757 },
  { lat: 25.774, lng: -80.19 }
]

const options = {
  fillColor: "lightblue",
  fillOpacity: 1,
  strokeColor: "red",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
}

const onLoad = polygon => {
  console.log("polygon: ", polygon);
}

<ScriptLoaded>
  <GoogleMap
    id="marker-example"
    mapContainerStyle={mapContainerStyle}
    zoom={5}
    center={center}
  >
    <Polygon
      onLoad={onLoad}
      paths={paths}
      options={options}
    />
  </GoogleMap>
</ScriptLoaded>;
```
