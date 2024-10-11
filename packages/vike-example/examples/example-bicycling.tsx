import React, { type CSSProperties, memo } from "react";
import { GoogleMap, BicyclingLayer } from "@react-google-maps/api";

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
};

function onClick(e: google.maps.MapMouseEvent) {
  console.log("onClick args: ", e);
}

function onBicyclingLayerLoad(bicyclingLayer: google.maps.BicyclingLayer) {
  // Do something with bicyclingLayer
  console.log("bicyclingLayer: ", bicyclingLayer);
}

const onMapLoad = (map: google.maps.Map) => {
  console.log("map: ", map);
};

type Props = {
  styles: {
    container: CSSProperties | undefined;
  };
};

function ExampleBicycling({ styles }: Props): React.JSX.Element {
  return (
    <div className="map">
      <div className="map-container">
        <GoogleMap
          id="bicycling-example"
          mapContainerStyle={styles.container}
          zoom={2}
          center={center}
          onClick={onClick}
          onLoad={onMapLoad}
        >
          <BicyclingLayer onLoad={onBicyclingLayerLoad} />
        </GoogleMap>
      </div>
    </div>
  );
}

export default memo(ExampleBicycling);
