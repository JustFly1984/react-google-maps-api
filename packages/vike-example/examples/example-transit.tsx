import React, { type CSSProperties, memo } from "react";
import { GoogleMap, TransitLayerF } from "@react-google-maps/api";

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
};

const onClick = (e: google.maps.MapMouseEvent) => {
  console.log("onClick args: ", e);
};

const onTransitLayerLoad = (transitLayer: google.maps.TransitLayer) => {
  // Do something with transitLayer
  console.log("transitLayer: ", transitLayer);
};

const onMapLoad = (map: google.maps.Map) => {
  console.log("map: ", map);
};

type Props = {
  styles: {
    container: CSSProperties | undefined;
  };
};

function ExampleTransit({ styles }: Props): React.JSX.Element {
  return (
    <div className="map">
      <div className="map-container">
        <GoogleMap
          id="transit-example"
          mapContainerStyle={styles.container}
          zoom={2}
          center={center}
          onClick={onClick}
          onLoad={onMapLoad}
        >
          <TransitLayerF onLoad={onTransitLayerLoad} />
        </GoogleMap>
      </div>
    </div>
  );
}

export default memo(ExampleTransit);
