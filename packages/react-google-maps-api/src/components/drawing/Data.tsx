import { memo, useContext, useEffect, useState, type ComponentType } from 'react';

import { MapContext } from '../../map-context.js';

export type DataProps = {
  options?: google.maps.Data.DataOptions | undefined;
  /**  This event is fired for a click on the geometry. */
  onClick?: ((e: google.maps.Data.MouseEvent) => void) | undefined;
  /**  This event is fired for a double click on the geometry. */
  onDblClick?: ((e: google.maps.Data.MouseEvent) => void) | undefined;
  /**  This event is fired for a mousedown on the geometry. */
  onMouseDown?: ((e: google.maps.Data.MouseEvent) => void) | undefined;
  /** This event is fired when the DOM mousemove event is fired on the rectangle. */
  onMouseMove?: ((e: google.maps.Data.MouseEvent) => void) | undefined;
  /**  This event is fired when the mouse leaves the area of the geometry. */
  onMouseOut?: ((e: google.maps.Data.MouseEvent) => void) | undefined;
  /**  This event is fired when the mouse enters the area of the geometry. */
  onMouseOver?: ((e: google.maps.Data.MouseEvent) => void) | undefined;
  /**  This event is fired for a mouseup on the geometry. */
  onMouseUp?: ((e: google.maps.Data.MouseEvent) => void) | undefined;
  /**  This event is fired for a rightclick on the geometry. */
  onRightClick?: ((e: google.maps.Data.MouseEvent) => void) | undefined;
  /**  This event is fired when a feature is added to the collection. */
  onAddFeature?: ((e: google.maps.Data.AddFeatureEvent) => void) | undefined;
  /**  This event is fired when a feature is removed from the collection. */
  onRemoveFeature?: ((e: google.maps.Data.RemoveFeatureEvent) => void) | undefined;
  /**  This event is fired when a feature's property is removed. */
  onRemoveProperty?: ((e: google.maps.Data.RemovePropertyEvent) => void) | undefined;
  /**  This event is fired when a feature's geometry is set. */
  onSetGeometry?: ((e: google.maps.Data.SetGeometryEvent) => void) | undefined;
  /**  This event is fired when a feature's property is set. */
  onSetProperty?: ((e: google.maps.Data.SetPropertyEvent) => void) | undefined;
  /**  This callback is called when the data instance has loaded. It is called with the data instance. */
  onLoad?: ((data: google.maps.Data) => void) | undefined;
  /**  This callback is called when the component unmounts. It is called with the data instance.  */
  onUnmount?: ((data: google.maps.Data) => void) | undefined;
};

