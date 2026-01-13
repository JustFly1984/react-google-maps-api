import { memo, useContext, useEffect, useState, type ComponentType } from 'react';

import { MapContext } from '../../map-context.js';

export type CircleProps = {
  options?: google.maps.CircleOptions | undefined;
  center?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  radius?: number | undefined;
  draggable?: boolean | undefined;
  editable?: boolean | undefined;
  visible?: boolean | undefined;
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
  onCenterChanged?: (() => void) | undefined;
  onRadiusChanged?: (() => void) | undefined;
  onLoad?: ((circle: google.maps.Circle) => void) | undefined;
  onUnmount?: ((circle: google.maps.Circle) => void) | undefined;
};

const defaultOptions = {};

function CircleFunctional({
  options,
  center,
  radius,
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
  onCenterChanged,
  onRadiusChanged,
  onLoad,
  onUnmount,
}: CircleProps): null {
  const map = useContext<google.maps.Map | null>(MapContext);

  const [instance, setInstance] = useState<google.maps.Circle | null>(null);

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
  const [centerChangedListener, setCenterChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [radiusChangedListener, setRadiusChangedListener] =
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
    if (typeof radius === 'number' && instance !== null) {
      instance.setRadius(radius);
    }
  }, [instance, radius]);

  useEffect(() => {
    if (typeof center !== 'undefined' && instance !== null) {
      instance.setCenter(center);
    }
  }, [instance, center]);

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
    if (instance && onCenterChanged) {
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener);
      }

      setCenterChangedListener(
        google.maps.event.addListener(instance, 'center_changed', onCenterChanged),
      );
    }
  }, [onClick]);

  useEffect(() => {
    if (instance && onRadiusChanged) {
      if (radiusChangedListener !== null) {
        google.maps.event.removeListener(radiusChangedListener);
      }

      setRadiusChangedListener(
        google.maps.event.addListener(instance, 'radius_changed', onRadiusChanged),
      );
    }
  }, [onRadiusChanged]);

  useEffect(() => {
    const circle = new google.maps.Circle({
      ...(options || defaultOptions),
      map,
    });

    if (typeof radius === 'number') {
      circle.setRadius(radius);
    }

    if (typeof center !== 'undefined') {
      circle.setCenter(center);
    }

    if (typeof radius === 'number') {
      circle.setRadius(radius);
    }

    if (typeof visible !== 'undefined') {
      circle.setVisible(visible);
    }

    if (typeof editable !== 'undefined') {
      circle.setEditable(editable);
    }

    if (typeof draggable !== 'undefined') {
      circle.setDraggable(draggable);
    }

    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(circle, 'dblclick', onDblClick));
    }

    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(circle, 'dragend', onDragEnd));
    }

    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(circle, 'dragstart', onDragStart));
    }

    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(circle, 'mousedown', onMouseDown));
    }

    if (onMouseMove) {
      setMousemoveListener(google.maps.event.addListener(circle, 'mousemove', onMouseMove));
    }

    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(circle, 'mouseout', onMouseOut));
    }

    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(circle, 'mouseover', onMouseOver));
    }

    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(circle, 'mouseup', onMouseUp));
    }

    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(circle, 'rightclick', onRightClick));
    }

    if (onClick) {
      setClickListener(google.maps.event.addListener(circle, 'click', onClick));
    }

    if (onDrag) {
      setDragListener(google.maps.event.addListener(circle, 'drag', onDrag));
    }

    if (onCenterChanged) {
      setCenterChangedListener(
        google.maps.event.addListener(circle, 'center_changed', onCenterChanged),
      );
    }

    if (onRadiusChanged) {
      setRadiusChangedListener(
        google.maps.event.addListener(circle, 'radius_changed', onRadiusChanged),
      );
    }

    setInstance(circle);

    if (onLoad) {
      onLoad(circle);
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

      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener);
      }

      if (radiusChangedListener !== null) {
        google.maps.event.removeListener(radiusChangedListener);
      }

      if (onUnmount) {
        onUnmount(circle);
      }

      circle.setMap(null);
    };
  }, []);

  return null;
}

export const CircleF: ComponentType<CircleProps> = memo<CircleProps>(CircleFunctional);

export const Circle = CircleF;
