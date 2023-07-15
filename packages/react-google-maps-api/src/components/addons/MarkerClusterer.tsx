import {
  type ContextType,
  PureComponent,
  useState,
  memo,
  useContext,
  useEffect,
} from 'react'
import {
  unregisterEvents,
  applyUpdatersToPropsAndRegisterEvents,
} from '../../utils/helper'

import MapContext from '../../map-context'

import {
  Cluster,
  Clusterer,
  type TCalculator,
  type ClusterIconStyle,
  type ClustererOptions,
} from '@react-google-maps/marker-clusterer'

const eventMap = {
  onClick: 'click',
  onClusteringBegin: 'clusteringbegin',
  onClusteringEnd: 'clusteringend',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
}

const updaterMap = {
  averageCenter(instance: Clusterer, averageCenter: boolean): void {
    instance.setAverageCenter(averageCenter)
  },

  batchSizeIE(instance: Clusterer, batchSizeIE: number): void {
    instance.setBatchSizeIE(batchSizeIE)
  },

  calculator(instance: Clusterer, calculator: TCalculator): void {
    instance.setCalculator(calculator)
  },

  clusterClass(instance: Clusterer, clusterClass: string): void {
    instance.setClusterClass(clusterClass)
  },

  enableRetinaIcons(instance: Clusterer, enableRetinaIcons: boolean): void {
    instance.setEnableRetinaIcons(enableRetinaIcons)
  },

  gridSize(instance: Clusterer, gridSize: number): void {
    instance.setGridSize(gridSize)
  },

  ignoreHidden(instance: Clusterer, ignoreHidden: boolean): void {
    instance.setIgnoreHidden(ignoreHidden)
  },

  imageExtension(instance: Clusterer, imageExtension: string): void {
    instance.setImageExtension(imageExtension)
  },

  imagePath(instance: Clusterer, imagePath: string): void {
    instance.setImagePath(imagePath)
  },

  imageSizes(instance: Clusterer, imageSizes: number[]): void {
    instance.setImageSizes(imageSizes)
  },

  maxZoom(instance: Clusterer, maxZoom: number): void {
    instance.setMaxZoom(maxZoom)
  },

  minimumClusterSize(instance: Clusterer, minimumClusterSize: number): void {
    instance.setMinimumClusterSize(minimumClusterSize)
  },

  styles(instance: Clusterer, styles: ClusterIconStyle[]): void {
    instance.setStyles(styles)
  },

  title(instance: Clusterer, title: string): void {
    instance.setTitle(title)
  },

  zoomOnClick(instance: Clusterer, zoomOnClick: boolean): void {
    instance.setZoomOnClick(zoomOnClick)
  },
}

interface ClustererState {
  markerClusterer: Clusterer | null
}

const defaultOptions = {}

export interface MarkerClustererProps {
  // required
  children: (markerClusterer: Clusterer) => JSX.Element

