# Circle example

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
      lat: -3.745,
      lng: -38.523
    }}
  >
    <Circle
      // optional
      onLoad={circle => {
        console.log('Circle onLoad circle: ', circle)
      }}
      // optional
      onUnmount={circle => {
        console.log('Circle onUnmount circle: ', circle)
      }}
      // required
      center={{
        lat: -3.745,
        lng: -38.523
      }}
      // required
      options={{
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 1
      }}
    />
  </GoogleMap>
</ScriptLoaded>
```
