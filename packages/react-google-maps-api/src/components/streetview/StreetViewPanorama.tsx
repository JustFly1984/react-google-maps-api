import { type ContextType, PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents,
} from '../../utils/helper.js'

import MapContext from '../../map-context.js'

const eventMap = {
  onCloseClick: 'closeclick',
  onPanoChanged: 'pano_changed',
  onPositionChanged: 'position_changed',
  onPovChanged: 'pov_changed',
  onResize: 'resize',
  onStatusChanged: 'status_changed',
  onVisibleChanged: 'visible_changed',
  onZoomChanged: 'zoom_changed',
}

const updaterMap = {
  register(
    instance: google.maps.StreetViewPanorama,
    provider: (input: string) => google.maps.StreetViewPanoramaData,
    options: google.maps.PanoProviderOptions
  ): void {
    instance.registerPanoProvider(provider, options)
  },
  links(
    instance: google.maps.StreetViewPanorama,
    links: google.maps.StreetViewLink[]
  ): void {
    instance.setLinks(links)
  },
  motionTracking(
    instance: google.maps.StreetViewPanorama,
    motionTracking: boolean
  ): void {
    instance.setMotionTracking(motionTracking)
  },
  options(
    instance: google.maps.StreetViewPanorama,
    options: google.maps.StreetViewPanoramaOptions
  ): void {
    instance.setOptions(options)
  },
  pano(instance: google.maps.StreetViewPanorama, pano: string): void {
    instance.setPano(pano)
  },
  position(
    instance: google.maps.StreetViewPanorama,
    position: google.maps.LatLng | google.maps.LatLngLiteral
  ): void {
    instance.setPosition(position)
  },
  pov(
    instance: google.maps.StreetViewPanorama,
    pov: google.maps.StreetViewPov
  ): void {
    instance.setPov(pov)
  },
  visible(instance: google.maps.StreetViewPanorama, visible: boolean): void {
    instance.setVisible(visible)
  },
  zoom(instance: google.maps.StreetViewPanorama, zoom: number): void {
    instance.setZoom(zoom)
  },
}

type StreetViewPanoramaState = {
  streetViewPanorama: google.maps.StreetViewPanorama | null
}

export type StreetViewPanoramaProps = {
  options?: google.maps.StreetViewPanoramaOptions | undefined
  /** This event is fired when the close button is clicked. */
  onCloseclick?: ((event: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the panorama's pano id changes. The pano may change as the user navigates through the panorama or the position is manually set. Note that not all position changes trigger a pano_changed. */
  onPanoChanged?: (() => void) | undefined
  /** This event is fired when the panorama's position changes. The position changes as the user navigates through the panorama or the position is set manually. */
  onPositionChanged?: (() => void) | undefined
  /** This event is fired when the panorama's point-of-view changes. The point of view changes as the pitch, zoom, or heading changes. */
  onPovChanged?: (() => void) | undefined
  /** Developers should trigger this event on the panorama when its div changes size: google.maps.event.trigger(panorama, 'resize'). */
  onResize?: (() => void) | undefined
  /** This event is fired after every panorama lookup by id or location, via setPosition() or setPano(). */
  onStatusChanged?: (() => void) | undefined
  /** This event is fired when the panorama's visibility changes. The visibility is changed when the Pegman is dragged onto the map, the close button is clicked, or setVisible() is called. */
  onVisibleChanged?: (() => void) | undefined
  /** This event is fired when the panorama's zoom level changes. */
  onZoomChange?: (() => void) | undefined
  /** This callback is called when the streetViewPanorama instance has loaded. It is called with the streetViewPanorama instance. */
  onLoad?:
    | ((streetViewPanorama: google.maps.StreetViewPanorama) => void)
    | undefined
  /** This callback is called when the component unmounts. It is called with the streetViewPanorama instance. */
  onUnmount?:
    | ((streetViewPanorama: google.maps.StreetViewPanorama) => void)
    | undefined
}

export class StreetViewPanorama extends PureComponent<
  StreetViewPanoramaProps,
  StreetViewPanoramaState
> {
  static override contextType = MapContext

  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  override state: StreetViewPanoramaState = {
    streetViewPanorama: null,
  }

  setStreetViewPanoramaCallback = (): void => {
    if (this.state.streetViewPanorama !== null && this.props.onLoad) {
      this.props.onLoad(this.state.streetViewPanorama)
    }
  }

  override componentDidMount(): void {
    const streetViewPanorama = this.context?.getStreetView() ?? null

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: streetViewPanorama,
    })

    this.setState(() => {
      return {
        streetViewPanorama,
      }
    }, this.setStreetViewPanoramaCallback)
  }

  override componentDidUpdate(prevProps: StreetViewPanoramaProps): void {
    if (this.state.streetViewPanorama !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.streetViewPanorama,
      })
    }
  }

  override componentWillUnmount(): void {
    if (this.state.streetViewPanorama !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.streetViewPanorama)
      }

      unregisterEvents(this.registeredEvents)

      this.state.streetViewPanorama.setVisible(false)
    }
  }

  override render(): null {
    return null
  }
}

export default StreetViewPanorama
