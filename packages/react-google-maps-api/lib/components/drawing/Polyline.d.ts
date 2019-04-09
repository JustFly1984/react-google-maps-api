/// <reference types="googlemaps" />
import * as React from "react";
interface PolylineState {
    polyline: google.maps.Polyline | null;
}
interface PolylineProps {
    options?: google.maps.PolylineOptions;
    draggable?: boolean;
    editable?: boolean;
    visible?: boolean;
    path?: google.maps.MVCArray<google.maps.LatLng> | google.maps.LatLng[] | google.maps.LatLngLiteral[];
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
    onLoad?: (polyline: google.maps.Polyline) => void;
    onUnmount?: (polyline: google.maps.Polyline) => void;
}
export declare class Polyline extends React.PureComponent<PolylineProps, PolylineState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: PolylineState;
    setPolylineCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: PolylineProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default Polyline;
//# sourceMappingURL=Polyline.d.ts.map