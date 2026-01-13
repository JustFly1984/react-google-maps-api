/* global google */
import { memo, useContext, useEffect, useState, type ComponentType } from 'react';

import { MapContext } from '../../map-context.js';

export type PolygonProps = {
  options?: google.maps.PolygonOptions | undefined;
  draggable?: boolean | undefined;
  editable?: boolean | undefined;
  visible?: boolean | undefined;
  path?:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.LatLng[]
    | google.maps.LatLngLiteral[]
    | undefined;
  paths?:
    | google.maps.MVCArray<google.maps.LatLng>
    | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>
    | google.maps.LatLng[]
    | google.maps.LatLng[][]
    | google.maps.LatLngLiteral[]
    | google.maps.LatLngLiteral[][]
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
  onLoad?: ((polygon: google.maps.Polygon) => void) | undefined;
  onUnmount?: ((polygon: google.maps.Polygon) => void) | undefined;
  onEdit?: ((polygon: google.maps.Polygon) => void) | undefined;
};

function PolygonFunctional({
  options,
  draggable,
  editable,
  visible,
  path,
  paths,
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
  onEdit,
}: PolygonProps): null {
  const map = useContext<google.maps.Map | null>(MapContext);

  const [instance, setInstance] = useState<google.maps.Polygon | null>(null);

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
    if (typeof paths !== 'undefined' && instance !== null) {
      instance.setPaths(paths);
    }
  }, [instance, paths]);

  useEffect(() => {
    if (instance && typeof onDblClick === 'function') {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }

      setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
    }
  }, [onDblClick]);

  useEffect(() => {
    if (!instance) {
      return;
    }

    google.maps.event.addListener(instance.getPath(), 'insert_at', () => {
      onEdit?.(instance);
    });

    google.maps.event.addListener(instance.getPath(), 'set_at', () => {
      onEdit?.(instance);
    });

    google.maps.event.addListener(instance.getPath(), 'remove_at', () => {
      onEdit?.(instance);
    });
  }, [instance, onEdit]);

  useEffect(() => {
    if (instance && typeof onDragEnd === 'function') {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener);
      }

      setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
    }
  }, [onDragEnd]);

  useEffect(() => {
    if (instance && typeof onDragStart === 'function') {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener);
      }

      setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
    }
  }, [onDragStart]);

  useEffect(() => {
    if (instance && typeof onMouseDown === 'function') {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener);
      }

      setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
    }
  }, [onMouseDown]);

  useEffect(() => {
    if (instance && typeof onMouseMove === 'function') {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener);
      }

      setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
    }
  }, [onMouseMove]);

  useEffect(() => {
    if (instance && typeof onMouseOut === 'function') {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }

      setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
    }
  }, [onMouseOut]);

  useEffect(() => {
    if (instance && typeof onMouseOver === 'function') {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }

      setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
    }
  }, [onMouseOver]);

  useEffect(() => {
    if (instance && typeof onMouseUp === 'function') {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener);
      }

      setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
    }
  }, [onMouseUp]);

  useEffect(() => {
    if (instance && typeof onRightClick === 'function') {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener);
      }

      setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
    }
  }, [onRightClick]);

  useEffect(() => {
    if (instance && typeof onClick === 'function') {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }

      setClickListener(google.maps.event.addListener(instance, 'click', onClick));
    }
  }, [onClick]);

  useEffect(() => {
    if (instance && typeof onDrag === 'function') {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }

      setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
    }
  }, [onDrag]);

  useEffect(() => {
    const polygon = new google.maps.Polygon({
      ...options,
      map,
    });

    if (path) {
      polygon.setPath(path);
    }

    if (paths) {
      polygon.setPaths(paths);
    }

    if (typeof visible !== 'undefined') {
      polygon.setVisible(visible);
    }

    if (typeof editable !== 'undefined') {
      polygon.setEditable(editable);
    }

    if (typeof draggable !== 'undefined') {
      polygon.setDraggable(draggable);
    }

    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(polygon, 'dblclick', onDblClick));
    }

    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(polygon, 'dragend', onDragEnd));
    }

    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(polygon, 'dragstart', onDragStart));
    }

    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(polygon, 'mousedown', onMouseDown));
    }

    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(polygon, 'mousemove', onMouseMove));
    }

    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(polygon, 'mouseout', onMouseOut));
    }

    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(polygon, 'mouseover', onMouseOver));
    }

    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(polygon, 'mouseup', onMouseUp));
    }

    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(polygon, 'rightclick', onRightClick));
    }

    if (onClick) {
      setClickListener(google.maps.event.addListener(polygon, 'click', onClick));
    }

    if (onDrag) {
      setDragListener(google.maps.event.addListener(polygon, 'drag', onDrag));
    }

    setInstance(polygon);

    if (onLoad) {
      onLoad(polygon);
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
        onUnmount(polygon);
      }

      polygon.setMap(null);
    };
  }, []);

  return null;
}

export const PolygonF: ComponentType<PolygonProps> = memo<PolygonProps>(PolygonFunctional);

export const Polygon = PolygonF;
