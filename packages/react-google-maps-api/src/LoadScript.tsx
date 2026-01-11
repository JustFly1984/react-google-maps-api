import invariant from 'invariant';
import {
  memo,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type JSX,
  type ReactNode,
} from 'react';

import { injectScript } from './utils/injectscript.js';
import { isBrowser } from './utils/isbrowser.js';
import { makeLoadScriptUrl, type LoadScriptUrlOptions } from './utils/make-load-script-url.js';
import { preventGoogleFonts } from './utils/prevent-google-fonts.js';

let cleaningUp = false;

export type LoadScriptProps = LoadScriptUrlOptions & {
  children?: ReactNode | undefined;
  id: string;
  nonce?: string | undefined;
  loadingElement?: ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onUnmount?: () => void;
  preventGoogleFontsLoading?: boolean;
};

export function DefaultLoadingElement(): JSX.Element {
  return <div>{`Loading...`}</div>;
}

export const defaultLoadScriptProps = {
  id: 'script-loader',
  version: 'weekly',
};

function LoadScriptFunctional({
  children,
  id,
  nonce,
  loadingElement,
  onLoad,
  onError,
  onUnmount,
  preventGoogleFontsLoading,
  ...restProps
}: LoadScriptProps): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const checkRef = useRef<HTMLDivElement | null>(null);
  const previousLanguageRef = useRef<string | undefined>(undefined);
  const previousLibrariesRef = useRef<string[] | undefined>(undefined);

  const cleanupCallback = (): void => {
    // @ts-ignore
    delete window.google.maps;

    injectScriptFunction();
  };

  useEffect(() => {
    if (isBrowser) {
      if (window.google && window.google.maps && !cleaningUp) {
        console.error('google api is already presented');
        return;
      }

      isCleaningUp()
        .then(injectScriptFunction)
        .catch(function error(err) {
          console.error('Error at injecting script after cleaning up: ', err);
        });
    }
  }, []);

  useEffect(() => {
    const currentLanguage = restProps.language;
    const currentLibraries = restProps.libraries;

    if (
      previousLibrariesRef.current !== undefined &&
      currentLibraries !== previousLibrariesRef.current
    ) {
      console.warn(
        'Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables',
      );
    }

    if (
      isBrowser &&
      previousLanguageRef.current !== undefined &&
      currentLanguage !== previousLanguageRef.current
    ) {
      cleanup();
      setLoaded(false);
      cleanupCallback();
    }

    previousLanguageRef.current = currentLanguage;
    previousLibrariesRef.current = currentLibraries;
  }, [restProps.language, restProps.libraries]);

  useEffect(() => {
    return (): void => {
      if (isBrowser) {
        cleanup();

        const timeoutCallback = (): void => {
          if (!checkRef.current) {
            // @ts-ignore
            delete window.google;
            cleaningUp = false;
          }
        };

        window.setTimeout(timeoutCallback, 1);

        if (onUnmount) {
          onUnmount();
        }
      }
    };
  }, []);

  const isCleaningUp = async (): Promise<void> => {
    function promiseCallback(resolve: () => void): void {
      if (!cleaningUp) {
        resolve();
      } else {
        if (isBrowser) {
          const timer = window.setInterval(function interval() {
            if (!cleaningUp) {
              window.clearInterval(timer);

              resolve();
            }
          }, 1);
        }
      }

      return;
    }

    return new Promise(promiseCallback);
  };

  const cleanup = (): void => {
    cleaningUp = true;
    const script = document.getElementById(id);

    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }

    Array.prototype.slice
      .call(document.getElementsByTagName('script'))
      .filter(function filter(script: HTMLScriptElement): boolean {
        return typeof script.src === 'string' && script.src.includes('maps.googleapis');
      })
      .forEach(function forEach(script: HTMLScriptElement): void {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });

    Array.prototype.slice
      .call(document.getElementsByTagName('link'))
      .filter(function filter(link: HTMLLinkElement): boolean {
        return (
          link.href === 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans'
        );
      })
      .forEach(function forEach(link: HTMLLinkElement) {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });

    Array.prototype.slice
      .call(document.getElementsByTagName('style'))
      .filter(function filter(style: HTMLStyleElement): boolean {
        return (
          typeof style.innerText !== 'undefined' &&
          style.innerText.length > 0 &&
          style.innerText.includes('.gm-')
        );
      })
      .forEach(function forEach(style: HTMLStyleElement) {
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      });
  };

  const injectScriptFunction = (): void => {
    if (preventGoogleFontsLoading) {
      preventGoogleFonts();
    }

    invariant(!!id, 'LoadScript requires "id" prop to be a string: %s', id);

    const injectScriptOptions = {
      id,
      nonce,
      url: makeLoadScriptUrl(restProps),
    };

    injectScript(injectScriptOptions)
      .then(() => {
        if (onLoad) {
          onLoad();
        }

        setLoaded(true);

        return;
      })
      .catch((err) => {
        if (onError) {
          onError(err);
        }

        console.error(`
          There has been an Error with loading Google Maps API script, please check that you provided correct google API key (${
            restProps.googleMapsApiKey || '-'
          }) or Client ID (${restProps.googleMapsClientId || '-'}) to <LoadScript />
          Otherwise it is a Network issue.
        `);
      });
  };

  return (
    <>
      <div ref={checkRef} />

      {loaded ? children : loadingElement || <DefaultLoadingElement />}
    </>
  );
}

export const LoadScriptF: ComponentType<LoadScriptProps> =
  memo<LoadScriptProps>(LoadScriptFunctional);

export const LoadScript = LoadScriptF;
