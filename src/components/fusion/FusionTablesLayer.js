/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  getDerivedStateFromProps,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, FUSION_TABLES_LAYER } from '../../constants'
import { FusionTablesLayerPropTypes } from '../../proptypes'

const eventMap = {
  onClick: 'click',
}

const updaterMap = {
  map (instance, map) {
    instance.setMap(map)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
}

export class FusionTablesLayer extends PureComponent {
  static propTypes = FusionTablesLayerPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const fusionTablesLayer = new google.maps.FusionTablesLayer(
      props.options
    )

    this.state = {
      [FUSION_TABLES_LAYER]: fusionTablesLayer,
      prevProps: construct(
        FusionTablesLayerPropTypes,
        updaterMap,
        props,
        fusionTablesLayer
      )
    }

    fusionTablesLayer.setMap(context[MAP])
  }

  static getDerivedStateFromProps (props, state) {
    return getDerivedStateFromProps(
      props,
      state,
      this.state[FUSION_TABLES_LAYER],
      eventMap,
      updaterMap
    )
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const fusionTablesLayer = this.state[FUSION_TABLES_LAYER]

    if (fusionTablesLayer) {
      fusionTablesLayer.setMap(null)
    }
  }

  render () {
    return null
  }

  getMap = () =>
    this.state[FUSION_TABLES_LAYER].getMap()
}

export default FusionTablesLayer
