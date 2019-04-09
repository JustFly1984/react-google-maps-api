/// <reference types="googlemaps" />
export declare function getOffsetOverride(containerElement: HTMLElement, getPixelPositionOffset?: (offsetWidth: number, offsetHeight: number) => {
    x: number;
    y: number;
}): {};
export declare const getLayoutStyles: (mapCanvasProjection: google.maps.MapCanvasProjection, offset: any, bounds?: google.maps.LatLngBounds | undefined, position?: google.maps.LatLng | undefined) => {
    left: string;
    top: string;
};
//# sourceMappingURL=dom-helper.d.ts.map