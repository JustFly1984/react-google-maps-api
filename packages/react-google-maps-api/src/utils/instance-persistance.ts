export interface RestoreInstanceArg {
  id: string
  zoom?: number
  center?: google.maps.LatLng | google.maps.LatLngLiteral
  mapContainerStyle?: { [key: string]: any }
  options?: google.maps.MapOptions
}

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
}: RestoreInstanceArg): google.maps.Map | false => {
  // @ts-ignore
  const map: google.maps.Map = window[getMapInstanceId(id)]

  const hiddenContainer = getHiddenMapContainer(id)

  if (map && hiddenContainer.children.length === 1) {
    if (zoom) {
      map.setZoom(zoom)
    }

    if (center) {
      map.setCenter(center)
    }

    if (options) {
      map.setOptions(options)
    }

    const mapContainer = document.getElementById(id)

    if (mapContainer) {
      clearChildren(mapContainer)

      mapContainer.appendChild(hiddenContainer.children[0])

      if (mapContainerStyle) {
        Object.keys(mapContainerStyle).forEach(styleKey => {
          // TODO
          mapContainer.style[styleKey as any] = mapContainerStyle[styleKey]
        })
      }
    }

    return map
  }

  return false
}

export const saveInstance = (id: string, map: google.maps.Map) => {
  const hiddenContainer = getHiddenMapContainer(id)

  clearChildren(hiddenContainer)

  const mapContainer = document.getElementById(id)

  if (mapContainer && mapContainer.children && mapContainer.children[0]) {
    hiddenContainer.appendChild(mapContainer.children[0])
  }

  // @ts-ignore
  window[getMapInstanceId(id)] = map
}
