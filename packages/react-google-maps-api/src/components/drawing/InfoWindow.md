# InfoWindow example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id="InfoWindow-example"
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={10}
    center={{
      lat: 33.772,
      lng: -117.214
    }}
  >

    <InfoWindow
      onLoad={infoWindow => {
        console.log('infoWindow: ', infoWindow)
      }}
      position={{lat: 33.772, lng: -117.214}}
    >
      <div style={{
        background: `white`,
        border: `1px solid #ccc`,
        padding: 15
      }}>
        <h1>InfoWindow</h1>
      </div>
    </InfoWindow>

  </GoogleMap>
</ScriptLoaded>
```
