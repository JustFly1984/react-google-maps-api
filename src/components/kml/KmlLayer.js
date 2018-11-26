/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, KML_LAYER } from '../../constants'
import { KmlLayerPropTypes } from '../../proptypes'

const eventMap = {
  onClick: 'click',
  onDefaultViewportChanged: 'defaultviewport_changed',
  onStatusChanged: 'status_changed',
}

const updaterMap = {
  map (instance, map) {
    instance.setMap(map)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
  url (instance, url) {
    instance.setUrl(url)
  },
  zIndex (instance, zIndex) {
    instance.setZIndex(zIndex)
  },
}

export class KmlLayer extends PureComponent {
  static propTypes = KmlLayerPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const kmlLayer = new google.maps.KmlLayer(
      props.options
    )

    this.state = {
      [KML_LAYER]: kmlLayer,
      prevProps: construct(
        KmlLayerPropTypes,
        updaterMap,
        props,
        kmlLayer
      )
    }

    kmlLayer.setMap(context[MAP])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[KML_LAYER],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const kmlLayer = this.state[KML_LAYER]

    if (kmlLayer) {
      kmlLayer.setMap(null)
    }
  }

  render () {
    return null
  }

  getDefaultViewport = () =>
    this.state[KML_LAYER].getDefaultViewport()

  getMap = () =>
    this.state[KML_LAYER].getMap()

  getMetadata = () =>
    this.state[KML_LAYER].getMetadata()

  getStatus = () =>
    this.state[KML_LAYER].getStatus()

  getUrl = () =>
    this.state[KML_LAYER].getUrl()

  getZIndex = () =>
    this.state[KML_LAYER].getZIndex()
}

export default KmlLayer
