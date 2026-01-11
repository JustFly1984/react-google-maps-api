import {
  memo,
  useRef,
  type JSX,
  useEffect,
  type ReactNode,
  type CSSProperties,
  type ComponentType,
} from 'react'

import { MapContext } from './map-context.js'

export type GoogleMapProps = {
  children?: ReactNode | undefined
  id?: string | undefined
  mapContainerStyle?: CSSProperties | undefined
  mapContainerClassName?: string | undefined
  options?: google.maps.MapOptions | undefined
  extraMapTypes?: google.maps.MapType[] | undefined
  center?: google.maps.LatLng | google.maps.LatLngLiteral | undefined
  clickableIcons?: boolean | undefined
  heading?: number | undefined
  mapTypeId?: string | undefined
  streetView?: google.maps.StreetViewPanorama | undefined
  tilt?: number | undefined
  zoom?: number | undefined
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  onDblClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  onDrag?: (() => void) | undefined
  onDragEnd?: (() => void) | undefined
  onDragStart?: (() => void) | undefined
  onMouseMove?: ((e: google.maps.MapMouseEvent) => void) | undefined
  onMouseOut?: ((e: google.maps.MapMouseEvent) => void) | undefined
  onMouseOver?: ((e: google.maps.MapMouseEvent) => void) | undefined
  onMouseDown?: ((e: google.maps.MapMouseEvent) => void) | undefined
  onMouseUp?: ((e: google.maps.MapMouseEvent) => void) | undefined
  onRightClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  onMapTypeIdChanged?: (() => void) | undefined
  onTilesLoaded?: (() => void) | undefined
  onBoundsChanged?: (() => void) | undefined
  onCenterChanged?: (() => void) | undefined
  onHeadingChanged?: (() => void) | undefined
  onIdle?: (() => void) | undefined
  onProjectionChanged?: (() => void) | undefined
  onResize?: (() => void) | undefined
  onTiltChanged?: (() => void) | undefined
  onZoomChanged?: (() => void) | undefined
  onLoad?: ((map: google.maps.Map) => void | Promise<void>) | undefined
  onUnmount?: ((map: google.maps.Map) => void | Promise<void>) | undefined
}

