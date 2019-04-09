/// <reference types="googlemaps" />
import { PureComponent } from "react";
interface TrafficLayerState {
    trafficLayer: google.maps.TrafficLayer | null;
}
interface TrafficLayerProps {
    options?: google.maps.TrafficLayerOptions;
    onLoad?: (trafficLayer: google.maps.TrafficLayer) => void;
    onUnmount?: (trafficLayer: google.maps.TrafficLayer) => void;
}
export declare class TrafficLayer extends PureComponent<TrafficLayerProps, TrafficLayerState> {
    static contextType: import("react").Context<google.maps.Map | null>;
    state: {
        trafficLayer: null;
    };
    setTrafficLayerCallback: () => void;
    registeredEvents: google.maps.MapsEventListener[];
    componentDidMount(): void;
    componentDidUpdate(prevProps: TrafficLayerProps): void;
    componentWillUnmount(): void;
    render(): null;
}
export default TrafficLayer;
//# sourceMappingURL=TrafficLayer.d.ts.map