import React, { type CSSProperties, memo, useMemo } from "react";

import { GoogleMap, HeatmapLayer } from "@react-google-maps/api";

const center: google.maps.LatLngLiteral = {
  lat: 37.774546,
  lng: -122.433523,
};

const onClick = (e: google.maps.MapMouseEvent) => {
  console.log("onClick args: ", e);
};

type Props = {
  styles: {
    container: CSSProperties | undefined;
  };
};

function ExampleHeatmap({ styles }: Props): React.JSX.Element {
  const data = useMemo(() => {
    return [
      new google.maps.LatLng(37.782, -122.447),
      new google.maps.LatLng(37.782, -122.445),
      new google.maps.LatLng(37.782, -122.443),
      new google.maps.LatLng(37.782, -122.441),
      new google.maps.LatLng(37.782, -122.439),
      new google.maps.LatLng(37.782, -122.437),
      new google.maps.LatLng(37.782, -122.435),
      new google.maps.LatLng(37.785, -122.447),
      new google.maps.LatLng(37.785, -122.445),
      new google.maps.LatLng(37.785, -122.443),
      new google.maps.LatLng(37.785, -122.441),
      new google.maps.LatLng(37.785, -122.439),
      new google.maps.LatLng(37.785, -122.437),
      new google.maps.LatLng(37.785, -122.435),
    ];
  }, []);

  return (
    <div className="map">
      <div className="map-container">
        <GoogleMap
          id="heatmap-example"
          mapContainerStyle={styles.container}
          zoom={13}
          center={center}
          onClick={onClick}
        >
          <HeatmapLayer data={data} />
        </GoogleMap>
      </div>
    </div>
  );
}

export default memo(ExampleHeatmap);
