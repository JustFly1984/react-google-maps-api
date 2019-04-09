/// <reference types="googlemaps" />
import { PureComponent } from "react";
interface KmlLayerState {
    kmlLayer: google.maps.KmlLayer | null;
}
interface KmlLayerProps {
    options?: google.maps.KmlLayerOptions;
    url?: string;
    zIndex?: number;
    onClick?: (e: google.maps.MouseEvent) => void;
    onDefaultViewportChanged?: () => void;
    onStatusChanged?: () => void;
    onLoad: (kmlLayer: google.maps.KmlLayer) => void;
    onUnmount: (kmlLayer: google.maps.KmlLayer) => void;
}
export declare class KmlLayer extends PureComponent<KmlLayerProps, KmlLayerState> {
    static contextType: import("react").Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: KmlLayerState;
    setKmlLayerCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: KmlLayerProps): void;
    componentWillUnmount(): void;
    render(): null;
}
export default KmlLayer;
//# sourceMappingURL=KmlLayer.d.ts.map