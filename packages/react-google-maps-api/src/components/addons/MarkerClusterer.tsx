import {
  Cluster,
  Clusterer,
  type ClusterIconStyle,
  type ClustererOptions,
  type TCalculator,
} from '@react-google-maps/marker-clusterer';
import { memo, useContext, useEffect, useState, type ComponentType, type JSX } from 'react';

import { MapContext } from '../../map-context.js';

const eventMap = {
  onClick: 'click',
  onClusteringBegin: 'clusteringbegin',
  onClusteringEnd: 'clusteringend',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
};

const updaterMap = {
  averageCenter(instance: Clusterer, averageCenter: boolean): void {
    instance.setAverageCenter(averageCenter);
  },

  batchSizeIE(instance: Clusterer, batchSizeIE: number): void {
    instance.setBatchSizeIE(batchSizeIE);
  },

  calculator(instance: Clusterer, calculator: TCalculator): void {
    instance.setCalculator(calculator);
  },

  clusterClass(instance: Clusterer, clusterClass: string): void {
    instance.setClusterClass(clusterClass);
  },

  enableRetinaIcons(instance: Clusterer, enableRetinaIcons: boolean): void {
    instance.setEnableRetinaIcons(enableRetinaIcons);
  },

  gridSize(instance: Clusterer, gridSize: number): void {
    instance.setGridSize(gridSize);
  },

  ignoreHidden(instance: Clusterer, ignoreHidden: boolean): void {
    instance.setIgnoreHidden(ignoreHidden);
  },

  imageExtension(instance: Clusterer, imageExtension: string): void {
    instance.setImageExtension(imageExtension);
  },

  imagePath(instance: Clusterer, imagePath: string): void {
    instance.setImagePath(imagePath);
  },

  imageSizes(instance: Clusterer, imageSizes: number[]): void {
    instance.setImageSizes(imageSizes);
  },

  maxZoom(instance: Clusterer, maxZoom: number): void {
    instance.setMaxZoom(maxZoom);
  },

  minimumClusterSize(instance: Clusterer, minimumClusterSize: number): void {
    instance.setMinimumClusterSize(minimumClusterSize);
  },

  styles(instance: Clusterer, styles: ClusterIconStyle[]): void {
    instance.setStyles(styles);
  },

  title(instance: Clusterer, title: string): void {
    instance.setTitle(title);
  },

  zoomOnClick(instance: Clusterer, zoomOnClick: boolean): void {
    instance.setZoomOnClick(zoomOnClick);
  },
};

const defaultOptions = {};

export type MarkerClustererProps = {
  children: (markerClusterer: Clusterer) => JSX.Element;
  options?: ClustererOptions | undefined;
  averageCenter?: boolean | undefined;
  batchSizeIE?: number | undefined;
  calculator?: TCalculator | undefined;
  clusterClass?: string | undefined;
  enableRetinaIcons?: boolean | undefined;
  gridSize?: number | undefined;
  ignoreHidden?: boolean | undefined;
  imageExtension?: string | undefined;
  imagePath?: string | undefined;
  imageSizes?: number[] | undefined;
  maxZoom?: number | undefined;
  minimumClusterSize?: number | undefined;
  styles?: ClusterIconStyle[] | undefined;
  title?: string | undefined;
  zoomOnClick?: boolean | undefined;
  onClick?: ((cluster: Cluster) => void) | undefined;
  onClusteringBegin?: ((markerClusterer: Clusterer) => void) | undefined;
  onClusteringEnd?: ((markerClusterer: Clusterer) => void) | undefined;
  onMouseOver?: (cluster: Cluster) => void | undefined;
  onMouseOut?: (cluster: Cluster) => void | undefined;
  onLoad?: ((markerClusterer: Clusterer) => void) | undefined;
  onUnmount?: ((markerClusterer: Clusterer) => void) | undefined;
};

