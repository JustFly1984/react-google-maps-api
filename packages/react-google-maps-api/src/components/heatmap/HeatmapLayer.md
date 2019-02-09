```jsx
const { GoogleMap, LoadScript, HeatmapLayer } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id="HeatmapLayer-example"
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={13}
    center={{
      lat:37.774546, lng:-122.433523
    }}
    mapTypeId="satellite"
  >

    <HeatmapLayer
      data={[
  {lat:37.782, lng:-122.447},
  {lat:37.782, lng:-122.445},
  {lat:37.782, lng:-122.443},
  {lat:37.782, lng:-122.441},
  {lat:37.782, lng:-122.439},
  {lat:37.782, lng:-122.437},
  {lat:37.782, lng:-122.435},
  {lat:37.785, lng:-122.447},
  {lat:37.785, lng:-122.445},
  {lat:37.785, lng:-122.443},
  {lat:37.785, lng:-122.441},
  {lat:37.785, lng:-122.439},
  {lat:37.785, lng:-122.437},
  {lat:37.785, lng:-122.435}
]}
    />

  </GoogleMap>
  </ScriptLoaded>
```