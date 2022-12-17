import { type CSSProperties, PureComponent, type ReactNode, useState, useRef, useEffect, memo } from 'react'

import MapContext from './map-context'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from './utils/helper'

const eventMap = {
  onDblClick: 'dblclick',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMapTypeIdChanged: 'maptypeid_changed',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseDown: 'mousedown',
  onMouseUp: 'mouseup',
  onRightClick: 'rightclick',
  onTilesLoaded: 'tilesloaded',
  onBoundsChanged: 'bounds_changed',
  onCenterChanged: 'center_changed',
  onClick: 'click',
  onDrag: 'drag',
  onHeadingChanged: 'heading_changed',
  onIdle: 'idle',
  onProjectionChanged: 'projection_changed',
  onResize: 'resize',
  onTiltChanged: 'tilt_changed',
  onZoomChanged: 'zoom_changed',
}

const updaterMap = {
  extraMapTypes(map: google.maps.Map, extra: google.maps.MapType[]): void {
    extra.forEach(function forEachExtra(it, i) {
      map.mapTypes.set(String(i), it)
    })
  },
  center(map: google.maps.Map, center: google.maps.LatLng | google.maps.LatLngLiteral): void {
    map.setCenter(center)
  },
  clickableIcons(map: google.maps.Map, clickable: boolean): void {
    map.setClickableIcons(clickable)
  },
  heading(map: google.maps.Map, heading: number): void {
    map.setHeading(heading)
  },
  mapTypeId(map: google.maps.Map, mapTypeId: string): void {
    map.setMapTypeId(mapTypeId)
  },
  options(map: google.maps.Map, options: google.maps.MapOptions): void {
    map.setOptions(options)
  },
  streetView(map: google.maps.Map, streetView: google.maps.StreetViewPanorama): void {
    map.setStreetView(streetView)
  },
  tilt(map: google.maps.Map, tilt: number): void {
    map.setTilt(tilt)
  },
  zoom(map: google.maps.Map, zoom: number): void {
    map.setZoom(zoom)
  },
}

export interface GoogleMapState {
  map: google.maps.Map | null
}