  options?: ClustererOptions | undefined
  /** Whether the position of a cluster marker should be the average position of all markers in the cluster. If set to false, the cluster marker is positioned at the location of the first marker added to the cluster. The default value is false. */
  averageCenter?: boolean | undefined
  /** When Internet Explorer is being used, markers are processed in several batches with a small delay inserted between each batch in an attempt to avoid Javascript timeout errors. Set this property to the number of markers to be processed in a single batch; select as high a number as you can without causing a timeout error in the browser. This number might need to be as low as 100 if 15,000 markers are being managed, for example. The default value is MarkerClusterer.BATCH_SIZE_IE. */
  batchSizeIE?: number | undefined
  /** The function used to determine the text to be displayed on a cluster marker and the index indicating which style to use for the cluster marker. The input parameters for the function are (1) the array of markers represented by a cluster marker and (2) the number of cluster icon styles. It returns a ClusterIconInfo object. The default calculator returns a text property which is the number of markers in the cluster and an index property which is one higher than the lowest integer such that 10^i exceeds the number of markers in the cluster, or the size of the styles array, whichever is less. The styles array element used has an index of index minus 1. For example, the default calculator returns a text value of "125" and an index of 3 for a cluster icon representing 125 markers so the element used in the styles array is 2. A calculator may also return a title property that contains the text of the tooltip to be used for the cluster marker. If title is not defined, the tooltip is set to the value of the title property for the MarkerClusterer. The default value is MarkerClusterer.CALCULATOR. */
  calculator?: TCalculator | undefined
  /** The name of the CSS class defining general styles for the cluster markers. Use this class to define CSS styles that are not set up by the code that processes the styles array. The default value is "cluster". */
  clusterClass?: string | undefined
  /** Whether to allow the use of cluster icons that have sizes that are some multiple (typically double) of their actual display size. Icons such as these look better when viewed on high-resolution monitors such as Apple's Retina displays. Note: if this property is true, sprites cannot be used as cluster icons. The default value is false. */
  enableRetinaIcons?: boolean | undefined
  /** The grid size of a cluster in pixels. The grid is a square. The default value is 60. */
  gridSize?: number | undefined
  /** Whether to ignore hidden markers in clusters. You may want to set this to true to ensure that hidden markers are not included in the marker count that appears on a cluster marker (this count is the value of the text property of the result returned by the default calculator). If set to true and you change the visibility of a marker being clustered, be sure to also call MarkerClusterer.repaint(). The default value is false. */
  ignoreHidden?: boolean | undefined
  /** The extension name for the cluster icon image files (e.g., "png" or "jpg"). The default value is MarkerClusterer.IMAGE_EXTENSION. */
  imageExtension?: string | undefined
  /** The full URL of the root name of the group of image files to use for cluster icons. The complete file name is of the form imagePath.imageExtension where n is the image file number (1, 2, etc.). The default value is MarkerClusterer.IMAGE_PATH. */
  imagePath?: string | undefined
  /** An array of numbers containing the widths of the group of imagePath.imageExtension image files. (The images are assumed to be square.) The default value is MarkerClusterer.IMAGE_SIZES. */
  imageSizes?: number[] | undefined
  /** The maximum zoom level at which clustering is enabled or null if clustering is to be enabled at all zoom levels. The default value is null. */
  maxZoom?: number | undefined
  /** The minimum number of markers needed in a cluster before the markers are hidden and a cluster marker appears. The default value is 2. */
  minimumClusterSize?: number | undefined
  /** An array of ClusterIconStyle elements defining the styles of the cluster markers to be used. The element to be used to style a given cluster marker is determined by the function defined by the calculator property. The default is an array of ClusterIconStyle elements whose properties are derived from the values for imagePath, imageExtension, and imageSizes. */
  styles?: ClusterIconStyle[] | undefined
  /** The tooltip to display when the mouse moves over a cluster marker. (Alternatively, you can use a custom calculator function to specify a different tooltip for each cluster marker.) The default value is "". */
  title?: string | undefined
  /** Whether to zoom the map when a cluster marker is clicked. You may want to set this to false if you have installed a handler for the click event and it deals with zooming on its own. The default value is true. */
  zoomOnClick?: boolean | undefined
  /** This event is fired when a cluster marker is clicked. */
  onClick?: ((cluster: Cluster) => void) | undefined
  /** This event is fired when the MarkerClusterer begins clustering markers. */
  onClusteringBegin?: ((markerClusterer: Clusterer) => void) | undefined
  /** This event is fired when the MarkerClusterer stops clustering markers. */
  onClusteringEnd?: ((markerClusterer: Clusterer) => void) | undefined
  /** 	This event is fired when the mouse moves over a cluster marker. */
  onMouseOver?: (cluster: Cluster) => void | undefined
  /** This event is fired when the mouse moves out of a cluster marker. */
  onMouseOut?: (cluster: Cluster) => void | undefined
  /** This callback is called when the markerClusterer instance has loaded. It is called with the markerClusterer instance. */
  onLoad?: ((markerClusterer: Clusterer) => void) | undefined
  /** This callback is called when the component unmounts. It is called with the markerClusterer instance. */
  onUnmount?: ((markerClusterer: Clusterer) => void) | undefined
}

