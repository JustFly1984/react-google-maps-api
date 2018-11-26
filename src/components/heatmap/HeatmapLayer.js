/* global google */
import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, HEATMAP_LAYER } from '../../constants'
import { HeatmapLayerPropTypes } from '../../proptypes'

const eventMap = {}

const updaterMap = {
  data (instance, data) {
    instance.setData(data)
  },
  map (instance, map) {
    instance.setMap(map)
  },
  options (instance, options) {
    instance.setOptions(options)
  },
}

export class HeatmapLayer extends PureComponent {
  static propTypes = HeatmapLayerPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    invariant(google.maps.visualization, `Did you include "libraries=visualization" in the URL?`)

    const heatmapLayer = new google.maps.visualization.HeatmapLayer(
      props.options
    )

    construct(
      HeatmapLayerPropTypes,
      updaterMap,
      props,
      heatmapLayer
    )

    heatmapLayer.setMap(context[MAP])

    this.state = {
      [HEATMAP_LAYER]: heatmapLayer,
    }

    this.getData = this.getData.bind(this)
    this.getMap = this.getMap.bind(this)
  }

  componentDidMount () {
    componentDidMount(this, this.state[HEATMAP_LAYER], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(this, this.state[HEATMAP_LAYER], eventMap, updaterMap, prevProps)
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const heatmapLayer = this.state[HEATMAP_LAYER]

    if (heatmapLayer) {
      heatmapLayer.setMap(null)
    }
  }

  render () {
    return false
  }

  getData () {
    return this.state[HEATMAP_LAYER].getData()
  }

  getMap () {
    return this.state[HEATMAP_LAYER].getMap()
  }
}

export default HeatmapLayer
