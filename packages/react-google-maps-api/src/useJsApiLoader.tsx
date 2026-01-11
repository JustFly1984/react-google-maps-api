import { Loader, type Library } from '@googlemaps/js-api-loader';
import { useEffect, useMemo, useRef, useState } from 'react';

import { isBrowser } from './utils/isbrowser.js';
import type { Libraries, LoadScriptUrlOptions } from './utils/make-load-script-url.js';
import { preventGoogleFonts } from './utils/prevent-google-fonts.js';

import { defaultLoadScriptProps } from './LoadScript.js';

export type UseLoadScriptOptions = LoadScriptUrlOptions & {
  id?: string | undefined;
  nonce?: string | undefined;
  preventGoogleFontsLoading?: boolean | undefined;
};

const defaultLibraries: Libraries = ['maps'];

export function useJsApiLoader({
  id = defaultLoadScriptProps.id,
  version = defaultLoadScriptProps.version,
  nonce,
  googleMapsApiKey,
  // googleMapsClientId,
  language,
  region,
  libraries = defaultLibraries,
  preventGoogleFontsLoading,
  // channel,
  mapIds,
  authReferrerPolicy,
}: UseLoadScriptOptions): {
  isLoaded: boolean;
  loadError: Error | undefined;
} {
  const mountedRef = useRef(false);
  const [isLoaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    mountedRef.current = true;
    return (): void => {
      mountedRef.current = false;
    };
  }, []);

  const loader = useMemo(() => {
    return new Loader({
      id,
      apiKey: googleMapsApiKey,
      version,
      libraries,
      language: language || 'en',
      region: region || 'US',
      mapIds: mapIds || [],
      nonce: nonce || '',
      authReferrerPolicy: authReferrerPolicy || 'origin',
    });
  }, [
    id,
    googleMapsApiKey,
    version,
    libraries,
    language,
    region,
    mapIds,
    nonce,
    authReferrerPolicy,
  ]);

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    void Promise.all(
      libraries.map((library: Library) => {
        loader.importLibrary(library);
      }),
    )
      .then(() => {
        if (mountedRef.current) {
          setLoaded(true);
        }

        return;
      })
      .catch((error: unknown) => {
        setLoadError(error as Error);
      });
  }, []);

  useEffect(() => {
    if (isBrowser && preventGoogleFontsLoading) {
      preventGoogleFonts();
    }
  }, [preventGoogleFontsLoading]);

  const prevLibraries = useRef<undefined | Libraries>();

  useEffect(() => {
    if (prevLibraries.current && libraries !== prevLibraries.current) {
      console.warn(
        'Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables',
      );
    }
    prevLibraries.current = libraries;
  }, [libraries]);

  return { isLoaded, loadError };
}
