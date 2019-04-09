/// <reference types="googlemaps" />
import * as React from "react";
interface BicyclingLayerState {
    bicyclingLayer: google.maps.BicyclingLayer | null;
}
interface BicyclingLayerProps {
    onLoad?: (bicyclingLayer: google.maps.BicyclingLayer) => void;
    onUnmount?: (bicyclingLayer: google.maps.BicyclingLayer) => void;
}
export declare class BicyclingLayer extends React.PureComponent<BicyclingLayerProps, BicyclingLayerState> {
    static contextType: React.Context<google.maps.Map | null>;
    state: {
        bicyclingLayer: null;
    };
    setBicyclingLayerCallback: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): null;
}
export default BicyclingLayer;
//# sourceMappingURL=BicyclingLayer.d.ts.map