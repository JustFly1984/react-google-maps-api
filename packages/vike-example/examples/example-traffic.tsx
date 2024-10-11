import React, { type CSSProperties, memo } from "react";
import { GoogleMap, TrafficLayer } from "@react-google-maps/api";

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
};

const onClick = (e: google.maps.MapMouseEvent) => {
  console.log("onClick args: ", e);
};

type Props = {
  styles: {
    container: CSSProperties | undefined;
  };
};

function ExampleTraffic({ styles }: Props): React.JSX.Element {
  return (
    <div className="map">
      <div className="map-container">
        <GoogleMap id="traffic-example" mapContainerStyle={styles.container} zoom={2} center={center} onClick={onClick}>
          <TrafficLayer />
        </GoogleMap>
      </div>
    </div>
  );
}

export default memo(ExampleTraffic);
