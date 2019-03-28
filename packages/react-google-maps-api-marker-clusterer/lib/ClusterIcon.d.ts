/// <reference types="googlemaps" />
import { Cluster } from './Cluster';
import { ClusterIconStyle, ClusterIconInfo } from './types';
export declare class ClusterIcon extends google.maps.OverlayView {
    cluster: Cluster;
    className: string;
    styles: ClusterIconStyle[];
    center: google.maps.LatLng | undefined;
    div: HTMLDivElement | null;
    sums: ClusterIconInfo | null;
    visible: boolean;
    url: string;
    height: number;
    width: number;
    anchorText: number[];
    anchorIcon: number[];
    textColor: string;
    textSize: number;
    textDecoration: string;
    fontWeight: string;
    fontStyle: string;
    fontFamily: string;
    backgroundPosition: string;
    boundsChangedListener: google.maps.MapsEventListener | null;
    constructor(cluster: Cluster, styles: ClusterIconStyle[]);
    onAdd(): void;
    onRemove(): void;
    draw(): void;
    hide(): void;
    show(): void;
    useStyle(sums: ClusterIconInfo): void;
    setCenter(center: google.maps.LatLng): void;
    createCss(pos: google.maps.Point): string;
    getPosFromLatLng(latlng: google.maps.LatLng): google.maps.Point;
}
//# sourceMappingURL=ClusterIcon.d.ts.map