import * as React from "react";
interface LoadScriptState {
    loaded: boolean;
}
interface LoadScriptProps {
    id: string;
    googleMapsApiKey: string;
    language: string;
    region: string;
    version: string;
    loadingElement?: React.ReactNode;
    onLoad?: () => void;
    onError?: (error: Error) => void;
    onUnmount?: () => void;
    libraries: string[];
    preventGoogleFontsLoading?: boolean;
}
declare class LoadScript extends React.PureComponent<LoadScriptProps, LoadScriptState> {
    static defaultProps: {
        libraries: never[];
    };
    check: React.RefObject<HTMLDivElement>;
    state: {
        loaded: boolean;
    };
    cleanupCallback: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: LoadScriptProps): void;
    componentWillUnmount(): void;
    isCleaningUp: () => Promise<{}>;
    cleanup: () => void;
    injectScript: () => void;
    render(): JSX.Element;
}
export default LoadScript;
//# sourceMappingURL=LoadScript.d.ts.map