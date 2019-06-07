# StreetViewPanorama example

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
    zoom={7}
    center={{
      lat:  51.5320665,
      lng: -0.177203
    }}
  >
    <StreetViewPanorama
      position={{
        lat:  51.5320665,
        lng: -0.177203
      }}
      visible={true}
    />
  </GoogleMap>
</ScriptLoaded>
```
