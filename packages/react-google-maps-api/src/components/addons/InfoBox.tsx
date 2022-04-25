/* global google */
import { Children, memo, PureComponent, useContext, useEffect, useRef, useState, type ReactNode, type ReactPortal } from 'react'
import { createPortal } from 'react-dom'
import invariant from 'invariant'
import {
  InfoBox as GoogleMapsInfoBox,
  type InfoBoxOptions,
} from '@react-google-maps/infobox'
import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'
import MapContext from '../../map-context'

const eventMap = {
  onCloseClick: 'closeclick',
  onContentChanged: 'content_changed',
  onDomReady: 'domready',
  onPositionChanged: 'position_changed',
  onZindexChanged: 'zindex_changed',
}

const updaterMap = {
  options(instance: GoogleMapsInfoBox, options: InfoBoxOptions): void {
    instance.setOptions(options)
  },
  position(
    instance: GoogleMapsInfoBox,
    position: google.maps.LatLng | google.maps.LatLngLiteral
  ): void {
    if (position instanceof google.maps.LatLng) {
      instance.setPosition(position)
    } else {
      instance.setPosition(new google.maps.LatLng(position.lat, position.lng))
    }
  },
  visible(instance: GoogleMapsInfoBox, visible: boolean): void {
    instance.setVisible(visible)
  },
  zIndex(instance: GoogleMapsInfoBox, zIndex: number): void {
    instance.setZIndex(zIndex)
  },
}

// type InfoBoxOptions = Omit<GoogleMapsInfoBoxOptions, 'position'>
// & {
//   position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined
// }

interface InfoBoxState {
  infoBox: GoogleMapsInfoBox | null
}

export interface InfoBoxProps {
  children?: ReactNode | undefined
  /** Can be any MVCObject that exposes a LatLng position property and optionally a Point anchorPoint property for calculating the pixelOffset. The anchorPoint is the offset from the anchor's position to the tip of the InfoBox. */
  anchor?: google.maps.MVCObject | undefined
  options?: InfoBoxOptions | undefined
  /** The LatLng at which to display this InfoBox. If the InfoBox is opened with an anchor, the anchor's position will be used instead. */
  position?: google.maps.LatLng | undefined
  /** All InfoBoxes are displayed on the map in order of their zIndex, with higher values displaying in front of InfoBoxes with lower values. By default, InfoBoxes are displayed according to their latitude, with InfoBoxes of lower latitudes appearing in front of InfoBoxes at higher latitudes. InfoBoxes are always displayed in front of markers. */
  zIndex?: number | undefined
  /** This event is fired when the close button was clicked. */
  onCloseClick?: (() => void) | undefined
  /** This event is fired when the <div> containing the InfoBox's content is attached to the DOM. You may wish to monitor this event if you are building out your info window content dynamically. */
  onDomReady?: (() => void) | undefined
  /** This event is fired when the content property changes. */
  onContentChanged?: (() => void) | undefined
  /** This event is fired when the position property changes. */
  onPositionChanged?: (() => void) | undefined
  /** This event is fired when the InfoBox's zIndex changes. */
  onZindexChanged?: (() => void) | undefined
  /** This callback is called when the infoBox instance has loaded. It is called with the infoBox instance. */
  onLoad?: ((infoBox: GoogleMapsInfoBox) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the infoBox instance. */
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
  onUnmount
}: InfoBoxProps): ReactPortal | null {
  const map = useContext<google.maps.Map | null>(MapContext)

  const [instance, setInstance] = useState<GoogleMapsInfoBox | null>(null)

  const [closeclickListener, setCloseClickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [domreadyclickListener, setDomReadyClickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [contentchangedclickListener, setContentChangedClickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [positionchangedclickListener, setPositionChangedClickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [zindexchangedclickListener, setZindexChangedClickListener] = useState<google.maps.MapsEventListener | null>(null)

  const containerElementRef = useRef<HTMLDivElement | null>(null)

  // Order does matter
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
      const positionLatLng = position instanceof google.maps.LatLng
        ? position
        // @ts-ignore
        : new google.maps.LatLng(position.lat, position.lng)

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
      if (closeclickListener !== null) {
        google.maps.event.removeListener(closeclickListener)
      }

      setCloseClickListener(
        google.maps.event.addListener(instance, 'closeclick', onCloseClick)
      )
    }
  }, [onCloseClick])

  useEffect(() => {
    if (instance && onDomReady) {
      if (domreadyclickListener !== null) {
        google.maps.event.removeListener(domreadyclickListener)
      }

      setDomReadyClickListener(
        google.maps.event.addListener(instance, 'domready', onDomReady)
      )
    }
  }, [onDomReady])

  useEffect(() => {
    if (instance && onContentChanged) {
      if (contentchangedclickListener !== null) {
        google.maps.event.removeListener(contentchangedclickListener)
      }

      setContentChangedClickListener(
        google.maps.event.addListener(instance, 'content_changed', onContentChanged)
      )
    }
  }, [onContentChanged])

  useEffect(() => {
    if (instance && onPositionChanged) {
      if (positionchangedclickListener !== null) {
        google.maps.event.removeListener(positionchangedclickListener)
      }

      setPositionChangedClickListener(
        google.maps.event.addListener(instance, 'position_changed', onPositionChanged)
      )
    }
  }, [onPositionChanged])

  useEffect(() => {
    if (instance && onZindexChanged) {
      if (zindexchangedclickListener !== null) {
        google.maps.event.removeListener(zindexchangedclickListener)
      }

      setZindexChangedClickListener(
        google.maps.event.addListener(instance, 'zindex_changed', onZindexChanged)
      )
    }
  }, [onZindexChanged])

  useEffect(() => {
    if (map) {
      const { position, ...infoBoxOptions }: InfoBoxOptions = options || defaultOptions

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
          google.maps.event.addListener(infoBox, 'circlecomplete', onCloseClick)
        )
      }

      if (onDomReady) {
        setDomReadyClickListener(
          google.maps.event.addListener(infoBox, 'domready', onDomReady)
        )
      }

      if (onContentChanged) {
        setContentChangedClickListener(
          google.maps.event.addListener(infoBox, 'content_changed', onContentChanged)
        )
      }

      if (onPositionChanged) {
        setPositionChangedClickListener(
          google.maps.event.addListener(infoBox, 'position_changed', onPositionChanged)
        )
      }

      if (onZindexChanged) {
        setZindexChangedClickListener(
          google.maps.event.addListener(infoBox, 'zindex_changed', onZindexChanged)
        )
      }

      infoBox.setContent(containerElementRef.current)

      if (anchor) {
        infoBox.open(map, anchor)
      } else if (infoBox.getPosition()) {
        infoBox.open(map)
      } else {
        invariant(false, 'You must provide either an anchor or a position prop for <InfoBox>.')
      }

      if (onLoad) {
        onLoad(infoBox)
      }
    }

    return () => {
      if (instance !== null) {
        if (closeclickListener) {
          google.maps.event.removeListener(closeclickListener)
        }

        if (contentchangedclickListener) {
          google.maps.event.removeListener(contentchangedclickListener)
        }

        if (domreadyclickListener) {
          google.maps.event.removeListener(domreadyclickListener)
        }

        if (positionchangedclickListener) {
          google.maps.event.removeListener(positionchangedclickListener)
        }

        if (zindexchangedclickListener) {
          google.maps.event.removeListener(zindexchangedclickListener)
        }

        if (onUnmount) {
          onUnmount(instance)
        }

        instance.close()
      }
    }
  }, [])

  return containerElementRef.current ? createPortal(Children.only(children), containerElementRef.current) : null
}

