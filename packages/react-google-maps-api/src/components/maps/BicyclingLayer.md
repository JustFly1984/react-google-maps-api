# BicyclingLayer example

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

const onLoad = bicyclingLayer => {
  console.log('bicyclingLayer: ', bicyclingLayer)
}

<ScriptLoaded>
  <GoogleMap
    id='bicycling-example'
    mapContainerStyle={mapContainerStyle}
    zoom={14}
    center={center}
    onClick={onClick}
  >
    <BicyclingLayer
      onLoad={onLoad}
    />
  </GoogleMap>
</ScriptLoaded>
```
