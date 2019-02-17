# Autocomplete example

Look at the console.log to see search results

```jsx
const { GoogleMap, LoadScript, Autocomplete } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

<ScriptLoaded>
  <GoogleMap
    id="searchbox-example"
    mapContainerStyle={{
      height: "400px",
      width: "800px"
    }}
    zoom={2.5}
    center={{
      lat: 38.685,
      lng: -115.234
    }}
  >
    <Autocomplete
      ref={ref => (this.autocomplete = ref)}
      onPlacesChanged={() => console.log(this.autocomplete.getPlace())}
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
    </Autocomplete>
  </GoogleMap>
</ScriptLoaded>;
```
