# Polyline example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id="marker-example"
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={2}
    center={{
      lat: 0,
      lng: -180
    }}
  >
    <Polyline
      onLoad={polyline => {
        console.log('polyline: ', polyline)
      }}
      path={[
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}
      ]}
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
        paths: [
          {lat: 37.772, lng: -122.214},
          {lat: 21.291, lng: -157.821},
          {lat: -18.142, lng: 178.431},
          {lat: -27.467, lng: 153.027}
        ],
        zIndex: 1
      }}
    />
  </GoogleMap>
</ScriptLoaded>
```
