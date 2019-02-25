const clearChildren = (node: HTMLElement) => {
  if (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
  }
}

const getMapInstanceId = (id: string) => {
  return `google-map-${id}`
}

const getHiddenMapContainer = (id: string) => {
  const hiddenMapContainer = `hidden-container-${id}`

  let element = document.getElementById(hiddenMapContainer)

  if (!element) {
    element = document.createElement("div")

    element.id = hiddenMapContainer

    element.style.display = "none"

    document.body.appendChild(element)
  }

  return element
}

export const restoreInstance = ({
  id,
  zoom,
  center,
  mapContainerStyle,
  options
}: {
  id: string
  zoom?: number
  center?: google.maps.LatLng | google.maps.LatLngLiteral
  mapContainerStyle?: any
  options?: google.maps.MapOptions
}) => {
  const map: google.maps.Map = window[getMapInstanceId(id)]

  const hiddenContainer = getHiddenMapContainer(id)

  if (map && hiddenContainer.children.length === 1) {
    map.setZoom(zoom)
    map.setCenter(center)
    map.setOptions(options)

    const mapContainer = document.getElementById(id)

    clearChildren(mapContainer)

    mapContainer.appendChild(hiddenContainer.children[0])

    // Copy mapContainerStyle to mapContainer
    Object.keys(mapContainerStyle).forEach(styleKey => {
      mapContainer.style[styleKey] = mapContainerStyle[styleKey]
    })

    return map
  }
}

export const saveInstance = (id: string, map: google.maps.Map) => {
  const hiddenContainer = getHiddenMapContainer(id)

  clearChildren(hiddenContainer)

  const mapContainer = document.getElementById(id)

  hiddenContainer.appendChild(mapContainer.children[0])

  window[getMapInstanceId(id)] = map
}
