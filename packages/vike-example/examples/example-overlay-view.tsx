import React, { memo, useState, useCallback, type CSSProperties } from "react";
import { MarkerF, GoogleMap, OverlayViewF, MARKER_LAYER, OVERLAY_MOUSE_TARGET } from "@react-google-maps/api";

const mapCenter: google.maps.LatLngLiteral = {
  lat: 0,
  lng: -180,
};

const contentStyles = {
  background: `white`,
  border: `1px solid #CCC`,
  padding: 15,
};

function centerOverlayView(width: number, height: number): { x: number; y: number } {
  return {
    x: -(width / 2),
    y: -(height / 2),
  };
}

type Props = {
  styles: {
    container: CSSProperties | undefined;
  };
};

function ExampleOverlayView({ styles }: Props): React.JSX.Element {
  const [isShown, setIsShown] = useState(false);

  const changeIsShown = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown]);

  const [overlayPane, setOverlayPane] = useState(OVERLAY_MOUSE_TARGET);

  const clickHandler = useCallback(() => {
    alert("You clicked overlay view");
  }, []);

  const [overlayPosition, setOverlayPosition] = useState(mapCenter);

  const randomOverlayPosition = useCallback(() => {
    setOverlayPosition({
      lat: mapCenter.lat + Math.random() * -10 + 20,
      lng: mapCenter.lng + Math.random() * -10 + 20,
    });
  }, []);

  const loadCallback = useCallback((overlayView: google.maps.OverlayView) => {
    console.log("OverlayView onLoad: ", overlayView);
  }, []);

  const unmountCallback = useCallback((overlayView: google.maps.OverlayView) => {
    console.log("OverlayView onUnmount", overlayView);
  }, []);

  const setToMarkerLayerPane = useCallback(() => {
    setOverlayPane(MARKER_LAYER);
  }, []);

  const setToMouseTargetPane = useCallback(() => {
    setOverlayPane(OVERLAY_MOUSE_TARGET);
  }, []);

  return (
    <div className="map">
      <div className="map-container">
        <GoogleMap id="traffic-example" mapContainerStyle={styles.container} zoom={2} center={mapCenter}>
          <MarkerF position={mapCenter} onClick={changeIsShown} />

          {isShown ? (
            <OverlayViewF
              position={overlayPosition}
              mapPaneName={overlayPane}
              onLoad={loadCallback}
              onUnmount={unmountCallback}
              getPixelPositionOffset={centerOverlayView}
            >
              <button type="button" style={contentStyles} onClick={clickHandler}>
                <h1>OverlayView</h1>
              </button>
            </OverlayViewF>
          ) : null}
        </GoogleMap>
      </div>

      <div className="form-group custom-control custom-radio">
        <input
          id="MARKER_LAYER"
          className="custom-control-input"
          type="radio"
          name="overlayPane"
          checked={overlayPane === MARKER_LAYER}
          onChange={setToMarkerLayerPane}
        />
        <label className="custom-control-label" htmlFor="MARKER_LAYER">
          Mount to markerLayer(can&apos;t receive DOM event)
        </label>
      </div>

      <div className="form-group custom-control custom-radio">
        <input
          id="OVERLAY_MOUSE_TARGET"
          className="custom-control-input"
          type="radio"
          name="overlayPane"
          checked={overlayPane === OVERLAY_MOUSE_TARGET}
          onChange={setToMouseTargetPane}
        />

        <label className="custom-control-label" htmlFor="OVERLAY_MOUSE_TARGET">
          Mount to overlay overlayMouseTarget
        </label>
      </div>

      <button className="btn btn-primary" type="button" onClick={randomOverlayPosition}>
        Change overlay position
      </button>
    </div>
  );
}

export default memo(ExampleOverlayView);
