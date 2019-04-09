import { Component, ChangeEvent, FormEvent } from 'react';
interface DocsApiKeyInputState {
    key: string;
    loadScript: boolean;
}
declare class DocsApiKeyInput extends Component<{}, DocsApiKeyInputState> {
    constructor(props: {});
    onInputChange: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
    onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    render(): JSX.Element;
}
export default DocsApiKeyInput;
//# sourceMappingURL=DocsApiKeyInput.d.ts.map