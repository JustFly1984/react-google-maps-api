# Google Map example

```jsx
const { GoogleMap, LoadScript } = require("./");
const ScriptLoaded = require("./docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id="circle-example"
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={7}
    center={{
      lat: -3.745,
      lng: -38.523
    }}
  />
</ScriptLoaded>;
```
