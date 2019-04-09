/// <reference types="googlemaps" />
export interface RestoreInstanceArg {
    id: string;
    zoom?: number;
    center?: google.maps.LatLng | google.maps.LatLngLiteral;
    mapContainerStyle?: {
        [key: string]: any;
    };
    options?: google.maps.MapOptions;
}
export declare const restoreInstance: ({ id, zoom, center, mapContainerStyle, options }: RestoreInstanceArg) => false | google.maps.Map;
export declare const saveInstance: (id: string, map: google.maps.Map) => void;
//# sourceMappingURL=instance-persistance.d.ts.map