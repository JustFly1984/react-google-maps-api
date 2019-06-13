# StreetViewService example

Look at the console.log to see request results


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
    zoom={14}
    center={{
      lat: 37.869085,
      lng: -122.254775
    }}
  >
    <StreetViewService
      onLoad={(streetViewService) => {
        streetViewService.getPanorama({
          location: {lat: 37.869085, lng: -122.254775}, radius: 50
        }, (data, status) => console.log(
          "StreetViewService results",
          { data, status }
        ))
      }}
    />
  </GoogleMap>
</ScriptLoaded>
```
