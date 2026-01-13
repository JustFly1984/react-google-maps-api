import type { MarkerClusterer as GoogleClusterer } from '@googlemaps/markerclusterer';
import type { Clusterer } from '@react-google-maps/marker-clusterer';
import {
  Children,
  cloneElement,
  isValidElement,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type JSX,
  type ReactElement,
  type ReactNode,
} from 'react';

import { MapContext } from '../../map-context.js';
import type { HasMarkerAnchor } from '../../types.js';

export type MarkerProps = {
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  children?: ReactNode | undefined;
  options?: google.maps.MarkerOptions | undefined;
  animation?: google.maps.Animation | undefined;
  clickable?: boolean | undefined;
  cursor?: string | undefined;
  draggable?: boolean | undefined;
  icon?: string | google.maps.Icon | google.maps.Symbol | undefined;
  label?: string | google.maps.MarkerLabel | undefined;
  opacity?: number | undefined;
  shape?: google.maps.MarkerShape | undefined;
  title?: string | undefined;
  visible?: boolean | undefined;
  zIndex?: number | undefined;
  clusterer?: Clusterer | GoogleClusterer | undefined;
  noClustererRedraw?: boolean | undefined;
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onClickableChanged?: (() => void) | undefined;
  onCursorChanged?: (() => void) | undefined;
  onAnimationChanged?: (() => void) | undefined;
  onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onDrag?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onDragEnd?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onDraggableChanged?: (() => void) | undefined;
  onDragStart?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onFlatChanged?: (() => void) | undefined;
  onIconChanged?: (() => void) | undefined;
  onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onPositionChanged?: (() => void) | undefined;
  onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  onShapeChanged?: (() => void) | undefined;
  onTitleChanged?: (() => void) | undefined;
  onVisibleChanged?: (() => void) | undefined;
  onZindexChanged?: (() => void) | undefined;
  onLoad?: ((marker: google.maps.Marker) => void) | undefined;
  onUnmount?: ((marker: google.maps.Marker) => void) | undefined;
};

const defaultOptions = {};

