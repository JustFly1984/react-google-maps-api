import { defaultLoadScriptProps } from "../LoadScript";

const idDeprecationWarning = `
The useLoadScript support to specify ID of script element is deprecated and will be removed in next major version.
The constant ID of ${defaultLoadScriptProps.id} will be used.
`

let warnedAboutDeprecatedId = false

export const warnAboutDeprecatedId = (id: string) => {
  if (id !== defaultLoadScriptProps.id && !warnedAboutDeprecatedId) {
    console.warn(idDeprecationWarning)
    warnedAboutDeprecatedId = true
  }
}
