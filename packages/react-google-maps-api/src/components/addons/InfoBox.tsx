/* global google */
import {
  memo,
  useRef,
  Children,
  useState,
  useEffect,
  useContext,
  type ReactNode,
  type ReactPortal,
  type ComponentType,
} from 'react'
import { createPortal } from 'react-dom'
import invariant from 'invariant'

import { MapContext } from '../../map-context.js'

import {
  InfoBox as GoogleMapsInfoBox,
  type InfoBoxOptions,
} from '@react-google-maps/infobox'


export type InfoBoxProps = {
  children?: ReactNode | undefined
  anchor?: google.maps.MVCObject | undefined
  options?: InfoBoxOptions | undefined
  position?: google.maps.LatLng | undefined
  zIndex?: number | undefined
  onCloseClick?: (() => void) | undefined
  onDomReady?: (() => void) | undefined
  onContentChanged?: (() => void) | undefined
  onPositionChanged?: (() => void) | undefined
  onZindexChanged?: (() => void) | undefined
  onLoad?: ((infoBox: GoogleMapsInfoBox) => void) | undefined
  onUnmount?: ((infoBox: GoogleMapsInfoBox) => void) | undefined
}

const defaultOptions: InfoBoxOptions = {}

function InfoBoxFunctional({
  children,
  anchor,
  options,
  position,
  zIndex,
  onCloseClick,
  onDomReady,
  onContentChanged,
  onPositionChanged,
  onZindexChanged,
  onLoad,
  onUnmount,
}: InfoBoxProps): ReactPortal | null {
  const map = useContext<google.maps.Map | null>(MapContext)

  const [instance, setInstance] = useState<GoogleMapsInfoBox | null>(null)

  const [closeClickListener, setCloseClickListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [domReadyClickListener, setDomReadyClickListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [contentChangedClickListener, setContentChangedClickListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [positionChangedClickListener, setPositionChangedClickListener] =
    useState<google.maps.MapsEventListener | null>(null)
  const [zIndexChangedClickListener, setZindexChangedClickListener] =
    useState<google.maps.MapsEventListener | null>(null)

  const containerElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (map && instance !== null) {
      instance.close()

      if (anchor) {
        instance.open(map, anchor)
      } else if (instance.getPosition()) {
        instance.open(map)
      }
    }
  }, [map, instance, anchor])

  useEffect(() => {
    if (options && instance !== null) {
      instance.setOptions(options)
    }
  }, [instance, options])

  useEffect(() => {
    if (position && instance !== null) {
      const positionLatLng =
        position instanceof google.maps.LatLng
          ? position
          : // @ts-ignore
            new google.maps.LatLng(position.lat, position.lng)

      instance.setPosition(positionLatLng)
    }
  }, [position])

  useEffect(() => {
    if (typeof zIndex === 'number' && instance !== null) {
      instance.setZIndex(zIndex)
    }
  }, [zIndex])

  useEffect(() => {
    if (instance && onCloseClick) {
      if (closeClickListener !== null) {
        google.maps.event.removeListener(closeClickListener)
      }

      setCloseClickListener(
        google.maps.event.addListener(instance, 'closeclick', onCloseClick)
      )
    }
  }, [onCloseClick])

  useEffect(() => {
    if (instance && onDomReady) {
      if (domReadyClickListener !== null) {
        google.maps.event.removeListener(domReadyClickListener)
      }

      setDomReadyClickListener(
        google.maps.event.addListener(instance, 'domready', onDomReady)
      )
    }
  }, [onDomReady])

  useEffect(() => {
    if (instance && onContentChanged) {
      if (contentChangedClickListener !== null) {
        google.maps.event.removeListener(contentChangedClickListener)
      }

      setContentChangedClickListener(
        google.maps.event.addListener(
          instance,
          'content_changed',
          onContentChanged
        )
      )
    }
  }, [onContentChanged])

  useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionChangedClickListener !== null) {
        google.maps.event.removeListener(positionChangedClickListener)
      }

      setPositionChangedClickListener(
        google.maps.event.addListener(
          instance,
          'position_changed',
          onPositionChanged
        )
      )
    }
  }, [onPositionChanged])

  useEffect(() => {
    if (instance && onZindexChanged) {
      if (zIndexChangedClickListener !== null) {
        google.maps.event.removeListener(zIndexChangedClickListener)
      }

      setZindexChangedClickListener(
        google.maps.event.addListener(
          instance,
          'zindex_changed',
          onZindexChanged
        )
      )
    }
  }, [onZindexChanged])

  useEffect(() => {
    if (map) {
      const { position, ...infoBoxOptions }: InfoBoxOptions =
        options || defaultOptions

      let positionLatLng: google.maps.LatLng | undefined

      if (position && !(position instanceof google.maps.LatLng)) {
        // @ts-ignore
        positionLatLng = new google.maps.LatLng(position.lat, position.lng)
      }

      const infoBox = new GoogleMapsInfoBox({
        ...infoBoxOptions,
        ...(positionLatLng ? { position: positionLatLng } : {}),
      })

      containerElementRef.current = document.createElement('div')

      setInstance(infoBox)

      if (onCloseClick) {
        setCloseClickListener(
          google.maps.event.addListener(infoBox, 'closeclick', onCloseClick)
        )
      }

      if (onDomReady) {
        setDomReadyClickListener(
          google.maps.event.addListener(infoBox, 'domready', onDomReady)
        )
      }

      if (onContentChanged) {
        setContentChangedClickListener(
          google.maps.event.addListener(
            infoBox,
            'content_changed',
            onContentChanged
          )
        )
      }

      if (onPositionChanged) {
        setPositionChangedClickListener(
          google.maps.event.addListener(
            infoBox,
            'position_changed',
            onPositionChanged
          )
        )
      }

      if (onZindexChanged) {
        setZindexChangedClickListener(
          google.maps.event.addListener(
            infoBox,
            'zindex_changed',
            onZindexChanged
          )
        )
      }

      infoBox.setContent(containerElementRef.current)

      if (anchor) {
        infoBox.open(map, anchor)
      } else if (infoBox.getPosition()) {
        infoBox.open(map)
      } else {
        invariant(
          false,
          'You must provide either an anchor or a position prop for <InfoBox>.'
        )
      }

      if (onLoad) {
        onLoad(infoBox)
      }
    }

    return () => {
      if (instance !== null) {
        if (closeClickListener) {
          google.maps.event.removeListener(closeClickListener)
        }

        if (contentChangedClickListener) {
          google.maps.event.removeListener(contentChangedClickListener)
        }

        if (domReadyClickListener) {
          google.maps.event.removeListener(domReadyClickListener)
        }

        if (positionChangedClickListener) {
          google.maps.event.removeListener(positionChangedClickListener)
        }

        if (zIndexChangedClickListener) {
          google.maps.event.removeListener(zIndexChangedClickListener)
        }

        if (onUnmount) {
          onUnmount(instance)
        }

        instance.close()
      }
    }
  }, [])

  return containerElementRef.current
    ? createPortal(Children.only(children), containerElementRef.current)
    : null
}

export const InfoBoxF: ComponentType<InfoBoxProps> = memo<InfoBoxProps>(InfoBoxFunctional)

export const InfoBox = InfoBoxF
