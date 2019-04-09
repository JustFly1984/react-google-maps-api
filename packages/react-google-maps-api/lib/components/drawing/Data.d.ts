/// <reference types="googlemaps" />
import * as React from "react";
interface DataState {
    data: google.maps.Data | null;
}
interface DataProps {
    options?: google.maps.Data.DataOptions;
    onAddFeature?: (e: google.maps.Data.AddFeatureEvent) => void;
    onClick?: (e: google.maps.MouseEvent) => void;
    onDblClick?: (e: google.maps.MouseEvent) => void;
    onMouseDown?: (e: google.maps.MouseEvent) => void;
    onMouseOut?: (e: google.maps.MouseEvent) => void;
    onMouseOver?: (e: google.maps.MouseEvent) => void;
    onMouseUp?: (e: google.maps.MouseEvent) => void;
    onRemoveFeature?: (e: google.maps.Data.RemoveFeatureEvent) => void;
    onRemoveProperty?: (e: google.maps.Data.RemovePropertyEvent) => void;
    onRightClick?: (e: google.maps.MouseEvent) => void;
    onSetGeometry?: (e: google.maps.Data.SetGeometryEvent) => void;
    onSetProperty?: (e: google.maps.Data.SetPropertyEvent) => void;
    onLoad?: (data: google.maps.Data) => void;
    onUnmount?: (data: google.maps.Data) => void;
}
export declare class Data extends React.PureComponent<DataProps, DataState> {
    static contextType: React.Context<google.maps.Map | null>;
    registeredEvents: google.maps.MapsEventListener[];
    state: DataState;
    setDataCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: DataProps): void;
    componentWillUnmount(): void;
    render(): null;
}
export default Data;
//# sourceMappingURL=Data.d.ts.map