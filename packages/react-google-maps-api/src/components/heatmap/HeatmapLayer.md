# HeatmapLayer example

```jsx
const { GoogleMap, LoadScript, HeatmapLayer } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    // optional
    id="rectangle-example"
    // required to set height and width either through mapContainerClassName, either through mapContainerStyle prop
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    // required
    zoom={2.5}
    // required
    center={{
      lat: 37.774546,
      lng: -122.433523
    }}
  >
    <HeatmapLayer
      // optional
      onLoad={heatmapLayer => {
        console.log('HeatmapLayer onLoad heatmapLayer: ', heatmapLayer)
      }}
      // optional
      onUnmount={heatmapLayer => {
        console.log('HeatmapLayer onUnmount heatmapLayer: ', heatmapLayer)
      }}
      // required
      data={[{
        lat: 37.782,
        lng: -122.447,
      },
      {
        lat: 37.782,
        lng: -122.445
      },
      {
        lat: 37.782,
        lng: -122.443
      },
      {
        lat: 37.782,
        lng: -122.441
      },
      {
        lat: 37.782,
        lng: -122.439
      },
      {
        lat: 37.782,
        lng: -122.437
      },
      {
        lat: 37.782,
        lng: -122.435
      },
      {
        lat: 37.785,
        lng: -122.447
      },
      {
        lat: 37.785,
        lng: -122.445
      },
      {
        lat: 37.785,
        lng: -122.443
      },
      {
        lat: 37.785,
        lng: -122.441
      },
      {
        lat: 37.785,
        lng: -122.439
      },
      {
        lat: 37.785,
        lng: -122.437
      },
      {
        lat: 37.785,
        lng: -122.435
      }]}
    />
  </GoogleMap>
  </ScriptLoaded>
```
