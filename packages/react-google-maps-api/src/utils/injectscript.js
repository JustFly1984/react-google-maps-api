export const injectScript = ({ url, id, onSuccess, onError }) => {
  if (typeof document !== 'undefined') {
    return new Promise((resolve, reject) => {
      const prevScript = document.getElementById(id)

      if (!prevScript) {
        const script = document.createElement('script')

        script.type = 'text/javascript'
        script.src = url
        script.id = id
        script.async = true
        script.onload = () => {
          resolve(onSuccess())
        }
        script.onerror = (e) => {
          reject(onError(e))
        }
        document.head.appendChild(script)
      } else {
        resolve(onSuccess())
      }
    })
  } else {
    onError()
  }
}
