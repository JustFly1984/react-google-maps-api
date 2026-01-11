import { memo, useContext, useEffect, useState, type ComponentType } from 'react';

import { MapContext } from '../../map-context.js';

export type PolylineProps = {
  options?: google.maps.PolylineOptions | undefined;
  draggable?: boolean | undefined;
  editable?: boolean | undefined;
  visible?: boolean | undefined;
  path?:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.LatLng[]
    | google.maps.LatLngLiteral[]
    | undefined;
  onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onDragEnd?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onDragStart?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onMouseMove?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onLoad?: ((polyline: google.maps.Polyline) => void) | undefined;
  onUnmount?: ((polyline: google.maps.Polyline) => void) | undefined;
};

const defaultOptions = {};

function PolylineFunctional({
  options,
  draggable,
  editable,
  visible,
  path,
  onDblClick,
  onDragEnd,
  onDragStart,
  onMouseDown,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onRightClick,
  onClick,
  onDrag,
  onLoad,
  onUnmount,
}: PolylineProps): null {
  const map = useContext<google.maps.Map | null>(MapContext);

  const [instance, setInstance] = useState<google.maps.Polyline | null>(null);

  const [dblclickListener, setDblclickListener] = useState<google.maps.MapsEventListener | null>(
    null,
  );
  const [dragendListener, setDragendListener] = useState<google.maps.MapsEventListener | null>(
    null,
  );
  const [dragstartListener, setDragstartListener] = useState<google.maps.MapsEventListener | null>(
    null,
  );
  const [mousedownListener, setMousedownListener] = useState<google.maps.MapsEventListener | null>(
    null,
  );
  const [mousemoveListener, setMousemoveListener] = useState<google.maps.MapsEventListener | null>(
    null,
  );
  const [mouseoutListener, setMouseoutListener] = useState<google.maps.MapsEventListener | null>(
    null,
  );
  const [mouseoverListener, setMouseoverListener] = useState<google.maps.MapsEventListener | null>(
    null,
  );
  const [mouseupListener, setMouseupListener] = useState<google.maps.MapsEventListener | null>(
    null,
  );
  const [rightclickListener, setRightclickListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [clickListener, setClickListener] = useState<google.maps.MapsEventListener | null>(null);
  const [dragListener, setDragListener] = useState<google.maps.MapsEventListener | null>(null);

  useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);

  useEffect(() => {
    if (typeof options !== 'undefined' && instance !== null) {
      instance.setOptions(options);
    }
  }, [instance, options]);

  useEffect(() => {
    if (typeof draggable !== 'undefined' && instance !== null) {
      instance.setDraggable(draggable);
    }
  }, [instance, draggable]);

  useEffect(() => {
    if (typeof editable !== 'undefined' && instance !== null) {
      instance.setEditable(editable);
    }
  }, [instance, editable]);

  useEffect(() => {
    if (typeof visible !== 'undefined' && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);

  useEffect(() => {
    if (typeof path !== 'undefined' && instance !== null) {
      instance.setPath(path);
    }
  }, [instance, path]);

  useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }

      setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
    }
  }, [onDblClick]);

  useEffect(() => {
    if (instance && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }

      setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
    }
  }, [onDragEnd]);

  useEffect(() => {
    if (instance && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }

      setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
    }
  }, [onDragStart]);

  useEffect(() => {
    if (instance && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }

      setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
    }
  }, [onMouseDown]);

  useEffect(() => {
    if (instance && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }

      setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
    }
  }, [onMouseMove]);

  useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }

      setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
    }
  }, [onMouseOut]);

  useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }

      setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
    }
  }, [onMouseOver]);

  useEffect(() => {
    if (instance && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }

      setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
    }
  }, [onMouseUp]);

  useEffect(() => {
    if (instance && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }

      setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
    }
  }, [onRightClick]);

  useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }

      setClickListener(google.maps.event.addListener(instance, 'click', onClick));
    }
  }, [onClick]);

  useEffect(() => {
    if (instance && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }

      setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
    }
  }, [onDrag]);

  useEffect(() => {
    const polyline = new google.maps.Polyline({
      ...(options || defaultOptions),
      map,
    });

    if (path) {
      polyline.setPath(path);
    }

    if (typeof visible !== 'undefined') {
      polyline.setVisible(visible);
    }

    if (typeof editable !== 'undefined') {
      polyline.setEditable(editable);
    }

    if (typeof draggable !== 'undefined') {
      polyline.setDraggable(draggable);
    }

    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(polyline, 'dblclick', onDblClick));
    }

    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(polyline, 'dragend', onDragEnd));
    }

    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(polyline, 'dragstart', onDragStart));
    }

    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(polyline, 'mousedown', onMouseDown));
    }

    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(polyline, 'mousemove', onMouseMove));
    }

    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(polyline, 'mouseout', onMouseOut));
    }

    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(polyline, 'mouseover', onMouseOver));
    }

    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(polyline, 'mouseup', onMouseUp));
    }

    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(polyline, 'rightclick', onRightClick));
    }

    if (onClick) {
      setClickListener(google.maps.event.addListener(polyline, 'click', onClick));
    }

    if (onDrag) {
      setDragListener(google.maps.event.addListener(polyline, 'drag', onDrag));
    }

    setInstance(polyline);

    if (onLoad) {
      onLoad(polyline);
    }

    return () => {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }

      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }

      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }

      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }

      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }

      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }

      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }

      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }

      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }

      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }

      if (onUnmount) {
        onUnmount(polyline);
      }

      polyline.setMap(null);
    };
  }, []);

  return null;
}

export const PolylineF: ComponentType<PolylineProps> = memo<PolylineProps>(PolylineFunctional);

export const Polyline = PolylineF;
