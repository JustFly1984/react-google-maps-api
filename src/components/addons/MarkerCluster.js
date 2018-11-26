// eslint-disable-next-line filenames/match-exported
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MarkerClustererPlus from 'marker-clusterer-plus'

import {
  construct,
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount
} from '../../utils/MapChildHelper'

import { MAP, ANCHOR, MARKER_CLUSTERER } from '../../constants'

import { MarkerClustererPropTypes } from '../../proptypes'

const eventMap = {
  onClick: 'click',
  onClusteringBegin: 'clusteringbegin',
  onClusteringEnd: 'clusteringend',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
}

const updaterMap = {
  averageCenter (instance, averageCenter) {
    instance.setAverageCenter(averageCenter)
  },
  batchSizeIE (instance, batchSizeIE) {
    instance.setBatchSizeIE(batchSizeIE)
  },
  batchSize (instance, batchSize) {
    instance.setBatchSize(batchSize)
  },
  calculator (instance, calculator) {
    instance.setCalculator(calculator)
  },
  clusterClass (instance, clusterClass) {
    instance.setClusterClass(clusterClass)
  },
  enableRetinaIcons (instance, enableRetinaIcons) {
    instance.setEnableRetinaIcons(enableRetinaIcons)
  },
  gridSize (instance, gridSize) {
    instance.setGridSize(gridSize)
  },
  ignoreHidden (instance, ignoreHidden) {
    instance.setIgnoreHidden(ignoreHidden)
  },
  imageExtension (instance, imageExtension) {
    instance.setImageExtension(imageExtension)
  },
  imagePath (instance, imagePath) {
    instance.setImagePath(imagePath)
  },
  imageSizes (instance, imageSizes) {
    instance.setImageSizes(imageSizes)
  },
  maxZoom (instance, maxZoom) {
    instance.setMaxZoom(maxZoom)
  },
  minimumClusterSize (instance, minimumClusterSize) {
    instance.setMinimumClusterSize(minimumClusterSize)
  },
  styles (instance, styles) {
    instance.setStyles(styles)
  },
  title (instance, title) {
    instance.setTitle(title)
  },
  zoomOnClick (instance, zoomOnClick) {
    instance.setZoomOnClick(zoomOnClick)
  },
}

export class MarkerClusterer extends PureComponent {
  static propTypes = MarkerClustererPropTypes

  static contextTypes = {
    [MAP]: PropTypes.object,
  }

  static childContextTypes = {
    [ANCHOR]: PropTypes.object,
    [MARKER_CLUSTERER]: PropTypes.object,
  }

  constructor (props, context) {
    super(props, context)

    const markerClusterer = new MarkerClustererPlus()

    construct(
      MarkerClusterer.propTypes,
      updaterMap,
      props,
      markerClusterer
    )

    markerClusterer.setMap(context[MAP])

    this.state = {
      [MARKER_CLUSTERER]: markerClusterer,
    }
  }

  getChildContext () {
    const markerClusterer = this.state[MARKER_CLUSTERER]

    return {
      [ANCHOR]: markerClusterer,
      [MARKER_CLUSTERER]: markerClusterer,
    }
  }

  componentDidMount () {
    componentDidMount(this, this.state[MARKER_CLUSTERER], eventMap)
  }

  componentDidUpdate (prevProps) {
    componentDidUpdate(
      this,
      this.state[MARKER_CLUSTERER],
      eventMap,
      updaterMap,
      prevProps
    )

    this.state[MARKER_CLUSTERER].repaint()
  }

  componentWillUnmount () {
    componentWillUnmount(this)

    const markerClusterer = this.state[MARKER_CLUSTERER]

    if (markerClusterer) {
      markerClusterer.setMap(null)
    }
  }

  render () {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default MarkerClusterer
