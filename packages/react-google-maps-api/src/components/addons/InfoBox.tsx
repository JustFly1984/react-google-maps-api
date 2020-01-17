/* global google */
/* eslint-disable filenames/match-exported */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import invariant from 'invariant'
import {
  InfoBox as GoogleMapsInfoBox,
  InfoBoxOptions as GoogleMapsInfoBoxOptions,
} from '@react-google-maps/infobox'
import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'
import MapContext from '../../map-context'

const eventMap = {
  onCloseClick: 'closeclick',
  onContentChanged: 'content_changed',
  onDomReady: 'domready',
  onPositionChanged: 'position_changed',
  onZindexChanged: 'zindex_changed',
}

const updaterMap = {
  options(instance: GoogleMapsInfoBox, options: GoogleMapsInfoBoxOptions): void {
    instance.setOptions(options)
  },
  position(
    instance: GoogleMapsInfoBox,
    position: google.maps.LatLng | google.maps.LatLngLiteral
  ): void {
    if (position instanceof google.maps.LatLng) {
      instance.setPosition(position)
    } else {
      instance.setPosition(new google.maps.LatLng(position.lat, position.lng))
    }
  },
  visible(instance: GoogleMapsInfoBox, visible: boolean): void {
    instance.setVisible(visible)
  },
  zIndex(instance: GoogleMapsInfoBox, zIndex: number): void {
    instance.setZIndex(zIndex)
  },
}

type InfoBoxOptions = Omit<GoogleMapsInfoBoxOptions, 'position'> & {
  position?: google.maps.LatLng | google.maps.LatLngLiteral
}

interface InfoBoxState {
  infoBox: GoogleMapsInfoBox | null
}

export interface InfoBoxProps {
  /** Can be any MVCObject that exposes a LatLng position property and optionally a Point anchorPoint property for calculating the pixelOffset. The anchorPoint is the offset from the anchor's position to the tip of the InfoBox. */
  anchor?: google.maps.MVCObject
  options?: InfoBoxOptions
  /** The LatLng at which to display this InfoBox. If the InfoBox is opened with an anchor, the anchor's position will be used instead. */
  position?: google.maps.LatLng | google.maps.LatLngLiteral
  /** All InfoBoxes are displayed on the map in order of their zIndex, with higher values displaying in front of InfoBoxes with lower values. By default, InfoBoxes are displayed according to their latitude, with InfoBoxes of lower latitudes appearing in front of InfoBoxes at higher latitudes. InfoBoxes are always displayed in front of markers. */
  zIndex?: number
  /** This event is fired when the close button was clicked. */
  onCloseClick?: () => void
  /** This event is fired when the <div> containing the InfoBox's content is attached to the DOM. You may wish to monitor this event if you are building out your info window content dynamically. */
  onDomReady?: () => void
  /** This event is fired when the content property changes. */
  onContentChanged?: () => void
  /** This event is fired when the position property changes. */
  onPositionChanged?: () => void
  /** This event is fired when the InfoBox's zIndex changes. */
  onZindexChanged?: () => void
  /** This callback is called when the infoBox instance has loaded. It is called with the infoBox instance. */
  onLoad?: (infoBox: GoogleMapsInfoBox) => void
  /** This callback is called when the component unmounts. It is called with the infoBox instance. */
  onUnmount?: (infoBox: GoogleMapsInfoBox) => void
}

export class InfoBoxComponent extends React.PureComponent<InfoBoxProps, InfoBoxState> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []
  containerElement: HTMLElement | null = null

  state: InfoBoxState = {
    infoBox: null,
  }

  open = (infoBox: GoogleMapsInfoBox, anchor?: google.maps.MVCObject): void => {
    if (anchor) {
      infoBox.open(this.context, anchor)
    } else if (infoBox.getPosition()) {
      infoBox.open(this.context)
    } else {
      invariant(false, 'You must provide either an anchor or a position prop for <InfoBox>.')
    }
  }

  setInfoBoxCallback = (): void => {
    const { anchor, onLoad } = this.props
    const { infoBox } = this.state

    if (infoBox !== null && this.containerElement !== null) {
      infoBox.setContent(this.containerElement)
      this.open(infoBox, anchor)

      if (onLoad) {
        onLoad(infoBox)
      }
    }
  }

  componentDidMount(): void {
    const { options } = this.props
    const { position, ...infoBoxOptions }: InfoBoxOptions = options || {}

    let positionLatLng: google.maps.LatLng | undefined
    if (position && !(position instanceof google.maps.LatLng)) {
      positionLatLng = new google.maps.LatLng(position.lat, position.lng)
    }

    const infoBox = new GoogleMapsInfoBox({
      ...infoBoxOptions,
      ...(positionLatLng ? { position: positionLatLng } : {}),
    })

    this.containerElement = document.createElement('div')

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: infoBox,
    })

    this.setState({ infoBox }, this.setInfoBoxCallback)
  }

  componentDidUpdate(prevProps: InfoBoxProps): void {
    const { infoBox } = this.state

    if (infoBox !== null) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: infoBox,
      })
    }
  }

  componentWillUnmount(): void {
    const { onUnmount } = this.props
    const { infoBox } = this.state

    if (infoBox !== null) {
      if (onUnmount) {
        onUnmount(infoBox)
      }

      unregisterEvents(this.registeredEvents)
      infoBox.close()
    }
  }

  render(): React.ReactPortal | null {
    if (!this.containerElement) {
      return null
    }

    return ReactDOM.createPortal(React.Children.only(this.props.children), this.containerElement)
  }
}

export default InfoBoxComponent
