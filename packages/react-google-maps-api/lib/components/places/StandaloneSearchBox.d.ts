/// <reference types="googlemaps" />
import * as React from "react";
interface StandaloneSearchBoxState {
    searchBox: google.maps.places.SearchBox | null;
}
interface StandaloneSearchBoxProps {
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    options?: google.maps.places.SearchBoxOptions;
    onPlacesChanged?: () => void;
    onLoad?: (searchBox: google.maps.places.SearchBox) => void;
    onUnmount?: (searchBox: google.maps.places.SearchBox) => void;
}
declare class StandaloneSearchBox extends React.PureComponent<StandaloneSearchBoxProps, StandaloneSearchBoxState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    containerElement: React.RefObject<HTMLDivElement>;
    state: StandaloneSearchBoxState;
    setSearchBoxCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: StandaloneSearchBoxProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default StandaloneSearchBox;
//# sourceMappingURL=StandaloneSearchBox.d.ts.map