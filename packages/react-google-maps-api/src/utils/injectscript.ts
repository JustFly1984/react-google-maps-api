export const injectScript = ({ url, id }) => {
  if (typeof document === "undefined") {
    return Promise.reject(new Error("document is undefined"))
  }

  return new Promise((resolve, reject) => {
    if (document.getElementById(id) !== null) {
      return resolve(id)
    }

    const script = document.createElement("script")

    script.type = "text/javascript"
    script.src = url
    script.id = id
    script.async = true
    script.onload = () => {
      resolve(id)
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}
