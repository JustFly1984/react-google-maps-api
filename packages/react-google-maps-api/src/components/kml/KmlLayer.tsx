import { PureComponent } from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"
import MapContext from "../../map-context"

const eventMap = {
  onClick: "click",
  onDefaultViewportChanged: "defaultviewport_changed",
  onStatusChanged: "status_changed"
}

const updaterMap = {
  options(
    instance: google.maps.KmlLayer,
    options: google.maps.KmlLayerOptions
  ) {
    instance.setOptions(options)
  },
  url(instance: google.maps.KmlLayer, url: string) {
    instance.setUrl(url)
  },
  zIndex(instance: google.maps.KmlLayer, zIndex: number) {
    instance.setZIndex(zIndex)
  }
}

interface KmlLayerState {
  kmlLayer?: google.maps.KmlLayer
}

interface KmlLayerProps {
  options?: google.maps.KmlLayerOptions
  url?: string
  zIndex?: number
  onClick?: (e: google.maps.MouseEvent) => void
  onDefaultViewportChanged?: () => void
  onStatusChanged?: () => void
}

export class KmlLayer extends PureComponent<KmlLayerProps, KmlLayerState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: KmlLayerState = {
    kmlLayer: null
  }

  componentDidMount = () => {
    const kmlLayer = new google.maps.KmlLayer(this.props.options)

    this.setState(
      () => ({
        kmlLayer
      }),
      () => {
        this.state.kmlLayer.setMap(this.context)

        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.kmlLayer
        })
      }
    )
  }

  componentDidUpdate = (prevProps: KmlLayerProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.kmlLayer
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.kmlLayer && this.state.kmlLayer.setMap(null)
  }

  render = () => null

  getDefaultViewport = () => this.state.kmlLayer.getDefaultViewport()

  getMap = () => this.state.kmlLayer.getMap()

  getMetadata = () => this.state.kmlLayer.getMetadata()

  getStatus = () => this.state.kmlLayer.getStatus()

  getUrl = () => this.state.kmlLayer.getUrl()

  getZIndex = () => this.state.kmlLayer.getZIndex()
}

export default KmlLayer
