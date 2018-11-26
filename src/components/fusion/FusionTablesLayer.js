/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
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

    construct(
      FusionTablesLayerPropTypes,
      updaterMap,
      props,
      fusionTablesLayer
    )

    fusionTablesLayer.setMap(context[MAP])

    this.state = {
      [FUSION_TABLES_LAYER]: fusionTablesLayer,
    }
  }

  componentDidMount () {
    componentDidMount(this, this.state[FUSION_TABLES_LAYER], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[FUSION_TABLES_LAYER], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const fusionTablesLayer = this.state[FUSION_TABLES_LAYER]

    if (fusionTablesLayer) {
      fusionTablesLayer.setMap(null)
    }
  }

  render () {
    return false
  }

  getMap () {
    return this.state[FUSION_TABLES_LAYER].getMap()
  }
}

export default FusionTablesLayer
