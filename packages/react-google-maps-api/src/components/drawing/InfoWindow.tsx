/* global google */
import invariant from 'invariant';
import {
  Children,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type ReactPortal,
} from 'react';
import { createPortal } from 'react-dom';

import { MapContext } from '../../map-context.js';

export type InfoWindowProps = {
  children?: ReactNode | undefined;
  anchor?: google.maps.MVCObject | undefined;
  options?: google.maps.InfoWindowOptions | undefined;
  zIndex?: number | undefined;
  position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  onCloseClick?: (() => void) | undefined;
  onDomReady?: (() => void) | undefined;
  onContentChanged?: (() => void) | undefined;
  onPositionChanged?: (() => void) | undefined;
  onZindexChanged?: (() => void) | undefined;
  onLoad?: ((infoWindow: google.maps.InfoWindow) => void) | undefined;
  onUnmount?: ((infoWindow: google.maps.InfoWindow) => void) | undefined;
};

function InfoWindowFunctional({
  children,
  anchor,
  options,
  position,
  zIndex,
  onCloseClick,
  onDomReady,
  onContentChanged,
  onPositionChanged,
  onZindexChanged,
  onLoad,
  onUnmount,
}: InfoWindowProps): ReactPortal | null {
  const map = useContext<google.maps.Map | null>(MapContext);

  const [instance, setInstance] = useState<google.maps.InfoWindow | null>(null);

  const [closeclickListener, setCloseClickListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [domreadyclickListener, setDomReadyClickListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [contentchangedclickListener, setContentChangedClickListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [positionchangedclickListener, setPositionChangedClickListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [zindexchangedclickListener, setZindexChangedClickListener] =
    useState<google.maps.MapsEventListener | null>(null);

  const containerElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (instance !== null) {
      instance.close();

      if (anchor) {
        instance.open(map, anchor);
      } else if (instance.getPosition()) {
        instance.open(map);
      }
    }
  }, [map, instance, anchor]);

  useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);

  useEffect(() => {
    if (position && instance !== null) {
      instance.setPosition(position);
    }
  }, [position]);

  useEffect(() => {
    if (typeof zIndex === 'number' && instance !== null) {
      instance.setZIndex(zIndex);
    }
  }, [zIndex]);

  useEffect(() => {
    if (instance && onCloseClick) {
      if (closeclickListener !== null) {
        google.maps.event.removeListener(closeclickListener);
      }

      setCloseClickListener(google.maps.event.addListener(instance, 'closeclick', onCloseClick));
    }
  }, [onCloseClick]);

  useEffect(() => {
    if (instance && onDomReady) {
      if (domreadyclickListener !== null) {
        google.maps.event.removeListener(domreadyclickListener);
      }

      setDomReadyClickListener(google.maps.event.addListener(instance, 'domready', onDomReady));
    }
  }, [onDomReady]);

  useEffect(() => {
    if (instance && onContentChanged) {
      if (contentchangedclickListener !== null) {
        google.maps.event.removeListener(contentchangedclickListener);
      }

      setContentChangedClickListener(
        google.maps.event.addListener(instance, 'content_changed', onContentChanged),
      );
    }
  }, [onContentChanged]);

  useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionchangedclickListener !== null) {
        google.maps.event.removeListener(positionchangedclickListener);
      }

      setPositionChangedClickListener(
        google.maps.event.addListener(instance, 'position_changed', onPositionChanged),
      );
    }
  }, [onPositionChanged]);

  useEffect(() => {
    if (instance && onZindexChanged) {
      if (zindexchangedclickListener !== null) {
        google.maps.event.removeListener(zindexchangedclickListener);
      }

      setZindexChangedClickListener(
        google.maps.event.addListener(instance, 'zindex_changed', onZindexChanged),
      );
    }
  }, [onZindexChanged]);

  useEffect(() => {
    const infoWindow = new google.maps.InfoWindow(options);

    setInstance(infoWindow);

    containerElementRef.current = document.createElement('div');

    if (onCloseClick) {
      setCloseClickListener(google.maps.event.addListener(infoWindow, 'closeclick', onCloseClick));
    }

    if (onDomReady) {
      setDomReadyClickListener(google.maps.event.addListener(infoWindow, 'domready', onDomReady));
    }

    if (onContentChanged) {
      setContentChangedClickListener(
        google.maps.event.addListener(infoWindow, 'content_changed', onContentChanged),
      );
    }

    if (onPositionChanged) {
      setPositionChangedClickListener(
        google.maps.event.addListener(infoWindow, 'position_changed', onPositionChanged),
      );
    }

    if (onZindexChanged) {
      setZindexChangedClickListener(
        google.maps.event.addListener(infoWindow, 'zindex_changed', onZindexChanged),
      );
    }

    infoWindow.setContent(containerElementRef.current);

    if (position) {
      infoWindow.setPosition(position);
    }

    if (zIndex) {
      infoWindow.setZIndex(zIndex);
    }

    if (anchor) {
      infoWindow.open(map, anchor);
    } else if (infoWindow.getPosition()) {
      infoWindow.open(map);
    } else {
      invariant(
        false,
        `You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.`,
      );
    }

    if (onLoad) {
      onLoad(infoWindow);
    }

    return () => {
      if (closeclickListener) {
        google.maps.event.removeListener(closeclickListener);
      }

      if (contentchangedclickListener) {
        google.maps.event.removeListener(contentchangedclickListener);
      }

      if (domreadyclickListener) {
        google.maps.event.removeListener(domreadyclickListener);
      }

      if (positionchangedclickListener) {
        google.maps.event.removeListener(positionchangedclickListener);
      }

      if (zindexchangedclickListener) {
        google.maps.event.removeListener(zindexchangedclickListener);
      }

      if (onUnmount) {
        onUnmount(infoWindow);
      }

      infoWindow.close();
    };
  }, []);

  return containerElementRef.current
    ? createPortal(Children.only(children), containerElementRef.current)
    : null;
}

export const InfoWindowF: ComponentType<InfoWindowProps> =
  memo<InfoWindowProps>(InfoWindowFunctional);

export const InfoWindow = InfoWindowF;
