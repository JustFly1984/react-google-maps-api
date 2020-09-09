import { PositionDrawProps } from "../../types"

/* eslint-disable filenames/match-regex */
export function getOffsetOverride(
  containerElement: HTMLElement,
  getPixelPositionOffset?: (offsetWidth: number, offsetHeight: number) => { x: number; y: number }
): { x: number; y: number } | {} {
  return typeof getPixelPositionOffset === 'function'
    ? getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight)
    : {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createLatLng = (inst: any, Type: any): any => new Type(inst.lat, inst.lng)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createLatLngBounds = (inst: any, Type: any): any =>
  new Type(
    new google.maps.LatLng(inst.ne.lat, inst.ne.lng),
    new google.maps.LatLng(inst.sw.lat, inst.sw.lng)
  )

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ensureOfType = (inst: any, type: any, factory: any): any => {
  return inst instanceof type ? inst : factory(inst, type)
}

const getLayoutStylesByBounds = (
  mapCanvasProjection: google.maps.MapCanvasProjection,
  offset: { x: number; y: number },
  bounds: google.maps.LatLngBounds
): { left: string; top: string; width?: string; height?: string } => {
  const ne = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast())

  const sw = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest())

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

const getLayoutStylesByPosition = (
  mapCanvasProjection: google.maps.MapCanvasProjection,
  offset: { x: number; y: number },
  position: google.maps.LatLng
): { left: string; top: string } => {
  const point = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(position)

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

export const getLayoutStyles = (
  mapCanvasProjection: google.maps.MapCanvasProjection,
  offset: { x: number; y: number },
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
  position?: google.maps.LatLng | google.maps.LatLngLiteral
): PositionDrawProps => {
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

export const arePositionsEqual = (
  currentPosition: PositionDrawProps,
  previousPosition: PositionDrawProps
): boolean => {
  return currentPosition.left === previousPosition.left
    && currentPosition.top === previousPosition.top
    && currentPosition.width === previousPosition.height
    && currentPosition.height === previousPosition.height;
}