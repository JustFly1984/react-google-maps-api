/// <reference types="googlemaps" />
import * as React from "react";
interface StreetViewPanoramaState {
    streetViewPanorama: google.maps.StreetViewPanorama | null;
}
interface StreetViewPanoramaProps {
    options?: google.maps.StreetViewPanoramaOptions;
    onCloseclick?: (event: google.maps.event) => void;
    onPanoChanged?: () => void;
    onPositionChanged?: () => void;
    onPovChanged?: () => void;
    onResize?: () => void;
    onStatusChanged?: () => void;
    onVisibleChanged?: () => void;
    onZoomChange?: () => void;
    onLoad?: (streetViewPanorama: google.maps.StreetViewPanorama) => void;
    onUnmount?: (streetViewPanorama: google.maps.StreetViewPanorama) => void;
}
export declare class StreetViewPanorama extends React.PureComponent<StreetViewPanoramaProps, StreetViewPanoramaState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: StreetViewPanoramaState;
    setStreetViewPanoramaCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: StreetViewPanoramaProps): void;
    componentWillUnmount(): void;
    render(): null;
}
export default StreetViewPanorama;
//# sourceMappingURL=StreetViewPanorama.d.ts.map