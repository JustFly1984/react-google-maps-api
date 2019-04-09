/// <reference types="googlemaps" />
import * as React from "react";
interface HeatmapLayerState {
    heatmapLayer: google.maps.visualization.HeatmapLayer | null;
}
interface HeatmapLayerProps {
    data: google.maps.MVCArray<google.maps.LatLng | google.maps.visualization.WeightedLocation> | google.maps.LatLng[] | google.maps.visualization.WeightedLocation[];
    options?: google.maps.visualization.HeatmapLayerOptions;
    onLoad?: (heatmapLayer: google.maps.visualization.HeatmapLayer) => void;
    onUnmount?: (heatmapLayer: google.maps.visualization.HeatmapLayer) => void;
}
export declare class HeatmapLayer extends React.PureComponent<HeatmapLayerProps, HeatmapLayerState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: HeatmapLayerState;
    setHeatmapLayerCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: HeatmapLayerProps): void;
    componentWillUnmount(): void;
    render(): null;
}
export default HeatmapLayer;
//# sourceMappingURL=HeatmapLayer.d.ts.map