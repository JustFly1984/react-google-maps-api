import React, { type CSSProperties, memo } from "react";
import { GoogleMap, DrawingManager } from "@react-google-maps/api";

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
};

type Props = {
  styles: {
    container: CSSProperties | undefined;
  };
};

function ExampleDrawing({ styles }: Props): React.JSX.Element {
  return (
    <div className="map">
      <div className="map-container">
        <GoogleMap id="drawing-example" mapContainerStyle={styles.container} zoom={2} center={center}>
          <DrawingManager />
        </GoogleMap>
      </div>
    </div>
  );
}

export default memo(ExampleDrawing);
