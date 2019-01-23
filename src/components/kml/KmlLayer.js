/* global google */
import React, { PureComponent } from 'react'

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

  constructor (props, context) {
    super(props, context)

    this.state = {
      kmlLayer: new google.maps.KmlLayer(
        Object.assign(
          {
            map: context
          },
          props.options
        )
      )
    }

    this.registerEvents = []
  }

  componentDidMount () {
    this.state.kmlLayer.setMap(this.context)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps: {},
      nextProps: this.props,
      instance: this.state.kmlLayer
    })
  }

  componentDidUpdate (prevProps) {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.kmlLayer
    })
  }

  componentWillUnmount () {
    unregisterEvents(this.registeredEvents)

    if (this.state.kmlLayer) {
      this.state.kmlLayer.setMap(null)
    }
  }

  render () {
    return <></>
  }

  getDefaultViewport () {
    return this.state.kmlLayer.getDefaultViewport()
  }

  getMap () {
    return this.state.kmlLayer.getMap()
  }

  getMetadata () {
    return this.state.kmlLayer.getMetadata()
  }

  getStatus () {
    return this.state.kmlLayer.getStatus()
  }

  getUrl () {
    return this.state.kmlLayer.getUrl()
  }

  getZIndex () {
    return this.state.kmlLayer.getZIndex()
  }
}

export default KmlLayer
