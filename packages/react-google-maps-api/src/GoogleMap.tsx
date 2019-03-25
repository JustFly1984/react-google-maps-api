import * as React from "react"

import MapContext from "./map-context"
import { saveInstance, restoreInstance } from "./utils/instance-persistance"
import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "./utils/helper"

const eventMap = {
  onDblClick: "dblclick",
  onDragEnd: "dragend",
  onDragStart: "dragstart",
  onMapTypeIdChanged: "maptypeid_changed",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onRightClick: "rightclick",
  onTilesLoaded: "tilesloaded",
  onBoundsChanged: "bounds_changed",
  onCenterChanged: "center_changed",
  onClick: "click",
  onDrag: "drag",
  onHeadingChanged: "heading_changed",
  onIdle: "idle",
  onProjectionChanged: "projection_changed",
  onResize: "resize",
  onTiltChanged: "tilt_changed",
  onZoomChanged: "zoom_changed"
}

const updaterMap = {
  extraMapTypes(map: google.maps.Map, extra: google.maps.MapType[]) {
    extra.forEach((it, i) => {
      map.mapTypes.set(String(i), it)
    })
  },
  center(
    map: google.maps.Map,
    center: google.maps.LatLng | google.maps.LatLngLiteral
  ) {
    map.setCenter(center)
  },
  clickableIcons(map: google.maps.Map, clickable: boolean) {
    map.setClickableIcons(clickable)
  },
  heading(map: google.maps.Map, heading: number) {
    map.setHeading(heading)
  },
  mapTypeId(map: google.maps.Map, mapTypeId: string) {
    map.setMapTypeId(mapTypeId)
  },
  options(map: google.maps.Map, options: google.maps.MapOptions) {
    map.setOptions(options)
  },
  streetView(map: google.maps.Map, streetView: google.maps.StreetViewPanorama) {
    map.setStreetView(streetView)
  },
  tilt(map: google.maps.Map, tilt: number) {
    map.setTilt(tilt)
  },
  zoom(map: google.maps.Map, zoom: number) {
    map.setZoom(zoom)
  }
}

interface GoogleMapState {
  map: google.maps.Map | null
}

interface GoogleMapProps {
  id: string
  reuseSameInstance?: boolean
  mapContainerStyle?: React.CSSProperties
  mapContainerClassName?: string
  options?: google.maps.MapOptions
  extraMapTypes?: google.maps.MapType[]
  center?: google.maps.LatLng | google.maps.LatLngLiteral
  clickableIcons?: boolean
  heading?: number
  mapTypeId?: string
  streetView?: google.maps.StreetViewPanorama
  tilt?: number
  zoom?: number
  onClick?: (e: MouseEvent) => void
  onDblClick?: (e: MouseEvent) => void
  onDrag?: () => void
  onDragEnd?: () => void
  onDragStart?: () => void
  onMapTypeIdChanged?: () => void
  onMouseMove?: (e: MouseEvent) => void
  onMouseOut?: (e: MouseEvent) => void
  onMouseOver?: (e: MouseEvent) => void
  onRightClick?: (e: MouseEvent) => void
  onTilesLoaded?: () => void
  onBoundsChanged?: () => void
  onCenterChanged?: () => void
  onHeadingChanged?: () => void
  onIdle?: () => void
  onProjectionChanged?: () => void
  onResize?: () => void
  onTiltChanged?: () => void
  onZoomChanged?: () => void
  onLoad: (map: google.maps.Map) => void | Promise<void>
}

export class GoogleMap extends React.PureComponent<
  GoogleMapProps,
  GoogleMapState
> {
  public static defaultProps: GoogleMapProps = {
    id: "defaultMapId",
    reuseSameInstance: false,
    onLoad: () => {}
  }

  constructor(props: GoogleMapProps) {
    super(props)

    this.mapRef = null
  }

  state: GoogleMapState = {
    map: null
  }

  registeredEvents: google.maps.MapsEventListener[] = []

  mapRef: HTMLElement | null

  getInstance = (): google.maps.Map | null => {
    const { reuseSameInstance, ...rest } = this.props

    const instance = reuseSameInstance && restoreInstance(rest)

    return instance
      ? instance
      : new google.maps.Map(this.mapRef, this.props.options)
  }

  componentDidMount = () => {
    this.setState(
      () => ({
        map: this.getInstance()
      }),
      () => {
        if (this.state.map !== null) {
          this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap,
            eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: this.state.map
          })

          this.props.onLoad(this.state.map)
        }
      }
    )
  }

  componentDidUpdate = (prevProps: GoogleMapProps) => {
    if (this.state.map !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.map
      })
    }
  }

  componentWillUnmount = () => {
    if (this.state.map) {
      const { reuseSameInstance, id } = this.props

      reuseSameInstance && saveInstance(id, this.state.map)

      unregisterEvents(this.registeredEvents)
    }
  }

  getRef = (ref: HTMLDivElement | null): void => {
    this.mapRef = ref
  }

  render = () => {
    const {
      id,
      mapContainerStyle,
      mapContainerClassName,
      children
    } = this.props

    const { map } = this.state

    return (
      <div
        id={id}
        ref={this.getRef}
        style={mapContainerStyle}
        className={mapContainerClassName}
      >
        <MapContext.Provider value={map}>
          {map !== null ? children : <></>}
        </MapContext.Provider>
      </div>
    )
  }
}

export default GoogleMap
