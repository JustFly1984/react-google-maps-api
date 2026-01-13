import { memo, useEffect, type ComponentType, type JSX, type ReactElement } from 'react';

import { DefaultLoadingElement } from './LoadScript.js';
import { useLoadScript, type UseLoadScriptOptions } from './useLoadScript.js';

export type LoadScriptNextProps = UseLoadScriptOptions & {
  loadingElement?: ReactElement | undefined;
  onLoad?: (() => void) | undefined;
  onError?: ((error: Error) => void) | undefined;
  onUnmount?: (() => void) | undefined;
  children: ReactElement;
};

const defaultLoadingElement = <DefaultLoadingElement />;

function LoadScriptNextFunctional({
  loadingElement,
  onLoad,
  onError,
  onUnmount,
  children,
  ...hookOptions
}: LoadScriptNextProps): JSX.Element {
  const { isLoaded, loadError } = useLoadScript(hookOptions);

  useEffect((): void => {
    if (isLoaded && typeof onLoad === 'function') {
      onLoad();
    }
  }, [isLoaded, onLoad]);

  useEffect((): void => {
    if (loadError && typeof onError === 'function') {
      onError(loadError);
    }
  }, [loadError, onError]);

  useEffect((): (() => void) => {
    return (): void => {
      if (onUnmount) {
        onUnmount();
      }
    };
  }, [onUnmount]);

  return isLoaded ? children : loadingElement || defaultLoadingElement;
}

export const LoadScriptNextF: ComponentType<LoadScriptNextProps> =
  memo<LoadScriptNextProps>(LoadScriptNextFunctional);

export const LoadScriptNext = LoadScriptNextF;
