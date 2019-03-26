/* eslint-disable filenames/match-exported */
import * as React from "react"
import { PureComponent } from "react"

import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents
} from "../../utils/helper"

import MapContext from "../../map-context"

import MarkerClusterer, {
  ClusterIconStyle,
  Cluster,
  MarkerClustererOptions,
  Calculator
  // @ts-ignore
} from "marker-clusterer-plus"

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

  calculator(instance: MarkerClusterer, calculator: any) {
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
  markerClusterer: MarkerClusterer | null;
}

interface MarkerClustererProps {
  // required
  children: (markerClusterer: MarkerClusterer) => React.ReactNode;
  options?: MarkerClustererOptions; // TODO: it could be undefined
  averageCenter?: boolean;
  batchSizeIE: number;
  calculator: Calculator;
  clusterClass: string;
  enableRetinaIcons: boolean;
  gridSize: number;
  ignoreHidden: boolean;
  imageExtension: string;
  imagePath: string;
  imageSizes: number[];
  maxZoom: number;
  minimumClusterSize: number;
  styles: ClusterIconStyle[];
  title: string;
  zoomOnClick: boolean;
  onClick: (cluster: Cluster) => void;
  onClusteringBegin: (markerClusterer: MarkerClusterer) => void;
  onClusteringEnd: (markerClusterer: MarkerClusterer) => void;
  onMouseOver: (cluster: Cluster) => void;
  onMouseOut: (cluster: Cluster) => void;
  onLoad?: (markerClusterer: MarkerClusterer) => void;
  onUnmount?: (markerClusterer: MarkerClusterer) => void;
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

  // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
  setMarkerClustererCallback = (): void => {
    if (this.state.markerClusterer !== null) {
      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: this.props,
        instance: this.state.markerClusterer
      })

      if (this.props.onLoad) {
        this.props.onLoad(this.state.markerClusterer)
      }
    }
  }

  componentDidMount(): void {
    const markerClusterer = new MarkerClusterer(
      this.context,
      [],
      this.props.options
    )

    function setMarkerClusterer(): MarkerClustererState {
      return {
        markerClusterer
      }
    }

    this.setState(setMarkerClusterer, this.setMarkerClustererCallback)
  }

  componentDidUpdate(prevProps: MarkerClustererProps) {
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

  componentWillUnmount() {
    if (this.state.markerClusterer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.markerClusterer)
      }

      unregisterEvents(this.registeredEvents)

      this.state.markerClusterer.setMap(null)
    }
  }

  render() {
    return this.state.markerClusterer !== null
      ? this.props.children(this.state.markerClusterer)
      : (
        <></>
      )
  }
}

export default MarkerClustererComponent
