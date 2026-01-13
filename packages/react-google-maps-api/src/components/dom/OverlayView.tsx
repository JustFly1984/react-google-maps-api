import { memo, useContext, useEffect, useMemo, type ComponentType, type ReactNode } from 'react';
import * as ReactDOM from 'react-dom';

import { MapContext } from '../../map-context.js';

import { createOverlay } from './Overlay.js';

export type PaneNames = keyof google.maps.MapPanes;

export type OverlayViewProps = {
  children?: ReactNode | undefined;
  mapPaneName: PaneNames;
  position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  getPixelPositionOffset?:
    | ((offsetWidth: number, offsetHeight: number) => { x: number; y: number })
    | undefined;
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined;
  zIndex?: number | undefined;
  onLoad?: ((overlayView: google.maps.OverlayView) => void) | undefined;
  onUnmount?: ((overlayView: google.maps.OverlayView) => void) | undefined;
};

export const FLOAT_PANE: PaneNames = `floatPane`;
export const MAP_PANE: PaneNames = `mapPane`;
export const MARKER_LAYER: PaneNames = `markerLayer`;
export const OVERLAY_LAYER: PaneNames = `overlayLayer`;
export const OVERLAY_MOUSE_TARGET: PaneNames = `overlayMouseTarget`;

function OverlayViewFunctional({
  position,
  bounds,
  mapPaneName,
  zIndex,
  onLoad,
  onUnmount,
  getPixelPositionOffset,
  children,
}: OverlayViewProps) {
  const map = useContext(MapContext);
  const container = useMemo(() => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    return div;
  }, []);

  const overlay = useMemo(() => {
    return createOverlay(container, mapPaneName, position, bounds, getPixelPositionOffset);
  }, [container, mapPaneName, position, bounds]);

  useEffect(() => {
    onLoad?.(overlay);
    overlay?.setMap(map);
    return () => {
      onUnmount?.(overlay);
      overlay?.setMap(null);
    };
  }, [map, overlay]);

  useEffect(() => {
    container.style.zIndex = `${zIndex}`;
  }, [zIndex, container]);

  return ReactDOM.createPortal(children, container);
}

export const OverlayViewF: ComponentType<OverlayViewProps> = memo(OverlayViewFunctional);

export const OverlayView = OverlayViewF;
