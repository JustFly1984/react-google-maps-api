# TrafficLayer example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: 42.3726399,
  lng: -71.1096528
}

const onClick = (...args) => {
  console.log('onClick args: ', args)
}

const onLoad = trafficLayer => {
  console.log('trafficLayer: ', trafficLayer)
}

<ScriptLoaded>
  <GoogleMap
    id='bicycling-example'
    mapContainerStyle={mapContainerStyle}
    zoom={14}
    center={center}
    onClick={onClick}
  >
    <TrafficLayer
      onLoad={onLoad}
    />
  </GoogleMap>
</ScriptLoaded>
```
