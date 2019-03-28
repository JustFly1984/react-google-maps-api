/// <reference types="googlemaps" />
import { Clusterer } from './Clusterer';
import { ClusterIcon } from './ClusterIcon';
import { MarkerExtended } from './types';
export declare class Cluster {
    markerClusterer: Clusterer;
    map: google.maps.Map | google.maps.StreetViewPanorama;
    gridSize: number;
    minClusterSize: number;
    averageCenter: boolean;
    markers: MarkerExtended[];
    center: google.maps.LatLng | undefined;
    bounds: google.maps.LatLngBounds | null;
    clusterIcon: ClusterIcon;
    constructor(markerClusterer: Clusterer);
    getSize(): number;
    getMarkers(): MarkerExtended[];
    getCenter(): google.maps.LatLng | undefined;
    getMap(): google.maps.Map | google.maps.StreetViewPanorama;
    getClusterer(): Clusterer;
    getBounds(): google.maps.LatLngBounds;
    remove(): void;
    addMarker(marker: MarkerExtended): boolean;
    isMarkerInClusterBounds(marker: MarkerExtended): boolean;
    calculateBounds(): void;
    updateIcon(): void;
    isMarkerAlreadyAdded(marker: MarkerExtended): boolean;
}
//# sourceMappingURL=Cluster.d.ts.map