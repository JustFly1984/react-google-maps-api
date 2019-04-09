/// <reference types="googlemaps" />
import * as React from "react";
interface DirectionsServiceState {
    directionsService: google.maps.DirectionsService | null;
}
interface DirectionsServiceProps {
    options: google.maps.DirectionsRequest;
    callback: (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => void;
    onLoad?: (directionsService: google.maps.DirectionsService) => void;
    onUnmount?: (directionsService: google.maps.DirectionsService) => void;
}
export declare class DirectionsService extends React.PureComponent<DirectionsServiceProps, DirectionsServiceState> {
    state: DirectionsServiceState;
    setDirectionsServiceCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default DirectionsService;
//# sourceMappingURL=DirectionsService.d.ts.map