import invariant from 'invariant';
import { type ComponentType, memo, useEffect, useRef } from 'react';

export type DirectionsServiceProps = {
  options: google.maps.DirectionsRequest;
  callback: (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus,
  ) => void;
  onLoad?: ((directionsService: google.maps.DirectionsService) => void) | undefined;
  onUnmount?: ((directionsService: google.maps.DirectionsService) => void) | undefined;
};

function DirectionsServiceFunctional({
  options,
  callback,
  onLoad,
  onUnmount,
}: DirectionsServiceProps): null {
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);

  useEffect(() => {
    invariant(
      !!options,
      'DirectionsService expected options object as parameter, but got %s',
      options,
    );

    const directionsService = new google.maps.DirectionsService();
    directionsServiceRef.current = directionsService;

    if (onLoad) {
      onLoad(directionsService);
    }

    return (): void => {
      if (directionsServiceRef.current !== null) {
        if (onUnmount) {
          onUnmount(directionsServiceRef.current);
        }

        directionsServiceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (directionsServiceRef.current !== null) {
      directionsServiceRef.current.route(options, callback);
    }
  }, [options, callback]);

  return null;
}

export const DirectionsServiceF: ComponentType<DirectionsServiceProps> =
  memo<DirectionsServiceProps>(DirectionsServiceFunctional);

export const DirectionsService = DirectionsServiceF;
