# StandaloneSearchBox example

Look at the console.log to see search results

Please do not forget to include "places" to libraries prop array on `<LoadingScript />`

```jsx
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const center = {
  lat: 38.685,
  lng: -115.234
};

function onLoad(ref) { return this.searchBox = ref; }

function onPlacesChanged() { 
  console.log(this.searchBox.getPlaces());
}

<ScriptLoaded>
  <GoogleMap
    id="searchbox-example"
    mapContainerStyle={mapContainerStyle}
    zoom={2.5}
    center={center}
  >
    <StandaloneSearchBox
      onLoad={onLoad}
      onPlacesChanged={
        onPlacesChanged
      }
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px"
        }}
      />
    </StandaloneSearchBox>
  </GoogleMap>
</ScriptLoaded>
```
