/// <reference types="googlemaps" />
export declare function registerEvents(props: any, instance: any, eventMap: Record<string, string>): google.maps.MapsEventListener[];
export declare function unregisterEvents(events?: google.maps.MapsEventListener[]): void;
export declare function applyUpdatersToPropsAndRegisterEvents({ updaterMap, eventMap, prevProps, nextProps, instance }: {
    updaterMap: any;
    eventMap: Record<string, string>;
    prevProps: any;
    nextProps: any;
    instance: any;
}): google.maps.MapsEventListener[];
//# sourceMappingURL=helper.d.ts.map