/// <reference types="googlemaps" />
import * as React from "react";
interface DirectionsRendererState {
    directionsRenderer: google.maps.DirectionsRenderer | null;
}
interface DirectionsRendererProps {
    options?: google.maps.DirectionsRendererOptions;
    directions?: google.maps.DirectionsResult;
    panel?: Element;
    routeIndex?: number;
    onDirectionsChanged?: () => void;
    onLoad?: (directionsRenderer: google.maps.DirectionsRenderer) => void;
    onUnmount?: (directionsRenderer: google.maps.DirectionsRenderer) => void;
}
export declare class DirectionsRenderer extends React.PureComponent<DirectionsRendererProps, DirectionsRendererState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: DirectionsRendererState;
    setDirectionsRendererCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: DirectionsRendererProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default DirectionsRenderer;
//# sourceMappingURL=DirectionsRenderer.d.ts.map