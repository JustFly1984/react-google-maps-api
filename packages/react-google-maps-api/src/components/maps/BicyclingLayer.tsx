import { memo, useContext, useEffect, useState, type ComponentType } from 'react';

import { MapContext } from '../../map-context.js';

export type BicyclingLayerProps = {
  onLoad?: ((bicyclingLayer: google.maps.BicyclingLayer) => void) | undefined;
  onUnmount?: ((bicyclingLayer: google.maps.BicyclingLayer) => void) | undefined;
};

function BicyclingLayerFunctional({ onLoad, onUnmount }: BicyclingLayerProps): null {
  const map = useContext<google.maps.Map | null>(MapContext);

  const [instance, setInstance] = useState<google.maps.BicyclingLayer | null>(null);

  useEffect(() => {
    if (instance !== null) {
      instance.setMap(map);
    }
  }, [map]);

  useEffect(() => {
    const bicyclingLayer = new google.maps.BicyclingLayer();

    setInstance(bicyclingLayer);

    bicyclingLayer.setMap(map);

    if (onLoad) {
      onLoad(bicyclingLayer);
    }

    return () => {
      if (bicyclingLayer !== null) {
        if (onUnmount) {
          onUnmount(bicyclingLayer);
        }

        bicyclingLayer.setMap(null);
      }
    };
  }, []);

  return null;
}

export const BicyclingLayerF: ComponentType<BicyclingLayerProps> =
  memo<BicyclingLayerProps>(BicyclingLayerFunctional);

export const BicyclingLayer = BicyclingLayerF;
