/* eslint-disable filenames/match-exported */
import * as React from "react"
import { PureComponent } from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"
//@ts-ignore
import MarkerClustererPlus from "marker-clusterer-plus"

const eventMap = {
  onClick: "click",
  onClusteringBegin: "clusteringbegin",
  onClusteringEnd: "clusteringend",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover"
}

const updaterMap = {
  averageCenter(instance: MarkerClusterer, averageCenter: boolean) {
    instance.setAverageCenter(averageCenter)
  },

  batchSizeIE(instance: MarkerClusterer, batchSizeIE: number) {
    instance.setBatchSizeIE(batchSizeIE)
  },

  calculator(instance: MarkerClusterer, calculator: Calculator) {
    instance.setCalculator(calculator)
  },

  clusterClass(instance: MarkerClusterer, clusterClass: string) {
    instance.setClusterClass(clusterClass)
  },

  enableRetinaIcons(instance: MarkerClusterer, enableRetinaIcons: boolean) {
    instance.setEnableRetinaIcons(enableRetinaIcons)
  },

  gridSize(instance: MarkerClusterer, gridSize: number) {
    instance.setGridSize(gridSize)
  },

  ignoreHidden(instance: MarkerClusterer, ignoreHidden: boolean) {
    instance.setIgnoreHidden(ignoreHidden)
  },

  imageExtension(instance: MarkerClusterer, imageExtension: string) {
    instance.setImageExtension(imageExtension)
  },

  imagePath(instance: MarkerClusterer, imagePath: string) {
    instance.setImagePath(imagePath)
  },

  imageSizes(instance: MarkerClusterer, imageSizes: number[]) {
    instance.setImageSizes(imageSizes)
  },

  maxZoom(instance: MarkerClusterer, maxZoom: number) {
    instance.setMaxZoom(maxZoom)
  },

  minimumClusterSize(instance: MarkerClusterer, minimumClusterSize: number) {
    instance.setMinimumClusterSize(minimumClusterSize)
  },

  styles(instance: MarkerClusterer, styles: ClusterIconStyle[]) {
    instance.setStyles(styles)
  },

  title(instance: MarkerClusterer, title: string) {
    instance.setTitle(title)
  },

  zoomOnClick(instance: MarkerClusterer, zoomOnClick: boolean) {
    instance.setZoomOnClick(zoomOnClick)
  }
}

interface MarkerClustererState {
  markerClusterer?: MarkerClusterer
}

interface MarkerClustererProps {
  children: (markerClusterer: MarkerClusterer) => React.ReactNode
  initialOptions?: MarkerClustererOptions
  averageCenter?: boolean
  batchSizeIE: number
  calculator: Calculator
  clusterClass: string
  enableRetinaIcons: boolean
  gridSize: number
  ignoreHidden: boolean
  imageExtension: string
  imagePath: string
  imageSizes: number[]
  maxZoom: number
  minimumClusterSize: number
  styles: ClusterIconStyle[]
  title: string
  zoomOnClick: boolean
  onClick: (cluster: Cluster) => void
  onClusteringBegin: (markerClusterer: MarkerClusterer) => void
  onClusteringEnd: (markerClusterer: MarkerClusterer) => void
  onMouseOver: (cluster: Cluster) => void
  onMouseOut: (cluster: Cluster) => void
}

export class MarkerClustererComponent extends PureComponent<
  MarkerClustererProps,
  MarkerClustererState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: MarkerClustererState = {
    markerClusterer: null
  }

  componentDidMount = () => {
    const markerClusterer = new MarkerClustererPlus(
      this.context,
      [],
      this.props.initialOptions
    )

    this.setState(
      () => ({
        markerClusterer
      }),
      () => {
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
          updaterMap,
          eventMap,
          prevProps: {},
          nextProps: this.props,
          instance: this.state.markerClusterer
        })
      }
    )
  }

  componentDidUpdate = (prevProps: MarkerClustererProps) => {
    unregisterEvents(this.registeredEvents)

    this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
      updaterMap,
      eventMap,
      prevProps,
      nextProps: this.props,
      instance: this.state.markerClusterer
    })
  }

  componentWillUnmount = () => {
    unregisterEvents(this.registeredEvents)

    this.state.markerClusterer && this.state.markerClusterer.setMap(null)
  }

  render = () =>
    this.state.markerClusterer
      ? this.props.children(this.state.markerClusterer)
      : null
}

export default MarkerClustererComponent
