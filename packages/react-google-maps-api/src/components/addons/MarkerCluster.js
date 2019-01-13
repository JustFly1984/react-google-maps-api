// eslint-disable-next-line filenames/match-exported
import React, { PureComponent, createContext } from 'react'
import MarkerClusterPlus from 'marker-clusterer-plus'

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from '../../utils/helper'

import MapContext from '../../map-context'

import { MarkerClusterPropTypes } from '../../proptypes'

export const MarkerClusterContext = createContext('markerClusterer')

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

export class MarkerCluster extends PureComponent {
  static propTypes = MarkerClusterPropTypes

  static contextType = MapContext

  registeredEvents = []

  state = {
    markerClusterer: null
  }

  componentDidMount = () => {
    const markerClusterer = new MarkerClusterPlus(
      Object.assign(
        {
          map: this.context
        },
        this.props.options
      )
    )

    this.setState(
      () => ({
        markerClusterer
      }),
      () => {
        this.state.markerClusterer.setMap(this.context)
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
      instance: this.state.markerClusterer
    })

    this.state.markerClusterer
      .repaint()
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    if (this.state.markerClusterer) {
      this.state.markerClusterer.setMap(null)
    }
  }

  render = () => (
    <MarkerClusterContext.Provider
      value={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
        map: this.context,
        cluster: this.state.markerClusterer
      }}
    >
      {this.props.children}
    </MarkerClusterContext.Provider>
  )
}

export default MarkerCluster
