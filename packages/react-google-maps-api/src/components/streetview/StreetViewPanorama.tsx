import * as React from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

const eventMap = {
  onCloseClick: "closeclick",
  onPanoChanged: "pano_changed",
  onPositionChanged: "position_changed",
  onPovChanged: "pov_changed",
  onResize: "resize",
  onStatusChanged: "status_changed",
  onVisibleChanged: "visible_changed",
  onZoomChanged: "zoom_changed"
}

const updaterMap = {
  register(
    instance: google.maps.StreetViewPanorama,
    provider: (input: string) => google.maps.StreetViewPanoramaData,
    options: any
  ) {
    // @ts-ignore
    instance.registerPanoProvider(provider, options)
  },
  links(
    instance: google.maps.StreetViewPanorama,
    links: google.maps.StreetViewLink[]
  ) {
    instance.setLinks(links)
  },
  motionTracking(
    instance: google.maps.StreetViewPanorama,
    motionTracking: boolean
  ) {
    instance.setMotionTracking(motionTracking)
  },
  options(
    instance: google.maps.StreetViewPanorama,
    options: google.maps.StreetViewPanoramaOptions
  ) {
    instance.setOptions(options)
  },
  pano(instance: google.maps.StreetViewPanorama, pano: string) {
    instance.setPano(pano)
  },
  position(
    instance: google.maps.StreetViewPanorama,
    position: google.maps.LatLng | google.maps.LatLngLiteral
  ) {
    instance.setPosition(position)
  },
  pov(
    instance: google.maps.StreetViewPanorama,
    pov: google.maps.StreetViewPov
  ) {
    instance.setPov(pov)
  },
  visible(instance: google.maps.StreetViewPanorama, visible: boolean) {
    instance.setVisible(visible)
  },
  zoom(instance: google.maps.StreetViewPanorama, zoom: number) {
    instance.setZoom(zoom)
  }
}

interface StreetViewPanoramaState {
  streetViewPanorama: google.maps.StreetViewPanorama | null;
}

interface StreetViewPanoramaProps {
  containerElement: Element;
  options?: google.maps.StreetViewPanoramaOptions;
  onCloseclick?: (event: google.maps.event) => void;
  onPanoChanged?: () => void;
  onPositionChanged?: () => void;
  onPovChanged?: () => void;
  onResize?: () => void;
  onStatusChanged?: () => void;
  onVisibleChanged?: () => void;
  onZoomChange?: () => void;
  onLoad?: (streetViewPanorama: any) => void; // TODO: any to proper type
}

export class StreetViewPanorama extends React.PureComponent<
  StreetViewPanoramaProps,
  StreetViewPanoramaState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: StreetViewPanoramaState = {
    streetViewPanorama: null
  }

  componentDidMount = () => {
    const streetViewPanorama = this.context.getStreetView()

    this.setState(
      () => ({
        streetViewPanorama
      }),
      () => {
        if (this.state.streetViewPanorama !== null) {
          this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap,
            eventMap,
            prevProps: {},
            nextProps: this.props,
            instance: this.state.streetViewPanorama
          })

          if (this.props.onLoad) {
            this.props.onLoad(this.state.streetViewPanorama)
          }
        }
      }
    )
  }

  componentDidUpdate = (prevProps: StreetViewPanoramaProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.streetViewPanorama
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.state.streetViewPanorama) {
      this.state.streetViewPanorama.setVisible(false)
    }
  }

  render () {
    return null
  }
}

export default StreetViewPanorama
