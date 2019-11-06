/* eslint-disable filenames/match-regex */
export function getOffsetOverride(
  containerElement: HTMLElement,
  getPixelPositionOffset?: (
    offsetWidth: number,
    offsetHeight: number
  ) => { x: number; y: number }
) {
  return typeof getPixelPositionOffset === "function"
    ? getPixelPositionOffset(
      containerElement.offsetWidth,
      containerElement.offsetHeight
    )
    : {}
}

const createLatLng = (inst: any, Type: any): any => new Type(inst.lat, inst.lng)

const createLatLngBounds = (inst: any, Type: any): any =>
  new Type(
    new google.maps.LatLng(inst.ne.lat, inst.ne.lng),
    new google.maps.LatLng(inst.sw.lat, inst.sw.lng)
  )

const ensureOfType = (inst: any, type: any, factory: any) => {
  return inst instanceof type ? inst : factory(inst, type)
}

const getLayoutStylesByBounds = (
  mapCanvasProjection: google.maps.MapCanvasProjection,
  offset: any,
  bounds: google.maps.LatLngBounds
) => {
  const ne = mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast())

  const sw = mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest())

  if (ne && sw) {
    return {
      left: `${sw.x + offset.x}px`,
      top: `${ne.y + offset.y}px`,
      width: `${ne.x - sw.x - offset.x}px`,
      height: `${sw.y - ne.y - offset.y}px`
    }
  }

  return {
    left: "-9999px",
    top: "-9999px"
  }
}

const getLayoutStylesByPosition = (
  mapCanvasProjection: google.maps.MapCanvasProjection,
  offset: any,
  position: google.maps.LatLng
) => {
  const point = mapCanvasProjection.fromLatLngToDivPixel(position)

  if (point) {
    const { x, y } = point

    return {
      left: `${x + offset.x}px`,
      top: `${y + offset.y}px`
    }
  }

  return {
    left: "-9999px",
    top: "-9999px"
  }
}

export const getLayoutStyles = (
  mapCanvasProjection: google.maps.MapCanvasProjection,
  offset: any,
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
  // eslint-disable-next-line @getify/proper-arrows/params
  position?: google.maps.LatLng | google.maps.LatLngLiteral
) => {
  return bounds !== undefined
    ? getLayoutStylesByBounds(
      mapCanvasProjection,
      offset,
      ensureOfType(bounds, google.maps.LatLngBounds, createLatLngBounds)
    )
    : getLayoutStylesByPosition(
      mapCanvasProjection,
      offset,
      ensureOfType(position, google.maps.LatLng, createLatLng)
    )
}
