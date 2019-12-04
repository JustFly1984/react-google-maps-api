# InfoBox example

```jsx
const { GoogleMap, LoadScript, InfoBox } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const center = {
  lat: 33.772,
  lng: -117.214
};

const options = { closeBoxURL: '', enableEventPropagation: true };

const onLoad = infoBox => {
  console.log('infoBox: ', infoBox)
};

<ScriptLoaded>
  <GoogleMap
    id="InfoBox-example"
    mapContainerStyle={mapContainerStyle}
    zoom={10}
    center={center}
  >
    <InfoBox
      onLoad={onLoad}
      options={options}
      position={center}
    >
      <div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: 12 }}>
        <div style={{ fontSize: 16, fontColor: `#08233B` }}>
          Hello, World!
        </div>
      </div>
    </InfoBox>
  </GoogleMap>
</ScriptLoaded>
```
