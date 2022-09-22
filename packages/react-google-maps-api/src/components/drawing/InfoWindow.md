# InfoWindow example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: 38.685,
  lng: -115.234
}

const position = { lat: 33.772, lng: -117.214 }

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15
}

const onLoad = infoWindow => {
  console.log('infoWindow: ', infoWindow)
}

<ScriptLoaded>
  <GoogleMap
    id="InfoWindow-example"
    mapContainerStyle={mapContainerStyle}
    zoom={10}
    center={center}
  >

    <InfoWindowF
      onLoad={onLoad}
      position={position}
    >
      <div style={divStyle}>
        <h1>InfoWindow</h1>
      </div>
    </InfoWindowF>

  </GoogleMap>
</ScriptLoaded>
```
