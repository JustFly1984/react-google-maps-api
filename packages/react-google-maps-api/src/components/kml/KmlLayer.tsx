import { type ContextType, PureComponent } from 'react'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents,
} from '../../utils/helper.js'

import MapContext from '../../map-context.js'

const eventMap = {
  onClick: 'click',
  onDefaultViewportChanged: 'defaultviewport_changed',
  onStatusChanged: 'status_changed',
}

const updaterMap = {
  options(
    instance: google.maps.KmlLayer,
    options: google.maps.KmlLayerOptions
  ): void {
    instance.setOptions(options)
  },
  url(instance: google.maps.KmlLayer, url: string): void {
    instance.setUrl(url)
  },
  zIndex(instance: google.maps.KmlLayer, zIndex: number): void {
    instance.setZIndex(zIndex)
  },
}

type KmlLayerState = {
  kmlLayer: google.maps.KmlLayer | null
}

export type KmlLayerProps = {
  options?: google.maps.KmlLayerOptions | undefined
  /** The URL of the KML document to display. */
  url?: string | undefined
  /** The z-index of the layer. */
  zIndex?: number | undefined
  /** This event is fired when a feature in the layer is clicked. */
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined
  /** This event is fired when the KML layers default viewport has changed. */
  onDefaultViewportChanged?: (() => void) | undefined | undefined
  /** This event is fired when the KML layer has finished loading. At this point it is safe to read the status property to determine if the layer loaded successfully. */
  onStatusChanged?: (() => void) | undefined | undefined
  /** This callback is called when the kmlLayer instance has loaded. It is called with the kmlLayer instance. */
  onLoad?: ((kmlLayer: google.maps.KmlLayer) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the kmlLayer instance. */
  onUnmount?: ((kmlLayer: google.maps.KmlLayer) => void) | undefined
}

export class KmlLayer extends PureComponent<KmlLayerProps, KmlLayerState> {
  static override contextType = MapContext
  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  override state: KmlLayerState = {
    kmlLayer: null,
  }

  setKmlLayerCallback = (): void => {
    if (this.state.kmlLayer !== null && this.props.onLoad) {
      this.props.onLoad(this.state.kmlLayer)
    }
  }

  override componentDidMount(): void {
    const kmlLayer = new google.maps.KmlLayer({
      ...this.props.options,
      map: this.context,
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: kmlLayer,
    })

    this.setState(function setLmlLayer() {
      return {
        kmlLayer,
      }
    }, this.setKmlLayerCallback)
  }

  override componentDidUpdate(prevProps: KmlLayerProps): void {
    if (this.state.kmlLayer !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.kmlLayer,
      })
    }
  }

  override componentWillUnmount(): void {
    if (this.state.kmlLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.kmlLayer)
      }

      unregisterEvents(this.registeredEvents)

      this.state.kmlLayer.setMap(null)
    }
  }

  override render(): null {
    return null
  }
}

export default KmlLayer
