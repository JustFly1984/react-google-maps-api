/// <reference types="googlemaps" />
import * as React from "react";
interface StreetViewServiceProps {
    onLoad?: (streetViewService: google.maps.StreetViewService | null) => void;
    onUnmount?: (streetViewService: google.maps.StreetViewService | null) => void;
}
interface StreetViewServiceState {
    streetViewService: google.maps.StreetViewService | null;
}
export declare class StreetViewService extends React.PureComponent<StreetViewServiceProps, StreetViewServiceState> {
    static contextType: React.Context<google.maps.Map | null>;
    state: {
        streetViewService: null;
    };
    setStreetViewServiceCallback: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): null;
}
export default StreetViewService;
//# sourceMappingURL=StreetViewService.d.ts.map