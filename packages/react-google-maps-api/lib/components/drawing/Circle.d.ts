/// <reference types="googlemaps" />
import * as React from "react";
interface CircleState {
    circle: google.maps.Circle | null;
}
export interface CircleProps {
    options?: google.maps.CircleOptions;
    center: google.maps.LatLng | google.maps.LatLngLiteral;
    radius: number;
    draggable?: boolean;
    editable?: boolean;
    visible?: boolean;
    onDblClick?: (e: google.maps.MouseEvent) => void;
    onDragEnd?: (e: google.maps.MouseEvent) => void;
    onDragStart?: (e: google.maps.MouseEvent) => void;
    onMouseDown?: (e: google.maps.MouseEvent) => void;
    onMouseMove?: (e: google.maps.MouseEvent) => void;
    onMouseOut?: (e: google.maps.MouseEvent) => void;
    onMouseOver?: (e: google.maps.MouseEvent) => void;
    onMouseUp?: (e: google.maps.MouseEvent) => void;
    onRightClick?: (e: google.maps.MouseEvent) => void;
    onCenterChanged?: () => void;
    onClick?: (e: google.maps.MouseEvent) => void;
    onDrag?: (e: google.maps.MouseEvent) => void;
    onRadiusChanged?: () => void;
    onLoad?: (circle: google.maps.Circle) => void;
    onUnmount?: (circle: google.maps.Circle) => void;
}
export declare class Circle extends React.PureComponent<CircleProps, CircleState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: CircleState;
    setCircleCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: CircleProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default Circle;
//# sourceMappingURL=Circle.d.ts.map