/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    construct(
      KmlLayerPropTypes,
      updaterMap,
      props,
      kmlLayer
    )

    kmlLayer.setMap(context[MAP])

    this.state = {
      [KML_LAYER]: kmlLayer,
    }
  }

  componentDidMount () {
    componentDidMount(this, this.state[KML_LAYER], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[KML_LAYER], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const kmlLayer = this.state[KML_LAYER]

    if (kmlLayer) {
      kmlLayer.setMap(null)
    }
  }

  render () {
    return false
  }

  getDefaultViewport () {
    return this.state[KML_LAYER].getDefaultViewport()
  }

  getMap () {
    return this.state[KML_LAYER].getMap()
  }

  getMetadata () {
    return this.state[KML_LAYER].getMetadata()
  }

  getStatus () {
    return this.state[KML_LAYER].getStatus()
  }

  getUrl () {
    return this.state[KML_LAYER].getUrl()
  }

  getZIndex () {
    return this.state[KML_LAYER].getZIndex()
  }
}

export default KmlLayer
