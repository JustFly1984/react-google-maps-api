# StreetViewService example

Look at the console.log to see request results


```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const center = {
  lat: 37.869085,
  lng: -122.254775
};

const onLoad = (streetViewService) => {
  streetViewService.getPanorama({
    location: center, 
    radius: 50
  }, (data, status) => console.log(
    "StreetViewService results",
    { data, status }
  ))
};

<ScriptLoaded>
  <GoogleMap
    id="circle-example"
    mapContainerStyle={mapContainerStyle}
    zoom={14}
    center={center}
  >
    <StreetViewService
      onLoad={onLoad}
    />
  </GoogleMap>
</ScriptLoaded>
```
