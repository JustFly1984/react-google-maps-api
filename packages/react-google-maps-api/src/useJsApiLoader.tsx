/* eslint-disable filenames/match-regex */
import * as React from 'react'
import { Loader } from '@googlemaps/js-api-loader'

import { isBrowser } from './utils/isbrowser'
import { preventGoogleFonts } from './utils/prevent-google-fonts'
import { LoadScriptUrlOptions, Libraries } from './utils/make-load-script-url'

import { defaultLoadScriptProps } from './LoadScript'

export interface UseLoadScriptOptions extends LoadScriptUrlOptions {
  id?: string
  nonce?: string
  preventGoogleFontsLoading?: boolean
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
}: UseLoadScriptOptions): {
  isLoaded: boolean
  loadError: Error | undefined
} {
  const [isLoaded, setLoaded] = React.useState(false)
  const [loadError, setLoadError] = React.useState<Error | undefined>(undefined)

  const loader = React.useMemo(function memo() {
    return new Loader({
      id,
      apiKey: googleMapsApiKey,
      version,
      libraries,
      language,
      region,
      mapIds,
      nonce,
    })
  }, [id, googleMapsApiKey, version, libraries, language, region, mapIds, nonce])

  React.useEffect(function effect() {
    if (isLoaded) {
      return
    } else {
      loader.load().then(function then() {
        setLoaded(true)
      })
      .catch(function onrejected(error) {
        setLoadError(error)
      })
    }
  }, [])


  React.useEffect(
    function applyPreventGoogleFonts() {
      if (isBrowser && preventGoogleFontsLoading) {
        preventGoogleFonts()
      }
    },
    [preventGoogleFontsLoading]
  )

  const prevLibraries = React.useRef<undefined | Libraries>()

  React.useEffect(
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
