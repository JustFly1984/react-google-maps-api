/* global google */
import { PureComponent } from 'react'

import { unregisterEvents, applyUpdatersToPropsAndRegisterEvents } from '../../utils/helper'
import MapContext from '../../map-context'

import { KmlLayerPropTypes } from '../../proptypes'

const eventMap = {
  onClick: 'click',
  onDefaultViewportChanged: 'defaultviewport_changed',
  onStatusChanged: 'status_changed'
}

const updaterMap = {
  options (instance, options) {
    instance.setOptions(options)
  },
  url (instance, url) {
    instance.setUrl(url)
  },
  zIndex (instance, zIndex) {
    instance.setZIndex(zIndex)
  }
}

export class KmlLayer extends PureComponent {
  static propTypes = KmlLayerPropTypes

  static contextType = MapContext

  registerEvents = []

  state = {
    kmlLayer: null
  }

  componentDidMount = () => {
    const kmlLayer = new google.maps.KmlLayer(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

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

  componentDidUpdate = prevProps => {
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
