/// <reference types="googlemaps" />
import * as React from "react";
interface PolygonState {
    polygon: google.maps.Polygon | null;
}
interface PolygonProps {
    options?: google.maps.PolygonOptions;
    draggable?: boolean;
    editable?: boolean;
    visible?: boolean;
    path?: google.maps.MVCArray<google.maps.LatLng> | google.maps.LatLng[] | google.maps.LatLngLiteral[];
    paths?: google.maps.MVCArray<google.maps.LatLng> | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>> | google.maps.LatLng[] | google.maps.LatLng[][] | google.maps.LatLngLiteral[] | google.maps.LatLngLiteral[][];
    onDblClick?: (e: google.maps.MouseEvent) => void;
    onDragEnd?: (e: google.maps.MouseEvent) => void;
    onDragStart?: (e: google.maps.MouseEvent) => void;
    onMouseDown?: (e: google.maps.MouseEvent) => void;
    onMouseMove?: (e: google.maps.MouseEvent) => void;
    onMouseOut?: (e: google.maps.MouseEvent) => void;
    onMouseOver?: (e: google.maps.MouseEvent) => void;
    onMouseUp?: (e: google.maps.MouseEvent) => void;
    onRightClick?: (e: google.maps.MouseEvent) => void;
    onClick?: (e: google.maps.MouseEvent) => void;
    onDrag?: (e: google.maps.MouseEvent) => void;
    onLoad?: (polygon: google.maps.Polygon) => void;
    onUnmount?: (polygon: google.maps.Polygon) => void;
}
export declare class Polygon extends React.PureComponent<PolygonProps, PolygonState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: PolygonState;
    setPolygonCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: PolygonProps): void;
    componentWillUnmount(): void;
    render: () => null;
}
export default Polygon;
//# sourceMappingURL=Polygon.d.ts.map