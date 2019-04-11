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
    console.log({instance, url})
    instance.setUrl(url)
  },
  zIndex(instance: google.maps.KmlLayer, zIndex: number) {
    instance.setZIndex(zIndex)
  }
}

interface KmlLayerState {
  kmlLayer: google.maps.KmlLayer | null;
}

export interface KmlLayerProps {
  options?: google.maps.KmlLayerOptions;
  url?: string;
  zIndex?: number;
  onClick?: (e: google.maps.MouseEvent) => void;
  onDefaultViewportChanged?: () => void;
  onStatusChanged?: () => void;
  onLoad: (kmlLayer: google.maps.KmlLayer) => void;
  onUnmount: (kmlLayer: google.maps.KmlLayer) => void;
}

export class KmlLayer extends PureComponent<KmlLayerProps, KmlLayerState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: KmlLayerState = {
    kmlLayer: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setKmlLayerCallback = () => {
    if (this.state.kmlLayer !== null && this.props.onLoad) {
      this.props.onLoad(this.state.kmlLayer)
    }
  }

  componentDidMount() {
    const kmlLayer = new google.maps.KmlLayer({
      ...this.props.options,
      map: this.context
    })

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: kmlLayer
    })

    function setLmlLayer() {
      return {
        kmlLayer
      }
    }

    this.setState(
      setLmlLayer,
      this.setKmlLayerCallback
    )
  }

  componentDidUpdate(prevProps: KmlLayerProps) {
    if (this.state.kmlLayer !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.kmlLayer
      })
    }
  }

  componentWillUnmount() {
    if (this.state.kmlLayer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.kmlLayer)
      }

      unregisterEvents(this.registeredEvents)

      this.state.kmlLayer.setMap(null)
    }
  }

  render() {
    return null
  }
}

export default KmlLayer