function MarkerFunctional({
  position,
  options,
  clusterer,
  noClustererRedraw,

  children,

  draggable,
  visible,
  animation,
  clickable,
  cursor,
  icon,
  label,
  opacity,
  shape,
  title,
  zIndex,
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onMouseDown,
  onRightClick,
  onClickableChanged,
  onCursorChanged,
  onAnimationChanged,
  onDraggableChanged,
  onFlatChanged,
  onIconChanged,
  onPositionChanged,
  onShapeChanged,
  onTitleChanged,
  onVisibleChanged,
  onZindexChanged,
  onLoad,
  onUnmount,
}: MarkerProps): JSX.Element | null {
  const map = useContext<google.maps.Map | null>(MapContext);

  const [instance, setInstance] = useState<google.maps.Marker | null>(null);

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

  const [clickableChangedListener, setClickableChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [cursorChangedListener, setCursorChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [animationChangedListener, setAnimationChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [draggableChangedListener, setDraggableChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [flatChangedListener, setFlatChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [iconChangedListener, setIconChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [positionChangedListener, setPositionChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [shapeChangedListener, setShapeChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [titleChangedListener, setTitleChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [visibleChangedListener, setVisibleChangedListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [zIndexChangedListener, setZindexChangedListener] =
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
    if (position && instance !== null) {
      instance.setPosition(position);
    }
  }, [instance, position]);

  useEffect(() => {
    if (typeof visible !== 'undefined' && instance !== null) {
      instance.setVisible(visible);
    }
  }, [instance, visible]);

  useEffect(() => {
    instance?.setAnimation(animation);
  }, [instance, animation]);

  useEffect(() => {
    if (instance && typeof clickable !== 'undefined') {
      instance.setClickable(clickable);
    }
  }, [instance, clickable]);

  useEffect(() => {
    if (instance && typeof cursor !== 'undefined') {
      instance.setCursor(cursor);
    }
  }, [instance, cursor]);

  useEffect(() => {
    if (instance && typeof icon !== 'undefined') {
      instance.setIcon(icon);
    }
  }, [instance, icon]);

  useEffect(() => {
    if (instance && typeof label !== 'undefined') {
      instance.setLabel(label);
    }
  }, [instance, label]);

  useEffect(() => {
    if (instance && typeof opacity !== 'undefined') {
      instance.setOpacity(opacity);
    }
  }, [instance, opacity]);

  useEffect(() => {
    if (instance && typeof shape !== 'undefined') {
      instance.setShape(shape);
    }
  }, [instance, shape]);

  useEffect(() => {
    if (instance && typeof title !== 'undefined') {
      instance.setTitle(title);
    }
  }, [instance, title]);

  useEffect(() => {
    if (instance && typeof zIndex !== 'undefined') {
      instance.setZIndex(zIndex);
    }
  }, [instance, zIndex]);

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
    if (instance && onClickableChanged) {
      if (clickableChangedListener !== null) {
        google.maps.event.removeListener(clickableChangedListener);
      }

      setClickableChangedListener(
        google.maps.event.addListener(instance, 'clickable_changed', onClickableChanged),
      );
    }
  }, [onClickableChanged]);

  useEffect(() => {
    if (instance && onCursorChanged) {
      if (cursorChangedListener !== null) {
        google.maps.event.removeListener(cursorChangedListener);
      }

      setCursorChangedListener(
        google.maps.event.addListener(instance, 'cursor_changed', onCursorChanged),
      );
    }
  }, [onCursorChanged]);

  useEffect(() => {
    if (instance && onAnimationChanged) {
      if (animationChangedListener !== null) {
        google.maps.event.removeListener(animationChangedListener);
      }

      setAnimationChangedListener(
        google.maps.event.addListener(instance, 'animation_changed', onAnimationChanged),
      );
    }
  }, [onAnimationChanged]);

  useEffect(() => {
    if (instance && onDraggableChanged) {
      if (draggableChangedListener !== null) {
        google.maps.event.removeListener(draggableChangedListener);
      }

      setDraggableChangedListener(
        google.maps.event.addListener(instance, 'draggable_changed', onDraggableChanged),
      );
    }
  }, [onDraggableChanged]);

  useEffect(() => {
    if (instance && onFlatChanged) {
      if (flatChangedListener !== null) {
        google.maps.event.removeListener(flatChangedListener);
      }

      setFlatChangedListener(
        google.maps.event.addListener(instance, 'flat_changed', onFlatChanged),
      );
    }
  }, [onFlatChanged]);

  useEffect(() => {
    if (instance && onIconChanged) {
      if (iconChangedListener !== null) {
        google.maps.event.removeListener(iconChangedListener);
      }

      setIconChangedListener(
        google.maps.event.addListener(instance, 'icon_changed', onIconChanged),
      );
    }
  }, [onIconChanged]);

  useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionChangedListener !== null) {
        google.maps.event.removeListener(positionChangedListener);
      }

      setPositionChangedListener(
        google.maps.event.addListener(instance, 'position_changed', onPositionChanged),
      );
    }
  }, [onPositionChanged]);

  useEffect(() => {
    if (instance && onShapeChanged) {
      if (shapeChangedListener !== null) {
        google.maps.event.removeListener(shapeChangedListener);
      }

      setShapeChangedListener(
        google.maps.event.addListener(instance, 'shape_changed', onShapeChanged),
      );
    }
  }, [onShapeChanged]);

  useEffect(() => {
    if (instance && onTitleChanged) {
      if (titleChangedListener !== null) {
        google.maps.event.removeListener(titleChangedListener);
      }

      setTitleChangedListener(
        google.maps.event.addListener(instance, 'title_changed', onTitleChanged),
      );
    }
  }, [onTitleChanged]);

  useEffect(() => {
    if (instance && onVisibleChanged) {
      if (visibleChangedListener !== null) {
        google.maps.event.removeListener(visibleChangedListener);
      }

      setVisibleChangedListener(
        google.maps.event.addListener(instance, 'visible_changed', onVisibleChanged),
      );
    }
  }, [onVisibleChanged]);

  useEffect(() => {
    if (instance && onZindexChanged) {
      if (zIndexChangedListener !== null) {
        google.maps.event.removeListener(zIndexChangedListener);
      }

      setZindexChangedListener(
        google.maps.event.addListener(instance, 'zindex_changed', onZindexChanged),
      );
    }
  }, [onZindexChanged]);

  useEffect(() => {
    const markerOptions = {
      ...(options || defaultOptions),
      ...(clusterer ? defaultOptions : { map }),
      position,
    };

    const marker = new google.maps.Marker(markerOptions);

    if (clusterer) {
      clusterer.addMarker(marker, !!noClustererRedraw);
    } else {
      marker.setMap(map);
    }

    if (position) {
      marker.setPosition(position);
    }

    if (typeof visible !== 'undefined') {
      marker.setVisible(visible);
    }

    if (typeof draggable !== 'undefined') {
      marker.setDraggable(draggable);
    }

    if (typeof clickable !== 'undefined') {
      marker.setClickable(clickable);
    }

    if (typeof cursor === 'string') {
      marker.setCursor(cursor);
    }

    if (icon) {
      marker.setIcon(icon);
    }

    if (typeof label !== 'undefined') {
      marker.setLabel(label);
    }

    if (typeof opacity !== 'undefined') {
      marker.setOpacity(opacity);
    }

    if (shape) {
      marker.setShape(shape);
    }

    if (typeof title === 'string') {
      marker.setTitle(title);
    }

    if (typeof zIndex === 'number') {
      marker.setZIndex(zIndex);
    }

    if (onDblClick) {
      setDblclickListener(google.maps.event.addListener(marker, 'dblclick', onDblClick));
    }

    if (onDragEnd) {
      setDragendListener(google.maps.event.addListener(marker, 'dragend', onDragEnd));
    }

    if (onDragStart) {
      setDragstartListener(google.maps.event.addListener(marker, 'dragstart', onDragStart));
    }

    if (onMouseDown) {
      setMousedownListener(google.maps.event.addListener(marker, 'mousedown', onMouseDown));
    }

    if (onMouseOut) {
      setMouseoutListener(google.maps.event.addListener(marker, 'mouseout', onMouseOut));
    }

    if (onMouseOver) {
      setMouseoverListener(google.maps.event.addListener(marker, 'mouseover', onMouseOver));
    }

    if (onMouseUp) {
      setMouseupListener(google.maps.event.addListener(marker, 'mouseup', onMouseUp));
    }

    if (onRightClick) {
      setRightclickListener(google.maps.event.addListener(marker, 'rightclick', onRightClick));
    }

    if (onClick) {
      setClickListener(google.maps.event.addListener(marker, 'click', onClick));
    }

    if (onDrag) {
      setDragListener(google.maps.event.addListener(marker, 'drag', onDrag));
    }

    if (onClickableChanged) {
      setClickableChangedListener(
        google.maps.event.addListener(marker, 'clickable_changed', onClickableChanged),
      );
    }

    if (onCursorChanged) {
      setCursorChangedListener(
        google.maps.event.addListener(marker, 'cursor_changed', onCursorChanged),
      );
    }

    if (onAnimationChanged) {
      setAnimationChangedListener(
        google.maps.event.addListener(marker, 'animation_changed', onAnimationChanged),
      );
    }

    if (onDraggableChanged) {
      setDraggableChangedListener(
        google.maps.event.addListener(marker, 'draggable_changed', onDraggableChanged),
      );
    }

    if (onFlatChanged) {
      setFlatChangedListener(google.maps.event.addListener(marker, 'flat_changed', onFlatChanged));
    }

    if (onIconChanged) {
      setIconChangedListener(google.maps.event.addListener(marker, 'icon_changed', onIconChanged));
    }

    if (onPositionChanged) {
      setPositionChangedListener(
        google.maps.event.addListener(marker, 'position_changed', onPositionChanged),
      );
    }

    if (onShapeChanged) {
      setShapeChangedListener(
        google.maps.event.addListener(marker, 'shape_changed', onShapeChanged),
      );
    }

    if (onTitleChanged) {
      setTitleChangedListener(
        google.maps.event.addListener(marker, 'title_changed', onTitleChanged),
      );
    }

    if (onVisibleChanged) {
      setVisibleChangedListener(
        google.maps.event.addListener(marker, 'visible_changed', onVisibleChanged),
      );
    }

    if (onZindexChanged) {
      setZindexChangedListener(
        google.maps.event.addListener(marker, 'zindex_changed', onZindexChanged),
      );
    }

    setInstance(marker);

    if (onLoad) {
      onLoad(marker);
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

      if (clickableChangedListener !== null) {
        google.maps.event.removeListener(clickableChangedListener);
      }

      if (cursorChangedListener !== null) {
        google.maps.event.removeListener(cursorChangedListener);
      }

      if (animationChangedListener !== null) {
        google.maps.event.removeListener(animationChangedListener);
      }

      if (draggableChangedListener !== null) {
        google.maps.event.removeListener(draggableChangedListener);
      }

      if (flatChangedListener !== null) {
        google.maps.event.removeListener(flatChangedListener);
      }

      if (iconChangedListener !== null) {
        google.maps.event.removeListener(iconChangedListener);
      }

      if (positionChangedListener !== null) {
        google.maps.event.removeListener(positionChangedListener);
      }

      if (titleChangedListener !== null) {
        google.maps.event.removeListener(titleChangedListener);
      }

      if (visibleChangedListener !== null) {
        google.maps.event.removeListener(visibleChangedListener);
      }

      if (zIndexChangedListener !== null) {
        google.maps.event.removeListener(zIndexChangedListener);
      }

      if (onUnmount) {
        onUnmount(marker);
      }

      if (clusterer) {
        clusterer.removeMarker(marker, !!noClustererRedraw);
      } else if (marker) {
        marker.setMap(null);
      }
    };
  }, []);

  const chx = useMemo<ReactNode | null>(() => {
    return children
      ? Children.map(children, (child) => {
          if (!isValidElement<HasMarkerAnchor>(child)) {
            return child;
          }

          const elementChild: ReactElement<HasMarkerAnchor> = child;

          return cloneElement(elementChild, { anchor: instance });
        })
      : null;
  }, [children, instance]);

  return <>{chx}</> || null;
}

export const MarkerF: ComponentType<MarkerProps> = memo<MarkerProps>(MarkerFunctional);

export const Marker = MarkerF;