function MarkerClustererFunctional(
  props: MarkerClustererProps
): JSX.Element | null {
  const {
    children,
    options,
    averageCenter,
    batchSizeIE,
    calculator,
    clusterClass,
    enableRetinaIcons,
    gridSize,
    ignoreHidden,
    imageExtension,
    imagePath,
    imageSizes,
    maxZoom,
    minimumClusterSize,
    styles,
    title,
    zoomOnClick,
    onClick,
    onClusteringBegin,
    onClusteringEnd,
    onMouseOver,
    onMouseOut,
    onLoad,
    onUnmount,
  } = props
  const [instance, setInstance] = useState<Clusterer | null>(null)
  const map = useContext<google.maps.Map | null>(MapContext)

  const [clickListener, setClickListener] = useState<google.maps.MapsEventListener | null>(null)
  const [clusteringBeginListener, setClusteringBeginListener] = useState<google.maps.MapsEventListener | null>(null)
  const [clusteringEndListener, setClusteringEndListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mouseoutListener, setMouseoutListener] = useState<google.maps.MapsEventListener | null>(null)
  const [mouseoverListener, setMouseoverListener] = useState<google.maps.MapsEventListener | null>(null)

  useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener)
      }

      setMouseoutListener(
        google.maps.event.addListener(instance, eventMap.onMouseOut, onMouseOut)
      )
    }
  }, [onMouseOut])

  useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener)
      }

      setMouseoverListener(
        google.maps.event.addListener(
          instance,
          eventMap.onMouseOver,
          onMouseOver
        )
      )
    }
  }, [onMouseOver])

  useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener)
      }

      setClickListener(
        google.maps.event.addListener(instance, eventMap.onClick, onClick)
      )
    }
  }, [onClick])

  useEffect(() => {
    if (instance && onClusteringBegin) {
      if (clusteringBeginListener !== null) {
        google.maps.event.removeListener(clusteringBeginListener)
      }

      setClusteringBeginListener(
        google.maps.event.addListener(
          instance,
          eventMap.onClusteringBegin,
          onClusteringBegin
        )
      )
    }
  }, [onClusteringBegin])

  useEffect(() => {
    if (instance && onClusteringEnd) {
      if (clusteringEndListener !== null) {
        google.maps.event.removeListener(clusteringEndListener)
      }

      setClusteringBeginListener(
        google.maps.event.addListener(
          instance,
          eventMap.onClusteringEnd,
          onClusteringEnd
        )
      )
    }
  }, [onClusteringEnd])

  useEffect(() => {
    if (typeof averageCenter !== 'undefined' && instance !== null) {
      updaterMap.averageCenter(instance, averageCenter)
    }
  }, [instance, averageCenter])

  useEffect(() => {
    if (typeof batchSizeIE !== 'undefined' && instance !== null) {
      updaterMap.batchSizeIE(instance, batchSizeIE)
    }
  }, [instance, batchSizeIE])

  useEffect(() => {
    if (typeof calculator !== 'undefined' && instance !== null) {
      updaterMap.calculator(instance, calculator)
    }
  }, [instance, calculator])

  useEffect(() => {
    if (typeof clusterClass !== 'undefined' && instance !== null) {
      updaterMap.clusterClass(instance, clusterClass)
    }
  }, [instance, clusterClass])

  useEffect(() => {
    if (typeof enableRetinaIcons !== 'undefined' && instance !== null) {
      updaterMap.enableRetinaIcons(instance, enableRetinaIcons)
    }
  }, [instance, enableRetinaIcons])

  useEffect(() => {
    if (typeof gridSize !== 'undefined' && instance !== null) {
      updaterMap.gridSize(instance, gridSize)
    }
  }, [instance, gridSize])

  useEffect(() => {
    if (typeof ignoreHidden !== 'undefined' && instance !== null) {
      updaterMap.ignoreHidden(instance, ignoreHidden)
    }
  }, [instance, ignoreHidden])

  useEffect(() => {
    if (typeof imageExtension !== 'undefined' && instance !== null) {
      updaterMap.imageExtension(instance, imageExtension)
    }
  }, [instance, imageExtension])

  useEffect(() => {
    if (typeof imagePath !== 'undefined' && instance !== null) {
      updaterMap.imagePath(instance, imagePath)
    }
  }, [instance, imagePath])

  useEffect(() => {
    if (typeof imageSizes !== 'undefined' && instance !== null) {
      updaterMap.imageSizes(instance, imageSizes)
    }
  }, [instance, imageSizes])

  useEffect(() => {
    if (typeof maxZoom !== 'undefined' && instance !== null) {
      updaterMap.maxZoom(instance, maxZoom)
    }
  }, [instance, maxZoom])

  useEffect(() => {
    if (typeof minimumClusterSize !== 'undefined' && instance !== null) {
      updaterMap.minimumClusterSize(instance, minimumClusterSize)
    }
  }, [instance, minimumClusterSize])

  useEffect(() => {
    if (typeof styles !== 'undefined' && instance !== null) {
      updaterMap.styles(instance, styles)
    }
  }, [instance, styles])

  useEffect(() => {
    if (typeof title !== 'undefined' && instance !== null) {
      updaterMap.title(instance, title)
    }
  }, [instance, title])

  useEffect(() => {
    if (typeof zoomOnClick !== 'undefined' && instance !== null) {
      updaterMap.zoomOnClick(instance, zoomOnClick)
    }
  }, [instance, zoomOnClick])

  useEffect(() => {
    if (!map) return

    const clustererOptions = {
      ...(options || defaultOptions),
    }

    const clusterer = new Clusterer(map, [], clustererOptions)

    if (averageCenter) {
      updaterMap.averageCenter(clusterer, averageCenter)
    }

    if (batchSizeIE) {
      updaterMap.batchSizeIE(clusterer, batchSizeIE)
    }

    if (calculator) {
      updaterMap.calculator(clusterer, calculator)
    }

    if (clusterClass) {
      updaterMap.clusterClass(clusterer, clusterClass)
    }

    if (enableRetinaIcons) {
      updaterMap.enableRetinaIcons(clusterer, enableRetinaIcons)
    }

    if (gridSize) {
      updaterMap.gridSize(clusterer, gridSize)
    }

    if (ignoreHidden) {
      updaterMap.ignoreHidden(clusterer, ignoreHidden)
    }

    if (imageExtension) {
      updaterMap.imageExtension(clusterer, imageExtension)
    }

    if (imagePath) {
      updaterMap.imagePath(clusterer, imagePath)
    }

    if (imageSizes) {
      updaterMap.imageSizes(clusterer, imageSizes)
    }

    if (maxZoom) {
      updaterMap.maxZoom(clusterer, maxZoom)
    }

    if (minimumClusterSize) {
      updaterMap.minimumClusterSize(clusterer, minimumClusterSize)
    }

    if (styles) {
      updaterMap.styles(clusterer, styles)
    }

    if (title) {
      updaterMap.title(clusterer, title)
    }

    if (zoomOnClick) {
      updaterMap.zoomOnClick(clusterer, zoomOnClick)
    }

    if (onMouseOut) {
      setMouseoutListener(
        google.maps.event.addListener(
          clusterer,
          eventMap.onMouseOut,
          onMouseOut
        )
      )
    }

    if (onMouseOver) {
      setMouseoverListener(
        google.maps.event.addListener(
          clusterer,
          eventMap.onMouseOver,
          onMouseOver
        )
      )
    }

    if (onClick) {
      setClickListener(
        google.maps.event.addListener(clusterer, eventMap.onClick, onClick)
      )
    }

    if (onClusteringBegin) {
      setClusteringBeginListener(
        google.maps.event.addListener(
          clusterer,
          eventMap.onClusteringBegin,
          onClusteringBegin
        )
      )
    }

    if (onClusteringEnd) {
      setClusteringEndListener(
        google.maps.event.addListener(
          clusterer,
          eventMap.onClusteringEnd,
          onClusteringEnd
        )
      )
    }

    setInstance(clusterer)

    if (onLoad) {
      onLoad(clusterer)
    }

    return () => {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener)
      }

      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener)
      }

      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener)
      }

      if (clusteringBeginListener !== null) {
        google.maps.event.removeListener(clusteringBeginListener)
      }

      if (clusteringEndListener !== null) {
        google.maps.event.removeListener(clusteringEndListener)
      }

      if (onUnmount) {
        onUnmount(clusterer)
      }
    }
  }, [])

  return instance !== null ? children(instance) || null : null
}

