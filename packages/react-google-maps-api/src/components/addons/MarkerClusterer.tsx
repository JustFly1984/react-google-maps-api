/* eslint-disable filenames/match-exported */
import * as React from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

import {
  Clusterer,
  ClusterIconStyle,
  Cluster,
  ClustererOptions,
  TCalculator
} from "@react-google-maps/marker-clusterer"

const eventMap = {
  onClick: "click",
  onClusteringBegin: "clusteringbegin",
  onClusteringEnd: "clusteringend",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover"
}

const updaterMap = {
  averageCenter(instance: Clusterer, averageCenter: boolean) {
    instance.setAverageCenter(averageCenter)
  },

  batchSizeIE(instance: Clusterer, batchSizeIE: number) {
    instance.setBatchSizeIE(batchSizeIE)
  },

  calculator(instance: Clusterer, calculator: any) {
    instance.setCalculator(calculator)
  },

  clusterClass(instance: Clusterer, clusterClass: string) {
    instance.setClusterClass(clusterClass)
  },

  enableRetinaIcons(instance: Clusterer, enableRetinaIcons: boolean) {
    instance.setEnableRetinaIcons(enableRetinaIcons)
  },

  gridSize(instance: Clusterer, gridSize: number) {
    instance.setGridSize(gridSize)
  },

  ignoreHidden(instance: Clusterer, ignoreHidden: boolean) {
    instance.setIgnoreHidden(ignoreHidden)
  },

  imageExtension(instance: Clusterer, imageExtension: string) {
    instance.setImageExtension(imageExtension)
  },

  imagePath(instance: Clusterer, imagePath: string) {
    instance.setImagePath(imagePath)
  },

  imageSizes(instance: Clusterer, imageSizes: number[]) {
    instance.setImageSizes(imageSizes)
  },

  maxZoom(instance: Clusterer, maxZoom: number) {
    instance.setMaxZoom(maxZoom)
  },

  minimumClusterSize(instance: Clusterer, minimumClusterSize: number) {
    instance.setMinimumClusterSize(minimumClusterSize)
  },

  styles(instance: Clusterer, styles: ClusterIconStyle[]) {
    instance.setStyles(styles)
  },

  title(instance: Clusterer, title: string) {
    instance.setTitle(title)
  },

  zoomOnClick(instance: Clusterer, zoomOnClick: boolean) {
    instance.setZoomOnClick(zoomOnClick)
  }
}

interface ClustererState {
  markerClusterer: Clusterer | null;
}

export interface ClustererProps {
  // required
  children: (markerClusterer: Clusterer) => React.ReactNode;
  options?: ClustererOptions; // TODO: it could be undefined
  averageCenter?: boolean;
  batchSizeIE?: number;
  calculator?: TCalculator;
  clusterClass?: string;
  enableRetinaIcons?: boolean;
  gridSize?: number;
  ignoreHidden?: boolean;
  imageExtension?: string;
  imagePath?: string;
  imageSizes?: number[];
  maxZoom?: number;
  minimumClusterSize?: number;
  styles?: ClusterIconStyle[];
  title?: string;
  zoomOnClick?: boolean;
  onClick?: (cluster: Cluster) => void;
  onClusteringBegin?: (markerClusterer: Clusterer) => void;
  onClusteringEnd?: (markerClusterer: Clusterer) => void;
  onMouseOver?: (cluster: Cluster) => void;
  onMouseOut?: (cluster: Cluster) => void;
  onLoad?: (markerClusterer: Clusterer) => void;
  onUnmount?: (markerClusterer: Clusterer) => void;
}

export class ClustererComponent extends React.PureComponent<
  ClustererProps,
  ClustererState
> {
  static contextType = MapContext

  registeredEvents: google.maps.MapsEventListener[] = []

  state: ClustererState = {
    markerClusterer: null
  }

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setClustererCallback = (): void => {
    if (this.state.markerClusterer !== null && this.props.onLoad) {
      this.props.onLoad(this.state.markerClusterer)
    }
  }

  componentDidMount(): void {
    if (this.context) {
      const markerClusterer = new Clusterer(
        this.context,
        [],
        this.props.options
      )

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: this.props,
        instance: markerClusterer
      })

      this.setState(
        function setClusterer(): ClustererState {
          return {
            markerClusterer
          }
        },
        this.setClustererCallback
      )
    }
  }

  componentDidUpdate (prevProps: ClustererProps) {
    if (this.state.markerClusterer) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.markerClusterer
      })
    }
  }

  componentWillUnmount () {
    if (this.state.markerClusterer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.markerClusterer)
      }

      unregisterEvents(this.registeredEvents)
      //@ts-ignore
      this.state.markerClusterer.setMap(null)
    }
  }

  render() {
    return this.state.markerClusterer !== null
      ? this.props.children(this.state.markerClusterer)
      : null
  }
}

export default ClustererComponent
