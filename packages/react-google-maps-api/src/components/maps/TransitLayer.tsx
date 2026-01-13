import { memo, useContext, useEffect, useState, type ComponentType } from 'react';

import { MapContext } from '../../map-context.js';

export type TransitLayerProps = {
  onLoad?: ((transitLayer: google.maps.TransitLayer) => void) | undefined;
  onUnmount?: ((transitLayer: google.maps.TransitLayer) => void) | undefined;
};

function TransitLayerFunctional({ onLoad, onUnmount }: TransitLayerProps): null {
  const map = useContext<google.maps.Map | null>(MapContext);

  const [instance, setInstance] = useState<google.maps.TransitLayer | null>(null);

  useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);

  useEffect(() => {
    const transitLayer = new google.maps.TransitLayer();

    setInstance(transitLayer);

    transitLayer.setMap(map);

    if (onLoad) {
      onLoad(transitLayer);
    }

    return () => {
      if (instance !== null) {
        if (onUnmount) {
          onUnmount(instance);
        }

        instance.setMap(null);
      }
    };
  }, []);

  return null;
}

export const TransitLayerF: ComponentType<TransitLayerProps> =
  memo<TransitLayerProps>(TransitLayerFunctional);

export const TransitLayer = TransitLayerF;
