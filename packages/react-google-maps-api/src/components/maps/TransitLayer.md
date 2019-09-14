# TransitLayer example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id='transit-example'
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
    <TransitLayer
      onLoad={transitLayer => {
        console.log('transitLayer: ', transitLayer)
      }}
    />
  </GoogleMap>
</ScriptLoaded>
