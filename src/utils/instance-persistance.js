const clearChildren = (node) => {
  if (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
  }
}

const getMapInstanceId = (id) => {
  return `google-map-${id}`
}

const getHiddenMapContainer = (id) => {
  const hiddenMapContainer = `hidden-container-${id}`

  let element = document.getElementById(hiddenMapContainer)

  if (!element) {
    element = document.createElement('div')

    element.id = hiddenMapContainer

    element.style.display = 'none'

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
}) => {
  const map = window[getMapInstanceId(id)]

  const hiddenContainer = getHiddenMapContainer(id)

  if (map && hiddenContainer.children.length === 1) {
    map.setZoom(zoom)
    map.setCenter(center)
    map.setOptions({
      style: mapContainerStyle,
      ...options
    })

    const mapContainer = document.getElementById(id)

    clearChildren(mapContainer)

    mapContainer.appendChild(hiddenContainer.children[0])

    return map
  }
}

export const saveInstance = (id, map) => {
  const hiddenContainer = getHiddenMapContainer(id)

  clearChildren(hiddenContainer)

  const mapContainer = document.getElementById(id)

  hiddenContainer.appendChild(mapContainer.children[0])

  window[getMapInstanceId(id)] = map
}
