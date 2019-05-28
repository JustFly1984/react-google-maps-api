import * as React from "react"

import MapContext from "./map-context"

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
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
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
    extra.forEach(function forEachExtra(it, i) {
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
  map: google.maps.Map | null;
}

export interface GoogleMapProps {
  id?: string;
  mapContainerStyle?: React.CSSProperties;
  mapContainerClassName?: string;
  options?: google.maps.MapOptions;
  extraMapTypes?: google.maps.MapType[];
  center?: google.maps.LatLng | google.maps.LatLngLiteral;
  clickableIcons?: boolean;
  heading?: number;
  mapTypeId?: string;
  streetView?: google.maps.StreetViewPanorama;
  tilt?: number;
  zoom?: number;
  onClick?: (e: google.maps.MouseEvent) => void;
  onDblClick?: (e: google.maps.MouseEvent) => void;
  onDrag?: () => void;
  onDragEnd?: () => void;
  onDragStart?: () => void;
  onMapTypeIdChanged?: () => void;
  onMouseMove?: (e: google.maps.MouseEvent) => void;
  onMouseOut?: (e: google.maps.MouseEvent) => void;
  onMouseOver?: (e: google.maps.MouseEvent) => void;
  onRightClick?: (e: google.maps.MouseEvent) => void;
  onTilesLoaded?: () => void;
  onBoundsChanged?: () => void;
  onCenterChanged?: () => void;
  onHeadingChanged?: () => void;
  onIdle?: () => void;
  onProjectionChanged?: () => void;
  onResize?: () => void;
  onTiltChanged?: () => void;
  onZoomChanged?: () => void;
  onLoad?: (map: google.maps.Map) => void | Promise<void>;
  onUnmount?: (map: google.maps.Map) => void | Promise<void>;
}

export class GoogleMap extends React.PureComponent<GoogleMapProps, GoogleMapState> {
  state: GoogleMapState = {
    map: null
  }

  registeredEvents: google.maps.MapsEventListener[] = []

  mapRef: HTMLElement | null = null

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  getInstance = (): google.maps.Map | null => {
    return new google.maps.Map(this.mapRef, this.props.options)
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setMapCallback = () => {
    if (this.state.map !== null) {
      if (this.props.onLoad) {
        this.props.onLoad(this.state.map)
      }
    }
  }

  componentDidMount() {
    const map = this.getInstance()

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: map
    })

    function setMap() {
      return {
        map
      }
    }

    this.setState(
      setMap,
      this.setMapCallback
    )
  }

  componentDidUpdate(prevProps: GoogleMapProps) {
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

  componentWillUnmount() {
    if (this.state.map !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.map)
      }

      unregisterEvents(this.registeredEvents)
    }
  }

  /* eslint-disable @getify/proper-arrows/name */
  /* eslint-disable @getify/proper-arrows/this */
  getRef = (ref: HTMLDivElement | null): void => {
    this.mapRef = ref
  }

  render() {
    return (
      <div
        id={this.props.id}
        ref={this.getRef}
        style={this.props.mapContainerStyle}
        className={this.props.mapContainerClassName}
      >
        <MapContext.Provider value={this.state.map}>
          {
            this.state.map !== null
              ? this.props.children
              : <></>
          }
        </MapContext.Provider>
      </div>
    )
  }
}

export default GoogleMap