export interface GoogleMapProps {
  children?: ReactNode | undefined
  id?: string | undefined
  mapContainerStyle?: CSSProperties | undefined
  mapContainerClassName?: string | undefined
  options?: google.maps.MapOptions | undefined
  /** Additional map types to overlay. Overlay map types will display on top of the base map they are attached to, in the order in which they appear in the overlayMapTypes array (overlays with higher index values are displayed in front of overlays with lower index values). */
  extraMapTypes?: google.maps.MapType[] | undefined
  /** The initial Map center. */
  center?: google.maps.LatLng | google.maps.LatLngLiteral | undefined
  /** When false, map icons are not clickable. A map icon represents a point of interest, also known as a POI. By default map icons are clickable. */
  clickableIcons?: boolean | undefined
  /** The heading for aerial imagery in degrees measured clockwise from cardinal direction North. Headings are snapped to the nearest available angle for which imagery is available. */
  heading?: number | undefined
  /** The initial Map mapTypeId. Defaults to ROADMAP. */
  mapTypeId?: string | undefined
  /** A StreetViewPanorama to display when the Street View pegman is dropped on the map. If no panorama is specified, a default StreetViewPanorama will be displayed in the map's div when the pegman is dropped. */
  streetView?: google.maps.StreetViewPanorama | undefined
  /** Controls the automatic switching behavior for the angle of incidence of the map. The only allowed values are 0 and 45. The value 0 causes the map to always use a 0° overhead view regardless of the zoom level and viewport. The value 45 causes the tilt angle to automatically switch to 45 whenever 45° imagery is available for the current zoom level and viewport, and switch back to 0 whenever 45° imagery is not available (this is the default behavior). 45° imagery is only available for satellite and hybrid map types, within some locations, and at some zoom levels. Note: getTilt returns the current tilt angle, not the value specified by this option. Because getTilt and this option refer to different things, do not bind() the tilt property; doing so may yield unpredictable effects. */
  tilt?: number | undefined
  /** The initial Map zoom level. Required. Valid values: Integers between zero, and up to the supported maximum zoom level. */
  zoom?: number | undefined
  /** This event is fired when the user clicks on the map. An ApiMouseEvent with properties for the clicked location is returned unless a place icon was clicked, in which case an IconMouseEvent with a placeId is returned. IconMouseEvent and ApiMouseEvent are identical, except that IconMouseEvent has the placeId field. The event can always be treated as an ApiMouseEvent when the placeId is not important. The click event is not fired if a Marker or InfoWindow was clicked. */
  onClick?:( (e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the user double-clicks on the map. Note that the click event will also fire, right before this one. */
  onDblClick?:( (e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is repeatedly fired while the user drags the map. */
  onDrag?:( () => void) | undefined
  /** This event is fired when the user stops dragging the map. */
  onDragEnd?:( () => void) | undefined
  /** This event is fired when the user starts dragging the map. */
  onDragStart?:( () => void) | undefined
  /** This event is fired whenever the user's mouse moves over the map container. */
  onMouseMove?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the user's mouse exits the map container. */
  onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the user's mouse enters the map container. */
  onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mousedown event is fired on the map container. */
  onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM mouseup event is fired on the map container. */
  onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the DOM contextmenu event is fired on the map container. */
  onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the mapTypeId property changes. */
  onMapTypeIdChanged?:( () => void) | undefined
  /** This event is fired when the visible tiles have finished loading. */
  onTilesLoaded?: (() => void) | undefined
  /** This event is fired when the viewport bounds have changed. */
  onBoundsChanged?: (() => void) | undefined
  /** This event is fired when the map center property changes. */
  onCenterChanged?: (() => void) | undefined
  /** This event is fired when the map heading property changes. */
  onHeadingChanged?: (() => void) | undefined
  /** This event is fired when the map becomes idle after panning or zooming. */
  onIdle?: (() => void) | undefined
  /** This event is fired when the projection has changed. */
  onProjectionChanged?: (() => void) | undefined
  /** This event is fired when the map size has changed. */
  onResize?: (() => void) | undefined
  /** This event is fired when the map tilt property changes. */
  onTiltChanged?: (() => void) | undefined
  /** This event is fired when the map zoom property changes. */
  onZoomChanged?: (() => void) | undefined
  /** This callback is called when the map instance has loaded. It is called with the map instance. */
  onLoad?: ((map: google.maps.Map) => void | Promise<void>) | undefined
  /** This callback is called when the component unmounts. It is called with the map instance. */
  onUnmount?: ((map: google.maps.Map) => void | Promise<void>) | undefined
}


// TODO: unfinished!
function GoogleMapFunctional({
  children,
  options,
  id,
  mapContainerStyle,
  mapContainerClassName,
  center,
  // clickableIcons,
  // extraMapTypes,
  // heading,
  // mapTypeId,
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onMouseDown,
  onMouseUp,
  onRightClick,
  // onMapTypeIdChanged,
  // onTilesLoaded,
  // onBoundsChanged,
  onCenterChanged,
  // onHeadingChanged,
  // onIdle,
  // onProjectionChanged,
  // onResize,
  // onTiltChanged,
  // onZoomChanged,
  onLoad,
  onUnmount,
}: GoogleMapProps): JSX.Element {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)

  // const [extraMapTypesListener, setExtraMapTypesListener] = useState<google.maps.MapsEventListener | null>(null)
  const [centerChangedListener, setCenterChangedListener] = useState<google.maps.MapsEventListener | null>(null)

  const [dblclickListener, setDblclickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [dragendListener, setDragendListener] = useState<google.maps.MapsEventListener | null>(null)
  const [dragstartListener, setDragstartListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mousedownListener, setMousedownListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mousemoveListener, setMousemoveListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mouseoutListener, setMouseoutListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mouseoverListener, setMouseoverListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mouseupListener, setMouseupListener] = useState<google.maps.MapsEventListener | null>(null)
  const [rightclickListener, setRightclickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [clickListener, setClickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [dragListener, setDragListener] = useState<google.maps.MapsEventListener | null>(null)

  // Order does matter
  useEffect(() => {
    if (options && map !== null) {
      map.setOptions(options)
    }
  }, [map, options])

  useEffect(() => {
    if (map !== null && typeof center !== 'undefined') {
      map.setCenter(center)
    }
  }, [map, center])

  useEffect(() => {
    if (map && onDblClick) {
      if (dblclickListener !== null) {
        google.maps.event.removeListener(dblclickListener)
      }

      setDblclickListener(
        google.maps.event.addListener(map, 'dblclick', onDblClick)
      )
    }
  }, [onDblClick])

  useEffect(() => {
    if (map && onDragEnd) {
      if (dragendListener !== null) {
        google.maps.event.removeListener(dragendListener)
      }

      setDragendListener(
        google.maps.event.addListener(map, 'dragend', onDragEnd)
      )
    }
  }, [onDragEnd])

  useEffect(() => {
    if (map && onDragStart) {
      if (dragstartListener !== null) {
        google.maps.event.removeListener(dragstartListener)
      }

      setDragstartListener(
        google.maps.event.addListener(map, 'dragstart', onDragStart)
      )
    }
  }, [onDragStart])

  useEffect(() => {
    if (map && onMouseDown) {
      if (mousedownListener !== null) {
        google.maps.event.removeListener(mousedownListener)
      }

      setMousedownListener(
        google.maps.event.addListener(map, 'mousedown', onMouseDown)
      )
    }
  }, [onMouseDown])

  useEffect(() => {
    if (map && onMouseMove) {
      if (mousemoveListener !== null) {
        google.maps.event.removeListener(mousemoveListener)
      }

      setMousemoveListener(
        google.maps.event.addListener(map, 'mousemove', onMouseMove)
      )
    }
  }, [onMouseMove])

  useEffect(() => {
    if (map && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener)
      }

      setMouseoutListener(
        google.maps.event.addListener(map, 'mouseout', onMouseOut)
      )
    }
  }, [onMouseOut])

  useEffect(() => {
    if (map && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener)
      }

      setMouseoverListener(
        google.maps.event.addListener(map, 'mouseover', onMouseOver)
      )
    }
  }, [onMouseOver])

  useEffect(() => {
    if (map && onMouseUp) {
      if (mouseupListener !== null) {
        google.maps.event.removeListener(mouseupListener)
      }

      setMouseupListener(
        google.maps.event.addListener(map, 'mouseup', onMouseUp)
      )
    }
  }, [onMouseUp])

  useEffect(() => {
    if (map && onRightClick) {
      if (rightclickListener !== null) {
        google.maps.event.removeListener(rightclickListener)
      }

      setRightclickListener(
        google.maps.event.addListener(map, 'rightclick', onRightClick)
      )
    }
  }, [onRightClick])

  useEffect(() => {
    if (map && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener)
      }

      setClickListener(
        google.maps.event.addListener(map, 'click', onClick)
      )
    }
  }, [onClick])

