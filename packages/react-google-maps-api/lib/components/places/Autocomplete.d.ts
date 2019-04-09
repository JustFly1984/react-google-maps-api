/// <reference types="googlemaps" />
import * as React from "react";
interface AutocompleteState {
    autocomplete: google.maps.places.Autocomplete | null;
}
interface AutocompleteProps {
    children: React.ReactChild;
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    restrictions?: google.maps.places.ComponentRestrictions;
    fields?: string[];
    options?: google.maps.places.AutocompleteOptions;
    types?: string[];
    onPlaceChanged?: () => void;
    onLoad?: (autocomplete: google.maps.places.Autocomplete) => void;
    onUnmount?: (autocomplete: google.maps.places.Autocomplete) => void;
}
export declare class Autocomplete extends React.PureComponent<AutocompleteProps, AutocompleteState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    containerElement: React.RefObject<HTMLDivElement>;
    state: AutocompleteState;
    setAutocompleteCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: AutocompleteProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default Autocomplete;
//# sourceMappingURL=Autocomplete.d.ts.map