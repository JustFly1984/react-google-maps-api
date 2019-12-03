# OverlayView example

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: 35.772,
  lng: -120.214
}

<ScriptLoaded>
  <GoogleMap
    id="overlay-view-example"
    mapContainerStyle={mapContainerStyle}
    zoom={11}
    center={center}
  >
    <OverlayView
      position={center}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        style={{
          background: `white`,
          border: `1px solid #ccc`,
          padding: 15
        }}
      >
        <h1>OverlayView</h1>

        <button
          onClick={() => {
            console.info('I have been clicked!')
          }}
          type='button'
        >
          Click me
        </button>
      </div>
    </OverlayView>
  </GoogleMap>
</ScriptLoaded>
```
