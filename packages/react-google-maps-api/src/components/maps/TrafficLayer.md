# TrafficLayer example

```jsx
const { GoogleMap, LoadScript, TrafficLayer } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id='bicycling-example'
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={14}
    center={{
      lat: 42.3726399,
      lng: -71.1096528
    }}
    onClick={(...args) => {
      console.log('onClick args: ', args)
    }}
  >
    <TrafficLayer />
  </GoogleMap>
</ScriptLoaded>
```
