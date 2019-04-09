/// <reference types="googlemaps" />
import * as React from "react";
interface GroundOverlayState {
    groundOverlay: google.maps.GroundOverlay | null;
}
interface GroundOverlayProps {
    options?: google.maps.GroundOverlayOptions;
    opacity?: number;
    onDblClick?: (e: google.maps.MouseEvent) => void;
    onClick?: (e: google.maps.MouseEvent) => void;
    url: string;
    bounds: google.maps.LatLngBounds;
    onLoad?: (groundOverlay: google.maps.GroundOverlay) => void;
    onUnmount?: (groundOverlay: google.maps.GroundOverlay) => void;
}
export declare class GroundOverlay extends React.PureComponent<GroundOverlayProps, GroundOverlayState> {
    static defaultProps: {
        onLoad: () => void;
    };
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: GroundOverlayState;
    setGroundOverlayCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: GroundOverlayProps): void;
    componentWillUnmount(): void;
    render(): null;
}
export default GroundOverlay;
//# sourceMappingURL=GroundOverlay.d.ts.map