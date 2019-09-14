import { isBrowser } from './isbrowser'

interface WindowWithGoogleMap extends Window {
  initMap?: () => void
}

interface InjectScriptArg {
  url: string
  id: string
}

export const injectScript = ({ url, id }: InjectScriptArg): Promise<any> => {
  if (!isBrowser) {
    return Promise.reject(new Error('document is undefined'))
  }

  return new Promise(function injectScriptCallback(resolve, reject) {
    const existingScript = document.getElementById(id) as HTMLScriptElement | undefined
    const windowWithGoogleMap: WindowWithGoogleMap = window
    if (existingScript) {
      // Same script id/url: keep same script
      if (existingScript.src === url) {
        if (existingScript.getAttribute('data-state') === 'ready') {
          return resolve(id)
        } else {
          const originalInitMap = windowWithGoogleMap.initMap
          windowWithGoogleMap.initMap = function initMap() {
            if (originalInitMap) {
              originalInitMap()
            }
            resolve(id)
          }

          return
        }
      }
      // Same script id but url changed: recreate the script
      else {
        existingScript.remove()
      }
    }

    const script = document.createElement('script')

    script.type = 'text/javascript'
    script.src = url
    script.id = id
    script.async = true
    script.onerror = reject

    windowWithGoogleMap.initMap = function onload() {
      script.setAttribute('data-state', 'ready')
      resolve(id)
    }

    document.head.appendChild(script)
  }).catch(err => {
    console.error('injectScript error: ', err)
  })
}
