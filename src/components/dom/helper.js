/* eslint-disable filenames/match-regex */
/* global google */
export const getOffsetOverride = (containerElement, props) =>
  typeof props.getPixelPositionOffset === 'function'
    ? props.getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight)
    : {}

const createLatLng = (inst, Type) =>
  new Type(inst.lat, inst.lng)

const createLatLngBounds = (inst, Type) =>
  new Type(
    new google.maps.LatLng(inst.ne.lat, inst.ne.lng),
    new google.maps.LatLng(inst.sw.lat, inst.sw.lng)
  )

const ensureOfType = (inst, type, factory) =>
  inst instanceof type
    ? inst
    : factory(inst, type)

const getLayoutStylesByBounds = (mapCanvasProjection, offset, bounds) => {
  const ne = mapCanvasProjection.fromLatLngToDivPixel(
    bounds.getNorthEast()
  )

  const sw = mapCanvasProjection.fromLatLngToDivPixel(
    bounds.getSouthWest()
  )

  if (ne && sw) {
    return {
      left: `${sw.x + offset.x}px`,
      top: `${ne.y + offset.y}px`,
      width: `${ne.x - sw.x - offset.x}px`,
      height: `${sw.y - ne.y - offset.y}px`,
    }
  }

  return {
    left: '-9999px',
    top: '-9999px',
  }
}

const getLayoutStylesByPosition = (mapCanvasProjection, offset, position) => {
  const point = mapCanvasProjection.fromLatLngToDivPixel(position)

  if (point) {
    const { x, y } = point

    return {
      left: `${x + offset.x}px`,
      top: `${y + offset.y}px`,
    }
  }

  return {
    left: '-9999px',
    top: '-9999px',
  }
}

export const getLayoutStyles = (mapCanvasProjection, offset, { bounds, position }) =>
  bounds !== undefined
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
