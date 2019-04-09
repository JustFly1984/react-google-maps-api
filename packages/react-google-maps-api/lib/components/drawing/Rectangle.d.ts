/// <reference types="googlemaps" />
import * as React from "react";
interface RectangleState {
    rectangle: google.maps.Rectangle | null;
}
interface RectangleProps {
    options?: google.maps.RectangleOptions;
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    draggable?: boolean;
    editable?: boolean;
    visible?: boolean;
    clickable?: boolean;
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
    onBoundsChanged?: () => void;
    onLoad?: (rectangle: google.maps.Rectangle) => void;
    onUnmount?: (rectangle: google.maps.Rectangle) => void;
}
export declare class Rectangle extends React.PureComponent<RectangleProps, RectangleState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: RectangleState;
    setRectangleCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: RectangleProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default Rectangle;
//# sourceMappingURL=Rectangle.d.ts.map