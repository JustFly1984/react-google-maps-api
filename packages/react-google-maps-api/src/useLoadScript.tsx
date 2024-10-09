/* eslint-disable filenames/match-regex */
import { useEffect, useRef, useState } from 'react'
import invariant from 'invariant'

import { isBrowser } from './utils/isbrowser.js'
import { injectScript } from './utils/injectscript.js'
import { preventGoogleFonts } from './utils/prevent-google-fonts.js'
import {
  makeLoadScriptUrl,
  type LoadScriptUrlOptions,
} from './utils/make-load-script-url.js'

import { defaultLoadScriptProps } from './LoadScript.js'

export type UseLoadScriptOptions = LoadScriptUrlOptions & {
  id?: string | undefined
  nonce?: string | undefined
  preventGoogleFontsLoading?: boolean | undefined
}

let previouslyLoadedUrl: string

export function useLoadScript({
  id = defaultLoadScriptProps.id,
  version = defaultLoadScriptProps.version,
  nonce,
  googleMapsApiKey,
  googleMapsClientId,
  language,
  region,
  libraries,
  preventGoogleFontsLoading,
  channel,
  mapIds,
  authReferrerPolicy,
}: UseLoadScriptOptions): {
  isLoaded: boolean
  loadError: Error | undefined
  url: string
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

  useEffect(
    function applyPreventGoogleFonts() {
      if (isBrowser && preventGoogleFontsLoading) {
        preventGoogleFonts()
      }
    },
    [preventGoogleFontsLoading]
  )

  useEffect(
    function validateLoadedState() {
      if (isLoaded) {
        invariant(
          !!window.google,
          'useLoadScript was marked as loaded, but window.google is not present. Something went wrong.'
        )
      }
    },
    [isLoaded]
  )

  const url = makeLoadScriptUrl({
    version,
    googleMapsApiKey,
    googleMapsClientId,
    language,
    region,
    libraries,
    channel,
    mapIds,
    authReferrerPolicy,
  })

  useEffect(
    function loadScriptAndModifyLoadedState() {
      if (!isBrowser) {
        return
      }

      function setLoadedIfMounted(): void {
        if (isMounted.current) {
          setLoaded(true)
          previouslyLoadedUrl = url
        }
      }

      if (window.google && window.google.maps && previouslyLoadedUrl === url) {
        setLoadedIfMounted()
        return
      }

      injectScript({ id, url, nonce })
        .then(setLoadedIfMounted)
        .catch(function handleInjectError(err) {
          if (isMounted.current) {
            setLoadError(err)
          }
          console.warn(`
        There has been an Error with loading Google Maps API script, please check that you provided correct google API key (${
          googleMapsApiKey || '-'
        }) or Client ID (${googleMapsClientId || '-'})
        Otherwise it is a Network issue.
      `)
          console.error(err)
        })
    },
    [id, url, nonce]
  )

  const prevLibraries = useRef<undefined | string[]>()

  useEffect(
    function checkPerformance() {
      if (prevLibraries.current && libraries !== prevLibraries.current) {
        console.warn(
          'Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables'
        )
      }
      prevLibraries.current = libraries
    },
    [libraries]
  )

  return { isLoaded, loadError, url }
}
