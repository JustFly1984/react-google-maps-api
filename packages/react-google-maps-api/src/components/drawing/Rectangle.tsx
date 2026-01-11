import { memo, useContext, useEffect, useState, type ComponentType } from 'react';

import { MapContext } from '../../map-context.js';

export type RectangleProps = {
  options?: google.maps.RectangleOptions | undefined;
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined;
  draggable?: boolean | undefined;
  editable?: boolean | undefined;
  visible?: boolean | undefined;
  clickable?: boolean | undefined;
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
  onBoundsChanged?: (() => void) | undefined;
  onLoad?: ((rectangle: google.maps.Rectangle) => void) | undefined;
  onUnmount?: ((rectangle: google.maps.Rectangle) => void) | undefined;
};

function RectangleFunctional({
  options,
  bounds,
  draggable,
  editable,
  visible,
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
  onBoundsChanged,
  onLoad,
  onUnmount,
}: RectangleProps): null {
  const map = useContext<google.maps.Map | null>(MapContext);

  const [instance, setInstance] = useState<google.maps.Rectangle | null>(null);

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
  const [rightClickListener, setRightClickListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [clickListener, setClickListener] = useState<google.maps.MapsEventListener | null>(null);
  const [dragListener, setDragListener] = useState<google.maps.MapsEventListener | null>(null);
  const [boundsChangedListener, setBoundsChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);

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
    if (typeof bounds !== 'undefined' && instance !== null) {
      instance.setBounds(bounds);
    }
  }, [instance, bounds]);

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
      if (rightClickListener !== null) {
        google.maps.event.removeListener(rightClickListener);
      }

      setRightClickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
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
    if (instance && onBoundsChanged) {
      if (boundsChangedListener !== null) {
        google.maps.event.removeListener(boundsChangedListener);
      }

      setBoundsChangedListener(
        google.maps.event.addListener(instance, 'bounds_changed', onBoundsChanged),
      );
    }
  }, [onBoundsChanged]);

  useEffect(() => {
    const rectangle = new google.maps.Rectangle({
      ...options,
      map,
    });

    if (typeof visible !== 'undefined') {
      rectangle.setVisible(visible);
    }

    if (typeof editable !== 'undefined') {
      rectangle.setEditable(editable);
    }

    if (typeof draggable !== 'undefined') {
      rectangle.setDraggable(draggable);
    }

    if (typeof bounds !== 'undefined') {
      rectangle.setBounds(bounds);
    }

    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(rectangle, 'dblclick', onDblClick));
    }

    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(rectangle, 'dragend', onDragEnd));
    }

    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(rectangle, 'dragstart', onDragStart));
    }

    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(rectangle, 'mousedown', onMouseDown));
    }

    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(rectangle, 'mousemove', onMouseMove));
    }

    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(rectangle, 'mouseout', onMouseOut));
    }

    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(rectangle, 'mouseover', onMouseOver));
    }

    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(rectangle, 'mouseup', onMouseUp));
    }

    if (onRightClick) {
      setRightClickListener(google.maps.event.addListener(rectangle, 'rightclick', onRightClick));
    }

    if (onClick) {
      setClickListener(google.maps.event.addListener(rectangle, 'click', onClick));
    }

    if (onDrag) {
      setDragListener(google.maps.event.addListener(rectangle, 'drag', onDrag));
    }

    if (onBoundsChanged) {
      setBoundsChangedListener(
        google.maps.event.addListener(rectangle, 'bounds_changed', onBoundsChanged),
      );
    }

    setInstance(rectangle);

    if (onLoad) {
      onLoad(rectangle);
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

      if (rightClickListener !== null) {
        google.maps.event.removeListener(rightClickListener);
      }

      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }

      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener);
      }

      if (boundsChangedListener !== null) {
        google.maps.event.removeListener(boundsChangedListener);
      }

      if (onUnmount) {
        onUnmount(rectangle);
      }

      rectangle.setMap(null);
    };
  }, []);

  return null;
}

export const RectangleF: ComponentType<RectangleProps> = memo<RectangleProps>(RectangleFunctional);

export const Rectangle = RectangleF;