  useEffect(() => {
    if (map && onDrag) {
      if (dragListener !== null) {
        google.maps.event.removeListener(dragListener)
      }

      setDragListener(
        google.maps.event.addListener(map, 'drag', onDrag)
      )
    }
  }, [onDrag])

  useEffect(() => {
    if (map && onCenterChanged) {
      if (centerChangedListener !== null) {
        google.maps.event.removeListener(centerChangedListener)
      }

      setCenterChangedListener(
        google.maps.event.addListener(map, 'center_changed', onCenterChanged)
      )
    }
  }, [onClick])

  useEffect(() => {
    const map = ref.current === null
      ? null
    : new google.maps.Map(ref.current, options)

    setMap(map)

    if (map !== null && onLoad) {
      onLoad(map)
    }

    return () => {
      if (map !== null) {
        if (onUnmount) {
          onUnmount(map)
        }


      }
    }
  }, [])

  return (
    <div
        id={id}
        ref={ref}
        style={mapContainerStyle}
        className={mapContainerClassName}
      >
        <MapContext.Provider value={map}>
          {map !== null ? children : <></>}
        </MapContext.Provider>
      </div>
  )
}

export const GoogleMapF = memo(GoogleMapFunctional)

export class GoogleMap extends PureComponent<GoogleMapProps, GoogleMapState> {
  state: GoogleMapState = {
    map: null,
  }

  registeredEvents: google.maps.MapsEventListener[] = []

  mapRef: HTMLDivElement | null = null

  getInstance = (): google.maps.Map | null => {
    if (this.mapRef === null) {
      return null
    }

    return new google.maps.Map(this.mapRef, this.props.options)
  }

  panTo = (latLng: google.maps.LatLng | google.maps.LatLngLiteral): void => {
    const map = this.getInstance()
    if (map) {
      map.panTo(latLng)
    }
  }

  setMapCallback = (): void => {
    if (this.state.map !== null) {
      if (this.props.onLoad) {
        this.props.onLoad(this.state.map)
      }
    }
  }

  componentDidMount(): void {
    const map = this.getInstance()

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: map,
    })

    this.setState(function setMap() {
      return {
        map,
      }
    }, this.setMapCallback)
  }

  componentDidUpdate(prevProps: GoogleMapProps): void {
    if (this.state.map !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.map,
      })
    }
  }

  componentWillUnmount(): void {
    if (this.state.map !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.map)
      }

      unregisterEvents(this.registeredEvents)
    }
  }

  getRef: React.LegacyRef<HTMLDivElement> = (ref: HTMLDivElement | null): void => {
    this.mapRef = ref
  }

  render(): ReactNode {
    return (
      <div
        id={this.props.id}
        ref={this.getRef}
        style={this.props.mapContainerStyle}
        className={this.props.mapContainerClassName}
      >
        <MapContext.Provider value={this.state.map}>
          {this.state.map !== null ? this.props.children : <></>}
        </MapContext.Provider>
      </div>
    )
  }
}

export default GoogleMap