export const InfoBoxF = memo(InfoBoxFunctional)

export class InfoBoxComponent extends PureComponent<InfoBoxProps, InfoBoxState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []
  containerElement: HTMLElement | null = null

  state: InfoBoxState = {
    infoBox: null,
  }

  open = (infoBox: GoogleMapsInfoBox, anchor?: google.maps.MVCObject): void => {
    if (anchor) {
      // @ts-ignore
      infoBox.open(this.context, anchor)
    } else if (infoBox.getPosition()) {
      // @ts-ignore
      infoBox.open(this.context)
    } else {
      invariant(false, 'You must provide either an anchor or a position prop for <InfoBox>.')
    }
  }

  setInfoBoxCallback = (): void => {
    if (this.state.infoBox !== null && this.containerElement !== null) {
      this.state.infoBox.setContent(this.containerElement)

      this.open(this.state.infoBox, this.props.anchor)

      if (this.props.onLoad) {
        this.props.onLoad(this.state.infoBox)
      }
    }
  }

  componentDidMount(): void {
    const { position, ...infoBoxOptions }: InfoBoxOptions = this.props.options || {}

    let positionLatLng: google.maps.LatLng | undefined

    if (position && !(position instanceof google.maps.LatLng)) {
      // @ts-ignore
      positionLatLng = new google.maps.LatLng(position.lat, position.lng)
    }

    const infoBox = new GoogleMapsInfoBox({
      ...infoBoxOptions,
      ...(positionLatLng ? { position: positionLatLng } : {}),
    })

    this.containerElement = document.createElement('div')

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: infoBox,
    })

    this.setState({ infoBox }, this.setInfoBoxCallback)
  }

  componentDidUpdate(prevProps: InfoBoxProps): void {
    const { infoBox } = this.state

    if (infoBox !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: infoBox,
      })
    }
  }

  componentWillUnmount(): void {
    const { onUnmount } = this.props
    const { infoBox } = this.state

    if (infoBox !== null) {
      if (onUnmount) {
        onUnmount(infoBox)
      }

      unregisterEvents(this.registeredEvents)
      infoBox.close()
    }
  }

  render(): ReactPortal | null {
    return this.containerElement ? createPortal(Children.only(this.props.children), this.containerElement) : null
  }
}

export default InfoBoxComponent
