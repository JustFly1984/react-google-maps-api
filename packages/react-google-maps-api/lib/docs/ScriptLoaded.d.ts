import * as React from "react";
interface ScriptLoadedState {
    scriptLoaded: boolean;
}
interface ScriptLoadedProps {
    children: React.ReactChild | React.ReactChildren | Function;
}
declare class ScriptLoaded extends React.Component<ScriptLoadedProps, ScriptLoadedState> {
    interval: number | undefined;
    constructor(props: ScriptLoadedProps);
    setScriptLoadedCallback: () => void;
    checkIfScriptLoaded: () => void;
    componentWillUnmount(): void;
    render(): any;
}
export default ScriptLoaded;
//# sourceMappingURL=ScriptLoaded.d.ts.map