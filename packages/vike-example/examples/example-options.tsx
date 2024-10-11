import React, { type CSSProperties, memo } from "react";
import { GoogleMap } from "@react-google-maps/api";

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
};

// Reference for options:
// https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions

const options = {
  streetViewControl: false,
};

const onClick = (e: google.maps.MapMouseEvent) => {
  console.log("onClick args: ", e);
};

type Props = {
  styles: {
    container: CSSProperties | undefined;
  };
};

function ExampleOptions({ styles }: Props): React.JSX.Element {
  return (
    <div className="map">
      <div className="map-container">
        <GoogleMap
          id="options-example"
          mapContainerStyle={styles.container}
          zoom={2}
          center={center}
          options={options}
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default memo(ExampleOptions);
