/// <reference types="googlemaps" />
import * as React from "react";
import { Clusterer } from "@react-google-maps/marker-clusterer";
interface MarkerState {
    marker: google.maps.Marker | null;
}
interface MarkerProps {
    options?: google.maps.MapOptions;
    animation?: google.maps.Animation;
    clickable?: boolean;
    cursor?: string;
    draggable?: string;
    icon?: string | google.maps.Icon | google.maps.Symbol;
    label?: string | google.maps.MarkerLabel;
    opacity?: number;
    position: google.maps.LatLng | google.maps.LatLngLiteral;
    shape?: google.maps.MarkerShape;
    title?: string;
    visible?: boolean;
    zIndex?: number;
    clusterer?: Clusterer;
    noClustererRedraw?: boolean;
    onClick?: (e: google.maps.MouseEvent) => void;
    onClickableChanged?: () => void;
    onCursorChanged?: () => void;
    onAnimationChanged?: () => void;
    onDblClick?: (e: google.maps.MouseEvent) => void;
    onDrag?: (e: google.maps.MouseEvent) => void;
    onDragEnd?: (e: google.maps.MouseEvent) => void;
    onDraggableChanged?: () => void;
    onDragStart?: (e: google.maps.MouseEvent) => void;
    onFlatChanged?: () => void;
    onIconChanged?: () => void;
    onMouseDown?: (e: google.maps.MouseEvent) => void;
    onMouseOut?: (e: google.maps.MouseEvent) => void;
    onMouseOver?: (e: google.maps.MouseEvent) => void;
    onMouseUp?: (e: google.maps.MouseEvent) => void;
    onPositionChanged?: () => void;
    onRightClick?: (e: google.maps.MouseEvent) => void;
    onShapeChanged?: () => void;
    onTitleChanged?: () => void;
    onVisibleChanged?: () => void;
    onZindexChanged?: () => void;
    onLoad?: (marker: google.maps.Marker) => void;
    onUnmount?: (marker: google.maps.Marker) => void;
}
export declare class Marker extends React.PureComponent<MarkerProps, MarkerState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: MarkerState;
    setMarkerCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: MarkerProps): void;
    componentWillUnmount(): void;
    render(): {} | null;
}
export default Marker;
//# sourceMappingURL=Marker.d.ts.map