/// <reference types="googlemaps" />
import * as React from "react";
interface GoogleMapState {
    map: google.maps.Map | null;
}
interface GoogleMapProps {
    id?: string;
    reuseSameInstance?: boolean;
    mapContainerStyle?: React.CSSProperties;
    mapContainerClassName?: string;
    options?: google.maps.MapOptions;
    extraMapTypes?: google.maps.MapType[];
    center?: google.maps.LatLng | google.maps.LatLngLiteral;
    clickableIcons?: boolean;
    heading?: number;
    mapTypeId?: string;
    streetView?: google.maps.StreetViewPanorama;
    tilt?: number;
    zoom?: number;
    onClick?: (e: google.maps.MouseEvent) => void;
    onDblClick?: (e: google.maps.MouseEvent) => void;
    onDrag?: () => void;
    onDragEnd?: () => void;
    onDragStart?: () => void;
    onMapTypeIdChanged?: () => void;
    onMouseMove?: (e: google.maps.MouseEvent) => void;
    onMouseOut?: (e: google.maps.MouseEvent) => void;
    onMouseOver?: (e: google.maps.MouseEvent) => void;
    onRightClick?: (e: google.maps.MouseEvent) => void;
    onTilesLoaded?: () => void;
    onBoundsChanged?: () => void;
    onCenterChanged?: () => void;
    onHeadingChanged?: () => void;
    onIdle?: () => void;
    onProjectionChanged?: () => void;
    onResize?: () => void;
    onTiltChanged?: () => void;
    onZoomChanged?: () => void;
    onLoad?: (map: google.maps.Map) => void | Promise<void>;
    onUnmount?: (map: google.maps.Map) => void | Promise<void>;
}
export declare class GoogleMap extends React.PureComponent<GoogleMapProps, GoogleMapState> {
    state: GoogleMapState;
    registeredEvents: google.maps.MapsEventListener[];
    mapRef: HTMLElement | null;
    getInstance: () => google.maps.Map | null;
    setMapCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: GoogleMapProps): void;
    componentWillUnmount(): void;
    getRef: (ref: HTMLDivElement | null) => void;
    render(): JSX.Element;
}
export default GoogleMap;
//# sourceMappingURL=GoogleMap.d.ts.map