function GoogleMapFunctional({
  children,
  options,
  id,
  mapContainerStyle,
  mapContainerClassName,
  center,
  clickableIcons,
  extraMapTypes,
  heading,
  mapTypeId,
  streetView,
  tilt,
  zoom,
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
  onMapTypeIdChanged,
  onTilesLoaded,
  onBoundsChanged,
  onCenterChanged,
  onHeadingChanged,
  onIdle,
  onProjectionChanged,
  onResize,
  onTiltChanged,
  onZoomChanged,
  onLoad,
  onUnmount,
}: GoogleMapProps): JSX.Element {
  const mapRef = useRef<google.maps.Map | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)
  const registeredEventsRef = useRef<google.maps.MapsEventListener[]>([])

  useEffect(() => {
    if (ref.current === null) {
      return
    }

    const map = new google.maps.Map(ref.current, options)
    mapRef.current = map

    if (onLoad) {
      onLoad(map)
    }

    return (): void => {
      if (onUnmount && map) {
        onUnmount(map)
      }
    }
  }, [])

  useEffect(() => {
    if (mapRef.current !== null && options) {
      mapRef.current.setOptions(options)
    }
  }, [options])

  useEffect(() => {
    if (mapRef.current !== null) {
      if (typeof center !== 'undefined') {
        mapRef.current.setCenter(center)
      }
      if (typeof clickableIcons !== 'undefined') {
        mapRef.current.setClickableIcons(clickableIcons)
      }
      if (typeof heading !== 'undefined') {
        mapRef.current.setHeading(heading)
      }
      if (typeof mapTypeId !== 'undefined') {
        mapRef.current.setMapTypeId(mapTypeId)
      }
      if (typeof streetView !== 'undefined') {
        mapRef.current.setStreetView(streetView)
      }
      if (typeof tilt !== 'undefined') {
        mapRef.current.setTilt(tilt)
      }
      if (typeof zoom !== 'undefined') {
        mapRef.current.setZoom(zoom)
      }
      if (extraMapTypes) {
        extraMapTypes.forEach((mapType, index) => {
          mapRef.current!.mapTypes.set(String(index), mapType)
        })
      }
    }
  }, [center, clickableIcons, heading, mapTypeId, streetView, tilt, zoom, extraMapTypes])

  useEffect(() => {
    const map = mapRef.current
    if (map === null) {
      return
    }

    registeredEventsRef.current.forEach(event => event.remove())
    registeredEventsRef.current = []

    const eventListeners: google.maps.MapsEventListener[] = []

    if (onClick) {
      eventListeners.push(google.maps.event.addListener(map, 'click', onClick))
    }
    if (onDblClick) {
      eventListeners.push(google.maps.event.addListener(map, 'dblclick', onDblClick))
    }
    if (onDrag) {
      eventListeners.push(google.maps.event.addListener(map, 'drag', onDrag))
    }
    if (onDragEnd) {
      eventListeners.push(google.maps.event.addListener(map, 'dragend', onDragEnd))
    }
    if (onDragStart) {
      eventListeners.push(google.maps.event.addListener(map, 'dragstart', onDragStart))
    }
    if (onMouseMove) {
      eventListeners.push(google.maps.event.addListener(map, 'mousemove', onMouseMove))
    }
    if (onMouseOut) {
      eventListeners.push(google.maps.event.addListener(map, 'mouseout', onMouseOut))
    }
    if (onMouseOver) {
      eventListeners.push(google.maps.event.addListener(map, 'mouseover', onMouseOver))
    }
    if (onMouseDown) {
      eventListeners.push(google.maps.event.addListener(map, 'mousedown', onMouseDown))
    }
    if (onMouseUp) {
      eventListeners.push(google.maps.event.addListener(map, 'mouseup', onMouseUp))
    }
    if (onRightClick) {
      eventListeners.push(google.maps.event.addListener(map, 'rightclick', onRightClick))
    }
    if (onMapTypeIdChanged) {
      eventListeners.push(google.maps.event.addListener(map, 'maptypeid_changed', onMapTypeIdChanged))
    }
    if (onTilesLoaded) {
      eventListeners.push(google.maps.event.addListener(map, 'tilesloaded', onTilesLoaded))
    }
    if (onBoundsChanged) {
      eventListeners.push(google.maps.event.addListener(map, 'bounds_changed', onBoundsChanged))
    }
    if (onCenterChanged) {
      eventListeners.push(google.maps.event.addListener(map, 'center_changed', onCenterChanged))
    }
    if (onHeadingChanged) {
      eventListeners.push(google.maps.event.addListener(map, 'heading_changed', onHeadingChanged))
    }
    if (onIdle) {
      eventListeners.push(google.maps.event.addListener(map, 'idle', onIdle))
    }
    if (onProjectionChanged) {
      eventListeners.push(google.maps.event.addListener(map, 'projection_changed', onProjectionChanged))
    }
    if (onResize) {
      eventListeners.push(google.maps.event.addListener(map, 'resize', onResize))
    }
    if (onTiltChanged) {
      eventListeners.push(google.maps.event.addListener(map, 'tilt_changed', onTiltChanged))
    }
    if (onZoomChanged) {
      eventListeners.push(google.maps.event.addListener(map, 'zoom_changed', onZoomChanged))
    }

    registeredEventsRef.current = eventListeners

    return (): void => {
      registeredEventsRef.current.forEach(event => event.remove())
      registeredEventsRef.current = []
    }
  }, [
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
    onMapTypeIdChanged,
    onTilesLoaded,
    onBoundsChanged,
    onCenterChanged,
    onHeadingChanged,
    onIdle,
    onProjectionChanged,
    onResize,
    onTiltChanged,
    onZoomChanged,
  ])

  return (
    <div
      id={id}
      ref={ref}
      style={mapContainerStyle}
      className={mapContainerClassName}
    >
      <MapContext.Provider value={mapRef.current}>
        {mapRef.current !== null ? children : null}
      </MapContext.Provider>
    </div>
  )
}

export const GoogleMapF: ComponentType<GoogleMapProps> = memo<GoogleMapProps>(GoogleMapFunctional)

export const GoogleMap = GoogleMapF
