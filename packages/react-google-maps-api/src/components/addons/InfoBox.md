# InfoBox example

```jsx
const { GoogleMap, LoadScript, InfoBox } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id="InfoBox-example"
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
    <InfoBox
      onLoad={infoBox => {
        console.log('infoBox: ', infoBox)
      }}
      options={{ closeBoxURL: '', enableEventPropagation: true }}
      position={{lat: 33.772, lng: -117.214}}
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