function DataFunctional({
  options,
  onClick,
  onDblClick,
  onMouseDown,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onRightClick,
  onAddFeature,
  onRemoveFeature,
  onRemoveProperty,
  onSetGeometry,
  onSetProperty,
  onLoad,
  onUnmount,
}: DataProps): null {
  const map = useContext<google.maps.Map | null>(MapContext);

  const [instance, setInstance] = useState<google.maps.Data | null>(null);

  const [dblclickListener, setDblclickListener] = useState<google.maps.MapsEventListener | null>(
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

  const [addFeatureListener, setAddFeatureListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [removeFeatureListener, setRemoveFeatureListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [removePropertyListener, setRemovePropertyListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [setGeometryListener, setSetGeometryListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [setPropertyListener, setSetPropertyListener] =
    useState<google.maps.MapsEventListener | null>(null);

  useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);

  useEffect(() => {
    if (instance && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener);
      }

      setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
    }
  }, [onDblClick]);

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
    if (instance && onAddFeature) {
      if (addFeatureListener !== null) {
        google.maps.event.removeListener(addFeatureListener);
      }

      setAddFeatureListener(google.maps.event.addListener(instance, 'addfeature', onAddFeature));
    }
  }, [onAddFeature]);

  useEffect(() => {
    if (instance && onRemoveFeature) {
      if (removeFeatureListener !== null) {
        google.maps.event.removeListener(removeFeatureListener);
      }

      setRemoveFeatureListener(
        google.maps.event.addListener(instance, 'removefeature', onRemoveFeature),
      );
    }
  }, [onRemoveFeature]);

  useEffect(() => {
    if (instance && onRemoveProperty) {
      if (removePropertyListener !== null) {
        google.maps.event.removeListener(removePropertyListener);
      }

      setRemovePropertyListener(
        google.maps.event.addListener(instance, 'removeproperty', onRemoveProperty),
      );
    }
  }, [onRemoveProperty]);

  useEffect(() => {
    if (instance && onSetGeometry) {
      if (setGeometryListener !== null) {
        google.maps.event.removeListener(setGeometryListener);
      }

      setSetGeometryListener(google.maps.event.addListener(instance, 'setgeometry', onSetGeometry));
    }
  }, [onSetGeometry]);

  useEffect(() => {
    if (instance && onSetProperty) {
      if (setPropertyListener !== null) {
        google.maps.event.removeListener(setPropertyListener);
      }

      setSetPropertyListener(google.maps.event.addListener(instance, 'setproperty', onSetProperty));
    }
  }, [onSetProperty]);

  useEffect(() => {
    if (map !== null) {
      const data = new google.maps.Data({
        ...options,
        map,
      });

      if (onDblClick) {
        setDblclickListener(google.maps.event.addListener(data, 'dblclick', onDblClick));
      }

      if (onMouseDown) {
        setMousedownListener(google.maps.event.addListener(data, 'mousedown', onMouseDown));
      }

      if (onMouseMove) {
        setMousemoveListener(google.maps.event.addListener(data, 'mousemove', onMouseMove));
      }

      if (onMouseOut) {
        setMouseoutListener(google.maps.event.addListener(data, 'mouseout', onMouseOut));
      }

      if (onMouseOver) {
        setMouseoverListener(google.maps.event.addListener(data, 'mouseover', onMouseOver));
      }

      if (onMouseUp) {
        setMouseupListener(google.maps.event.addListener(data, 'mouseup', onMouseUp));
      }

      if (onRightClick) {
        setRightclickListener(google.maps.event.addListener(data, 'rightclick', onRightClick));
      }

      if (onClick) {
        setClickListener(google.maps.event.addListener(data, 'click', onClick));
      }

      if (onAddFeature) {
        setAddFeatureListener(google.maps.event.addListener(data, 'addfeature', onAddFeature));
      }

      if (onRemoveFeature) {
        setRemoveFeatureListener(
          google.maps.event.addListener(data, 'removefeature', onRemoveFeature),
        );
      }

      if (onRemoveProperty) {
        setRemovePropertyListener(
          google.maps.event.addListener(data, 'removeproperty', onRemoveProperty),
        );
      }

      if (onSetGeometry) {
        setSetGeometryListener(google.maps.event.addListener(data, 'setgeometry', onSetGeometry));
      }

      if (onSetProperty) {
        setSetPropertyListener(google.maps.event.addListener(data, 'setproperty', onSetProperty));
      }

      setInstance(data);

      if (onLoad) {
        onLoad(data);
      }
    }

    return () => {
      if (instance) {
        if (dblclickListener !== null) {
          google.maps.event.removeListener(dblclickListener);
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

        if (addFeatureListener !== null) {
          google.maps.event.removeListener(addFeatureListener);
        }

        if (removeFeatureListener !== null) {
          google.maps.event.removeListener(removeFeatureListener);
        }

        if (removePropertyListener !== null) {
          google.maps.event.removeListener(removePropertyListener);
        }

        if (setGeometryListener !== null) {
          google.maps.event.removeListener(setGeometryListener);
        }

        if (setPropertyListener !== null) {
          google.maps.event.removeListener(setPropertyListener);
        }

        if (onUnmount) {
          onUnmount(instance);
        }

        instance.setMap(null);
      }
    };
  }, []);

  return null;
}

export const DataF: ComponentType<DataProps> = memo<DataProps>(DataFunctional);

export const Data = DataF;