export const MarkerClustererF = memo(MarkerClustererFunctional)

export class ClustererComponent extends PureComponent<MarkerClustererProps, ClustererState> {
  static override contextType = MapContext
  declare context: ContextType<typeof MapContext>

  registeredEvents: google.maps.MapsEventListener[] = []

  override state: ClustererState = {
    markerClusterer: null,
  }

  setClustererCallback = (): void => {
    if (this.state.markerClusterer !== null && this.props.onLoad) {
      this.props.onLoad(this.state.markerClusterer)
    }
  }

  override componentDidMount(): void {
    if (this.context) {
      const markerClusterer = new Clusterer(this.context, [], this.props.options)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps: {},
        nextProps: this.props,
        instance: markerClusterer,
      })

      this.setState((): ClustererState => {
        return {
          markerClusterer,
        }
      }, this.setClustererCallback)
    }
  }

  override componentDidUpdate(prevProps: MarkerClustererProps): void {
    if (this.state.markerClusterer) {
      unregisterEvents(this.registeredEvents)

      this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
        updaterMap,
        eventMap,
        prevProps,
        nextProps: this.props,
        instance: this.state.markerClusterer,
      })
    }
  }

  override componentWillUnmount(): void {
    if (this.state.markerClusterer !== null) {
      if (this.props.onUnmount) {
        this.props.onUnmount(this.state.markerClusterer)
      }

      unregisterEvents(this.registeredEvents)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.state.markerClusterer.setMap(null)
    }
  }

  override render(): JSX.Element | null {
    return this.state.markerClusterer !== null
      ? this.props.children(this.state.markerClusterer)
      : null
  }
}

export default ClustererComponent
