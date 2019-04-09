/// <reference types="googlemaps" />
import * as React from "react";
interface DrawingManagerState {
    drawingManager: google.maps.drawing.DrawingManager | null;
}
interface DrawingManagerProps {
    options?: google.maps.drawing.DrawingManagerOptions;
    drawingMode?: google.maps.drawing.OverlayType | null;
    onCircleComplete?: (circle: google.maps.Circle) => void;
    onMarkerComplete?: (marker: google.maps.Marker) => void;
    onOverlayComplete?: (e: google.maps.drawing.OverlayCompleteEvent) => void;
    onPolygonComplete?: (polygon: google.maps.Polygon) => void;
    onPolylineComplete?: (polyline: google.maps.Polyline) => void;
    onRectangleComplete?: (rectangle: google.maps.Rectangle) => void;
    onLoad?: (drawingManager: google.maps.drawing.DrawingManager) => void;
    onUnmount?: (drawingManager: google.maps.drawing.DrawingManager) => void;
}
export declare class DrawingManager extends React.PureComponent<DrawingManagerProps, DrawingManagerState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: DrawingManagerState;
    constructor(props: DrawingManagerProps);
    setDrawingManagerCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: DrawingManagerProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default DrawingManager;
//# sourceMappingURL=DrawingManager.d.ts.map