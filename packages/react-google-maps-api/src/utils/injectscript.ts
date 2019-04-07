import { isBrowser } from "./isbrowser"

interface InjectScriptArg {
  url: string;
  id: string;
}

export const injectScript = ({ url, id }: InjectScriptArg): Promise<any> => {
  if (!isBrowser) {
    return Promise.reject(new Error("document is undefined"))
  }

  return new Promise(function injectScriptCallback(resolve, reject) {
    if (document.getElementById(id)) {
      return resolve(id)
    }

    const script = document.createElement("script")

    script.type = "text/javascript"
    script.src = url
    script.id = id
    script.async = true
    script.onload = function onload() {
      resolve(id)
    }
    script.onerror = reject

    document.head.appendChild(script)
  })
    // eslint-disable-next-line @getify/proper-arrows/name
    .catch(err => {
      console.error('injectScript error: ', err)
    })
}
