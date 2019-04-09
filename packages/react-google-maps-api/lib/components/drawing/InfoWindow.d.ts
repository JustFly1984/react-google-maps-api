/// <reference types="googlemaps" />
import * as React from "react";
interface InfoWindowState {
    infoWindow: google.maps.InfoWindow | null;
}
interface InfoWindowProps {
    anchor: google.maps.MVCObject | null;
    options?: google.maps.InfoWindowOptions;
    position: google.maps.LatLng | google.maps.LatLngLiteral;
    zIndex?: number;
    onCloseClick?: () => void;
    onDomReady?: () => void;
    onContentChanged?: () => void;
    onPositionChanged?: () => void;
    onZindexChanged?: () => void;
    onLoad?: (infoWindow: google.maps.InfoWindow) => void;
    onUnmount?: (infoWindow: google.maps.InfoWindow) => void;
}
export declare class InfoWindow extends React.PureComponent<InfoWindowProps, InfoWindowState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    containerElement: HTMLElement | null;
    state: InfoWindowState;
    open: (infoWindow: google.maps.InfoWindow, anchor: google.maps.MVCObject) => void;
    setInfowindowCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: InfoWindowProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default InfoWindow;
//# sourceMappingURL=InfoWindow.d.ts.map