import { type ComponentType, memo, useEffect, useRef } from 'react';

import invariant from 'invariant';

export type DistanceMatrixServiceProps = {
  options: google.maps.DistanceMatrixRequest;
  callback: (
    response: google.maps.DistanceMatrixResponse | null,
    status: google.maps.DistanceMatrixStatus,
  ) => void;
  onLoad?: ((distanceMatrixService: google.maps.DistanceMatrixService) => void) | undefined;
  onUnmount?: ((distanceMatrixService: google.maps.DistanceMatrixService) => void) | undefined;
};

function DistanceMatrixServiceFunctional({
  options,
  callback,
  onLoad,
  onUnmount,
}: DistanceMatrixServiceProps): null {
  const distanceMatrixServiceRef = useRef<google.maps.DistanceMatrixService | null>(null);

  useEffect(() => {
    invariant(
      !!options,
      'DistanceMatrixService expected options object as parameter, but go %s',
      options,
    );

    const distanceMatrixService = new google.maps.DistanceMatrixService();
    distanceMatrixServiceRef.current = distanceMatrixService;

    if (onLoad) {
      onLoad(distanceMatrixService);
    }

    return (): void => {
      if (distanceMatrixServiceRef.current !== null) {
        if (onUnmount) {
          onUnmount(distanceMatrixServiceRef.current);
        }

        distanceMatrixServiceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (distanceMatrixServiceRef.current !== null) {
      distanceMatrixServiceRef.current.getDistanceMatrix(options, callback);
    }
  }, [options, callback]);

  return null;
}

export const DistanceMatrixServiceF: ComponentType<DistanceMatrixServiceProps> =
  memo<DistanceMatrixServiceProps>(DistanceMatrixServiceFunctional);

export const DistanceMatrixService = DistanceMatrixServiceF;
