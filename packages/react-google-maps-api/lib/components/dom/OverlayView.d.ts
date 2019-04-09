/// <reference types="googlemaps" />
import * as React from "react";
interface OverlayViewState {
    overlayView: google.maps.OverlayView | null;
}
interface OverlayViewProps {
    mapPaneName: string;
    getPixelPositionOffset?: (offsetWidth: number, offsetHeight: number) => {
        x: number;
        y: number;
    };
    bounds?: google.maps.LatLngBounds;
    position?: google.maps.LatLng;
    onLoad?: (overlayView: google.maps.OverlayView) => void;
    onUnmount?: (overlayView: google.maps.OverlayView) => void;
}
export declare class OverlayView extends React.PureComponent<OverlayViewProps, OverlayViewState> {
    static FLOAT_PANE: string;
    static MAP_PANE: string;
    static MARKER_LAYER: string;
    static OVERLAY_LAYER: string;
    static OVERLAY_MOUSE_TARGET: string;
    static contextType: React.Context<google.maps.Map | null>;
    state: OverlayViewState;
    containerElement: HTMLElement | null;
    setOverlayViewCallback: () => void;
    onAdd: () => void;
    onPositionElement: () => void;
    draw: () => void;
    onRemove: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default OverlayView;
//# sourceMappingURL=OverlayView.d.ts.map