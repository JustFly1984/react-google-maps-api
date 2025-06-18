# Marker example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: 0,
  lng: -180
}

const position = {
  lat: 37.772,
  lng: -122.214
}

const onLoad = marker => {
  console.log('marker: ', marker)
}

<ScriptLoaded>
  <GoogleMap
    id="marker-example"
    mapContainerStyle={mapContainerStyle}
    zoom={2}
    center={center}
  >
    <MarkerF
      onLoad={onLoad}
      position={position}
    />
  </GoogleMap>
</ScriptLoaded>
```

## Custom Marker icon Example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;


const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const centers = [{
  lat: 37.772,
  lng: -122.214
},
{
  lat: 37.672,
  lng: -122.219
},
{
  lat: 37.832,
  lng: -122.424
}];

<ScriptLoaded>
  <GoogleMap
    id="marker-example"
    mapContainerStyle={mapContainerStyle}
    zoom={2}
    center={centers[0]}
  >
    <MarkerF
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
      }}
      position={centers[0]}
    />

    <MarkerF
      icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
      position={centers[1]}
    />
    <MarkerF
      icon={{
        path:
          "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
        fillColor: "yellow",
        fillOpacity: 0.9,
        scale: 2,
        strokeColor: "gold",
        strokeWeight: 2,
      }}
      position={centers[2]}
    />
  </GoogleMap>
</ScriptLoaded>
```

## Custom React Svg Marker Example

```jsx
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;


const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const centers = [{
  lat: 37.772,
  lng: -122.214
}];

/* Using a React component is not obligatory, you can use a simple function that returns a svg string 
   if you don't want to use renderToStaticMarkup and "react-dom/server" */
function SvgCircleMarker() {
  /* Your component logic here */
  return (
    <svg viewBox="0 0 102 102">
      <circle cx="51" cy="51" r="50" fill="powderblue" stroke="#333" />
    </svg>
  );
};

const markerSvgString = encodeURIComponent(
  renderToStaticMarkup(<SvgCircleMarker />)
);

const markerDataUri = `data:image/svg+xml,${markerSvgString}`;
/* If you want to optimize your svgs, don't hesitate to use https://github.com/tigt/mini-svg-data-uri */

<ScriptLoaded>
  <GoogleMap
    id="react-marker-example"
    mapContainerStyle={mapContainerStyle}
    zoom={2}
    center={centers[0]}
  >
    <MarkerF
      icon={markerDataUri}
      position={centers[0]}
    />
  </GoogleMap>
</ScriptLoaded>
```
