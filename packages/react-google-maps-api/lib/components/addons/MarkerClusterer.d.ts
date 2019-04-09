/// <reference types="googlemaps" />
import * as React from "react";
import { Clusterer, ClusterIconStyle, Cluster, ClustererOptions, TCalculator } from "@react-google-maps/marker-clusterer";
interface ClustererState {
    markerClusterer: Clusterer | null;
}
interface ClustererProps {
    children: (markerClusterer: Clusterer) => React.ReactNode;
    options?: ClustererOptions;
    averageCenter?: boolean;
    batchSizeIE?: number;
    calculator?: TCalculator;
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
    onClusteringBegin: (markerClusterer: Clusterer) => void;
    onClusteringEnd: (markerClusterer: Clusterer) => void;
    onMouseOver: (cluster: Cluster) => void;
    onMouseOut: (cluster: Cluster) => void;
    onLoad?: (markerClusterer: Clusterer) => void;
    onUnmount?: (markerClusterer: Clusterer) => void;
}
export declare class ClustererComponent extends React.PureComponent<ClustererProps, ClustererState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: ClustererState;
    setClustererCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: ClustererProps): void;
    componentWillUnmount(): void;
    render(): {} | null | undefined;
}
export default ClustererComponent;
//# sourceMappingURL=MarkerClusterer.d.ts.map