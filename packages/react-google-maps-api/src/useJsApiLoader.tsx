import { useEffect, useMemo, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

import { isBrowser } from './utils/isbrowser'
import { preventGoogleFonts } from './utils/prevent-google-fonts'
import { LoadScriptUrlOptions, Libraries } from './utils/make-load-script-url'

import { defaultLoadScriptProps } from './LoadScript'

export interface UseLoadScriptOptions extends LoadScriptUrlOptions {
  id?: string | undefined
  nonce?: string | undefined
  preventGoogleFontsLoading?: boolean | undefined
}

export function useJsApiLoader({
  id = defaultLoadScriptProps.id,
  version = defaultLoadScriptProps.version,
  nonce,
  googleMapsApiKey,
  // googleMapsClientId,
  language,
  region,
  libraries,
  preventGoogleFontsLoading,
  // channel,
  mapIds,
  authReferrerPolicy,
}: UseLoadScriptOptions): {
  isLoaded: boolean
  loadError: Error | undefined
} {
  const isMounted = useRef(false)
  const [isLoaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState<Error | undefined>(undefined)

  useEffect(function trackMountedState() {
    isMounted.current = true
    return (): void => {
      isMounted.current = false
    }
  }, [])

  const loader = useMemo(function memo() {
    return new Loader({
      id,
      apiKey: googleMapsApiKey,
      version,
      libraries,
      language,
      region,
      mapIds,
      nonce,
      authReferrerPolicy,
    })
  }, [id, googleMapsApiKey, version, libraries, language, region, mapIds, nonce, authReferrerPolicy])

  useEffect(function effect() {
    if (isLoaded) {
      return
    } else {
      loader.load().then(function then() {
        if (isMounted.current) setLoaded(true)
      })
      .catch(function onrejected(error) {
        setLoadError(error)
      })
    }
  }, [])


  useEffect(
    function applyPreventGoogleFonts() {
      if (isBrowser && preventGoogleFontsLoading) {
        preventGoogleFonts()
      }
    },
    [preventGoogleFontsLoading]
  )

  const prevLibraries = useRef<undefined | Libraries>()

  useEffect(
    function effect() {
      if (prevLibraries.current && libraries !== prevLibraries.current) {
        console.warn(
          'Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables'
        )
      }
      prevLibraries.current = libraries
    },
    [libraries]
  )

  return { isLoaded, loadError }
}
