/* global google */
import { PureComponent, Children } from "react"
import { createPortal } from "react-dom"
import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"
// @ts-ignore
import invariant from "invariant"

const eventMap = {
  onCloseClick: "closeclick",
  onContentChanged: "content_changed",
  onDomReady: "domready",
  onPositionChanged: "position_changed",
  onZindexChanged: "zindex_changed"
}

const updaterMap = {
  options(
    instance: google.maps.InfoWindow,
    options: google.maps.InfoWindowOptions
  ) {
    instance.setOptions(options)
  },
  position(
    instance: google.maps.InfoWindow,
    position: google.maps.LatLng | google.maps.LatLngLiteral
  ) {
    instance.setPosition(position)
  },
  zIndex(instance: google.maps.InfoWindow, zIndex: number) {
    instance.setZIndex(zIndex)
  }
}

interface InfoWindowState {
  infoWindow?: google.maps.InfoWindow
}

interface InfoWindowProps {
  anchor?: google.maps.MVCObject
  options?: google.maps.InfoWindowOptions
  position: google.maps.LatLng | google.maps.LatLngLiteral
  zIndex?: number
  onCloseClick?: () => void
  onDomReady?: () => void
  onContentChanged?: () => void
  onPositionChanged?: () => void
  onZindexChanged?: () => void
}

export class InfoWindow extends PureComponent<
  InfoWindowProps,
  InfoWindowState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []
  containerElement: HTMLElement

  state: InfoWindowState = {
    infoWindow: null
  }

  componentDidMount = () => {
    const infoWindow = new google.maps.InfoWindow(this.props.options)

    this.containerElement = document.createElement("div")

    this.setState(
      () => ({
        infoWindow
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.infoWindow
        })

        this.state.infoWindow.setContent(this.containerElement)

        this.open(this.state.infoWindow, this.props.anchor)
      }
    )
  }

  componentDidUpdate(prevProps: InfoWindowProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.infoWindow
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)
  }

  render = () =>
    this.containerElement
      ? createPortal(Children.only(this.props.children), this.containerElement)
      : null

  open = (
    infoWindow: google.maps.InfoWindow,
    anchor: google.maps.MVCObject
  ) => {
    if (anchor) {
      infoWindow.open(this.context, anchor)
    } else if (infoWindow.getPosition()) {
      infoWindow.open(this.context)
    } else {
      invariant(
        false,
        `You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.`
      )
    }
  }

  getContent = () => this.state.infoWindow.getContent()

  getPosition = () => this.state.infoWindow.getPosition()

  getZIndex = () => this.state.infoWindow.getZIndex()
}

export default InfoWindow
