```jsx
const { GoogleMap, LoadScript, Rectangle } = require("../../");
const WithApiKey = require("../../WithApiKey").default;

{console.log({GoogleMap, LoadScript, Rectangle, WithApiKey})}

<WithApiKey>
  {
    (apiKey) => (
      <LoadScript
        id="script-loader"
        googleMapsApiKey={apiKey}
        language={"en"}
        region={"EN"}
        version={"weekly"}
        libraries={[]}
        onLoad={() => console.log("script loaded")}
        loadingElement={<div>Loading...</div>}>

        <GoogleMap
          id="basic-map-example"
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

          <Rectangle
            bounds={{
              north: 38.685,
              south: 33.671,
              east: -115.234,
              west: -118.251
            }}
          />

        </GoogleMap>
      </LoadScript>
    )

}

</WithApiKey>

```