function MarkerClustererFunctional(props: MarkerClustererProps): JSX.Element | null {
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
  } = props;
  const [instance, setInstance] = useState<Clusterer | null>(null);
  const map = useContext<google.maps.Map | null>(MapContext);

  const [clickListener, setClickListener] = useState<google.maps.MapsEventListener | null>(null);
  const [clusteringBeginListener, setClusteringBeginListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [clusteringEndListener, setClusteringEndListener] =
    useState<google.maps.MapsEventListener | null>(null);
  const [mouseoutListener, setMouseoutListener] = useState<google.maps.MapsEventListener | null>(
    null,
  );
  const [mouseoverListener, setMouseoverListener] = useState<google.maps.MapsEventListener | null>(
    null,
  );

  useEffect(() => {
    if (instance && onMouseOut) {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }

      setMouseoutListener(google.maps.event.addListener(instance, eventMap.onMouseOut, onMouseOut));
    }
  }, [onMouseOut]);

  useEffect(() => {
    if (instance && onMouseOver) {
      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }

      setMouseoverListener(
        google.maps.event.addListener(instance, eventMap.onMouseOver, onMouseOver),
      );
    }
  }, [onMouseOver]);

  useEffect(() => {
    if (instance && onClick) {
      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }

      setClickListener(google.maps.event.addListener(instance, eventMap.onClick, onClick));
    }
  }, [onClick]);

  useEffect(() => {
    if (instance && onClusteringBegin) {
      if (clusteringBeginListener !== null) {
        google.maps.event.removeListener(clusteringBeginListener);
      }

      setClusteringBeginListener(
        google.maps.event.addListener(instance, eventMap.onClusteringBegin, onClusteringBegin),
      );
    }
  }, [onClusteringBegin]);

  useEffect(() => {
    if (instance && onClusteringEnd) {
      if (clusteringEndListener !== null) {
        google.maps.event.removeListener(clusteringEndListener);
      }

      setClusteringBeginListener(
        google.maps.event.addListener(instance, eventMap.onClusteringEnd, onClusteringEnd),
      );
    }
  }, [onClusteringEnd]);

  useEffect(() => {
    if (typeof averageCenter !== 'undefined' && instance !== null) {
      updaterMap.averageCenter(instance, averageCenter);
    }
  }, [instance, averageCenter]);

  useEffect(() => {
    if (typeof batchSizeIE !== 'undefined' && instance !== null) {
      updaterMap.batchSizeIE(instance, batchSizeIE);
    }
  }, [instance, batchSizeIE]);

  useEffect(() => {
    if (typeof calculator !== 'undefined' && instance !== null) {
      updaterMap.calculator(instance, calculator);
    }
  }, [instance, calculator]);

  useEffect(() => {
    if (typeof clusterClass !== 'undefined' && instance !== null) {
      updaterMap.clusterClass(instance, clusterClass);
    }
  }, [instance, clusterClass]);

  useEffect(() => {
    if (typeof enableRetinaIcons !== 'undefined' && instance !== null) {
      updaterMap.enableRetinaIcons(instance, enableRetinaIcons);
    }
  }, [instance, enableRetinaIcons]);

  useEffect(() => {
    if (typeof gridSize !== 'undefined' && instance !== null) {
      updaterMap.gridSize(instance, gridSize);
    }
  }, [instance, gridSize]);

  useEffect(() => {
    if (typeof ignoreHidden !== 'undefined' && instance !== null) {
      updaterMap.ignoreHidden(instance, ignoreHidden);
    }
  }, [instance, ignoreHidden]);

  useEffect(() => {
    if (typeof imageExtension !== 'undefined' && instance !== null) {
      updaterMap.imageExtension(instance, imageExtension);
    }
  }, [instance, imageExtension]);

  useEffect(() => {
    if (typeof imagePath !== 'undefined' && instance !== null) {
      updaterMap.imagePath(instance, imagePath);
    }
  }, [instance, imagePath]);

  useEffect(() => {
    if (typeof imageSizes !== 'undefined' && instance !== null) {
      updaterMap.imageSizes(instance, imageSizes);
    }
  }, [instance, imageSizes]);

  useEffect(() => {
    if (typeof maxZoom !== 'undefined' && instance !== null) {
      updaterMap.maxZoom(instance, maxZoom);
    }
  }, [instance, maxZoom]);

  useEffect(() => {
    if (typeof minimumClusterSize !== 'undefined' && instance !== null) {
      updaterMap.minimumClusterSize(instance, minimumClusterSize);
    }
  }, [instance, minimumClusterSize]);

  useEffect(() => {
    if (typeof styles !== 'undefined' && instance !== null) {
      updaterMap.styles(instance, styles);
    }
  }, [instance, styles]);

  useEffect(() => {
    if (typeof title !== 'undefined' && instance !== null) {
      updaterMap.title(instance, title);
    }
  }, [instance, title]);

  useEffect(() => {
    if (typeof zoomOnClick !== 'undefined' && instance !== null) {
      updaterMap.zoomOnClick(instance, zoomOnClick);
    }
  }, [instance, zoomOnClick]);

  useEffect(() => {
    if (!map) return;

    const clustererOptions = {
      ...(options || defaultOptions),
    };

    const clusterer = new Clusterer(map, [], clustererOptions);

    if (averageCenter) {
      updaterMap.averageCenter(clusterer, averageCenter);
    }

    if (batchSizeIE) {
      updaterMap.batchSizeIE(clusterer, batchSizeIE);
    }

    if (calculator) {
      updaterMap.calculator(clusterer, calculator);
    }

    if (clusterClass) {
      updaterMap.clusterClass(clusterer, clusterClass);
    }

    if (enableRetinaIcons) {
      updaterMap.enableRetinaIcons(clusterer, enableRetinaIcons);
    }

    if (gridSize) {
      updaterMap.gridSize(clusterer, gridSize);
    }

    if (ignoreHidden) {
      updaterMap.ignoreHidden(clusterer, ignoreHidden);
    }

    if (imageExtension) {
      updaterMap.imageExtension(clusterer, imageExtension);
    }

    if (imagePath) {
      updaterMap.imagePath(clusterer, imagePath);
    }

    if (imageSizes) {
      updaterMap.imageSizes(clusterer, imageSizes);
    }

    if (maxZoom) {
      updaterMap.maxZoom(clusterer, maxZoom);
    }

    if (minimumClusterSize) {
      updaterMap.minimumClusterSize(clusterer, minimumClusterSize);
    }

    if (styles) {
      updaterMap.styles(clusterer, styles);
    }

    if (title) {
      updaterMap.title(clusterer, title);
    }

    if (zoomOnClick) {
      updaterMap.zoomOnClick(clusterer, zoomOnClick);
    }

    if (onMouseOut) {
      setMouseoutListener(
        google.maps.event.addListener(clusterer, eventMap.onMouseOut, onMouseOut),
      );
    }

    if (onMouseOver) {
      setMouseoverListener(
        google.maps.event.addListener(clusterer, eventMap.onMouseOver, onMouseOver),
      );
    }

    if (onClick) {
      setClickListener(google.maps.event.addListener(clusterer, eventMap.onClick, onClick));
    }

    if (onClusteringBegin) {
      setClusteringBeginListener(
        google.maps.event.addListener(clusterer, eventMap.onClusteringBegin, onClusteringBegin),
      );
    }

    if (onClusteringEnd) {
      setClusteringEndListener(
        google.maps.event.addListener(clusterer, eventMap.onClusteringEnd, onClusteringEnd),
      );
    }

    setInstance(clusterer);

    if (onLoad) {
      onLoad(clusterer);
    }

    return () => {
      if (mouseoutListener !== null) {
        google.maps.event.removeListener(mouseoutListener);
      }

      if (mouseoverListener !== null) {
        google.maps.event.removeListener(mouseoverListener);
      }

      if (clickListener !== null) {
        google.maps.event.removeListener(clickListener);
      }

      if (clusteringBeginListener !== null) {
        google.maps.event.removeListener(clusteringBeginListener);
      }

      if (clusteringEndListener !== null) {
        google.maps.event.removeListener(clusteringEndListener);
      }

      if (onUnmount) {
        onUnmount(clusterer);
      }
    };
  }, []);

  return instance !== null ? children(instance) || null : null;
}

export const MarkerClustererF: ComponentType<MarkerClustererProps> =
  memo<MarkerClustererProps>(MarkerClustererFunctional);

export const MarkerClusterer = MarkerClustererF;
