import { memo, ReactElement, useEffect, type JSX } from 'react'

import { DefaultLoadingElement } from './LoadScript'
import { useLoadScript, UseLoadScriptOptions } from './useLoadScript'

export interface LoadScriptNextProps extends UseLoadScriptOptions {
  loadingElement?: ReactElement | undefined
  onLoad?: (() => void) | undefined
  onError?: ((error: Error) => void) | undefined
  onUnmount?: (() => void) | undefined
  children: ReactElement
}

const defaultLoadingElement = <DefaultLoadingElement />

function LoadScriptNext({
  loadingElement,
  onLoad,
  onError,
  onUnmount,
  children,
  ...hookOptions
}: LoadScriptNextProps): JSX.Element {
  const { isLoaded, loadError } = useLoadScript(hookOptions)

  useEffect(
    function handleOnLoad() {
      if (isLoaded && typeof onLoad === 'function') {
        onLoad()
      }
    },
    [isLoaded, onLoad]
  )

  useEffect(
    function handleOnError() {
      if (loadError && typeof onError === 'function') {
        onError(loadError)
      }
    },
    [loadError, onError]
  )

  useEffect(
    function handleOnUnmount() {
      return () => {
        if (onUnmount) {
          onUnmount()
        }
      }
    },
    [onUnmount]
  )

  return isLoaded ? children : loadingElement || defaultLoadingElement
}

export default memo(LoadScriptNext)
